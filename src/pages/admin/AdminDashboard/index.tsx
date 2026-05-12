/* =========================================================
   EcoLedger – Admin Dashboard (TypeScript Refactored)
   Modular, organized, and type-safe
   ========================================================= */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Bell, Shield, BarChart3,
    MapPin, Users, Trophy, Newspaper,
    Settings, FileText, Scale, Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    leaderboard, impactStats,
    binReports as initialBinReports,
    assetReports as initialAssetReports,
} from '../../../data/reportState';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { useNotifications } from '../../../hooks/useNotifications';
import NotificationPanel from '../../../components/NotificationPanel';
import realtimeEvents from '../../../lib/realtimeEvents';

// Import modular components
import { ToastProvider, useToast } from './components/Toast';
import { Card } from './components/Card';
import { AdminMenu } from './components/AdminMenu';
import { DispatchModal, ConfirmationModal, ReportDetailsModal, AssetConfirmationModal } from './modals';
import { ImpactAnalysisTab } from './tabs/ImpactAnalysisTab';
import { OverviewTab } from './tabs/OverviewTab';
import SettingsTab from './tabs/SettingsTab';
import { ReportsTab } from './tabs/ReportsTab';
import { CollectionsTab } from './tabs/CollectionsTab';
import { MapTab } from './tabs/MapTab';
import { AdminLeaderboardTab } from './tabs/AdminLeaderboardTab';
import { UsersTab } from './tabs/UsersTab';
import { NewsTab } from './tabs/NewsTab';
import {
    type BinReport,
    type AssetReport,
    type MRFStaffMember,
} from './types';

/* ── Tabs Configuration ──────────────────────────────────── */
const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'collections', label: 'Collections', icon: Scale },
    { id: 'impact', label: 'Impact Analysis', icon: Activity },
    { id: 'map', label: 'Bin Map', icon: MapPin },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'news', label: 'Campus News', icon: Newspaper },
    { id: 'settings', label: 'Settings', icon: Settings },
] as const;

