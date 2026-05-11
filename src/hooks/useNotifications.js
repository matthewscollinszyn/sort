/* =========================================================
   EcoLedger – Notification Hook
   localStorage-based per-user notifications
   ========================================================= */

import { useState, useEffect, useCallback } from 'react';

const MAX_NOTIFICATIONS = 50;

/**
 * Persistent notification system.
 * userId should be the authenticated user's ID for per-user storage.
 */
export function useNotifications(userId) {
    const key = userId ? `ecoledger_notifications_${userId}` : 'ecoledger_notifications_guest';

    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            // On initial load, drop notifications that were already read/seen
            const all = stored ? JSON.parse(stored) : [];
            return all.filter(n => !n.read);
        } catch {
            return [];
        }
    });

    // Persist to localStorage on every change
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(notifications.slice(0, MAX_NOTIFICATIONS)));
        } catch { /* quota exceeded – silently ignore */ }
    }, [notifications, key]);

    // Re-load from storage when userId changes (login/logout).
    // Drop any previously read/seen notifications so the panel starts clean
    // while new/untouched notifications are preserved.
    useEffect(() => {
        try {
            const stored = localStorage.getItem(key);
            const all = stored ? JSON.parse(stored) : [];
            const unread = all.filter(n => !n.read);
            setNotifications(unread);
            // Persist the cleaned list back immediately
            localStorage.setItem(key, JSON.stringify(unread));
        } catch {
            setNotifications([]);
        }
    }, [key]);

    const addNotification = useCallback((notif) => {
        const item = {
            id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            timestamp: new Date().toISOString(),
            read: false,
            ...notif,
        };
        setNotifications(prev => [item, ...prev].slice(0, MAX_NOTIFICATIONS));
    }, []);

    const markRead = useCallback((id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, []);

    const markAllRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const clearAll = useCallback(() => setNotifications([]), []);

    const unreadCount = notifications.filter(n => !n.read).length;

    return { notifications, unreadCount, addNotification, markRead, markAllRead, clearAll };
}
