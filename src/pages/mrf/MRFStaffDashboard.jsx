/* =========================================================
   EcoLedger - MRF Staff Dashboard
   Professional, responsive interface for facility staff
   ========================================================= */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale, Trash2, Recycle, Plus, Check, ChevronRight, ChevronDown,
    Leaf, Clock, TrendingUp, Calendar, Package, Truck, AlertCircle,
    X, Send, CheckCircle2, FileText, BarChart3, History, User,
    Sun, Moon, Settings, LogOut, Loader2, Sparkles, Info,
    TreePine, Droplets, Apple, Coffee, Newspaper, Wine, Lightbulb,
    ClipboardCheck, RefreshCw, MapPin, Menu, Bell
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import realtimeEvents from '../../lib/realtimeEvents';
import { useLocations } from '../../hooks/useSettings';

/* ── Status Terminology Mapping ─────────────────────────── */
const STATUS_MAP = {
    'DISPATCHED': { label: 'Assigned', color: 'blue', icon: Clock },
    'IN_PROGRESS': { label: 'Collecting', color: 'amber', icon: Truck },
    'COMPLETED': { label: 'Processed', color: 'emerald', icon: CheckCircle2 },
    'RESOLVED': { label: 'Verified', color: 'emerald', icon: ShieldCheck },
    'PENDING': { label: 'Waiting', color: 'slate', icon: AlertCircle },
};

const getStatusInfo = (status) => STATUS_MAP[status] || { label: status, color: 'slate', icon: AlertCircle };

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ── Tab Configuration ───────────────────────────────────── */
const TABS = [
    { id: 'reports', label: 'Tasks', icon: ClipboardCheck },
    { id: 'input', label: 'Quick Log', icon: Plus },
    { id: 'history', label: 'History', icon: History },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
];

