import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Tag → Tailwind color classes (used by viewer pages)
export const TAG_COLOR_MAP = {
    'MRF Update': { tagColor: 'bg-eco-green/15 text-eco-green', iconBg: 'from-eco-green to-teal-500' },
    'New Facility': { tagColor: 'bg-blue-400/15 text-blue-400', iconBg: 'from-blue-500 to-indigo-500' },
    'Achievement': { tagColor: 'bg-amber-400/15 text-amber-400', iconBg: 'from-amber-400 to-orange-500' },
    'Event': { tagColor: 'bg-pink-400/15 text-pink-400', iconBg: 'from-pink-500 to-rose-500' },
    'Program': { tagColor: 'bg-violet-400/15 text-violet-400', iconBg: 'from-violet-500 to-purple-500' },
    'Research': { tagColor: 'bg-cyan-400/15 text-cyan-400', iconBg: 'from-cyan-500 to-sky-500' },
    'Maintenance': { tagColor: 'bg-amber-400/15 text-amber-400', iconBg: 'from-amber-400 to-orange-500' },
    'Assets': { tagColor: 'bg-blue-400/15 text-blue-400', iconBg: 'from-blue-500 to-indigo-500' },
    'Announcement': { tagColor: 'bg-rose-400/15 text-rose-500', iconBg: 'from-rose-500 to-red-500' },
    'Update': { tagColor: 'bg-slate-400/15 text-slate-500', iconBg: 'from-slate-400 to-slate-500' },
};

export const TAG_OPTIONS = Object.keys(TAG_COLOR_MAP);

export function useCampusNews(defer = false) {
    const [news, setNews] = useState([]);

    const loadNews = useCallback(async () => {
        try {
            const response = await api.getNews();
            if (response.success) {
                setNews(response.data?.news || []);
            }
        } catch (error) {
            console.error('Failed to fetch campus news:', error);
        }
    }, []);

    // Defer load: wait 500ms after mount to let main UI render first
    useEffect(() => {
        if (defer) {
            const timer = setTimeout(loadNews, 500);
            return () => clearTimeout(timer);
        } else {
            loadNews();
        }
    }, [loadNews, defer]);

    useEffect(() => {
        const eventSource = new EventSource(api.getNewsStreamUrl());

        const handleSnapshot = (event) => {
            try {
                const payload = JSON.parse(event.data);
                if (Array.isArray(payload.news)) {
                    setNews(payload.news);
                }
            } catch (error) {
                console.error('Failed to parse news stream event:', error);
            }
        };

        eventSource.addEventListener('news.snapshot', handleSnapshot);
        eventSource.onerror = () => {
            // Native EventSource will retry automatically.
        };

        return () => {
            eventSource.removeEventListener('news.snapshot', handleSnapshot);
            eventSource.close();
        };
    }, []);

    const addNewsItem = useCallback(async (item) => {
        console.log('[useCampusNews] addNewsItem called', item);
        try {
            const response = await api.createNewsItem(item);
            console.log('[useCampusNews] addNewsItem response', response);
            if (!response.success) {
                throw new Error(response.message || 'Failed to create news item');
            }
            // Use the returned list if available, otherwise re-fetch
            const updated = response.data?.news;
            if (Array.isArray(updated) && updated.length > 0) {
                setNews(updated);
            } else {
                await loadNews();
            }
        } catch (error) {
            console.error('[useCampusNews] addNewsItem ERROR:', error);
            throw error;
        }
    }, [loadNews]);

    const updateCampusNewsItem = useCallback(async (id, changes) => {
        try {
            const response = await api.updateNewsItem(id, changes);
            console.log('[useCampusNews] updateNewsItem response', response);
            if (!response.success) {
                throw new Error(response.message || 'Failed to update news item');
            }
            // Use the returned list if available, otherwise apply optimistic update
            const updated = response.data?.news;
            if (Array.isArray(updated) && updated.length > 0) {
                setNews(updated);
            } else {
                // Optimistic: patch the item in local state immediately
                setNews(prev => prev.map(n =>
                    String(n.id) === String(id) ? { ...n, ...changes } : n
                ));
                loadNews(); // background sync
            }
        } catch (error) {
            console.error('[useCampusNews] updateNewsItem ERROR:', error);
            throw error;
        }
    }, [loadNews]);

    const removeNewsItem = useCallback(async (id) => {
        try {
            // Optimistic removal immediately so the UI responds at once
            setNews(prev => prev.filter(n => String(n.id) !== String(id)));

            const response = await api.deleteNewsItem(id);
            console.log('[useCampusNews] deleteNewsItem response', response);
            if (!response.success) {
                // Rollback optimistic remove on failure
                await loadNews();
                throw new Error(response.message || 'Failed to delete news item');
            }
            // Confirm with server state
            const updated = response.data?.news;
            if (Array.isArray(updated)) {
                setNews(updated);
            } else {
                loadNews();
            }
        } catch (error) {
            console.error('[useCampusNews] deleteNewsItem ERROR:', error);
            throw error;
        }
    }, [loadNews]);

    return {
        news,
        addNewsItem,
        updateNewsItem: updateCampusNewsItem,
        deleteNewsItem: removeNewsItem,
        refreshNews: loadNews,
    };
}
