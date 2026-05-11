/* =========================================================
   EcoLedger - MRF Staff Mobile Dashboard
   Mobile-optimized interface for Materials Recovery Facility staff
   to input collected waste with weight and category.
   ========================================================= */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale, Trash2, Recycle, Plus, Check, ChevronRight, ChevronDown,
    Leaf, Clock, TrendingUp, Calendar, Package, Truck, AlertCircle,
    X, Send, CheckCircle2, FileText, BarChart3, History, User,
    Sun, Moon, Settings, LogOut, Loader2, Sparkles, Info,
    TreePine, Droplets, Apple, Coffee, Newspaper, Wine, Lightbulb,
    ClipboardCheck, RefreshCw, MapPin,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { useLocations } from '../hooks/useSettings';

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
};

const slideUp = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } },
};

/* ── Tab Configuration ───────────────────────────────────── */
const TABS = [
    { id: 'reports', label: 'Reports', icon: ClipboardCheck },
    { id: 'input', label: 'Input', icon: Plus },
    { id: 'history', label: 'History', icon: History },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
];

/* ── Staff Info (Mock) ───────────────────────────────────── */
const staffInfo = {
    name: 'Rico Mendoza',
    id: 'MRF-001',
    shift: 'Morning Shift',
    avatar: null,
};