export default function MRFStaffDashboard() {
    const { theme, toggleTheme } = useTheme();
    const { user, signout } = useAuth();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('reports');
    const [assignedReports, setAssignedReports] = useState([]);
    const [completedReports, setCompletedReports] = useState([]);
    const [reportsLoading, setReportsLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Load locations from API for InputTab
    const { locations: binLocations } = useLocations('BIN_LOCATION');

    const staffName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.username || 'MRF Staff';

    /* ── Fetch assigned reports ───────────────────────────── */
    const fetchAssignedReports = async () => {
        setReportsLoading(true);
        try {
            const response = await api.getAllReports();
            if (response.success && response.data?.reports) {
                const myReports = response.data.reports.filter(
                    r => r.assignedStaffId === user?.id
                );
                setAssignedReports(myReports);
            }
        } catch (error) {
            console.error('Failed to fetch reports:', error);
            showToast('Failed to load reports', 'error');
        } finally {
            setReportsLoading(false);
        }
    };

    /* ── Fetch completed reports (history) ───────────────────────────── */
    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const response = await api.getAllReports('COMPLETED');
            if (response.success && response.data?.reports) {
                const myCompleted = response.data.reports.filter(
                    r => r.assignedStaffId === user?.id && r.status === 'COMPLETED'
                );
                setCompletedReports(myCompleted);
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAssignedReports();
            fetchHistory();
            const interval = setInterval(() => {
                fetchAssignedReports();
                fetchHistory();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        if (!user?.id) return;
        const handleRealtimeReport = () => {
            fetchAssignedReports();
            fetchHistory();
        };
        const unsub1 = realtimeEvents.subscribe('report.created', handleRealtimeReport);
        const unsub2 = realtimeEvents.subscribe('report.updated', handleRealtimeReport);
        const unsub3 = realtimeEvents.subscribe('report.deleted', handleRealtimeReport);
        return () => { unsub1(); unsub2(); unsub3(); };
    }, [user?.id]);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── Stats Logic ─────────────────────────────────────────── */
    const stats = {
        pending: assignedReports.filter(r => r.status === 'DISPATCHED').length,
        collecting: assignedReports.filter(r => r.status === 'IN_PROGRESS').length,
        done: assignedReports.filter(r => r.status === 'COMPLETED').length,
        weight: assignedReports
            .filter(r => r.type === 'WASTE' && r.kilosCollected !== null)
            .reduce((sum, r) => sum + (r.kilosCollected || 0), 0)
    };

    const handleNewCollection = async (newEntry) => {
        try {
            const reportData = {
                location: newEntry.location,
                wasteType: newEntry.wasteType,
                notes: newEntry.notes,
                urgency: 'normal',
                type: newEntry.type,
                status: 'COMPLETED',
                collectionDate: new Date()
            };

            if (newEntry.type === 'WASTE') {
                reportData.kilosCollected = newEntry.weight;
            } else {
                reportData.assetAction = newEntry.assetAction;
            }

            const response = await api.createReport(reportData);
            if (response.success) {
                showToast(`Log recorded successfully!`, 'success');
                fetchAssignedReports();
                fetchHistory();
            }
        } catch (error) {
            showToast('Failed to record entry', 'error');
        }
    };

    return (
        <div className={`min-h-screen flex ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
            
            {/* ── Sidebar (Desktop) ─────────────────────────── */}
            <aside className={`hidden md:flex flex-col w-64 fixed inset-y-0 z-50 ${isDark ? 'bg-slate-900/50' : 'bg-white/70'} backdrop-blur-xl border-r ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Leaf className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">EcoLedger</span>
                    </div>

                    <nav className="space-y-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 font-semibold'
                                    : `hover:${isDark ? 'bg-white/5' : 'bg-slate-100'} text-slate-500`
                                }`}
                            >
                                <tab.icon className="h-5 w-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-slate-200/10">
                    <div className="flex items-center gap-3 mb-6 p-2 rounded-2xl bg-white/5">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                            {staffName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{staffName}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">MRF Staff</p>
                        </div>
                    </div>
                    <button 
                        onClick={signout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors font-semibold"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main Content ──────────────────────────────── */}
            <main className="flex-1 md:ml-64 pb-24 md:pb-8 flex flex-col">
                {/* Mobile Header */}
                <header className={`sticky top-0 z-40 md:hidden p-4 ${isDark ? 'bg-slate-950/80' : 'bg-white/80'} backdrop-blur-lg border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                                <Leaf className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">EcoLedger</h1>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Facility Portal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={toggleTheme} className="p-2 rounded-xl bg-slate-100 dark:bg-white/5">
                                {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
                            </button>
                            <button onClick={signout} className="p-2 rounded-xl bg-red-500/10 text-red-500">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Desktop Top Header */}
                <header className="hidden md:flex items-center justify-between px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <p className="text-slate-500 text-sm">Welcome back, {staffName.split(' ')[0]}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                            </button>
                        </div>
                        <button onClick={toggleTheme} className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                            {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
                        </button>
                    </div>
                </header>

                {/* Toast Notification */}
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: -20, x: '-50%' }}
                            className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 rounded-2xl px-6 py-4 text-white shadow-2xl ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}
                        >
                            {toast.type === 'error' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                            <span className="text-sm font-bold">{toast.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <div className="flex-1 px-4 md:px-8 max-w-7xl w-full mx-auto">
                    {/* Stats Overview Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 mt-2 md:mt-0">
                        <StatCard 
                            title="Assigned" 
                            value={stats.pending} 
                            icon={ClipboardCheck} 
                            color="blue" 
                            isDark={isDark} 
                            index={0}
                        />
                        <StatCard 
                            title="Collecting" 
                            value={stats.collecting} 
                            icon={Truck} 
                            color="amber" 
                            isDark={isDark} 
                            index={1}
                        />
                        <StatCard 
                            title="Processed" 
                            value={stats.done} 
                            icon={CheckCircle2} 
                            color="emerald" 
                            isDark={isDark} 
                            index={2}
                        />
                        <StatCard 
                            title="Weight (kg)" 
                            value={stats.weight.toFixed(1)} 
                            icon={Scale} 
                            color="purple" 
                            isDark={isDark} 
                            index={3}
                        />
                    </div>

                    {/* Tab Panels */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {activeTab === 'reports' && (
                                <ReportsTab
                                    key="reports"
                                    isDark={isDark}
                                    reports={assignedReports}
                                    isLoading={reportsLoading}
                                    onRefresh={fetchAssignedReports}
                                    onToast={showToast}
                                />
                            )}
                            {activeTab === 'input' && (
                                <InputTab 
                                    key="input" 
                                    isDark={isDark} 
                                    onSubmit={handleNewCollection} 
                                    onToast={showToast} 
                                    binLocations={binLocations} 
                                />
                            )}
                            {activeTab === 'history' && (
                                <HistoryTab
                                    key="history"
                                    isDark={isDark}
                                    reports={completedReports}
                                    isLoading={historyLoading}
                                    onRefresh={fetchHistory}
                                />
                            )}
                            {activeTab === 'stats' && (
                                <StatsTab
                                    key="stats"
                                    isDark={isDark}
                                    reports={completedReports}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* ── Bottom Navigation (Mobile) ─────────────────── */}
            <nav className={`fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe-area-inset-bottom ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-slate-200'} border-t backdrop-blur-xl`}>
                <div className="flex justify-around items-center h-16 px-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${
                                activeTab === tab.id 
                                ? 'text-emerald-500' 
                                : 'text-slate-500'
                            }`}
                        >
                            <div className={`p-1.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-emerald-500/10' : ''}`}>
                                <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, isDark, index }) {
    const colors = {
        blue: 'text-blue-500 bg-blue-500/10',
        amber: 'text-amber-500 bg-amber-500/10',
        emerald: 'text-emerald-500 bg-emerald-500/10',
        purple: 'text-purple-500 bg-purple-500/10',
    };

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={index}
            className={`p-4 md:p-6 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
        >
            <div className="flex items-start justify-between mb-2">
                <div className={`p-2.5 rounded-2xl ${colors[color]}`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="text-right">
                    <p className="text-2xl md:text-3xl font-black">{value}</p>
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">{title}</p>
                </div>
            </div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   REPORTS TAB
   ══════════════════════════════════════════════════════════ */
function ReportsTab({ isDark, reports, isLoading, onRefresh, onToast }) {
    const [selectedReport, setSelectedReport] = useState(null);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [collectionWeight, setCollectionWeight] = useState('');
    const [assetAction, setAssetAction] = useState('');

    const handleUpdateStatus = async (reportId, newStatus, kilos = null, action = null) => {
        setIsUpdating(true);
        try {
            let response;
            if (newStatus === 'IN_PROGRESS') {
                response = await api.confirmCollection(reportId, kilos, action);
            } else if (newStatus === 'COMPLETED') {
                response = await api.markAsDone(reportId);
            } else {
                response = await api.updateReportStatus(reportId, newStatus);
            }

            if (response.success) {
                const info = getStatusInfo(newStatus);
                onToast(`Task ${info.label.toLowerCase()} successfully`, 'success');
                onRefresh();
                setSelectedReport(null);
                setShowCollectionForm(false);
            } else {
                onToast(response.message || 'Update failed', 'error');
            }
        } catch (error) {
            onToast('Network error during update', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-emerald-500" /></div>;

    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black tracking-tight">Assigned Tasks</h3>
                <button onClick={onRefresh} className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
                    <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {reports.length === 0 ? (
                <div className={`p-12 rounded-3xl border-2 border-dashed ${isDark ? 'border-white/5 bg-white/2' : 'border-slate-200 bg-slate-50/50'} text-center`}>
                    <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="font-bold text-slate-500">No tasks assigned to you right now.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {reports.map((report, idx) => {
                        const info = getStatusInfo(report.status);
                        return (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedReport(report)}
                                className={`p-5 rounded-3xl border cursor-pointer transition-all hover:scale-[1.01] ${
                                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-xl shadow-slate-200/50'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-2xl ${
                                            report.urgency === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                                        }`}>
                                            {report.type === 'WASTE' ? <Recycle className="h-6 w-6" /> : <Package className="h-6 w-6" />}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg">{report.wasteType}</h4>
                                            <div className="flex items-center gap-1 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                <MapPin className="h-3 w-3" />
                                                {report.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                        info.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        info.color === 'amber' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                    }`}>
                                        <info.icon className="h-3 w-3" />
                                        {info.label}
                                    </div>
                                </div>

                                {report.notes && (
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">"{report.notes}"</p>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-slate-200/10">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase">
                                        {new Date(report.createdAt).toLocaleDateString()}
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-slate-400" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Task Detail Sheet */}
            <AnimatePresence>
                {selectedReport && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => { setSelectedReport(null); setShowCollectionForm(false); }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`fixed bottom-0 inset-x-0 z-[70] max-w-2xl mx-auto rounded-t-[2.5rem] p-8 pb-12 ${isDark ? 'bg-slate-900 border-t border-white/10' : 'bg-white'} shadow-2xl`}
                        >
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-8" />
                            
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-3xl ${selectedReport.type === 'WASTE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {selectedReport.type === 'WASTE' ? <Recycle className="h-8 w-8" /> : <Package className="h-8 w-8" />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Task Detail</p>
                                        <h3 className="text-3xl font-black">{selectedReport.wasteType}</h3>
                                    </div>
                                </div>
                                <button onClick={() => { setSelectedReport(null); setShowCollectionForm(false); }} className="p-2 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className={`p-4 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Location</p>
                                    <div className="flex items-center gap-2 font-black">
                                        <MapPin className="h-4 w-4 text-emerald-500" />
                                        {selectedReport.location}
                                    </div>
                                </div>
                                <div className={`p-4 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Urgency</p>
                                    <div className={`flex items-center gap-2 font-black capitalize ${selectedReport.urgency === 'high' ? 'text-red-500' : 'text-emerald-500'}`}>
                                        <AlertCircle className="h-4 w-4" />
                                        {selectedReport.urgency}
                                    </div>
                                </div>
                            </div>

                            {showCollectionForm ? (
                                <div className="space-y-6">
                                    {selectedReport.type === 'WASTE' ? (
                                        <div>
                                            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">Enter Weight Collected</label>
                                            <div className="relative">
                                                <input 
                                                    type="number" value={collectionWeight} onChange={(e) => setCollectionWeight(e.target.value)}
                                                    placeholder="0.00" autoFocus
                                                    className={`w-full text-6xl font-black text-center py-6 rounded-[2rem] border-4 transition-all ${
                                                        isDark ? 'bg-slate-800 border-white/5 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'
                                                    } focus:outline-none`}
                                                />
                                                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">kg</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => setAssetAction('REPAIR')}
                                                className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${
                                                    assetAction === 'REPAIR' ? 'border-emerald-500 bg-emerald-500/10' : 'border-transparent bg-slate-100 dark:bg-white/5'
                                                }`}
                                            >
                                                <RefreshCw className={`h-10 w-10 ${assetAction === 'REPAIR' ? 'text-emerald-500' : 'text-slate-400'}`} />
                                                <span className="font-black uppercase tracking-widest text-xs">Repair</span>
                                            </button>
                                            <button 
                                                onClick={() => setAssetAction('DISPOSE')}
                                                className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${
                                                    assetAction === 'DISPOSE' ? 'border-red-500 bg-red-500/10' : 'border-transparent bg-slate-100 dark:bg-white/5'
                                                }`}
                                            >
                                                <Trash2 className={`h-10 w-10 ${assetAction === 'DISPOSE' ? 'text-red-500' : 'text-slate-400'}`} />
                                                <span className="font-black uppercase tracking-widest text-xs">Dispose</span>
                                            </button>
                                        </div>
                                    )}
                                    <button 
                                        disabled={isUpdating || (selectedReport.type === 'WASTE' ? !collectionWeight : !assetAction)}
                                        onClick={() => handleUpdateStatus(selectedReport.id, 'IN_PROGRESS', collectionWeight, assetAction)}
                                        className="w-full py-6 rounded-[2rem] bg-emerald-500 text-white font-black text-xl shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {isUpdating ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : 'Confirm Log'}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {selectedReport.status === 'DISPATCHED' && (
                                        <button 
                                            onClick={() => setShowCollectionForm(true)}
                                            className="w-full py-6 rounded-[2rem] bg-emerald-500 text-white font-black text-xl shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                        >
                                            {selectedReport.type === 'WASTE' ? <Scale className="h-7 w-7" /> : <Settings className="h-7 w-7" />}
                                            {selectedReport.type === 'WASTE' ? 'Record Weight' : 'Process Asset'}
                                        </button>
                                    )}
                                    {selectedReport.status === 'IN_PROGRESS' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(selectedReport.id, 'COMPLETED')}
                                            className="w-full py-6 rounded-[2rem] bg-emerald-500 text-white font-black text-xl shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                        >
                                            <CheckCircle2 className="h-7 w-7" />
                                            Finish Task
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => { setSelectedReport(null); setShowCollectionForm(false); }}
                                        className={`w-full py-4 rounded-2xl font-bold ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors`}
                                    >
                                        View Later
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   INPUT TAB
   ══════════════════════════════════════════════════════════ */
function InputTab({ isDark, onSubmit, onToast, binLocations = [] }) {
    const [type, setType] = useState('WASTE');
    const [wasteType, setWasteType] = useState('');
    const [weight, setWeight] = useState('');
    const [assetAction, setAssetAction] = useState('REPAIR');
    const [location, setLocation] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredBins = binLocations.filter(b => 
        b.name.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await onSubmit({ type, wasteType, weight, assetAction, location });
        setWasteType(''); setWeight(''); setLocation(''); setLocationSearch('');
        setIsSubmitting(false);
    };

    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-2xl mx-auto space-y-6">
            <div className={`p-1.5 rounded-[2rem] ${isDark ? 'bg-white/5' : 'bg-slate-100'} flex`}>
                <button 
                    onClick={() => setType('WASTE')}
                    className={`flex-1 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${type === 'WASTE' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500'}`}
                >
                    Waste Log
                </button>
                <button 
                    onClick={() => setType('ASSET')}
                    className={`flex-1 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${type === 'ASSET' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500'}`}
                >
                    Asset Log
                </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} space-y-8`}>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Location</label>
                        <div className="relative">
                            <input 
                                type="text" value={location || locationSearch} onChange={(e) => { setLocationSearch(e.target.value); setLocation(''); setShowLocationDropdown(true); }}
                                onFocus={() => setShowLocationDropdown(true)}
                                placeholder="Search facility/bin location..."
                                className={`w-full px-6 py-4 rounded-2xl border-2 transition-all ${isDark ? 'bg-slate-900 border-white/5 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'} focus:outline-none font-bold`}
                            />
                            {showLocationDropdown && (
                                <div className={`absolute z-10 w-full mt-2 rounded-2xl border shadow-2xl max-h-60 overflow-y-auto ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}>
                                    {filteredBins.map(b => (
                                        <button key={b.id} type="button" onClick={() => { setLocation(b.name); setShowLocationDropdown(false); }} className={`w-full text-left px-6 py-4 hover:bg-emerald-500/10 transition-colors font-bold ${isDark ? 'border-white/5' : 'border-slate-50'} border-b last:border-0`}>
                                            {b.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{type === 'WASTE' ? 'Category' : 'Item Description'}</label>
                        <input 
                            type="text" value={wasteType} onChange={(e) => setWasteType(e.target.value)}
                            placeholder={type === 'WASTE' ? "e.g. Mixed Plastic" : "e.g. Broken Desk"}
                            className={`w-full px-6 py-4 rounded-2xl border-2 transition-all ${isDark ? 'bg-slate-900 border-white/5 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'} focus:outline-none font-bold`}
                        />
                    </div>

                    {type === 'WASTE' ? (
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Weight (kg)</label>
                            <input 
                                type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                                placeholder="0.00"
                                className={`w-full text-5xl font-black text-center py-6 rounded-[2rem] border-2 transition-all ${isDark ? 'bg-slate-900 border-white/5 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'} focus:outline-none`}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" onClick={() => setAssetAction('REPAIR')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${assetAction === 'REPAIR' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent bg-slate-50 dark:bg-white/5'}`}>
                                <RefreshCw className={`h-8 w-8 ${assetAction === 'REPAIR' ? 'text-blue-500' : 'text-slate-400'}`} />
                                <span className="font-black text-[10px] uppercase">Repair</span>
                            </button>
                            <button type="button" onClick={() => setAssetAction('DISPOSE')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${assetAction === 'DISPOSE' ? 'border-red-500 bg-red-500/10' : 'border-transparent bg-slate-50 dark:bg-white/5'}`}>
                                <Trash2 className={`h-8 w-8 ${assetAction === 'DISPOSE' ? 'text-red-500' : 'text-slate-400'}`} />
                                <span className="font-black text-[10px] uppercase">Dispose</span>
                            </button>
                        </div>
                    )}
                </div>

                <button 
                    type="submit" disabled={isSubmitting || !location || !wasteType}
                    className={`w-full py-6 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 ${
                        isSubmitting ? 'opacity-50' : (type === 'WASTE' ? 'bg-emerald-500 shadow-emerald-500/40 hover:scale-[1.01]' : 'bg-blue-500 shadow-blue-500/40 hover:scale-[1.01]')
                    } text-white`}
                >
                    {isSubmitting ? <Loader2 className="h-7 w-7 animate-spin" /> : <><CheckCircle2 className="h-7 w-7" /> Save Entry</>}
                </button>
            </form>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   HISTORY TAB
   ══════════════════════════════════════════════════════════ */
function HistoryTab({ isDark, reports, isLoading, onRefresh }) {
    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-emerald-500" /></div>;

    const grouped = reports.reduce((acc, report) => {
        const date = new Date(report.collectionDate || report.updatedAt).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(report);
        return acc;
    }, {});

    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black tracking-tight">Recent Activity</h3>
                <button onClick={onRefresh} className={`p-2 rounded-xl bg-white/5 border border-white/10`}><RefreshCw className="h-4 w-4" /></button>
            </div>

            {Object.entries(grouped).map(([date, items]) => (
                <div key={date} className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">{date === new Date().toDateString() ? 'Today' : date}</h4>
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div key={item.id} className={`p-5 rounded-3xl border flex items-center gap-4 ${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                                <div className={`p-3 rounded-2xl ${item.type === 'WASTE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                    {item.type === 'WASTE' ? <Recycle className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-bold">{item.wasteType}</h5>
                                    <p className="text-xs text-slate-500 flex items-center gap-1 font-medium"><MapPin className="h-3 w-3" />{item.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black ${item.type === 'WASTE' ? 'text-emerald-500' : (item.assetAction === 'REPAIR' ? 'text-blue-500' : 'text-red-500')}`}>
                                        {item.type === 'WASTE' ? `${item.kilosCollected} kg` : item.assetAction}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{new Date(item.collectionDate || item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   STATS TAB
   ══════════════════════════════════════════════════════════ */
function StatsTab({ isDark, reports }) {
    const totalWeight = reports.reduce((sum, r) => sum + (r.kilosCollected || 0), 0);
    const totalEntries = reports.length;
    const assetsCount = reports.filter(r => r.type === 'ASSET').length;

    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
            <h3 className="text-xl font-black tracking-tight mb-6">Facility Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
                    <BarChart3 className="h-10 w-10 text-emerald-500 mb-6" />
                    <div className="space-y-1">
                        <p className="text-5xl font-black">{totalWeight.toFixed(1)}</p>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Total Kilograms Recovered</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                        <FileText className="h-6 w-6 text-blue-500 mb-4" />
                        <p className="text-2xl font-black">{totalEntries}</p>
                        <p className="text-[10px] font-bold uppercase text-slate-500">Total Logs</p>
                    </div>
                    <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                        <Package className="h-6 w-6 text-purple-500 mb-4" />
                        <p className="text-2xl font-black">{assetsCount}</p>
                        <p className="text-[10px] font-bold uppercase text-slate-500">Assets Managed</p>
                    </div>
                </div>
            </div>

            <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-lg uppercase tracking-tight">Eco Impact</h4>
                        <p className="text-sm text-slate-500">Contribution to campus sustainability goals</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Carbon Saved</p>
                        <p className="text-2xl font-black text-emerald-500">{(totalWeight * 0.5).toFixed(1)} <span className="text-xs">kg</span></p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Water Saved</p>
                        <p className="text-2xl font-black text-blue-500">{(totalWeight * 2.5).toFixed(1)} <span className="text-xs">L</span></p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Tree Eq.</p>
                        <p className="text-2xl font-black text-teal-500">{(totalWeight / 10).toFixed(1)} <span className="text-xs">u</span></p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Energy Saved</p>
                        <p className="text-2xl font-black text-amber-500">{(totalWeight * 1.2).toFixed(1)} <span className="text-xs">kWh</span></p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ShieldCheck(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