/* ── Admin User (TODO: Move to auth context) ─────────────── */
const adminUser = {
    name: 'Admin User',
    role: 'System Administrator',
    avatar: 'AU',
};

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user, signout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [notifOpen, setNotifOpen] = useState(false);

    // Notifications
    const { notifications: allNotifications, unreadCount: allUnreadCount, addNotification, markRead, markAllRead, clearAll } = useNotifications(user);

    // Filter notifications - Admin should only see relevant types
    const ADMIN_NOTIFICATION_TYPES = ['new_report', 'new_user', 'report_status', 'dispatch'];
    const notifications = allNotifications.filter(n => ADMIN_NOTIFICATION_TYPES.includes(n.type));
    const unreadCount = notifications.filter(n => !n.read).length;

    // Track known report & user IDs to detect new ones during polling
    const knownReportIdsRef = useRef<Set<string>>(new Set());
    const knownReportStatusRef = useRef<Map<string, string>>(new Map());
    const knownUserIdsRef = useRef<Set<string>>(new Set());
    const isFirstFetchRef = useRef(true);
    const isFirstUserFetchRef = useRef(true);

    // Local state for reports
    const [binReports, setBinReports] = useState<BinReport[]>(initialBinReports as BinReport[]);
    const [assetReports, setAssetReports] = useState<AssetReport[]>(initialAssetReports as AssetReport[]);
    const [reportsLoading, setReportsLoading] = useState(false);
    const [reportsError, setReportsError] = useState<string | null>(null);
    const [mrfStaff, setMrfStaff] = useState<MRFStaffMember[]>([]);

    // Fetch MRF staff from API
    const fetchMRFStaff = async () => {
        try {
            const response = await api.getAllUsers();
            if (response.success && response.data?.users) {
                // Filter for MRF role users and map to MRFStaffMember type
                const staff = response.data.users
                    .filter((u: any) => u.role === 'MRF')
                    .map((u: any) => ({
                        id: String(u.id),
                        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username,
                        role: 'MRF Staff',
                        available: true,
                        phone: u.phone || undefined
                    }));
                setMrfStaff(staff);

                // Detect new users (any role)
                const allUsers: any[] = response.data.users;
                if (isFirstUserFetchRef.current) {
                    allUsers.forEach((u: any) => knownUserIdsRef.current.add(u.id));
                    isFirstUserFetchRef.current = false;
                } else {
                    allUsers.forEach((u: any) => {
                        if (!knownUserIdsRef.current.has(u.id)) {
                            knownUserIdsRef.current.add(u.id);
                            const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username;
                            addNotification({
                                type: 'new_user',
                                title: 'New User Registered',
                                message: `${name} (${u.role.toLowerCase()}) joined the system.`,
                                userId: u.id,
                            });
                        }
                    });
                }
            }
        } catch (err: any) {
            console.error('Failed to fetch MRF staff:', err);
        }
    };

    // Fetch reports from API
    const fetchReports = async () => {
        setReportsLoading(true);
        setReportsError(null);
        try {
            const response = await api.getAllReports();
            if (response.success && response.data?.reports) {
                // Separate reports by type
                const wasteReports: BinReport[] = [];
                const assetReportsList: AssetReport[] = [];

                response.data.reports.forEach((r: any) => {
                    const statusLower = r.status.toLowerCase();
                    const isDispatched = ['dispatched', 'in_progress', 'completed', 'collected', 'resolved'].includes(statusLower);
                    const assignedStaff = r.assignedStaffId ? {
                        id: r.assignedStaffId,
                        name: `${r.assignedStaff?.firstName || ''} ${r.assignedStaff?.lastName || ''}`.trim() || r.assignedStaff?.username || 'MRF Staff',
                        role: r.assignedStaff?.role || 'MRF Staff',
                        available: false,
                    } : undefined;
                    const baseReport = {
                        id: r.id,
                        location: r.location,
                        notes: r.notes || '',
                        photoUrl: r.photoUrl,
                        urgency: r.urgency,
                        wasteType: r.wasteType,
                        status: statusLower,
                        timestamp: r.createdAt,
                        kilosCollected: r.kilosCollected ?? null,
                        collectionDate: r.collectionDate ?? null,
                        reportedBy: `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() || r.user.username,
                        reporterRole: r.user.role === 'STUDENT' ? 'student' as const : 'teacher' as const,
                        studentId: r.user.studentId || '',
                        course: r.user.course || '',
                        section: r.user.section || '',
                        date: new Date(r.createdAt).toLocaleDateString(),
                        time: new Date(r.createdAt).toLocaleTimeString(),
                        assignedStaff,
                        dispatchedAt: isDispatched && r.updatedAt ? r.updatedAt : undefined,
                    };

                    // Separate by type
                    if (r.type === 'WASTE') {
                        wasteReports.push(baseReport);
                    } else if (r.type === 'ASSET') {
                        // Notes format from teacher: "[CATEGORY] ItemName - additional notes"
                        // Extract actual item name from notes, fall back to wasteType category
                        const itemMatch = r.notes?.match(/^\[([^\]]+)\]\s*(.+?)(?:\s*-\s*.*)?$/);
                        const itemName = itemMatch ? itemMatch[2].trim() : r.wasteType;
                        const itemCategory = itemMatch ? itemMatch[1].toLowerCase() : r.wasteType.toLowerCase();
                        assetReportsList.push({
                            ...baseReport,
                            item: itemName,
                            category: itemCategory,
                        });
                    }

                    // Detect new reports (skip first fetch to avoid bulk notifications on load)
                    if (!isFirstFetchRef.current && !knownReportIdsRef.current.has(r.id)) {
                        addNotification({
                            type: 'new_report',
                            title: `New ${r.type === 'WASTE' ? 'Waste' : 'Asset'} Report`,
                            message: `${`${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() || r.user.username} reported an issue at "${r.location}".`,
                            reportId: r.id,
                        });
                    }

                    // Note: Report status notifications removed for admin - those are for students/teachers only

                    knownReportIdsRef.current.add(r.id);
                    knownReportStatusRef.current.set(r.id, statusLower);
                });

                if (isFirstFetchRef.current) isFirstFetchRef.current = false;

                setBinReports(wasteReports);
                setAssetReports(assetReportsList);
            } else {
                setReportsError(`Failed to fetch reports: ${response.message || 'Unknown error'}`);
            }
        } catch (err: any) {
            setReportsError(`Failed to fetch reports: ${err.message}`);
        } finally {
            setReportsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchReports();
            fetchMRFStaff();
            const interval = setInterval(fetchReports, 10000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        if (!user?.id) return;

        const handleRealtimeReport = (payload: any) => {
            console.log('📡 Real-time event received (Admin):', payload);
            fetchReports();
            fetchMRFStaff();
        };

        const unsub1 = realtimeEvents.subscribe('report.created', handleRealtimeReport);
        const unsub2 = realtimeEvents.subscribe('report.updated', handleRealtimeReport);
        const unsub3 = realtimeEvents.subscribe('report.deleted', handleRealtimeReport);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [user?.id]);

    return (
        <ToastProvider>
            <div className="flex flex-col min-h-dvh w-full overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">

                {/* ════════ NAVBAR ═══════════════════════════════ */}
                <motion.nav
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-xl w-full"
                >
                    <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-5">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                                EcoLedger
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-white">
                                <Shield className="h-3 w-3" /> Admin
                            </span>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100/60 px-3 py-1.5 text-xs font-semibold text-slate-900">
                                <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
                                {binReports.length + assetReports.length} Total Reports
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setNotifOpen(p => !p)}
                                    className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100/40 text-slate-600 hover:text-slate-900 transition-colors"
                                    aria-label="Notifications"
                                >
                                    <Bell className="h-4 w-4" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>
                                <NotificationPanel
                                    open={notifOpen}
                                    onClose={() => setNotifOpen(false)}
                                    notifications={notifications}
                                    unreadCount={unreadCount}
                                    onMarkRead={markRead}
                                    onMarkAllRead={markAllRead}
                                    onClearAll={clearAll}
                                    theme="light"
                                />
                            </div>
                            <AdminMenu />
                        </div>
                    </div>
                </motion.nav>

                {/* ════════ MAIN CONTENT ═════════════════════════ */}
                <main className="relative flex-1 pt-16 overflow-y-auto min-h-screen bg-white">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] sm:h-[42rem] sm:w-[42rem] rounded-full bg-emerald-500/5 blur-[140px]" />
                    </div>
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.045]"
                        style={{ backgroundImage: `radial-gradient(circle, #10B981 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
                    />

                    <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 py-4 sm:py-8 min-h-full flex flex-col">

                        {/* ── Tab Bar ── */}
                        <div className="flex gap-1 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm p-1 mb-8 overflow-x-auto w-full">
                            {TABS.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id)}
                                    className={`relative flex-1 min-w-[5rem] flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === t.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    {activeTab === t.id && (
                                        <motion.div
                                            layoutId="adminTab"
                                            className="absolute inset-0 rounded-xl bg-slate-900 shadow-lg"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <t.icon className="h-4 w-4" />
                                        <span className="hidden sm:inline">{t.label}</span>
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* ── Tab Content ── */}
                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {activeTab === 'overview' && (
                                    <OverviewTab key="overview" binReports={binReports} assetReports={assetReports} onTabChange={setActiveTab} adminName={`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Admin'} />
                                )}
                                {activeTab === 'reports' && (
                                    <ReportsTab
                                        key="reports"
                                        binReports={binReports}
                                        setBinReports={setBinReports}
                                        assetReports={assetReports}
                                        setAssetReports={setAssetReports}
                                        onRefresh={fetchReports}
                                        loading={reportsLoading}
                                        reportsError={reportsError}
                                        mrfStaff={mrfStaff}
                                        addNotification={addNotification}
                                    />
                                )}
                                {activeTab === 'collections' && (
                                    <CollectionsTab
                                        key="collections"
                                        binReports={binReports}
                                        loading={reportsLoading}
                                        reportsError={reportsError}
                                    />
                                )}
                                {activeTab === 'map' && <MapTab key="map" />}
                                {activeTab === 'users' && (
                                    <UsersTab key="users" binReports={binReports} assetReports={assetReports} />
                                )}
                                {activeTab === 'impact' && (
                                    <ImpactAnalysisTab key="impact" />
                                )}
                                {activeTab === 'leaderboard' && (
                                    <AdminLeaderboardTab key="leaderboard" />
                                )}
                                {activeTab === 'news' && (
                                    <NewsTab key="news" />
                                )}
                                {activeTab === 'settings' && (
                                    <SettingsTab key="settings" theme="light" />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </main>

                {/* ════════ FOOTER ═══════════════════════════════ */}
                <footer className="border-t border-slate-200 bg-slate-50 py-6 sm:py-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 sm:px-5 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
                                <Leaf className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-900">EcoLedger</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-white">Admin Portal</span>
                        </div>
                        <p className="text-xs text-slate-500">
                            &copy; 2026 EcoLedger &middot; Campus MRF Management System &middot; v0.1
                        </p>
                    </div>
                </footer>
            </div>
        </ToastProvider>
    );
}