export default function MRFStaffDashboard() {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('reports');
    const [assignedReports, setAssignedReports] = useState([]);
    const [completedReports, setCompletedReports] = useState([]);
    const [reportsLoading, setReportsLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Load locations from API for InputTab
    const { locations: binLocations, loading: binLocationsLoading } = useLocations('BIN_LOCATION');

    // Get staff info from user context
    const staffInfo = {
        name: user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.username || 'MRF Staff',
        id: user?.id || 'MRF-001',
        shift: 'Morning Shift',
        avatar: null,
    };

    /* ── Fetch assigned reports ───────────────────────────── */
    const fetchAssignedReports = async () => {
        setReportsLoading(true);
        try {
            const response = await api.getAllReports();
            if (response.success && response.data?.reports) {
                // Filter reports assigned to this staff member
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
                // Filter completed reports assigned to this staff member
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
            // Auto-refresh every 30 seconds
            const interval = setInterval(() => {
                fetchAssignedReports();
                fetchHistory();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        if (!user?.id) return;

        const eventSource = new EventSource(api.getReportsStreamUrl());
        const handleRealtimeReport = (event) => {
            try {
                const payload = JSON.parse(event.data);
                console.log('📡 Real-time event received:', payload);
                // Refresh all reports for all staff to see real-time updates
                fetchAssignedReports();
                fetchHistory();
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

    /* ── Show toast notification ──────────────────────────── */
    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── Calculate report statistics ─────────────────────────── */
    const dispatchedCount = assignedReports.filter(r => r.status === 'DISPATCHED').length;
    const inProgressCount = assignedReports.filter(r => r.status === 'IN_PROGRESS').length;
    const completedCount = assignedReports.filter(r => r.status === 'COMPLETED').length;
    const totalKilosCollected = assignedReports
        .filter(r => r.kilosCollected !== null)
        .reduce((sum, r) => sum + (r.kilosCollected || 0), 0);

    /* ── Handle ad-hoc collection submission (Input tab) ─────────────────── */
    const handleNewCollection = async (newEntry) => {
        try {
            const response = await api.createReport({
                location: newEntry.location,
                wasteType: newEntry.wasteType,
                notes: newEntry.notes || `Ad-hoc collection: ${newEntry.weight}kg of ${newEntry.wasteType}`,
                urgency: 'normal'
            });

            if (response.success) {
                showToast('Collection recorded successfully!', 'success');
                // Refresh data
                fetchAssignedReports();
                fetchHistory();
            } else {
                showToast('Failed to record collection', 'error');
            }
        } catch (error) {
            showToast('Failed to record collection', 'error');
            console.error('Collection error:', error);
        }
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-eco-slate'} pb-24`}>
            {/* ── Header ────────────────────────────────────── */}
            <header className={`sticky top-0 z-40 ${isDark ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-eco-green text-white font-bold`}>
                            {staffInfo.name.charAt(0)}
                        </div>
                        <div>
                            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                {staffInfo.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                                {staffInfo.shift} · {staffInfo.id}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                            {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
                        </button>
                        <button className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                            <Settings className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Toast Notification ────────────────────────── */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className={`fixed top-20 left-1/2 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-lg ${toast?.type === 'error' ? 'bg-red-500' : 'bg-eco-green'
                            }`}
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">
                            {toast?.message || 'Collection recorded!'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Quick Stats Banner ────────────────────────── */}
            <div className="px-4 py-4">
                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className={`rounded-2xl p-4 ${isDark ? 'bg-gradient-to-r from-eco-green/20 to-teal-500/20 border border-eco-green/30' : 'bg-gradient-to-r from-eco-green to-teal-500'}`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className={`text-xs font-medium ${isDark ? 'text-eco-green' : 'text-emerald-100'}`}>
                                Assigned Reports
                            </p>
                            <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-white'}`}>
                                {assignedReports.length} <span className="text-lg font-medium">total</span>
                            </p>
                        </div>
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-eco-green/20' : 'bg-white/20'}`}>
                            <ClipboardCheck className={`h-7 w-7 ${isDark ? 'text-eco-green' : 'text-white'}`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-emerald-100'}`}>Dispatched</p>
                            <p className={`text-lg font-semibold ${isDark ? 'text-blue-400' : 'text-white'}`}>
                                {dispatchedCount}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-emerald-100'}`}>In Progress</p>
                            <p className={`text-lg font-semibold ${isDark ? 'text-yellow-400' : 'text-white'}`}>
                                {inProgressCount}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-emerald-100'}`}>Completed</p>
                            <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-white'}`}>
                                {completedCount}
                            </p>
                        </div>
                    </div>
                    {totalKilosCollected > 0 && (
                        <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-700' : 'border-white/20'}`}>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-emerald-100'}`}>Total Collected</p>
                            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-white'}`}>
                                {totalKilosCollected.toFixed(1)} kg
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* ── Tab Content ───────────────────────────────── */}
            <div className="px-4">
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
                        <InputTab key="input" isDark={isDark} onSubmit={handleNewCollection} onToast={showToast} binLocations={binLocations} />
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

            {/* ── Bottom Navigation ─────────────────────────── */}
            <nav className={`fixed bottom-0 left-0 right-0 z-50 ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} border-t backdrop-blur-lg safe-area-bottom`}>
                <div className="flex justify-around py-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${activeTab === tab.id
                                ? 'text-eco-green'
                                : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <div className={`p-1.5 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-eco-green/10' : ''}`}>
                                <tab.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   REPORTS TAB - Assigned Waste Collection Tasks
   ══════════════════════════════════════════════════════════ */
function ReportsTab({ isDark, reports, isLoading, onRefresh, onToast }) {
    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [collectionWeight, setCollectionWeight] = useState('');
    const [collectionNotes, setCollectionNotes] = useState('');

    const handleUpdateStatus = async (reportId, newStatus, kilos = null) => {
        setIsUpdating(true);
        try {
            let response;

            // For DISPATCHED → IN_PROGRESS: use confirmCollection (requires kilos)
            if (newStatus === 'IN_PROGRESS' && kilos !== null) {
                response = await api.confirmCollection(reportId, kilos);
            }
            // For IN_PROGRESS → COMPLETED: use markAsDone (no kilos needed)
            else if (newStatus === 'COMPLETED') {
                response = await api.markAsDone(reportId);
            }
            // For other status updates
            else {
                response = await api.updateReportStatus(reportId, newStatus);
            }

            if (response.success) {
                onToast(response.message || `Report ${newStatus.toLowerCase().replace('_', ' ')}`, 'success');
                onRefresh();
                setShowDetailsModal(false);
                setShowCollectionForm(false);
                setCollectionWeight('');
                setCollectionNotes('');
            } else {
                onToast(response.message || 'Failed to update report', 'error');
            }
        } catch (error) {
            onToast(error.message || 'Failed to update report', 'error');
            console.error('Update error:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRecordCollection = () => {
        if (!collectionWeight || parseFloat(collectionWeight) <= 0) {
            onToast('Please enter a valid weight', 'error');
            return;
        }
        // For DISPATCHED reports: record kilos and mark IN_PROGRESS
        if (selectedReport.status === 'DISPATCHED') {
            handleUpdateStatus(selectedReport.id, 'IN_PROGRESS', parseFloat(collectionWeight));
        }
        // For IN_PROGRESS reports: just mark COMPLETED (kilos already recorded)
        else if (selectedReport.status === 'IN_PROGRESS') {
            handleUpdateStatus(selectedReport.id, 'COMPLETED');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'DISPATCHED': return { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' };
            case 'IN_PROGRESS': return { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' };
            case 'COMPLETED': return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' };
            default: return { bg: 'bg-slate-500/10', text: 'text-slate-500', border: 'border-slate-500/20' };
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'HIGH': return { bg: 'bg-red-500/10', text: 'text-red-500' };
            case 'MEDIUM': return { bg: 'bg-orange-500/10', text: 'text-orange-500' };
            case 'LOW': return { bg: 'bg-green-500/10', text: 'text-green-500' };
            default: return { bg: 'bg-slate-500/10', text: 'text-slate-500' };
        }
    };

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-12"
            >
                <Loader2 className={`h-8 w-8 animate-spin ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
            </motion.div>
        );
    }

    if (reports.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-8 text-center ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}
            >
                <ClipboardCheck className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-700' : 'text-slate-300'}`} />
                <p className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    No Assigned Reports
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                    You don't have any waste collection tasks assigned yet.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-3"
        >
            {/* Refresh Button */}
            <div className="flex justify-between items-center mb-2">
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    Your Assigned Tasks
                </h3>
                <button
                    onClick={onRefresh}
                    disabled={isLoading}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''} ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                </button>
            </div>

            {/* Reports List */}
            {reports.map((report, idx) => {
                const statusColor = getStatusColor(report.status);
                const urgencyColor = getUrgencyColor(report.urgency);

                return (
                    <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                            setSelectedReport(report);
                            setShowDetailsModal(true);
                            setShowCollectionForm(false);
                            setCollectionWeight('');
                            setCollectionNotes('');
                        }}
                        className={`rounded-2xl p-4 cursor-pointer transition-all ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white hover:bg-slate-50'
                            } shadow-card`}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 rounded-xl ${urgencyColor.bg}`}>
                                    <AlertCircle className={`h-5 w-5 ${urgencyColor.text}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                            {report.wasteType}
                                        </p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${urgencyColor.bg} ${urgencyColor.text} font-medium`}>
                                            {report.urgency}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <MapPin className={`h-3.5 w-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                                        <span className={isDark ? 'text-slate-400' : 'text-eco-muted'}>
                                            {report.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                        </div>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${statusColor.text.replace('text-', 'bg-')}`} />
                            <span className="text-xs font-medium">
                                {report.status.replace('_', ' ')}
                            </span>
                        </div>

                        {/* Collection Info */}
                        {report.kilosCollected !== null && (
                            <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                                <div className="flex items-center gap-2">
                                    <Scale className={`h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                        {report.kilosCollected} kg collected
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            })}

            {/* Report Details Modal */}
            <AnimatePresence>
                {showDetailsModal && selectedReport && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setShowDetailsModal(false);
                                setShowCollectionForm(false);
                                setCollectionWeight('');
                                setCollectionNotes('');
                            }}
                            className="fixed inset-0 bg-black/50 z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`fixed bottom-0 left-0 right-0 z-50 ${isDark ? 'bg-slate-900' : 'bg-white'} rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto pb-20`}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                    Report Details
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        setShowCollectionForm(false);
                                        setCollectionWeight('');
                                        setCollectionNotes('');
                                    }}
                                    className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                                >
                                    <X className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                                </button>
                            </div>

                            {/* Report Info */}
                            <div className="space-y-4">
                                <div>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'} mb-1`}>Waste Type</p>
                                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>{selectedReport.wasteType}</p>
                                </div>
                                <div>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'} mb-1`}>Status</p>
                                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>{selectedReport.status}</p>
                                </div>
                                <div>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'} mb-1`}>Location</p>
                                    <div className="flex items-center gap-2">
                                        <MapPin className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-eco-muted'}`} />
                                        <p className={`${isDark ? 'text-white' : 'text-eco-text'}`}>{selectedReport.location}</p>
                                    </div>
                                </div>
                                {selectedReport.notes && (
                                    <div>
                                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'} mb-1`}>Notes</p>
                                        <p className={`${isDark ? 'text-white' : 'text-eco-text'}`}>{selectedReport.notes}</p>
                                    </div>
                                )}

                                {/* Collection Form - Shows when recording collection */}
                                {showCollectionForm ? (
                                    <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'} space-y-4`}>
                                        {/* For DISPATCHED: Enter weight */}
                                        {selectedReport.status === 'DISPATCHED' && (
                                            <div>
                                                <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                                    Enter Weight Collected
                                                </p>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={collectionWeight}
                                                        onChange={(e) => setCollectionWeight(e.target.value)}
                                                        placeholder="0.0"
                                                        step="0.1"
                                                        min="0"
                                                        autoFocus
                                                        className={`w-full text-3xl font-bold text-center py-3 rounded-xl border-2 transition-colors ${isDark
                                                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600 focus:border-eco-green'
                                                            : 'bg-white border-slate-200 text-eco-text placeholder-slate-300 focus:border-eco-green'
                                                            } focus:outline-none`}
                                                    />
                                                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                                                        kg
                                                    </span>
                                                </div>
                                                {/* Quick add buttons */}
                                                <div className="flex gap-2 mt-2">
                                                    {[0.5, 1, 2, 5, 10].map((w) => (
                                                        <button
                                                            key={w}
                                                            onClick={() => setCollectionWeight(String(parseFloat(collectionWeight || '0') + w))}
                                                            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${isDark
                                                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                                                }`}
                                                        >
                                                            +{w}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* For IN_PROGRESS: Show recorded weight */}
                                        {selectedReport.status === 'IN_PROGRESS' && selectedReport.kilosCollected && (
                                            <div className="text-center py-4">
                                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'} mb-2`}>
                                                    Weight Already Recorded
                                                </p>
                                                <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                                    {selectedReport.kilosCollected} <span className="text-xl">kg</span>
                                                </p>
                                                <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                                                    Ready to mark as complete
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                                Notes <span className={`font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>(optional)</span>
                                            </p>
                                            <textarea
                                                value={collectionNotes}
                                                onChange={(e) => setCollectionNotes(e.target.value)}
                                                placeholder="Add any additional details..."
                                                rows={2}
                                                className={`w-full p-3 rounded-xl border-2 resize-none transition-colors ${isDark
                                                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600 focus:border-eco-green'
                                                    : 'bg-white border-slate-200 text-eco-text placeholder-slate-400 focus:border-eco-green'
                                                    } focus:outline-none`}
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setShowCollectionForm(false);
                                                    setCollectionWeight('');
                                                    setCollectionNotes('');
                                                }}
                                                disabled={isUpdating}
                                                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${isDark
                                                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                                    } disabled:opacity-50`}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleRecordCollection}
                                                disabled={isUpdating || (selectedReport.status === 'DISPATCHED' && (!collectionWeight || parseFloat(collectionWeight) <= 0))}
                                                className="flex-1 py-3 rounded-xl bg-eco-green text-white font-semibold hover:bg-eco-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUpdating ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> :
                                                    selectedReport.status === 'DISPATCHED' ? 'Start & Record Collection' : 'Complete Collection'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Action Buttons - Shows when not in collection form */
                                    <div className="space-y-2 pt-4">
                                        {selectedReport.status === 'DISPATCHED' && (
                                            <button
                                                onClick={() => setShowCollectionForm(true)}
                                                className={`w-full py-3 rounded-xl bg-eco-green text-white font-semibold hover:bg-eco-green-dark transition-colors flex items-center justify-center gap-2`}
                                            >
                                                <Scale className="h-5 w-5" />
                                                Record Collection
                                            </button>
                                        )}
                                        {selectedReport.status === 'IN_PROGRESS' && (
                                            <>
                                                {selectedReport.kilosCollected && (
                                                    <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'} text-center mb-2`}>
                                                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>Weight Recorded</p>
                                                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                                            {selectedReport.kilosCollected} kg
                                                        </p>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleUpdateStatus(selectedReport.id, 'COMPLETED')}
                                                    disabled={isUpdating}
                                                    className="w-full py-3 rounded-xl bg-eco-green text-white font-semibold hover:bg-eco-green-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                                        <>
                                                            <CheckCircle2 className="h-5 w-5" />
                                                            Mark as Complete
                                                        </>
                                                    )}
                                                </button>
                                            </>
                                        )}
                                        {selectedReport.status === 'COMPLETED' && (
                                            <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10' : 'bg-green-50'} text-center`}>
                                                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                                <p className={`font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                                    Collection Completed
                                                </p>
                                                {selectedReport.kilosCollected && (
                                                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                                                        {selectedReport.kilosCollected} kg collected
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   INPUT TAB - Waste Collection Entry Form
   ══════════════════════════════════════════════════════════ */

const DEFAULT_BIN_LOCATIONS = [
    { id: 'LOC-01', name: 'Cafeteria \u2013 Block A' },
    { id: 'LOC-02', name: 'Library Entrance' },
    { id: 'LOC-03', name: 'Gym Hallway' },
    { id: 'LOC-04', name: 'Engineering Bldg \u2013 2F' },
    { id: 'LOC-05', name: 'Parking Lot B' },
    { id: 'LOC-06', name: 'Student Center' },
    { id: 'LOC-07', name: 'Science Hall \u2013 1F' },
    { id: 'LOC-08', name: 'Admin Building Lobby' },
    { id: 'LOC-09', name: 'Arts Building \u2013 GF' },
    { id: 'LOC-10', name: 'Main Gate Area' },
];

function getLiveBins() {
    try {
        const stored = localStorage.getItem('campusBins');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map(b => ({ id: b.id, name: b.name, status: b.fillStatus || 'empty' }));
            }
        }
    } catch { /* ignore */ }
    return DEFAULT_BIN_LOCATIONS.map(b => ({ ...b, status: 'empty' }));
}

/* ══════════════════════════════════════════════════════════
   INPUT TAB - Ad-hoc Collection Entry (Outside Assigned Reports)
   ══════════════════════════════════════════════════════════ */
function InputTab({ isDark, onSubmit, onToast, binLocations = [] }) {
    const [wasteType, setWasteType] = useState('');
    const [weight, setWeight] = useState('');
    const [location, setLocation] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredBins = binLocations.filter(b =>
        b.name.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!wasteType || !weight || !location) {
            onToast('Please fill in all required fields', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                wasteType,
                weight: parseFloat(weight),
                location,
                notes: notes || `Ad-hoc collection: ${weight}kg of ${wasteType}`,
            });
            // Reset form on success
            setWasteType('');
            setWeight('');
            setLocation('');
            setLocationSearch('');
            setNotes('');
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = wasteType && weight && location && parseFloat(weight) > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Info Banner */}
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-50 border border-blue-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                        <Info className="inline h-4 w-4 mr-1" />
                        Record waste found outside of assigned tasks
                    </p>
                </div>

                {/* Waste Type Input */}
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <label className={`text-sm font-semibold mb-3 block ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Waste Type *
                    </label>
                    <input
                        type="text"
                        value={wasteType}
                        onChange={(e) => setWasteType(e.target.value)}
                        placeholder="e.g., Plastic bottles, Mixed waste"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${isDark
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-eco-green'
                            : 'bg-slate-50 border-slate-200 text-eco-text placeholder-slate-400 focus:border-eco-green'
                            } focus:outline-none`}
                        disabled={isSubmitting}
                    />
                </div>

                {/* Weight Input */}
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <label className={`text-sm font-semibold mb-3 block ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Weight (kg) *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="0.0"
                            step="0.1"
                            min="0"
                            className={`w-full text-3xl font-bold text-center py-4 rounded-xl border-2 transition-colors ${isDark
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-eco-green'
                                : 'bg-slate-50 border-slate-200 text-eco-text placeholder-slate-300 focus:border-eco-green'
                                } focus:outline-none`}
                            disabled={isSubmitting}
                        />
                        <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium ${isDark ? 'text-slate-400' : 'text-eco-muted'
                            }`}>
                            kg
                        </span>
                    </div>
                    {/* Quick add buttons */}
                    <div className="flex gap-2 mt-3">
                        {[0.5, 1, 2, 5].map((w) => (
                            <button
                                key={w}
                                type="button"
                                onClick={() => setWeight(String(parseFloat(weight || 0) + w))}
                                disabled={isSubmitting}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${isDark
                                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50'
                                    }`}
                            >
                                +{w}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Location Input */}
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <label className={`text-sm font-semibold mb-3 block ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Location *
                    </label>
                    {!location ? (
                        <div>
                            <div className={`flex items-center gap-2 rounded-xl border-2 px-3 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                                <MapPin className={`h-4 w-4 shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                                <input
                                    type="text"
                                    value={locationSearch}
                                    onChange={(e) => { setLocationSearch(e.target.value); setShowLocationDropdown(true); }}
                                    onFocus={() => setShowLocationDropdown(true)}
                                    placeholder="Search bin location..."
                                    disabled={isSubmitting}
                                    className={`flex-1 py-3 text-sm bg-transparent focus:outline-none ${isDark ? 'text-white placeholder-slate-500' : 'text-eco-text placeholder-slate-400'}`}
                                />
                            </div>
                            {showLocationDropdown && (
                                <div className={`mt-1 rounded-xl overflow-hidden border max-h-48 overflow-y-auto ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-lg`}>
                                    {filteredBins.length > 0 ? filteredBins.map((b) => (
                                        <button
                                            key={b.id}
                                            type="button"
                                            onClick={() => { setLocation(b.name); setLocationSearch(''); setShowLocationDropdown(false); }}
                                            className={`w-full flex items-center gap-2 px-4 py-3 text-sm text-left transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-eco-text'}`}
                                        >
                                            <MapPin className="h-3.5 w-3.5 text-eco-green shrink-0" />
                                            {b.name}
                                        </button>
                                    )) : (
                                        <p className={`px-4 py-3 text-sm text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No matching bins</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 ${isDark ? 'bg-slate-800 border-eco-green/30' : 'bg-eco-green/5 border-eco-green/20'}`}>
                            <MapPin className="h-4 w-4 text-eco-green shrink-0" />
                            <span className={`flex-1 text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>{location}</span>
                            <button type="button" onClick={() => setLocation('')}
                                className={`text-xs px-2 py-1 rounded-lg ${isDark ? 'bg-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-700'}`}>
                                Change
                            </button>
                        </div>
                    )}
                </div>

                {/* Notes (Optional) */}
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <label className={`text-sm font-semibold mb-3 block ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any additional details..."
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${isDark
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-eco-green'
                            : 'bg-slate-50 border-slate-200 text-eco-text placeholder-slate-400 focus:border-eco-green'
                            } focus:outline-none`}
                        disabled={isSubmitting}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 rounded-2xl font-semibold text-white transition-all ${isFormValid && !isSubmitting
                        ? 'bg-eco-green hover:bg-eco-green/90 active:scale-[0.98]'
                        : 'bg-slate-300 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Recording...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>Record Collection</span>
                        </div>
                    )}
                </button>
            </form>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   HISTORY TAB - Completed Collections from Database
   ══════════════════════════════════════════════════════════ */
function HistoryTab({ isDark, reports, isLoading, onRefresh }) {
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-12"
            >
                <Loader2 className={`h-8 w-8 animate-spin ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
            </motion.div>
        );
    }

    if (reports.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-8 text-center ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}
            >
                <History className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-700' : 'text-slate-300'}`} />
                <p className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    No History Yet
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                    Completed collections will appear here
                </p>
            </motion.div>
        );
    }

    // Group by date
    const grouped = reports.reduce((acc, report) => {
        const date = new Date(report.collectionDate || report.updatedAt).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(report);
        return acc;
    }, {});

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
        >
            {/* Refresh Button */}
            <div className="flex justify-end mb-2">
                <button
                    onClick={onRefresh}
                    disabled={isLoading}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''} ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                </button>
            </div>

            {/* Collection List */}
            {Object.entries(grouped).map(([date, items]) => (
                <div key={date}>
                    <h4 className={`text-xs font-semibold mb-2 ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                        {date === new Date().toDateString() ? 'Today' : date}
                    </h4>
                    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                        {items.map((report, idx) => (
                            <div
                                key={report.id}
                                className={`flex items-center gap-3 p-4 ${idx !== items.length - 1
                                    ? (isDark ? 'border-b border-slate-800' : 'border-b border-slate-100')
                                    : ''
                                    } `}
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-medium ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                        {report.wasteType}
                                    </p>
                                    <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                                        {report.location}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                        {report.kilosCollected ? `${report.kilosCollected} kg` : 'N/A'}
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                                        {new Date(report.collectionDate || report.updatedAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
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
   STATS TAB - Collection Statistics
   ══════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════
   STATS TAB - Collection Statistics from Completed Reports
   ══════════════════════════════════════════════════════════ */
function StatsTab({ isDark, reports }) {
    // Calculate total weight and entries
    const totalWeight = reports.reduce((sum, r) => sum + (r.kilosCollected || 0), 0);
    const totalEntries = reports.length;

    // Group by waste type
    const wasteTypeStats = reports.reduce((acc, report) => {
        const type = report.wasteType || 'Unknown';
        if (!acc[type]) acc[type] = { total: 0, count: 0 };
        acc[type].total += (report.kilosCollected || 0);
        acc[type].count += 1;
        return acc;
    }, {});

    const sortedStats = Object.entries(wasteTypeStats)
        .map(([type, data]) => ({ type, ...data }))
        .sort((a, b) => b.total - a.total);

    // Weekly data
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = weekDays.map((day, idx) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - idx));
        const dayReports = reports.filter(r => {
            const reportDate = new Date(r.collectionDate || r.updatedAt);
            return reportDate.toDateString() === d.toDateString();
        });
        return {
            day: day,
            weight: dayReports.reduce((sum, r) => sum + (r.kilosCollected || 0), 0),
        };
    });
    const maxWeekWeight = Math.max(...weekData.map(d => d.weight), 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
        >
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${isDark ? 'bg-eco-green/20' : 'bg-eco-green/10'}`}>
                        <Scale className="h-5 w-5 text-eco-green" />
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        {totalWeight.toFixed(1)}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                        Total kg
                    </p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
                        <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        {totalEntries}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                        Total Entries
                    </p>
                </div>
            </div>

            {/* Weekly Chart */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    This Week
                </h3>
                <div className="flex items-end justify-between gap-2 h-32">
                    {weekData.map((d, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex-1 flex items-end">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.weight / maxWeekWeight) * 100}%` }}
                                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                                    className={`w-full rounded-t-lg ${idx === 6 ? 'bg-eco-green' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
                                    style={{ minHeight: d.weight > 0 ? '8px' : '0px' }}
                                />
                            </div>
                            <span className={`text-xs ${idx === 6 ? 'text-eco-green font-semibold' : isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                                {d.day}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Waste Type Breakdown */}
            {sortedStats.length > 0 && (
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        By Waste Type
                    </h3>
                    <div className="space-y-3">
                        {sortedStats.map((stat) => {
                            const percentage = totalWeight > 0 ? (stat.total / totalWeight) * 100 : 0;

                            return (
                                <div key={stat.type}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-sm ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                            {stat.type}
                                        </span>
                                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                            {stat.total.toFixed(1)} kg
                                        </span>
                                    </div>
                                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}% ` }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full rounded-full bg-eco-green"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {totalEntries === 0 && (
                <div className={`text-center py-12 ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No statistics available yet</p>
                </div>
            )}
        </motion.div>
    );
}
