/* =========================================================
   EcoLedger – Admin Dashboard (TypeScript Refactored)
   Modular, organized, and type-safe
   ========================================================= */

import { useState, useRef, useEffect, type RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Trash2, MapPin, Clock, ChevronRight,
    TrendingUp, Globe, Recycle,
    Bell, User, Sparkles,
    Zap, Shield, BarChart3,
    CheckCircle2, AlertTriangle,
    Truck, Building2,
    Armchair,
    GraduationCap, Users,
    Eye, Filter, Search, Download, RefreshCw,
    XCircle, X, Send,
    Image, Loader2, Navigation, Pencil, Trophy, Flame, Award, Medal,
    Newspaper, Plus, Trash, Edit3, Tag, Calendar, Activity, Settings, FileText, Scale,
    Save, Edit2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    leaderboard, impactStats,
    binReports as initialBinReports,
    assetReports as initialAssetReports,
    BIN_STATUS, ASSET_STATUS, mrfStaffMembers
} from '../../data/reportState';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationPanel from '../../components/NotificationPanel';
import { useCampusNews, TAG_OPTIONS, TAG_COLOR_MAP } from '../../hooks/useCampusNews';

// Import modular components
import { ToastProvider, useToast } from './components/Toast';
import { Card } from './components/Card';
import { AdminMenu } from './components/AdminMenu';
import { DispatchModal, ConfirmationModal, ReportDetailsModal, AssetConfirmationModal } from './modals';
import { ImpactAnalysisTab } from './tabs/ImpactAnalysisTab';
import SettingsTab from './tabs/SettingsTab';
import {
    fadeUp,
    stagger,
    binStatusDot,
    binStatusBadge,
    assetStatusDot,
    assetStatusBadge,
    BIN_FILL_STATUS,
    DEFAULT_BINS,
    type BinReport,
    type AssetReport,
    type CampusBin,
    type BinFillStatus,
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
    const { notifications: allNotifications, unreadCount: allUnreadCount, addNotification, markRead, markAllRead, clearAll } = useNotifications(user?.id);

    // Filter notifications - Admin should only see new_report and new_user types
    const ADMIN_NOTIFICATION_TYPES = ['new_report', 'new_user'];
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

        const eventSource = new EventSource(api.getReportsStreamUrl());
        const handleRealtimeReport = (event: any) => {
            try {
                const payload = JSON.parse(event.data);
                console.log('📡 Real-time event received (Admin):', payload);
                // Refresh all data for real-time updates across all browsers
                fetchReports();
                fetchMRFStaff();
            } catch (error) {
                console.error('Failed to parse realtime report event:', error);
            }
        };

        eventSource.addEventListener('report.created', handleRealtimeReport);
        eventSource.addEventListener('report.updated', handleRealtimeReport);
        eventSource.addEventListener('report.deleted', handleRealtimeReport);

        return () => {
            eventSource.removeEventListener('report.created', handleRealtimeReport);
            eventSource.removeEventListener('report.updated', handleRealtimeReport);
            eventSource.removeEventListener('report.deleted', handleRealtimeReport);
            eventSource.close();
        };
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

/* ═══════════════════════════════════════════════════════════
   OVERVIEW TAB
   ═══════════════════════════════════════════════════════════ */
interface OverviewTabProps {
    binReports: BinReport[];
    assetReports: AssetReport[];
    onTabChange: (tab: string) => void;
    adminName: string;
}

function OverviewTab({ binReports, assetReports, onTabChange, adminName }: OverviewTabProps) {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loadingAnalytics, setLoadingAnalytics] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoadingAnalytics(true);
            const response = await api.getAnalytics();
            if (response.success && response.data) {
                setAnalytics(response.data);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoadingAnalytics(false);
        }
    };

    const pendingBin = binReports.filter(r => r.status === BIN_STATUS.PENDING).length;
    const resolvedBin = binReports.filter(r => r.status === BIN_STATUS.RESOLVED).length;
    const pendingAsset = assetReports.filter(r => r.status === ASSET_STATUS.REPORTED || r.status === ASSET_STATUS.IN_REVIEW).length;
    const recoveredAsset = assetReports.filter(r => r.status === ASSET_STATUS.RECOVERED).length;
    const studentBinReports = binReports.filter(r => r.reporterRole === 'student');
    const facultyBinReports = binReports.filter(r => r.reporterRole === 'teacher');

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-8 pb-8 min-h-full"
        >
            {/* Welcome Hero */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white">
                    <Sparkles className="absolute top-4 right-4 h-16 w-16 text-white/10" />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-white">
                                <Shield className="h-8 w-8 sm:h-10 sm:w-10" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Welcome back, 👋</p>
                                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{adminName}</h1>
                                <p className="text-xs text-slate-400 mt-1">{adminUser.role}</p>
                            </div>
                        </div>
                        <div className="flex gap-5 sm:gap-8 sm:text-right">
                            <div>
                                <p className="text-xs text-slate-400">Total Reports</p>
                                <p className="text-2xl sm:text-3xl font-extrabold">{binReports.length + assetReports.length}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Pending</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{pendingBin + pendingAsset}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.section>

            {/* Quick Stats */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <BarChart3 className="h-5 w-5 text-emerald-500" /> Quick Stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {[
                        { label: 'Waste Reports', value: binReports.length, icon: Trash2, color: 'text-red-500', bg: 'bg-red-100', tab: 'reports' },
                        { label: 'Asset Reports', value: assetReports.length, icon: Armchair, color: 'text-blue-500', bg: 'bg-blue-100', tab: 'reports' },
                        { label: 'Pending Waste', value: pendingBin, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100', tab: 'reports' },
                        { label: 'Pending Assets', value: pendingAsset, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-100', tab: 'reports' },
                        { label: 'Resolved Bins', value: resolvedBin, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100', tab: 'reports' },
                        { label: 'Recovered Assets', value: recoveredAsset, icon: Recycle, color: 'text-teal-500', bg: 'bg-teal-100', tab: 'reports' },
                    ].map((s, i) => (
                        <motion.div key={s.label} variants={fadeUp} custom={i}>
                            <Card
                                className="flex flex-col items-center text-center !p-4 cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all active:scale-[0.97]"
                                onClick={() => onTabChange(s.tab)}
                            >
                                <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                                    <s.icon className={`h-5 w-5 ${s.color}`} />
                                </div>
                                <span className="text-xl font-bold text-slate-900">{s.value}</span>
                                <span className="text-xs text-slate-500">{s.label}</span>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Reports by Role */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <Users className="h-5 w-5 text-emerald-500" /> Reports by Role
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                <GraduationCap className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Student Reports</h3>
                                <p className="text-xs text-slate-500">Waste bin reports from students</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">{studentBinReports.length}</p>
                                <p className="text-xs text-slate-500">total reports</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-amber-500">
                                    {studentBinReports.filter(r => r.status === BIN_STATUS.PENDING).length} pending
                                </p>
                                <p className="text-sm font-semibold text-emerald-500">
                                    {studentBinReports.filter(r => r.status === BIN_STATUS.RESOLVED).length} resolved
                                </p>
                            </div>
                        </div>
                        <button onClick={() => onTabChange('reports')} className="mt-4 w-full text-xs font-semibold text-emerald-600 hover:text-emerald-800 text-right">
                            View all waste reports →
                        </button>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                                <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Faculty Reports</h3>
                                <p className="text-xs text-slate-500">Waste & asset reports from teachers</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">{facultyBinReports.length + assetReports.length}</p>
                                <p className="text-xs text-slate-500">total reports</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-amber-500">{pendingAsset} pending assets</p>
                                <p className="text-sm font-semibold text-emerald-500">{recoveredAsset} recovered</p>
                            </div>
                        </div>
                        <button onClick={() => onTabChange('reports')} className="mt-4 w-full text-xs font-semibold text-blue-600 hover:text-blue-800 text-right">
                            View all asset reports →
                        </button>
                    </Card>
                </div>
            </motion.section>

            {/* Campus Impact */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                            <Globe className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-slate-900">Campus Impact This Semester</p>
                            {loadingAnalytics ? (
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading analytics...
                                </div>
                            ) : analytics ? (
                                <p className="text-sm mt-1 text-slate-600">
                                    Together we've diverted <strong className="text-emerald-600">{analytics.co2Saved} kg</strong> of CO₂,
                                    collected <strong className="text-emerald-600">{analytics.kgCollected} kg</strong> of waste,
                                    and have <strong className="text-emerald-600">{analytics.activeUsers}</strong> active reporters.
                                </p>
                            ) : (
                                <p className="text-sm mt-1 text-slate-500">
                                    No data available yet
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </motion.section>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   WASTE REPORTS TAB
   ═══════════════════════════════════════════════════════════ */
interface WasteReportsTabProps {
    binReports: BinReport[];
    setBinReports: React.Dispatch<React.SetStateAction<BinReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
    mrfStaff: MRFStaffMember[];
    addNotification: (notif: any) => void;
}

function WasteReportsTab({ binReports, setBinReports, onRefresh, loading, reportsError, mrfStaff, addNotification }: WasteReportsTabProps) {
    const { addToast } = useToast();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<BinReport | null>(null);
    const [showDispatch, setShowDispatch] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showConfirm, setShowConfirm] = useState<{ type: 'verify' | 'dismiss'; report: BinReport } | null>(null);

    const filteredReports = binReports
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => search === '' || r.location?.toLowerCase().includes(search.toLowerCase()) || r.reportedBy?.toLowerCase().includes(search.toLowerCase()));

    const handleViewDetails = (report: BinReport) => { setSelectedReport(report); setShowDetails(true); };
    const handleVerify = (report: BinReport) => setShowConfirm({ type: 'verify', report });
    const handleDismiss = (report: BinReport) => setShowConfirm({ type: 'dismiss', report });
    const handleDispatch = (report: BinReport) => { setSelectedReport(report); setShowDispatch(true); };

    const confirmAction = async () => {
        if (!showConfirm) return;
        const { type, report } = showConfirm;
        const newStatus = type === 'verify' ? 'VERIFIED' : 'DISMISSED';

        try {
            const response = await api.updateReportStatus(report.id, newStatus);
            if (response.success) {
                setBinReports(prev => prev.map(r =>
                    r.id === report.id ? { ...r, status: newStatus.toLowerCase() as BinStatusType } : r
                ));
                addToast(`Report ${type === 'verify' ? 'verified' : 'dismissed'}`, 'success');
            } else {
                addToast(response.message || 'Failed to update report', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowConfirm(null);
    };

    const confirmDispatch = async (reportId: string, staff: MRFStaffMember) => {
        try {
            const response = await api.dispatchStaff(reportId, staff.id, staff.name);
            if (response.success) {
                const report = binReports.find(r => r.id === reportId);
                const dispatchedAt = new Date().toISOString();
                setBinReports(prev => prev.map(r =>
                    r.id === reportId ? { ...r, status: BIN_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r
                ));
                addToast(`Dispatched to ${staff.name}`, 'info');
                addNotification({
                    type: 'dispatch',
                    title: 'Dispatch Complete',
                    message: `${staff.name} dispatched to "${report?.location || reportId}".`,
                    reportId,
                });
            } else {
                addToast(response.message || 'Failed to dispatch report', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowDispatch(false);
        setSelectedReport(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-red-500" /> Waste Reports
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{binReports.length} total reports</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={onRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                </div>
            </div>

            {reportsError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {reportsError}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500"
                >
                    <option value="all">All Status</option>
                    <option value={BIN_STATUS.PENDING}>Pending</option>
                    <option value={BIN_STATUS.VERIFIED}>Verified</option>
                    <option value={BIN_STATUS.DISPATCHED}>Dispatched</option>
                    <option value={BIN_STATUS.COLLECTED}>Collected</option>
                    <option value={BIN_STATUS.RESOLVED}>Resolved</option>
                </select>
            </div>

            {/* Reports List */}
            <div className="space-y-3">
                {loading && binReports.length === 0 ? (
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" />
                        <p className="text-slate-500">Loading reports...</p>
                    </div>
                ) : filteredReports.length === 0 ? (
                    <Card className="text-center py-12">
                        <Trash2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No reports found</p>
                    </Card>
                ) : (
                    filteredReports.map((report) => (
                        <Card key={report.id} className="hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${binStatusDot[report.status]}`} />
                                    <div>
                                        <p className="font-semibold text-slate-900">{report.location}</p>
                                        <p className="text-sm text-slate-500">
                                            {report.reportedBy} · {report.reporterRole}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">{report.date || 'N/A'} · {report.time || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${binStatusBadge[report.status]}`}>
                                        {report.status?.replace(/_/g, ' ')}
                                    </span>
                                    <button onClick={() => handleViewDetails(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="View Details">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    {report.status === BIN_STATUS.PENDING && (
                                        <>
                                            <button onClick={() => handleVerify(report)} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600" title="Verify">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDismiss(report)} className="p-2 rounded-lg hover:bg-red-100 text-red-600" title="Dismiss">
                                                <XCircle className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                    {report.status === BIN_STATUS.VERIFIED && (
                                        <button onClick={() => handleDispatch(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Dispatch">
                                            <Truck className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showConfirm && (
                    <ConfirmationModal
                        action={showConfirm.type}
                        onClose={() => setShowConfirm(null)}
                        onConfirm={confirmAction}
                    />
                )}
                {showDispatch && selectedReport && (
                    <DispatchModal
                        report={selectedReport}
                        onClose={() => { setShowDispatch(false); setSelectedReport(null); }}
                        onConfirm={confirmDispatch}
                        mrfStaff={mrfStaff}
                    />
                )}
                {showDetails && selectedReport && (
                    <ReportDetailsModal
                        report={selectedReport}
                        onClose={() => { setShowDetails(false); setSelectedReport(null); }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   ASSET REPORTS TAB (Simplified)
   ═══════════════════════════════════════════════════════════ */
interface AssetReportsTabProps {
    assetReports: AssetReport[];
    setAssetReports: React.Dispatch<React.SetStateAction<AssetReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
    mrfStaff: MRFStaffMember[];
    addNotification: (notif: any) => void;
}

function AssetReportsTab({ assetReports, setAssetReports, onRefresh, loading, reportsError, mrfStaff, addNotification }: AssetReportsTabProps) {
    const { addToast } = useToast();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<AssetReport | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showDispatch, setShowDispatch] = useState(false);
    const [showConfirm, setShowConfirm] = useState<{ type: 'verify' | 'recovery' | 'dismiss' | 'dispose'; report: AssetReport } | null>(null);

    const filteredReports = assetReports
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => search === '' || (r.item || r.location)?.toLowerCase().includes(search.toLowerCase()) || r.reportedBy?.toLowerCase().includes(search.toLowerCase()));

    const handleViewDetails = (report: AssetReport) => { setSelectedReport(report); setShowDetails(true); };
    const handleVerifyAsset = (report: AssetReport) => setShowConfirm({ type: 'verify', report });
    const handleVerifyRecovery = (report: AssetReport) => setShowConfirm({ type: 'recovery', report });
    const handleDismiss = (report: AssetReport) => setShowConfirm({ type: 'dismiss', report });
    const handleDispose = (report: AssetReport) => setShowConfirm({ type: 'dispose', report });
    const handleDispatch = (report: AssetReport) => { setSelectedReport(report); setShowDispatch(true); };

    const confirmDispatch = async (reportId: string, staff: MRFStaffMember) => {
        try {
            const response = await api.dispatchStaff(reportId, staff.id, staff.name);
            if (response.success) {
                const report = assetReports.find(r => r.id === reportId);
                const dispatchedAt = new Date().toISOString();
                setAssetReports(prev => prev.map(r =>
                    r.id === reportId ? { ...r, status: ASSET_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r
                ));
                addToast(`Dispatched to ${staff.name}`, 'info');
                addNotification({
                    type: 'dispatch',
                    title: 'Asset Dispatch Complete',
                    message: `${staff.name} dispatched to handle "${report?.item || report?.location || reportId}".`,
                    reportId,
                });
            } else {
                addToast(response.message || 'Failed to dispatch', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowDispatch(false);
        setSelectedReport(null);
    };

    const confirmAction = async () => {
        if (!showConfirm) return;
        const { type, report } = showConfirm;

        try {
            if (type === 'verify') {
                const response = await api.updateReportStatus(report.id, 'VERIFIED');
                if (response.success) {
                    setAssetReports(prev => prev.map(r =>
                        r.id === report.id ? { ...r, status: ASSET_STATUS.VERIFIED_ASSET } : r
                    ));
                    addToast('Asset verified successfully', 'success');
                } else {
                    addToast(response.message || 'Failed to verify asset', 'error');
                }
            } else if (type === 'recovery') {
                const response = await api.updateReportStatus(report.id, 'RESOLVED');
                if (response.success) {
                    setAssetReports(prev => prev.map(r =>
                        r.id === report.id ? { ...r, status: ASSET_STATUS.RECOVERED } : r
                    ));
                    addToast('Asset recovery verified', 'success');
                } else {
                    addToast(response.message || 'Failed to verify recovery', 'error');
                }
            } else if (type === 'dismiss') {
                const response = await api.updateReportStatus(report.id, 'DISMISSED');
                if (response.success) {
                    setAssetReports(prev => prev.map(r =>
                        r.id === report.id ? { ...r, status: 'dismissed' as AssetStatusType } : r
                    ));
                    addToast('Asset report dismissed', 'info');
                } else {
                    addToast(response.message || 'Failed to dismiss report', 'error');
                }
            } else if (type === 'dispose') {
                const response = await api.updateReportStatus(report.id, 'COLLECTED');
                if (response.success) {
                    setAssetReports(prev => prev.map(r =>
                        r.id === report.id ? { ...r, status: ASSET_STATUS.DISPOSED } : r
                    ));
                    addToast('Asset marked as disposed', 'success');
                } else {
                    addToast(response.message || 'Failed to dispose asset', 'error');
                }
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowConfirm(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Armchair className="h-5 w-5 text-blue-500" /> Asset Reports
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{assetReports.length} total reports</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={onRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                </div>
            </div>

            {reportsError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {reportsError}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500"
                >
                    <option value="all">All Status</option>
                    <option value={ASSET_STATUS.REPORTED}>Reported</option>
                    <option value={ASSET_STATUS.VERIFIED_ASSET}>Verified</option>
                    <option value={ASSET_STATUS.IN_REVIEW}>In Review</option>
                    <option value={ASSET_STATUS.RECOVERED}>Recovered</option>
                    <option value={ASSET_STATUS.DISPOSED}>Disposed</option>
                </select>
            </div>

            {/* Reports List */}
            <div className="space-y-3">
                {loading && assetReports.length === 0 ? (
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" />
                        <p className="text-slate-500">Loading reports...</p>
                    </div>
                ) : filteredReports.length === 0 ? (
                    <Card className="text-center py-12">
                        <Armchair className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No asset reports found</p>
                    </Card>
                ) : (
                    filteredReports.map((report) => (
                        <Card key={report.id} className="hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${assetStatusDot[report.status] || 'bg-slate-300'}`} />
                                    <div>
                                        <p className="font-semibold text-slate-900">{report.item || report.location}</p>
                                        <p className="text-sm text-slate-500">
                                            {report.reportedBy} · {report.reporterRole}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">{report.date || 'N/A'} · {report.time || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${assetStatusBadge[report.status] || 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                                        {report.status?.replace(/-|_/g, ' ')}
                                    </span>
                                    <button onClick={() => handleViewDetails(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="View Details">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    {report.status === ASSET_STATUS.REPORTED && (
                                        <>
                                            <button onClick={() => handleVerifyAsset(report)} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600" title="Verify Asset">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDismiss(report)} className="p-2 rounded-lg hover:bg-red-100 text-red-600" title="Dismiss">
                                                <XCircle className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                    {report.status === ASSET_STATUS.VERIFIED_ASSET && (
                                        <>
                                            <button onClick={() => handleDispatch(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Dispatch Staff">
                                                <Truck className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleVerifyRecovery(report)} className="p-2 rounded-lg hover:bg-teal-100 text-teal-600" title="Verify Recovery">
                                                <Recycle className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDispose(report)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600" title="Dispose">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                    {report.status === ASSET_STATUS.IN_REVIEW && (
                                        <>
                                            <button onClick={() => handleVerifyRecovery(report)} className="p-2 rounded-lg hover:bg-teal-100 text-teal-600" title="Verify Recovery">
                                                <Recycle className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDispose(report)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600" title="Dispose">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                    {report.status === ASSET_STATUS.DISPATCHED && (
                                        <>
                                            <button onClick={() => handleVerifyRecovery(report)} className="p-2 rounded-lg hover:bg-teal-100 text-teal-600" title="Verify Recovery">
                                                <Recycle className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDispose(report)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600" title="Dispose">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                    {report.status === ASSET_STATUS.RECOVERED && (
                                        <button onClick={() => handleDispose(report)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600" title="Dispose">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showConfirm && (
                    <AssetConfirmationModal
                        action={showConfirm.type}
                        onClose={() => setShowConfirm(null)}
                        onConfirm={confirmAction}
                    />
                )}
                {showDispatch && selectedReport && (
                    <DispatchModal
                        report={selectedReport}
                        onClose={() => { setShowDispatch(false); setSelectedReport(null); }}
                        onConfirm={confirmDispatch}
                        mrfStaff={mrfStaff}
                    />
                )}
                {showDetails && selectedReport && (
                    <ReportDetailsModal
                        report={selectedReport}
                        onClose={() => { setShowDetails(false); setSelectedReport(null); }}
                        type="asset"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   UNIFIED REPORTS TAB (Waste + Asset)
   ═══════════════════════════════════════════════════════════ */
interface ReportsTabProps {
    binReports: BinReport[];
    setBinReports: React.Dispatch<React.SetStateAction<BinReport[]>>;
    assetReports: AssetReport[];
    setAssetReports: React.Dispatch<React.SetStateAction<AssetReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
    mrfStaff: MRFStaffMember[];
    addNotification: (notif: any) => void;
}

function ReportsTab({ binReports, setBinReports, assetReports, setAssetReports, onRefresh, loading, reportsError, mrfStaff, addNotification }: ReportsTabProps) {
    const { addToast } = useToast();
    const [reportType, setReportType] = useState<'all' | 'waste' | 'asset'>('all');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<BinReport | AssetReport | null>(null);
    const [showDispatch, setShowDispatch] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showConfirm, setShowConfirm] = useState<{ type: 'verify' | 'dismiss' | 'recovery' | 'dispose'; report: BinReport | AssetReport; reportType: 'waste' | 'asset' } | null>(null);

    // Combine and filter reports
    const allReports = [
        ...binReports.map(r => ({ ...r, reportType: 'waste' as const })),
        ...assetReports.map(r => ({ ...r, reportType: 'asset' as const }))
    ];

    const filteredReports = allReports
        .filter(r => reportType === 'all' || r.reportType === reportType)
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => {
            if (search === '') return true;
            const searchLower = search.toLowerCase();
            const location = r.location?.toLowerCase() || '';
            const reportedBy = r.reportedBy?.toLowerCase() || '';
            const item = 'item' in r ? r.item?.toLowerCase() || '' : '';
            return location.includes(searchLower) || reportedBy.includes(searchLower) || item.includes(searchLower);
        });

    const totalReports = reportType === 'all' ? binReports.length + assetReports.length :
        reportType === 'waste' ? binReports.length : assetReports.length;

    const handleViewDetails = (report: BinReport | AssetReport, type: 'waste' | 'asset') => {
        setSelectedReport(report);
        setShowDetails(true);
    };

    const handleVerify = (report: BinReport | AssetReport, type: 'waste' | 'asset') => {
        setShowConfirm({ type: 'verify', report, reportType: type });
    };

    const handleDismiss = (report: BinReport | AssetReport, type: 'waste' | 'asset') => {
        setShowConfirm({ type: 'dismiss', report, reportType: type });
    };

    const handleRecovery = (report: AssetReport) => {
        setShowConfirm({ type: 'recovery', report, reportType: 'asset' });
    };

    const handleDispose = (report: AssetReport) => {
        setShowConfirm({ type: 'dispose', report, reportType: 'asset' });
    };

    const handleDispatch = (report: BinReport | AssetReport) => {
        setSelectedReport(report);
        setShowDispatch(true);
    };

    const confirmAction = async () => {
        if (!showConfirm) return;
        const { type, report, reportType: rType } = showConfirm;

        try {
            if (type === 'verify') {
                const response = await api.updateReportStatus(report.id, 'VERIFIED');
                if (response.success) {
                    if (rType === 'waste') {
                        setBinReports(prev => prev.map(r =>
                            r.id === report.id ? { ...r, status: BIN_STATUS.VERIFIED } : r
                        ));
                    } else {
                        setAssetReports(prev => prev.map(r =>
                            r.id === report.id ? { ...r, status: ASSET_STATUS.VERIFIED_ASSET } : r
                        ));
                    }
                    addToast('Report verified', 'success');
                } else {
                    addToast(response.message || 'Failed to verify', 'error');
                }
            } else if (type === 'dismiss') {
                const response = await api.updateReportStatus(report.id, 'DISMISSED');
                if (response.success) {
                    if (rType === 'waste') {
                        setBinReports(prev => prev.map(r =>
                            r.id === report.id ? { ...r, status: 'dismissed' as BinStatusType } : r
                        ));
                    } else {
                        setAssetReports(prev => prev.map(r =>
                            r.id === report.id ? { ...r, status: 'dismissed' as AssetStatusType } : r
                        ));
                    }
                    addToast('Report dismissed', 'info');
                } else {
                    addToast(response.message || 'Failed to dismiss', 'error');
                }
            } else if (type === 'recovery') {
                const response = await api.updateReportStatus(report.id, 'RESOLVED');
                if (response.success) {
                    setAssetReports(prev => prev.map(r =>
                        r.id === report.id ? { ...r, status: ASSET_STATUS.RECOVERED } : r
                    ));
                    addToast('Asset recovery verified', 'success');
                } else {
                    addToast(response.message || 'Failed to verify recovery', 'error');
                }
            } else if (type === 'dispose') {
                const response = await api.updateReportStatus(report.id, 'COLLECTED');
                if (response.success) {
                    setAssetReports(prev => prev.map(r =>
                        r.id === report.id ? { ...r, status: ASSET_STATUS.DISPOSED } : r
                    ));
                    addToast('Asset marked as disposed', 'success');
                } else {
                    addToast(response.message || 'Failed to dispose', 'error');
                }
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowConfirm(null);
    };

    const confirmDispatch = async (reportId: string, staff: MRFStaffMember) => {
        try {
            const response = await api.dispatchStaff(reportId, staff.id, staff.name);
            if (response.success) {
                const dispatchedAt = new Date().toISOString();
                const isWaste = binReports.some(r => r.id === reportId);

                if (isWaste) {
                    setBinReports(prev => prev.map(r =>
                        r.id === reportId ? { ...r, status: BIN_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r
                    ));
                } else {
                    setAssetReports(prev => prev.map(r =>
                        r.id === reportId ? { ...r, status: ASSET_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r
                    ));
                }

                addToast(`Dispatched to ${staff.name}`, 'info');
                addNotification({
                    type: 'dispatch',
                    title: 'Dispatch Complete',
                    message: `${staff.name} dispatched to handle report.`,
                    reportId,
                });
            } else {
                addToast(response.message || 'Failed to dispatch', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowDispatch(false);
        setSelectedReport(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-emerald-500" /> All Reports
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{totalReports} total reports</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={onRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                </div>
            </div>

            {reportsError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {reportsError}
                </div>
            )}

            {/* Report Type Filter */}
            <div className="flex gap-2">
                <button
                    onClick={() => setReportType('all')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${reportType === 'all' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                    <FileText className="h-4 w-4" /> All Reports
                </button>
                <button
                    onClick={() => setReportType('waste')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${reportType === 'waste' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                    <Trash2 className="h-4 w-4" /> Waste
                </button>
                <button
                    onClick={() => setReportType('asset')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${reportType === 'asset' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                    <Armchair className="h-4 w-4" /> Assets
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reported">Reported</option>
                    <option value="verified">Verified</option>
                    <option value="verified-asset">Verified Asset</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="collected">Collected</option>
                    <option value="recovered">Recovered</option>
                    <option value="disposed">Disposed</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            {/* Reports List */}
            <div className="space-y-3">
                {loading && allReports.length === 0 ? (
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" />
                        <p className="text-slate-500">Loading reports...</p>
                    </div>
                ) : filteredReports.length === 0 ? (
                    <Card className="text-center py-12">
                        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No reports found</p>
                    </Card>
                ) : (
                    filteredReports.map((report) => {
                        const isWaste = report.reportType === 'waste';
                        const statusDot = isWaste ? binStatusDot[report.status] : (assetStatusDot[report.status] || 'bg-slate-300');
                        const statusBadge = isWaste ? binStatusBadge[report.status] : (assetStatusBadge[report.status] || 'border-slate-200 bg-slate-50 text-slate-600');

                        return (
                            <Card key={report.id} className="hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                    <div className="flex items-start gap-4">
                                        <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${statusDot}`} />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs px-2 py-0.5 rounded ${isWaste ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {isWaste ? '🗑️ WASTE' : '📦 ASSET'}
                                                </span>
                                                <p className="font-semibold text-slate-900">
                                                    {'item' in report ? report.item : report.location}
                                                </p>
                                            </div>
                                            <p className="text-sm text-slate-500">
                                                {report.reportedBy} · {report.reporterRole}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">{report.date || 'N/A'} · {report.time || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusBadge}`}>
                                            {report.status?.replace(/-|_/g, ' ')}
                                        </span>
                                        <button onClick={() => handleViewDetails(report, report.reportType)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="View Details">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        {(report.status === BIN_STATUS.PENDING || report.status === ASSET_STATUS.REPORTED) && (
                                            <>
                                                <button onClick={() => handleVerify(report, report.reportType)} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600" title="Verify">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDismiss(report, report.reportType)} className="p-2 rounded-lg hover:bg-red-100 text-red-600" title="Dismiss">
                                                    <XCircle className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                        {(report.status === BIN_STATUS.VERIFIED || report.status === ASSET_STATUS.VERIFIED_ASSET) && (
                                            <button onClick={() => handleDispatch(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Dispatch">
                                                <Truck className="h-4 w-4" />
                                            </button>
                                        )}
                                        {!isWaste && report.status === ASSET_STATUS.DISPATCHED && (
                                            <>
                                                <button onClick={() => handleRecovery(report as AssetReport)} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600" title="Mark Recovered">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDispose(report as AssetReport)} className="p-2 rounded-lg hover:bg-amber-100 text-amber-600" title="Mark Disposed">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showConfirm && (
                    <ConfirmationModal
                        action={showConfirm.type}
                        onClose={() => setShowConfirm(null)}
                        onConfirm={confirmAction}
                    />
                )}
                {showDispatch && selectedReport && (
                    <DispatchModal
                        report={selectedReport}
                        onClose={() => { setShowDispatch(false); setSelectedReport(null); }}
                        onConfirm={confirmDispatch}
                        mrfStaff={mrfStaff}
                    />
                )}
                {showDetails && selectedReport && (
                    <ReportDetailsModal
                        report={selectedReport}
                        onClose={() => { setShowDetails(false); setSelectedReport(null); }}
                        type={'reportType' in selectedReport ? selectedReport.reportType : 'waste'}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   COLLECTIONS TAB – MRF Collected Waste
   ═══════════════════════════════════════════════════════════ */
interface CollectionsTabProps {
    binReports: BinReport[];
    loading: boolean;
    reportsError: string | null;
}

function CollectionsTab({ binReports, loading, reportsError }: CollectionsTabProps) {
    const [search, setSearch] = useState('');
    const collectedReports = binReports.filter((report) =>
        report.kilosCollected !== null && report.kilosCollected !== undefined
    );

    const filteredReports = collectedReports
        .filter((report) => {
            if (!search) return true;
            const query = search.toLowerCase();
            const staff = report.assignedStaff?.name?.toLowerCase() || '';
            const location = report.location?.toLowerCase() || '';
            return staff.includes(query) || location.includes(query);
        })
        .sort((a, b) => {
            const aTime = new Date(a.collectionDate || a.timestamp || 0).getTime();
            const bTime = new Date(b.collectionDate || b.timestamp || 0).getTime();
            return bTime - aTime;
        });

    const totalKg = collectedReports.reduce((sum, report) => sum + (report.kilosCollected || 0), 0);
    const averageKg = collectedReports.length ? totalKg / collectedReports.length : 0;

    const staffTotals = collectedReports.reduce((acc, report) => {
        const staffName = report.assignedStaff?.name || 'Unassigned';
        if (!acc[staffName]) acc[staffName] = { total: 0, count: 0 };
        acc[staffName].total += report.kilosCollected || 0;
        acc[staffName].count += 1;
        return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const staffSummary = Object.entries(staffTotals)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.total - a.total);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Scale className="h-5 w-5 text-emerald-500" /> MRF Collections
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{collectedReports.length} collected reports</p>
                </div>
            </div>

            {reportsError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {reportsError}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="!p-4">
                    <p className="text-xs text-slate-500">Total Collected</p>
                    <p className="text-2xl font-bold text-slate-900">{totalKg.toFixed(1)} kg</p>
                </Card>
                <Card className="!p-4">
                    <p className="text-xs text-slate-500">Average per Collection</p>
                    <p className="text-2xl font-bold text-slate-900">{averageKg.toFixed(1)} kg</p>
                </Card>
                <Card className="!p-4">
                    <p className="text-xs text-slate-500">Collections Logged</p>
                    <p className="text-2xl font-bold text-slate-900">{collectedReports.length}</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 !p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Collected Waste Log</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search staff or location..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm"
                            />
                        </div>
                    </div>

                    {loading && filteredReports.length === 0 ? (
                        <div className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-emerald-500 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">Loading collections...</p>
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm">No collections recorded yet.</div>
                    ) : (
                        <div className="space-y-3">
                            {filteredReports.map((report) => (
                                <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{report.location}</p>
                                        <p className="text-xs text-slate-500">
                                            {report.assignedStaff?.name || 'Unassigned'} · {report.wasteType || 'Waste'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-emerald-600">{(report.kilosCollected || 0).toFixed(1)} kg</p>
                                        <p className="text-xs text-slate-400">
                                            {new Date(report.collectionDate || report.timestamp || '').toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                <Card className="!p-4">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">By MRF Staff</h3>
                    {staffSummary.length === 0 ? (
                        <p className="text-sm text-slate-500">No collections yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {staffSummary.map((staff) => (
                                <div key={staff.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{staff.name}</p>
                                        <p className="text-xs text-slate-500">{staff.count} collections</p>
                                    </div>
                                    <p className="text-sm font-bold text-emerald-600">{staff.total.toFixed(1)} kg</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   BIN LOCATION MANAGER COMPONENT
   ═══════════════════════════════════════════════════════════ */
interface BinLocation {
    id: string;
    code: string;
    name: string;
    type: 'BIN_LOCATION';
    enabled: boolean;
    sortOrder: number;
}

function BinLocationManager({ onRefresh }: { onRefresh: () => void }) {
    const { addToast } = useToast();
    const [locations, setLocations] = useState<BinLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState('');
    const [newLocation, setNewLocation] = useState({ code: '', name: '' });

    useEffect(() => {
        loadBinLocations();
    }, []);

    const loadBinLocations = async () => {
        try {
            setLoading(true);
            const data = await api.getLocations('BIN_LOCATION');
            setLocations(data.filter((l: any) => l.type === 'BIN_LOCATION'));
        } catch (err: any) {
            addToast(err.message || 'Failed to load bin locations', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!newLocation.code.trim() || !newLocation.name.trim()) {
            addToast('Code and name are required', 'error');
            return;
        }

        try {
            const created = await api.createLocation({
                code: newLocation.code,
                name: newLocation.name,
                type: 'BIN_LOCATION',
                building: '',
            });
            setLocations([...locations, created]);
            setNewLocation({ code: '', name: '' });
            setAdding(false);
            addToast('Bin location added successfully', 'success');
            onRefresh(); // Refresh the map
        } catch (err: any) {
            addToast(err.message || 'Failed to add location', 'error');
        }
    };

    const handleUpdate = async (id: string, name: string) => {
        try {
            const updated = await api.updateLocation(id, { name });
            setLocations(locations.map((l) => (l.id === id ? { ...l, name } : l)));
            setEditingId(null);
            addToast('Location updated successfully', 'success');
            onRefresh(); // Refresh the map
        } catch (err: any) {
            addToast(err.message || 'Failed to update location', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this bin location?')) return;

        try {
            await api.deleteLocation(id);
            setLocations(locations.filter((l) => l.id !== id));
            addToast('Location deleted successfully', 'success');
            onRefresh(); // Refresh the map
        } catch (err: any) {
            addToast(err.message || 'Failed to delete location', 'error');
        }
    };

    const handleToggleEnabled = async (id: string, enabled: boolean) => {
        try {
            const updated = await api.updateLocation(id, { enabled: !enabled });
            setLocations(locations.map((l) => (l.id === id ? { ...l, enabled: !enabled } : l)));
            addToast(`Location ${!enabled ? 'enabled' : 'disabled'} successfully`, 'success');
            onRefresh(); // Refresh the map
        } catch (err: any) {
            addToast(err.message || 'Failed to update location', 'error');
        }
    };

    return (
        <Card className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-500" />
                        Bin Locations
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage available locations for waste bin reports
                    </p>
                </div>
                <button
                    onClick={() => setAdding(!adding)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium shadow-md shadow-blue-500/20"
                >
                    <Plus className="h-4 w-4" />
                    Add Location
                </button>
            </div>

            {/* Add Form */}
            <AnimatePresence>
                {adding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3"
                    >
                        <input
                            type="text"
                            placeholder="Location code (e.g., LOC-11)"
                            value={newLocation.code}
                            onChange={(e) => setNewLocation({ ...newLocation, code: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Location name (e.g., Science Building Entrance)"
                            value={newLocation.name}
                            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                            >
                                <Save className="h-4 w-4" />
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setAdding(false);
                                    setNewLocation({ code: '', name: '' });
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Locations List */}
            <div className="space-y-2">
                {loading ? (
                    <div className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-slate-400" />
                        <p className="text-sm text-slate-500 mt-2">Loading locations...</p>
                    </div>
                ) : locations.length === 0 ? (
                    <div className="text-center py-8">
                        <MapPin className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm text-slate-500">No bin locations yet</p>
                        <p className="text-xs text-slate-400 mt-1">Click "Add Location" to create one</p>
                    </div>
                ) : (
                    locations.map((location) => (
                        <div
                            key={location.id}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            {editingId === location.id ? (
                                <div className="space-y-2">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdate(location.id, editedName);
                                            if (e.key === 'Escape') setEditingId(null);
                                        }}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(location.id, editedName)}
                                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs font-medium"
                                        >
                                            <Save className="h-3 w-3" />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="flex items-center gap-1 px-3 py-1 bg-slate-500 text-white rounded-lg hover:bg-slate-600 text-xs font-medium"
                                        >
                                            <X className="h-3 w-3" />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-slate-900">{location.name}</p>
                                            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">
                                                {location.code}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleEnabled(location.id, location.enabled)}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${location.enabled
                                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                                                }`}
                                        >
                                            {location.enabled ? 'Enabled' : 'Disabled'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingId(location.id);
                                                setEditedName(location.name);
                                            }}
                                            className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                                            title="Edit location"
                                        >
                                            <Edit2 className="h-4 w-4 text-blue-500" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(location.id)}
                                            className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                                            title="Delete location"
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAP TAB (Simplified)
   ═══════════════════════════════════════════════════════════ */
function MapTab() {
    const { addToast } = useToast();
    const mapRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const previewDragActive = useRef(false);
    const previewDragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
    const didDrag = useRef(false);

    const [bins, setBins] = useState<CampusBin[]>([]);
    const [loading, setLoading] = useState(true);
    const [mapImage, setMapImage] = useState<string | null>(null);
    const [previewZoom, setPreviewZoom] = useState(1);
    const [previewPan, setPreviewPan] = useState({ x: 0, y: 0 });
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedBin, setSelectedBin] = useState<CampusBin | null>(null);
    const [isRenamingBin, setIsRenamingBin] = useState(false);
    const [renameValue, setRenameValue] = useState('');
    const [filter, setFilter] = useState<BinFillStatus | 'all'>('all');
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState<{ url: string; name: string; size: string } | null>(null);
    const [draggingBinId, setDraggingBinId] = useState<string | null>(null);
    const [addBinPos, setAddBinPos] = useState<{ x: number; y: number } | null>(null);
    const [newBinName, setNewBinName] = useState('');

    // Load bins and map from database
    useEffect(() => {
        loadData();
    }, []);

    // Real-time updates via polling
    useEffect(() => {
        const interval = setInterval(loadBinStatuses, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, [bins.length]);

    const loadData = async () => {
        try {
            setLoading(true);
            // Load bin locations from database
            const locationsData = await api.getLocations('BIN_LOCATION');
            const binLocations = locationsData.filter((l: any) => l.type === 'BIN_LOCATION');

            // Load bin statuses
            const statusesResponse = await api.getBinStatuses();
            const statuses = statusesResponse.data || [];
            const statusMap = new Map(statuses.map((s: any) => [s.locationId, s.fillStatus]));

            // Merge locations with statuses
            const binsData: CampusBin[] = binLocations.map((loc: any) => ({
                id: loc.id,
                name: loc.name,
                code: loc.code,
                x: loc.mapX ?? 50,
                y: loc.mapY ?? 50,
                fillStatus: (statusMap.get(loc.id) as BinFillStatus) || 'empty'
            }));

            setBins(binsData);

            // Load campus map
            const mapResponse = await api.getCampusMap();
            if (mapResponse.data && mapResponse.data.imageData) {
                setMapImage(mapResponse.data.imageData);
            }
        } catch (error: any) {
            console.error('Error loading map data:', error);
            addToast('Failed to load map data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadBinStatuses = async () => {
        try {
            const statusesResponse = await api.getBinStatuses();
            const statuses = statusesResponse.data || [];
            const statusMap = new Map(statuses.map((s: any) => [s.locationId, s.fillStatus]));

            setBins(prev => prev.map(bin => ({
                ...bin,
                fillStatus: (statusMap.get(bin.id) as BinFillStatus) || bin.fillStatus
            })));
        } catch (error) {
            console.error('Error loading bin statuses:', error);
        }
    };

    // ── Preview drag handlers (no pinch — use zoom buttons instead) ──────
    const handlePreviewMouseDown = (e: React.MouseEvent) => {
        previewDragActive.current = true;
        previewDragStart.current = { x: e.clientX, y: e.clientY, panX: previewPan.x, panY: previewPan.y };
        e.preventDefault();
    };
    const handlePreviewMouseMove = (e: React.MouseEvent) => {
        if (!previewDragActive.current) return;
        setPreviewPan({
            x: previewDragStart.current.panX + (e.clientX - previewDragStart.current.x),
            y: previewDragStart.current.panY + (e.clientY - previewDragStart.current.y),
        });
    };
    const handlePreviewMouseUp = () => { previewDragActive.current = false; };
    const handlePreviewTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            previewDragActive.current = true;
            previewDragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: previewPan.x, panY: previewPan.y };
        }
    };
    const handlePreviewTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1 && previewDragActive.current) {
            e.preventDefault();
            setPreviewPan({
                x: previewDragStart.current.panX + (e.touches[0].clientX - previewDragStart.current.x),
                y: previewDragStart.current.panY + (e.touches[0].clientY - previewDragStart.current.y),
            });
        }
    };
    const handlePreviewTouchEnd = () => { previewDragActive.current = false; };

    // ── Main map: bin drag and click-to-add (NO PAN/ZOOM) ───────────────────────
    const handleMapMouseMove = async (e: React.MouseEvent) => {
        if (draggingBinId && mapRef.current) {
            didDrag.current = true;
            const rect = mapRef.current.getBoundingClientRect();
            const newX = parseFloat(Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100)).toFixed(1));
            const newY = parseFloat(Math.max(2, Math.min(98, ((e.clientY - rect.top) / rect.height) * 100)).toFixed(1));
            setBins(prev => prev.map(b => b.id === draggingBinId ? { ...b, x: newX, y: newY } : b));
        }
    };

    const handleMapMouseUp = async () => {
        if (draggingBinId) {
            const bin = bins.find(b => b.id === draggingBinId);
            if (bin && didDrag.current) {
                try {
                    await api.updateBinCoordinates(bin.id, bin.x, bin.y);
                    addToast('Bin position saved', 'success');
                } catch (error) {
                    console.error('Error saving bin position:', error);
                    addToast('Failed to save bin position', 'error');
                }
            }
            setDraggingBinId(null);
        }
    };

    const handleMapClick = (e: React.MouseEvent) => {
        if (didDrag.current || !isEditMode || !mapRef.current) return;
        addToast('To add new bins, use the Bin Locations section below', 'info');
    };

    const deleteSelectedBin = async () => {
        if (!selectedBin) return;
        if (!confirm(`Are you sure you want to remove "${selectedBin.name}" from the map?`)) return;

        try {
            await api.deleteLocation(selectedBin.id);
            setBins(prev => prev.filter(b => b.id !== selectedBin.id));
            addToast('Bin removed', 'success');
            setSelectedBin(null);
        } catch (error) {
            addToast('Failed to remove bin', 'error');
        }
    };

    const handleMapUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        event.target.value = '';
        if (!file.type.startsWith('image/')) {
            addToast('Please select an image file', 'error');
            return;
        }
        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            const sizeKB = (file.size / 1024).toFixed(1);
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            setPreviewImage({
                url: imageUrl,
                name: file.name,
                size: file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`,
            });
            setIsUploading(false);
        };
        reader.onerror = () => { addToast('Failed to read image file', 'error'); setIsUploading(false); };
        reader.readAsDataURL(file);
    };

    const confirmMapUpload = async () => {
        if (!previewImage) return;

        try {
            await api.uploadCampusMap(previewImage.url, previewImage.name, previewImage.size);
            setMapImage(previewImage.url);
            addToast('Campus map uploaded successfully', 'success');
            setPreviewImage(null);
            setPreviewZoom(1);
            setPreviewPan({ x: 0, y: 0 });
        } catch (error) {
            console.error('Error uploading map:', error);
            addToast('Failed to upload map', 'error');
        }
    };

    const cancelMapUpload = () => { setPreviewImage(null); };

    const filteredBins = filter === 'all' ? bins : bins.filter(b => b.fillStatus === filter);

    const updateBinStatus = async (binId: string, newStatus: BinFillStatus) => {
        try {
            await api.updateBinStatus(binId, newStatus);
            setBins(prev => prev.map(b => b.id === binId ? { ...b, fillStatus: newStatus } : b));
            if (selectedBin?.id === binId) setSelectedBin(prev => prev ? { ...prev, fillStatus: newStatus } : null);
            addToast(`Bin marked as ${BIN_FILL_STATUS[newStatus].label}`, 'success');
        } catch (error) {
            console.error('Error updating bin status:', error);
            addToast('Failed to update bin status', 'error');
        }
    };

    const openBinModal = (bin: CampusBin) => {
        setSelectedBin(bin);
        setRenameValue(bin.name);
        setIsRenamingBin(false);
    };

    const confirmRename = async () => {
        if (!selectedBin || !renameValue.trim()) return;
        try {
            await api.updateLocation(selectedBin.id, { name: renameValue.trim() });
            setBins(prev => prev.map(b => b.id === selectedBin.id ? { ...b, name: renameValue.trim() } : b));
            setSelectedBin(prev => prev ? { ...prev, name: renameValue.trim() } : null);
            addToast('Bin renamed', 'success');
            setIsRenamingBin(false);
        } catch (error) {
            addToast('Failed to rename bin', 'error');
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">

            {/* ── Header ─────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-emerald-500" /> Campus Bin Map
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{bins.length} bins · {mapImage ? 'Custom map uploaded' : 'No map yet'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleMapUpload} className="hidden" />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-sm font-medium disabled:opacity-50"
                    >
                        {isUploading ? (
                            <><Loader2 className="h-4 w-4 animate-spin" /> Reading...</>
                        ) : mapImage ? (
                            <><Image className="h-4 w-4" /> Replace Map</>
                        ) : (
                            <><Image className="h-4 w-4" /> Upload Map</>
                        )}
                    </button>
                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isEditMode
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        {isEditMode ? 'Done Editing' : 'Edit Map'}
                    </button>
                </div>
            </div>

            {/* ── Filter Pills ───────────────────────────── */}
            <div className="flex flex-wrap gap-2">
                {(['all', 'full', 'half', 'empty'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === status ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {status === 'all' ? 'All' : BIN_FILL_STATUS[status].label}
                        <span className="ml-1.5 text-xs opacity-70">
                            ({status === 'all' ? bins.length : bins.filter(b => b.fillStatus === status).length})
                        </span>
                    </button>
                ))}
            </div>

            {/* ── Map Container ──────────────────────────── */}
            <Card className="!p-0 overflow-hidden">
                <div
                    ref={mapRef}
                    className={`relative w-full h-[400px] sm:h-[500px] lg:h-[600px] select-none ${draggingBinId ? 'cursor-grabbing' : isEditMode ? 'cursor-crosshair' : ''}`}
                    style={{
                        backgroundImage: mapImage ? `url(${mapImage})` : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    onMouseMove={handleMapMouseMove}
                    onMouseUp={handleMapMouseUp}
                    onMouseLeave={handleMapMouseUp}
                    onClick={handleMapClick}
                >
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                        backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }} />

                    {/* Edit mode badge */}
                    {isEditMode && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md pointer-events-none">
                            <Zap className="h-3 w-3" /> Edit Mode — Click empty space to add bin · Drag bin to move · Click bin to edit
                        </div>
                    )}

                    {/* No-map placeholder */}
                    {!mapImage && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                                <Image className="h-7 w-7 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">No campus map uploaded yet</p>
                            <p className="text-xs text-slate-400">Click "Upload Map" above to add a campus image</p>
                        </div>
                    )}

                    {/* Bins */}
                    {filteredBins.map((bin) => (
                        <motion.div
                            key={bin.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute group ${isEditMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                            style={{ left: `${bin.x}%`, top: `${bin.y}%`, transform: 'translate(-50%, -50%)', zIndex: draggingBinId === bin.id ? 20 : 10 }}
                            onMouseDown={(e) => {
                                if (!isEditMode) return;
                                e.stopPropagation();
                                didDrag.current = false;
                                setDraggingBinId(bin.id);
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (didDrag.current) return;
                                openBinModal(bin);
                            }}
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg ring-2 ring-white transition-transform ${draggingBinId !== bin.id ? 'group-hover:scale-110' : 'scale-125'} ${bin.fillStatus === 'full' ? 'bg-red-500' : bin.fillStatus === 'half' ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}>
                                <Trash2 className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap bg-white rounded-lg px-2 py-1 text-xs font-medium shadow-md border border-slate-100 pointer-events-none">
                                {bin.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* ── Selected Bin Detail Panel (view mode) ──── */}
            <AnimatePresence>
                {!isEditMode && selectedBin && (
                    <motion.div
                        key="bin-detail-panel"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-4 px-4 pb-4 sm:px-6 sm:pb-5"
                    >
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${BIN_FILL_STATUS[selectedBin.fillStatus].bg}`}>
                                        <Trash2 className={`h-5 w-5 ${BIN_FILL_STATUS[selectedBin.fillStatus].color}`} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{selectedBin.name}</h4>
                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${BIN_FILL_STATUS[selectedBin.fillStatus].bg} ${BIN_FILL_STATUS[selectedBin.fillStatus].color}`}>
                                            {BIN_FILL_STATUS[selectedBin.fillStatus].label}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedBin(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                {[
                                    { label: 'Position X', value: `${selectedBin.x}%` },
                                    { label: 'Position Y', value: `${selectedBin.y}%` },
                                    { label: 'Bin ID', value: selectedBin.id },
                                ].map((d) => (
                                    <div key={d.label} className="rounded-xl bg-white border border-slate-200 p-3">
                                        <p className="text-sm font-bold text-slate-900 truncate">{d.value}</p>
                                        <p className="text-xs text-slate-500">{d.label}</p>
                                    </div>
                                ))}
                            </div>
                            {selectedBin.fillStatus === 'full' && (
                                <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                                    <p className="text-xs text-red-600">This bin is full and needs immediate attention.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Bin Modal (status + rename) ────────────── */}
            <AnimatePresence>
                {isEditMode && selectedBin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => { setSelectedBin(null); setIsRenamingBin(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 pb-4">
                                {/* Editable bin name */}
                                {isRenamingBin ? (
                                    <div className="flex items-center gap-2 mb-1">
                                        <input
                                            autoFocus
                                            value={renameValue}
                                            onChange={(e) => setRenameValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') confirmRename();
                                                if (e.key === 'Escape') setIsRenamingBin(false);
                                            }}
                                            className="flex-1 rounded-lg border border-emerald-400 px-3 py-1.5 text-base font-bold text-slate-900 outline-none ring-2 ring-emerald-500/20"
                                        />
                                        <button onClick={confirmRename} className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => setIsRenamingBin(false)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900 flex-1">{selectedBin.name}</h3>
                                        <button
                                            onClick={() => setIsRenamingBin(true)}
                                            title="Rename bin"
                                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                )}
                                <p className="text-sm text-slate-500 mb-5">Update fill status or rename this bin</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['full', 'half', 'empty'] as const).map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateBinStatus(selectedBin.id, status)}
                                            className={`p-3 rounded-xl text-center transition-all ${selectedBin.fillStatus === status
                                                ? `${BIN_FILL_STATUS[status].bg} ${BIN_FILL_STATUS[status].color} ring-2 ring-offset-2 ring-current`
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            <Trash2 className="h-5 w-5 mx-auto mb-1" />
                                            <span className="text-xs font-medium">{BIN_FILL_STATUS[status].label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-slate-100 px-6 py-4 flex gap-2">
                                <button
                                    onClick={deleteSelectedBin}
                                    className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors border border-red-200"
                                >
                                    Delete Bin
                                </button>
                                <button
                                    onClick={() => { setSelectedBin(null); setIsRenamingBin(false); }}
                                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Add Bin Modal ─────────────────────────── */}
            <AnimatePresence>
                {addBinPos && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setAddBinPos(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 pb-4">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Bin</h3>
                                <p className="text-sm text-slate-500 mb-5">Position: {addBinPos.x.toFixed(1)}%, {addBinPos.y.toFixed(1)}%</p>
                                <input
                                    autoFocus
                                    value={newBinName}
                                    onChange={(e) => setNewBinName(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') confirmAddBin(); if (e.key === 'Escape') setAddBinPos(null); }}
                                    placeholder="e.g. Cafeteria Block A"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            <div className="border-t border-slate-100 px-6 py-4 flex gap-2">
                                <button onClick={() => setAddBinPos(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={confirmAddBin} disabled={!newBinName.trim()} className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                    <Trash2 className="h-4 w-4" /> Add Bin
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Image Preview Modal ────────────────────── */}
            <AnimatePresence>
                {previewImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={cancelMapUpload}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="p-5 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                        <Image className="h-4 w-4 text-blue-500" /> Preview Map Image
                                    </h3>
                                    <button onClick={cancelMapUpload} className="text-slate-400 hover:text-slate-600 transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Review before applying to the campus map</p>
                            </div>
                            <div className="p-5 space-y-4">
                                <div
                                    ref={previewContainerRef}
                                    className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-grab active:cursor-grabbing select-none touch-none"
                                    onMouseDown={handlePreviewMouseDown}
                                    onMouseMove={handlePreviewMouseMove}
                                    onMouseUp={handlePreviewMouseUp}
                                    onMouseLeave={handlePreviewMouseUp}
                                    onTouchStart={handlePreviewTouchStart}
                                    onTouchMove={handlePreviewTouchMove}
                                    onTouchEnd={handlePreviewTouchEnd}
                                >
                                    <img
                                        src={previewImage.url}
                                        alt="Map preview"
                                        draggable={false}
                                        className="absolute pointer-events-none"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transform: `translate(calc(-50% + ${previewPan.x}px), calc(-50% + ${previewPan.y}px)) scale(${previewZoom})`,
                                            transformOrigin: 'center center',
                                        }}
                                    />
                                    <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                                        backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                    }} />
                                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded-lg px-2 py-1 pointer-events-none">
                                        Drag to pan
                                    </div>
                                    {/* Zoom Controls */}
                                    <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                                        <button onClick={() => setPreviewZoom(z => parseFloat(Math.min(4, z + 0.1).toFixed(2)))} className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white font-bold text-base hover:bg-black/70 transition-colors" title="Zoom in">+</button>
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium">{Math.round(previewZoom * 100)}%</div>
                                        <button onClick={() => setPreviewZoom(z => parseFloat(Math.max(0.25, z - 0.1).toFixed(2)))} className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white font-bold text-base hover:bg-black/70 transition-colors" title="Zoom out">−</button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                                        <Image className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{previewImage.name}</p>
                                        <p className="text-xs text-slate-500">{previewImage.size}</p>
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Ready</span>
                                </div>
                            </div>
                            <div className="flex gap-3 px-5 pb-5">
                                <button onClick={cancelMapUpload} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={confirmMapUpload} className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" /> Apply Map
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Bin Location Management ───────────────── */}
            <BinLocationManager onRefresh={loadData} />
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   USERS TAB (Simplified)
   ═══════════════════════════════════════════════════════════ */
interface UsersTabProps {
    binReports: BinReport[];
    assetReports: AssetReport[];
}

/* ═══════════════════════════════════════════════════════════
   ADMIN LEADERBOARD TAB
   ═══════════════════════════════════════════════════════════ */
function AdminLeaderboardTab() {
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const res = await api.getLeaderboard();
            if (res.success && res.data?.leaderboard) {
                setLeaderboardData(res.data.leaderboard);
            }
        } catch (e) {
            console.error('Failed to fetch leaderboard:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeaderboard(); }, []);

    const filtered = leaderboardData.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        (u.department || '').toLowerCase().includes(search.toLowerCase())
    );

    const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const rankColors: Record<number, string> = {
        1: 'from-amber-50 to-yellow-50 border-amber-200',
        2: 'from-slate-50 to-slate-100 border-slate-300',
        3: 'from-orange-50 to-amber-50 border-orange-200',
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" /> Eco-Points Leaderboard
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Top student eco-champions ranked by verified report points</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search students…"
                            className="text-sm bg-transparent focus:outline-none text-slate-700 placeholder-slate-400 w-40"
                        />
                    </div>
                    <button onClick={fetchLeaderboard} className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                        <RefreshCw className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
            </div>

            {/* Points system info */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />
                        <span className="text-sm font-semibold text-slate-700">Points System:</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: '1st reporter', pts: 15, color: 'bg-amber-100 text-amber-700 border-amber-200' },
                            { label: '2nd reporter', pts: 10, color: 'bg-slate-100 text-slate-600 border-slate-200' },
                            { label: '3rd reporter', pts: 5, color: 'bg-orange-100 text-orange-600 border-orange-200' },
                        ].map(p => (
                            <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${p.color}`}>
                                <Flame className="h-3 w-3" /> {p.pts} pts — {p.label}
                            </span>
                        ))}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-slate-50 text-slate-400 border-slate-200">
                            4th+ reporter — no points
                        </span>
                    </div>
                </div>
            </Card>

            {/* Top 3 podium */}
            {!loading && filtered.length >= 3 && (
                <div className="grid grid-cols-3 gap-3">
                    {[filtered[1], filtered[0], filtered[2]].map((u, podiumIdx) => {
                        if (!u) return null;
                        const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
                        const heights = ['h-28', 'h-36', 'h-24'];
                        return (
                            <Card key={u.rank} className={`flex flex-col items-center justify-end text-center bg-gradient-to-b ${rankColors[actualRank] || 'border-slate-200'} !p-4`}>
                                <span className="text-3xl mb-1">{medals[actualRank]}</span>
                                <p className="text-sm font-bold text-slate-900 leading-tight">{u.name}</p>
                                <p className="text-xs text-slate-500 mb-2 truncate w-full">{u.department || 'Student'}</p>
                                <div className="flex items-center gap-1 text-base font-extrabold text-slate-900">
                                    <Flame className="h-4 w-4 text-orange-400" /> {u.points.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">{u.reports} reports</p>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Full leaderboard table */}
            <Card>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <Trophy className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                        <p className="text-slate-500 font-medium">No students found</p>
                        <p className="text-sm text-slate-400 mt-1">Rankings will appear once students submit and verify reports</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Rank</th>
                                    <th className="text-left py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Student</th>
                                    <th className="text-left py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Course / Dept</th>
                                    <th className="text-right py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Reports</th>
                                    <th className="text-right py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map((u) => (
                                    <tr key={u.rank} className={`transition-colors ${u.rank <= 3 ? 'bg-amber-50/40 hover:bg-amber-50' : 'hover:bg-slate-50'}`}>
                                        <td className="py-3 px-3">
                                            <span className="text-lg">{medals[u.rank] || `#${u.rank}`}</span>
                                        </td>
                                        <td className="py-3 px-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <span className="font-semibold text-slate-900">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">{u.department || '—'}</td>
                                        <td className="py-3 px-3 text-right font-medium text-slate-700">{u.reports}</td>
                                        <td className="py-3 px-3 text-right">
                                            <span className="inline-flex items-center gap-1 font-extrabold text-slate-900">
                                                <Flame className="h-3.5 w-3.5 text-orange-400" /> {u.points.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </motion.div>
    );
}

function UsersTab({ binReports, assetReports }: UsersTabProps) {
    // Extract unique reporters
    const reporters = [...new Set([
        ...binReports.map(r => ({ name: r.reportedBy, role: r.reporterRole })),
        ...assetReports.map(r => ({ name: r.reportedBy, role: r.reporterRole })),
    ].map(r => JSON.stringify(r)))].map(s => JSON.parse(s));

    const students = reporters.filter(r => r.role === 'student');
    const faculty = reporters.filter(r => r.role === 'teacher');

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-500" /> User Management
                </h2>
                <p className="text-sm text-slate-500 mt-1">{reporters.length} active reporters</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                            <GraduationCap className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Students</h3>
                            <p className="text-xs text-slate-500">{students.length} active</p>
                        </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {students.length === 0 ? (
                            <p className="text-sm text-slate-400 py-4 text-center">No student reporters yet</p>
                        ) : (
                            students.map((s, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
                                        {s.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{s.name}</span>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                            <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Faculty</h3>
                            <p className="text-xs text-slate-500">{faculty.length} active</p>
                        </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {faculty.length === 0 ? (
                            <p className="text-sm text-slate-400 py-4 text-center">No faculty reporters yet</p>
                        ) : (
                            faculty.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                                        {f.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{f.name}</span>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   NEWS TAB
   ═══════════════════════════════════════════════════════════ */
const EMPTY_FORM = { tag: TAG_OPTIONS[0], date: '', title: '', desc: '' };

function NewsTab() {
    const { addToast } = useToast();
    const { news, addNewsItem, updateNewsItem, deleteNewsItem } = useCampusNews();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openAdd = () => {
        setEditingId(null);
        setForm({ ...EMPTY_FORM, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) });
        setShowForm(true);
    };

    const openEdit = (item: any) => {
        setEditingId(item.id);
        setForm({ tag: item.tag, date: item.date, title: item.title, desc: item.desc });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setForm({ ...EMPTY_FORM });
    };

    const handleSubmit = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        if (isSubmitting) return;
        console.log('[NewsTab] handleSubmit called', { form, editingId });
        if (!form.title.trim() || !form.desc.trim() || !form.date.trim()) {
            console.log('[NewsTab] Validation failed');
            addToast('Please fill in all fields', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            console.log('[NewsTab] Submitting...', editingId ? 'UPDATE' : 'CREATE');
            if (editingId) {
                await updateNewsItem(editingId, form);
                addToast('News item updated', 'success');
            } else {
                await addNewsItem(form);
                addToast('News item added', 'success');
            }
            console.log('[NewsTab] Success!');
            closeForm();
        } catch (error: any) {
            console.error('[NewsTab] Error:', error);
            addToast(error?.message || 'Failed to save news item', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        setDeleteConfirm(null); // close dialog immediately
        try {
            console.log('[NewsTab] Deleting news item:', id);
            await deleteNewsItem(id);
            addToast('News item deleted', 'info');
        } catch (error: any) {
            console.error('[NewsTab] Delete error:', error);
            addToast(error?.message || 'Failed to delete news item', 'error');
        }
    };

    const tagStyle = (tag: string) => (TAG_COLOR_MAP as any)[tag] || { tagColor: 'bg-slate-100 text-slate-600', iconBg: '' };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-emerald-500" /> Campus News
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{news.length} article{news.length !== 1 ? 's' : ''} — visible to students, teachers & the login page</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add News
                </button>
            </div>

            {/* News list */}
            <div className="space-y-3">
                {news.length === 0 ? (
                    <Card className="text-center py-12">
                        <Newspaper className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No news articles yet. Click "Add News" to create one.</p>
                    </Card>
                ) : news.map((item: any) => {
                    const { tagColor } = tagStyle(item.tag);
                    return (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className="shrink-0 mt-0.5">
                                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagColor}`}>
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-900 truncate">{item.title}</p>
                                        <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{item.desc}</p>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {item.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Edit">
                                        <Edit3 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-red-100 text-red-500" title="Delete">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Add / Edit Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={closeForm}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                        <Newspaper className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{editingId ? 'Edit News' : 'Add News'}</h3>
                                        <p className="text-xs text-slate-500">Visible to all users on the platform</p>
                                    </div>
                                </div>
                                <button onClick={closeForm} className="p-2 rounded-lg hover:bg-slate-100">
                                    <X className="h-5 w-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Tag */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Category / Tag</label>
                                    <select
                                        value={form.tag}
                                        onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    >
                                        {TAG_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. May 6, 2026"
                                        value={form.date}
                                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                                    <input
                                        type="text"
                                        placeholder="News headline..."
                                        value={form.title}
                                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Write a brief description..."
                                        value={form.desc}
                                        onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                                <button onClick={closeForm} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                    {editingId ? 'Save Changes' : 'Publish'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Confirm */}
                {deleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
                                    <Trash className="h-7 w-7 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Delete News?</h3>
                                <p className="mt-2 text-sm text-slate-500">This will remove the article from all pages. This cannot be undone.</p>
                            </div>
                            <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
                                <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={() => { console.log('[NewsTab] Delete button clicked:', deleteConfirm); handleDelete(deleteConfirm!); }} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
}
