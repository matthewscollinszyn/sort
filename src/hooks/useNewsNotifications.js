/* =========================================================
   EcoLedger – News Notification Hook
   Fires a per-user notification the first time they "see"
   a new campus news item published by admin.
   ========================================================= */

import { useRef, useEffect } from 'react';

const seenKey = (userId) => `ecoledger_news_seen_${userId || 'guest'}`;

/**
 * Watches `news` (from useCampusNews) and calls `addNotification`
 * once per user for each new item the user hasn't been notified about.
 *
 * On the very first load the current news list is marked as already-seen
 * so users don't get spammed with the seed articles.
 */
export function useNewsNotifications(userId, news, addNotification) {
    // null = not yet loaded from localStorage
    const seenRef = useRef(null);

    useEffect(() => {
        if (!news || !addNotification) return;

        const key = seenKey(userId);

        // Load persisted seen-set on first run
        if (seenRef.current === null) {
            try {
                const stored = localStorage.getItem(key);
                if (stored) {
                    seenRef.current = new Set(JSON.parse(stored));
                } else {
                    // First time ever: wait until news has actually loaded before
                    // setting the baseline, so we don't record an empty set and then
                    // treat every real item as "unseen" on the next render.
                    if (news.length === 0) return;
                    seenRef.current = new Set(news.map((n) => n.id));
                    localStorage.setItem(key, JSON.stringify([...seenRef.current]));
                    return;
                }
            } catch {
                seenRef.current = new Set();
            }
        }

        // Find items not yet seen by this user
        const unseen = news.filter((n) => !seenRef.current.has(n.id));
        if (unseen.length === 0) return;

        unseen.forEach((item) => {
            addNotification({
                type: 'campus_news',
                title: `New Campus Update: ${item.tag}`,
                message: item.title,
            });
            seenRef.current.add(item.id);
        });

        try {
            localStorage.setItem(key, JSON.stringify([...seenRef.current]));
        } catch { /* quota exceeded */ }
    }, [news, userId, addNotification]);
}
