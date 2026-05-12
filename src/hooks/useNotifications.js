/* =========================================================
   EcoLedger – Notification Hook
   sessionStorage-based per-user notifications with SSE
   ========================================================= */

import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';
import realtimeEvents from '../lib/realtimeEvents';

const MAX_NOTIFICATIONS = 50;
const AUTO_DELETE_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Persistent notification system with real-time SSE.
 * userId should be the authenticated user's ID for per-user storage.
 */
export function useNotifications(user) {
    const userId = user?.id;
    const userRole = user?.role;
    const key = userId ? `ecoledger_notifications_${userId}` : 'ecoledger_notifications_guest';

    const [notifications, setNotifications] = useState(() => {
        try {
            const stored = sessionStorage.getItem(key);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Re-load from storage when key changes (login/logout/user change)
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(key);
            setNotifications(stored ? JSON.parse(stored) : []);
        } catch {
            setNotifications([]);
        }
    }, [key]);

    // Persist to sessionStorage on every change
    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(notifications.slice(0, MAX_NOTIFICATIONS)));
        } catch { /* quota exceeded – silently ignore */ }
    }, [notifications, key]);

    const addNotification = useCallback((notif) => {
        const isReport = ['report', 'new_report', 'report_status', 'dispatch'].includes(notif.type);
        const item = {
            id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            timestamp: new Date().toISOString(),
            read: false,
            readAt: null,
            priority: isReport ? 1 : (notif.priority || 0),
            ...notif,
        };
        setNotifications(prev => {
            const newList = [item, ...prev];
            // Sort: Priority first, then timestamp descending
            return newList
                .sort((a, b) => (b.priority - a.priority) || (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
                .slice(0, MAX_NOTIFICATIONS);
        });
    }, []);

    // ── Real-time SSE listener ──
    useEffect(() => {
        if (!userId) return;

        const token = api.getToken();
        if (!token) return;

        console.log('🔔 Starting notifications SSE stream for user:', userId);

        const handleReportEvent = (data, e) => {
            try {
                console.log('🔔 Notification event received:', e.type, data);

                // Filter notifications based on role
                let shouldNotify = false;
                let title = '';
                let message = '';
                let type = 'default';

                if (e.type === 'report.created') {
                    if (userRole === 'ADMIN' || userRole === 'MRF') {
                        shouldNotify = true;
                        type = 'new_report';
                        title = 'New Report Created';
                        message = `A new report was submitted at ${data.location}.`;
                    }
                } else if (e.type === 'report.updated') {
                    // Notify student if their report was updated
                    if (userRole === 'STUDENT' && data.userId === userId) {
                        shouldNotify = true;
                        type = 'report_status';
                        title = 'Report Status Updated';
                        message = `Your report at ${data.location} is now ${data.status}.`;
                        if (data.pointsAwarded) {
                            message += ` You earned ${data.pointsAwarded} points!`;
                        }
                    }
                    // Notify MRF if they were assigned a report
                    else if (userRole === 'MRF' && data.assignedStaffId === userId) {
                        shouldNotify = true;
                        type = 'dispatch';
                        title = 'New Task Assigned';
                        message = `You have been assigned to a report at ${data.location}.`;
                    }
                    // Notify Admin of all updates
                    else if (userRole === 'ADMIN') {
                        shouldNotify = true;
                        type = 'report_status';
                        title = 'Report Updated';
                        message = `Report #${data.reportId} at ${data.location} updated to ${data.status}.`;
                    }
                }

                if (shouldNotify) {
                    addNotification({
                        type,
                        title,
                        message,
                        priority: 1, // High priority for reports
                        data: {
                            reportId: data.reportId,
                            status: data.status,
                            location: data.location
                        }
                    });
                }
            } catch (err) {
                console.error('Failed to parse notification event:', err);
            }
        };

        const unsub1 = realtimeEvents.subscribe('report.created', handleReportEvent);
        const unsub2 = realtimeEvents.subscribe('report.updated', handleReportEvent);

        return () => {
            console.log('🔕 Unsubscribing notifications SSE listeners');
            unsub1();
            unsub2();
        };
    }, [userId, userRole, addNotification]);

    // ── Auto-cleanup logic ──
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            setNotifications(prev => {
                const filtered = prev.filter(n => {
                    if (n.read && n.readAt) {
                        const timeSinceRead = now - new Date(n.readAt).getTime();
                        return timeSinceRead < AUTO_DELETE_MS;
                    }
                    return true;
                });

                // Only update if something was removed to prevent re-renders
                return filtered.length !== prev.length ? filtered : prev;
            });
        }, 30000); // Check every 30 seconds

        return () => clearInterval(cleanupInterval);
    }, []);

    const markRead = useCallback((id) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n
        ));
    }, []);

    const markAllRead = useCallback(() => {
        const now = new Date().toISOString();
        setNotifications(prev => prev.map(n =>
            n.read ? n : { ...n, read: true, readAt: now }
        ));
    }, []);

    const clearAll = useCallback(() => setNotifications([]), []);

    const unreadCount = notifications.filter(n => !n.read).length;

    return { notifications, unreadCount, addNotification, markRead, markAllRead, clearAll };
}
