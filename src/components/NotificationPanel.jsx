/* =========================================================
   EcoLedger – Notification Panel
   Reusable dropdown panel for the Bell button
   ========================================================= */

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, X, CheckCheck, Trash2,
    CheckCircle2, AlertTriangle, Truck, Users, RefreshCw, Info,
    Newspaper, Star, Award, ChevronRight
} from 'lucide-react';

/* ── Icon / colour map per notification type ── */
const TYPE_CONFIG = {
    report_status: { Icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    new_report: { Icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    dispatch: { Icon: Truck, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    mrf_collection: { Icon: Truck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    new_user: { Icon: Users, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    campus_news: { Icon: Newspaper, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    points: { Icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    reward: { Icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    default: { Icon: Info, color: 'text-slate-400', bg: 'bg-slate-400/10' },
};

function timeAgo(isoString) {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

/**
 * Props:
 *   open            – boolean
 *   onClose         – () => void
 *   notifications   – array of notification objects
 *   unreadCount     – number
 *   onMarkRead      – (id) => void
 *   onMarkAllRead   – () => void
 *   onClearAll      – () => void
 *   theme           – 'dark' | 'light'  (default 'dark')
 */
export default function NotificationPanel({
    open,
    onClose,
    notifications = [],
    unreadCount = 0,
    onMarkRead,
    onMarkAllRead,
    onClearAll,
    theme = 'dark',
}) {
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open, onClose]);

    const isDark = theme === 'dark';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden ${isDark
                        ? 'border-white/10 bg-slate-900/98 shadow-black/50'
                        : 'border-slate-200 bg-white shadow-slate-200/80'
                        }`}
                >
                    {/* Header */}
                    <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-2">
                            <Bell className={`h-4 w-4 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Notifications
                            </span>
                            {unreadCount > 0 && (
                                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {unreadCount > 0 && (
                                <button
                                    onClick={onMarkAllRead}
                                    title="Mark all read"
                                    className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                                >
                                    <CheckCheck className="h-3.5 w-3.5" />
                                </button>
                            )}
                            {notifications.length > 0 && (
                                <button
                                    onClick={onClearAll}
                                    title="Clear all"
                                    className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5 text-slate-400 hover:text-red-400' : 'hover:bg-slate-100 text-slate-500 hover:text-red-500'}`}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="max-h-[22rem] overflow-y-auto overscroll-contain">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-3">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                    <Bell className={`h-5 w-5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                                </div>
                                <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No notifications yet</p>
                            </div>
                        ) : (
                            <div>
                                {notifications.map((n) => {
                                    const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.default;
                                    const { Icon } = cfg;
                                    const handleClick = () => {
                                        onMarkRead(n.id);
                                        if (n.onClick) {
                                            n.onClick();
                                            onClose(); // Close panel after action
                                        }
                                    };
                                    return (
                                        <button
                                            key={n.id}
                                            onClick={handleClick}
                                            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${n.read
                                                ? isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'
                                                : isDark ? 'bg-white/[0.03] hover:bg-white/[0.05]' : 'bg-emerald-50/50 hover:bg-emerald-50'
                                                }`}
                                        >
                                            {/* Icon */}
                                            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}>
                                                <Icon className={`h-4 w-4 ${cfg.color}`} />
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                    {n.title}
                                                </p>
                                                <p className={`text-xs mt-0.5 leading-snug line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    {n.message}
                                                </p>
                                                {n.onClick && (
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors">
                                                            View Certificate
                                                            <ChevronRight className="h-3 w-3" />
                                                        </span>
                                                    </div>
                                                )}
                                                <p className={`text-[10px] mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                                                    {timeAgo(n.timestamp)}
                                                </p>
                                            </div>
                                            {/* Unread dot */}
                                            {!n.read && (
                                                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
