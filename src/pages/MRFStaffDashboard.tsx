/* =========================================================
   EcoLedger – MRF Staff Mobile Dashboard
   Mobile-optimized interface for Materials Recovery Facility staff
   to input collected waste with weight and category.
   TypeScript version.
   ========================================================= */

import { useState, useEffect, type ChangeEvent, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale, Trash2, Recycle, Plus, ChevronRight,
    Leaf, Clock, TrendingUp, Package, Truck, AlertCircle,
    X, CheckCircle2, FileText, BarChart3, History,
    Sun, Moon, Settings, Loader2, Sparkles,
    Newspaper, Wine, Lightbulb, Apple, Coffee,
    MapPin, ClipboardCheck, RefreshCw,
    type LucideIcon,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
    WASTE_CATEGORIES,
    wasteCollections,
    collectionLocations,
    type WasteCollection,
    type WasteCategoryType,
} from '../data/reportState';

/* ── Type Definitions ────────────────────────────────────── */
interface Tab {
    id: string;
    label: string;
    icon: LucideIcon;
}

interface CategoryConfig {
    icon: LucideIcon;
    color: string;
    lightBg: string;
    text: string;
    label: string;
}

interface StaffInfo {
    name: string;
    id: string;
    shift: string;
    avatar: string | null;
}

interface WeekData {
    day: string;
    weight: number;
}

interface CategoryStat {
    category: WasteCategoryType;
    total: number;
    count: number;
}

interface NewCollectionEntry {
    category: WasteCategoryType;
    weight: number;
    location: string;
    notes: string;
}

interface AssignedReport {
    id: string;
    location: string;
    notes: string | null;
    wasteType: string;
    urgency: string;
    status: string;
    type: string;
    assignedStaffId: string | null;
    assignedStaffName: string | null;
    kilosCollected: number | null;
    collectionDate: string | null;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        username: string;
        firstName: string | null;
        lastName: string | null;
        role: string;
    };
}

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
};

const slideUp = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } },
};

/* ── Category Icons & Colors ─────────────────────────────── */
const categoryConfig: Record<WasteCategoryType, CategoryConfig> = {
    [WASTE_CATEGORIES.BIODEGRADABLE]: {
        icon: Leaf,
        color: 'bg-green-500',
        lightBg: 'bg-green-500/10',
        text: 'text-green-500',
        label: 'Biodegradable',
    },
    [WASTE_CATEGORIES.RECYCLABLE]: {
        icon: Recycle,
        color: 'bg-blue-500',
        lightBg: 'bg-blue-500/10',
        text: 'text-blue-500',
        label: 'Recyclable',
    },
    [WASTE_CATEGORIES.RESIDUAL]: {
        icon: Trash2,
        color: 'bg-gray-500',
        lightBg: 'bg-gray-500/10',
        text: 'text-gray-500',
        label: 'Residual',
    },
    [WASTE_CATEGORIES.HAZARDOUS]: {
        icon: AlertCircle,
        color: 'bg-red-500',
        lightBg: 'bg-red-500/10',
        text: 'text-red-500',
        label: 'Hazardous',
    },
    [WASTE_CATEGORIES.PLASTIC]: {
        icon: Wine,
        color: 'bg-cyan-500',
        lightBg: 'bg-cyan-500/10',
        text: 'text-cyan-500',
        label: 'Plastic',
    },
    [WASTE_CATEGORIES.PAPER]: {
        icon: Newspaper,
        color: 'bg-amber-500',
        lightBg: 'bg-amber-500/10',
        text: 'text-amber-500',
        label: 'Paper',
    },
    [WASTE_CATEGORIES.GLASS]: {
        icon: Coffee,
        color: 'bg-purple-500',
        lightBg: 'bg-purple-500/10',
        text: 'text-purple-500',
        label: 'Glass',
    },
    [WASTE_CATEGORIES.METAL]: {
        icon: Package,
        color: 'bg-orange-500',
        lightBg: 'bg-orange-500/10',
        text: 'text-orange-500',
        label: 'Metal',
    },
    [WASTE_CATEGORIES.EWASTE]: {
        icon: Lightbulb,
        color: 'bg-yellow-500',
        lightBg: 'bg-yellow-500/10',
        text: 'text-yellow-500',
        label: 'E-Waste',
    },
    [WASTE_CATEGORIES.ORGANIC]: {
        icon: Apple,
        color: 'bg-lime-500',
        lightBg: 'bg-lime-500/10',
        text: 'text-lime-500',
        label: 'Organic',
    },
};

/* ── Tab Configuration ───────────────────────────────────── */
const TABS: Tab[] = [
    { id: 'reports', label: 'Reports', icon: ClipboardCheck },
    { id: 'input', label: 'Input', icon: Plus },
    { id: 'history', label: 'History', icon: History },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
];

/* ── Staff Info (Mock) ───────────────────────────────────── */
const staffInfo: StaffInfo = {
    name: 'Rico Mendoza',
    id: 'MRF-001',
    shift: 'Morning Shift',
    avatar: null,
};

export default function MRFStaffDashboard(): JSX.Element {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('reports');
    const [collections, setCollections] = useState<WasteCollection[]>(wasteCollections);
    const [showSuccess, setShowSuccess] = useState(false);
    const [assignedReports, setAssignedReports] = useState<AssignedReport[]>([]);
    const [reportsLoading, setReportsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Get staff info from user context
    const staffInfo: StaffInfo = {
        name: user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.username || 'MRF Staff',
        id: user?.id || 'MRF-001',
        shift: 'Morning Shift',
        avatar: null,
    };

    /* ── Fetch assigned reports ───────────────────────────── */
    const fetchAssignedReports = async (): Promise<void> => {
        setReportsLoading(true);
        try {
            const response = await api.getAllReports();
            if (response.success && response.data?.reports) {
                // Filter reports assigned to this staff member
                const myReports = response.data.reports.filter(
                    (r: any) => r.assignedStaffId === user?.id
                );
                setAssignedReports(myReports);
            }
        } catch (error: any) {
            console.error('Failed to fetch reports:', error);
            showToast('Failed to load reports', 'error');
        } finally {
            setReportsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAssignedReports();
            // Auto-refresh every 30 seconds
            const interval = setInterval(fetchAssignedReports, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    /* ── Show toast notification ──────────────────────────── */
    const showToast = (message: string, type: 'success' | 'error'): void => {
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

    /* ── Calculate today's totals (for manual input) ─────────────────────────── */
    const today = new Date().toDateString();
    const todayCollections = collections.filter(
        c => new Date(c.timestamp).toDateString() === today
    );
    const todayTotal = todayCollections.reduce((sum, c) => sum + c.weight, 0);

    /* ── Handle new collection submission ─────────────────── */
    const handleNewCollection = (newEntry: NewCollectionEntry): void => {
        const entry: WasteCollection = {
            ...newEntry,
            id: `COL-${String(collections.length + 1).padStart(3, '0')}`,
            timestamp: new Date().toISOString(),
            collectedBy: staffInfo.name,
        };
        setCollections([entry, ...collections]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-eco-slate'} pb-24`}>
            {/* ── Header ────────────────────────────────────── */}
            <header className={`sticky top-0 z-40 ${isDark ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-eco-green text-white font-bold">
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
                {(showSuccess || toast) && (
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
                        <InputTab key="input" isDark={isDark} onSubmit={handleNewCollection} />
                    )}
                    {activeTab === 'history' && (
                        <HistoryTab key="history" isDark={isDark} collections={collections} />
                    )}
                    {activeTab === 'stats' && (
                        <StatsTab key="stats" isDark={isDark} collections={collections} />
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
   INPUT TAB - Waste Collection Entry Form
   ══════════════════════════════════════════════════════════ */
interface InputTabProps {
    isDark: boolean;
    onSubmit: (entry: NewCollectionEntry) => void;
}

function InputTab({ isDark, onSubmit }: InputTabProps): JSX.Element {
    const [selectedCategory, setSelectedCategory] = useState<WasteCategoryType | null>(null);
    const [weight, setWeight] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);

    const categories = Object.values(WASTE_CATEGORIES) as WasteCategoryType[];

    const handleSubmit = (): void => {
        if (!selectedCategory || !weight || !location) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            onSubmit({
                category: selectedCategory,
                weight: parseFloat(weight),
                location,
                notes,
            });
            // Reset form
            setSelectedCategory(null);
            setWeight('');
            setLocation('');
            setNotes('');
            setIsSubmitting(false);
        }, 500);
    };

    const isFormValid = selectedCategory && weight && location && parseFloat(weight) > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
        >
            {/* ── Category Selection ────────────────────────── */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    Select Waste Category
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {categories.map((cat) => {
                        const config = categoryConfig[cat];
                        const Icon = config.icon;
                        const isSelected = selectedCategory === cat;

                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isSelected
                                    ? `${config.color} text-white scale-105`
                                    : isDark
                                        ? `bg-slate-800 ${config.text} hover:bg-slate-700`
                                        : `${config.lightBg} ${config.text} hover:scale-105`
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-[10px] font-medium text-center leading-tight">
                                    {config.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Weight Input ──────────────────────────────── */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    Enter Weight
                </h3>
                <div className="relative">
                    <input
                        type="number"
                        value={weight}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}
                        placeholder="0.0"
                        step="0.1"
                        min="0"
                        className={`w-full text-4xl font-bold text-center py-4 rounded-xl border-2 transition-colors ${isDark
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-eco-green'
                            : 'bg-slate-50 border-slate-200 text-eco-text placeholder-slate-300 focus:border-eco-green'
                            } focus:outline-none`}
                    />
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                        kg
                    </span>
                </div>
                {/* Quick weight buttons */}
                <div className="flex gap-2 mt-3">
                    {[0.5, 1, 2, 5, 10].map((w) => (
                        <button
                            key={w}
                            onClick={() => setWeight(String(parseFloat(weight || '0') + w))}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${isDark
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            +{w}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Location Selection ────────────────────────── */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    Collection Point
                </h3>
                <button
                    onClick={() => setShowLocationPicker(true)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors ${location
                        ? isDark ? 'border-eco-green bg-eco-green/10' : 'border-eco-green bg-eco-green/5'
                        : isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
                        }`}
                >
                    <span className={location ? (isDark ? 'text-white' : 'text-eco-text') : (isDark ? 'text-slate-500' : 'text-slate-400')}>
                        {location || 'Select location...'}
                    </span>
                    <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </button>
            </div>

            {/* ── Notes (Optional) ──────────────────────────── */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    Notes <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>(optional)</span>
                </h3>
                <textarea
                    value={notes}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                    placeholder="Add any additional details..."
                    rows={2}
                    className={`w-full p-3 rounded-xl border-2 resize-none transition-colors ${isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-eco-green'
                        : 'bg-slate-50 border-slate-200 text-eco-text placeholder-slate-400 focus:border-eco-green'
                        } focus:outline-none`}
                />
            </div>

            {/* ── Submit Button ─────────────────────────────── */}
            <motion.button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${isFormValid
                    ? 'bg-eco-green text-white hover:bg-eco-green-dark'
                    : isDark
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
            >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        <CheckCircle2 className="h-5 w-5" />
                        Record Collection
                    </>
                )}
            </motion.button>

            {/* ── Location Picker Modal ─────────────────────── */}
            <AnimatePresence>
                {showLocationPicker && (
                    <LocationPicker
                        isDark={isDark}
                        onSelect={(loc: string) => {
                            setLocation(loc);
                            setShowLocationPicker(false);
                        }}
                        onClose={() => setShowLocationPicker(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── Location Picker Bottom Sheet ─────────────────────────── */
interface LocationPickerProps {
    isDark: boolean;
    onSelect: (location: string) => void;
    onClose: () => void;
}

function LocationPicker({ isDark, onSelect, onClose }: LocationPickerProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                variants={slideUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className={`absolute bottom-0 left-0 right-0 rounded-t-3xl ${isDark ? 'bg-slate-900' : 'bg-white'} max-h-[70vh] overflow-hidden`}
            >
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                            Select Collection Point
                        </h3>
                        <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                            <X className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                        </button>
                    </div>
                </div>
                <div className="p-4 overflow-y-auto max-h-[calc(70vh-80px)] safe-area-bottom">
                    <div className="space-y-2">
                        {collectionLocations.map((loc) => (
                            <button
                                key={loc.id}
                                onClick={() => onSelect(loc.name)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                                    }`}
                            >
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isDark ? 'bg-slate-800' : 'bg-eco-green/10'}`}>
                                    <Truck className="h-5 w-5 text-eco-green" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className={`font-medium ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                        {loc.name}
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                                        {loc.building}
                                    </p>
                                </div>
                                <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   REPORTS TAB - Assigned Reports Management
   ══════════════════════════════════════════════════════════ */
interface ReportsTabProps {
    isDark: boolean;
    reports: AssignedReport[];
    isLoading: boolean;
    onRefresh: () => Promise<void>;
    onToast: (message: string, type: 'success' | 'error') => void;
}

function ReportsTab({ isDark, reports, isLoading, onRefresh, onToast }: ReportsTabProps): JSX.Element {
    const [selectedReport, setSelectedReport] = useState<AssignedReport | null>(null);
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [kilosInput, setKilosInput] = useState('');
    const [processing, setProcessing] = useState(false);
    const [statusFilter, setStatusFilter] = useState<'all' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED'>('all');

    // Filter reports by selected status
    const filteredReports = statusFilter === 'all'
        ? reports
        : reports.filter(r => r.status === statusFilter);

    // Separate reports by status
    const dispatchedReports = filteredReports.filter(r => r.status === 'DISPATCHED');
    const inProgressReports = filteredReports.filter(r => r.status === 'IN_PROGRESS');
    const completedReports = filteredReports.filter(r => r.status === 'COMPLETED');

    const handleConfirmCollection = async (reportId: string) => {
        if (!kilosInput || parseFloat(kilosInput) <= 0) {
            onToast('Please enter a valid weight', 'error');
            return;
        }

        setProcessing(true);
        try {
            const response = await api.confirmCollection(reportId, parseFloat(kilosInput));
            if (response.success) {
                onToast('Collection confirmed successfully!', 'success');
                setShowCollectionModal(false);
                setKilosInput('');
                setSelectedReport(null);
                await onRefresh();
            }
        } catch (error: any) {
            onToast(error.response?.data?.error || 'Failed to confirm collection', 'error');
        } finally {
            setProcessing(false);
        }
    };

    const handleMarkAsDone = async (reportId: string) => {
        if (!window.confirm('Mark this report as completed?')) return;

        setProcessing(true);
        try {
            const response = await api.markAsDone(reportId);
            if (response.success) {
                onToast('Report marked as completed!', 'success');
                await onRefresh();
            }
        } catch (error: any) {
            onToast(error.response?.data?.error || 'Failed to mark as done', 'error');
        } finally {
            setProcessing(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DISPATCHED':
                return 'bg-blue-500/10 text-blue-500';
            case 'IN_PROGRESS':
                return 'bg-yellow-500/10 text-yellow-500';
            case 'COMPLETED':
                return 'bg-green-500/10 text-green-500';
            default:
                return 'bg-gray-500/10 text-gray-500';
        }
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'HIGH':
                return 'bg-red-500';
            case 'MEDIUM':
                return 'bg-yellow-500';
            default:
                return 'bg-green-500';
        }
    };

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-12"
            >
                <Loader2 className={`h-8 w-8 animate-spin ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            </motion.div>
        );
    }

    if (reports.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className={`rounded-2xl p-8 text-center ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}
            >
                <ClipboardCheck className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    No Assigned Reports
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                    You'll see reports assigned to you here
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
        >
            {/* Filter Tabs */}
            <div className={`rounded-2xl p-3 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        My Assigned Reports
                    </h3>
                    <button
                        onClick={() => onRefresh()}
                        className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                        title="Refresh"
                    >
                        <RefreshCw className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                    </button>
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {[
                        { value: 'all', label: 'All', count: reports.length },
                        { value: 'DISPATCHED', label: 'Dispatched', count: reports.filter(r => r.status === 'DISPATCHED').length },
                        { value: 'IN_PROGRESS', label: 'In Progress', count: reports.filter(r => r.status === 'IN_PROGRESS').length },
                        { value: 'COMPLETED', label: 'Completed', count: reports.filter(r => r.status === 'COMPLETED').length },
                    ].map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setStatusFilter(filter.value as any)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${statusFilter === filter.value
                                ? 'bg-eco-green text-white'
                                : isDark
                                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {filter.label}
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${statusFilter === filter.value
                                ? 'bg-white/20'
                                : isDark ? 'bg-slate-700' : 'bg-slate-200'
                                }`}>
                                {filter.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Empty state for filtered view */}
            {filteredReports.length === 0 && statusFilter !== 'all' && (
                <div className={`rounded-2xl p-6 text-center ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                    <ClipboardCheck className={`h-10 w-10 mx-auto mb-2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                        No {statusFilter.toLowerCase().replace('_', ' ')} reports
                    </p>
                </div>
            )}

            {/* Dispatched Reports (Need to Start Collection) */}
            {dispatchedReports.length > 0 && (
                <div className="space-y-3">
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Dispatched ({dispatchedReports.length})
                    </h3>
                    {dispatchedReports.map((report) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card border-2 border-blue-500/20`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${report.type === 'WASTE' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {report.type === 'WASTE' ? '🗑️ WASTE' : '📦 ASSET'}
                                        </span>
                                        <span className={`h-2 w-2 rounded-full ${getUrgencyColor(report.urgency)}`} />
                                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {report.urgency}
                                        </span>
                                    </div>
                                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'} flex items-center gap-1.5`}>
                                        {report.type === 'WASTE' ? (
                                            <>
                                                <Trash2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                                <span>Waste Collection - {report.wasteType}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Package className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                                <span>Asset Recovery - {report.wasteType}</span>
                                            </>
                                        )}
                                    </h4>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-xs">
                                    <MapPin className={`h-3.5 w-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                        {report.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <FileText className={`h-3.5 w-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                        Reporter: {report.user.firstName} {report.user.lastName} ({report.user.role})
                                    </span>
                                </div>
                                {report.notes && (
                                    <div className={`text-xs p-2 rounded-lg ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                                        {report.notes}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedReport(report);
                                    setShowCollectionModal(true);
                                }}
                                className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                            >
                                <Scale className="h-4 w-4" />
                                Start Collection
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* In Progress Reports (Need to Complete) */}
            {inProgressReports.length > 0 && (
                <div className="space-y-3">
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        In Progress ({inProgressReports.length})
                    </h3>
                    {inProgressReports.map((report) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card border-2 border-yellow-500/20`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${report.type === 'WASTE' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {report.type === 'WASTE' ? '🗑️ WASTE' : '📦 ASSET'}
                                        </span>
                                    </div>
                                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'} flex items-center gap-1.5`}>
                                        {report.type === 'WASTE' ? (
                                            <>
                                                <Trash2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                                <span>Waste Collection - {report.wasteType}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Package className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                                <span>Asset Recovery - {report.wasteType}</span>
                                            </>
                                        )}
                                    </h4>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-xs">
                                    <MapPin className={`h-3.5 w-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                        {report.location}
                                    </span>
                                </div>
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                            Collected Weight:
                                        </span>
                                        <span className={`font-semibold ${isDark ? 'text-eco-green' : 'text-eco-green'}`}>
                                            {report.kilosCollected} kg
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleMarkAsDone(report.id)}
                                disabled={processing}
                                className="w-full py-2.5 rounded-xl bg-eco-green text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-eco-green-dark transition-colors disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        Mark as Done
                                    </>
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Completed Reports */}
            {completedReports.length > 0 && (
                <div className="space-y-3">
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Completed ({completedReports.length})
                    </h3>
                    {completedReports.map((report) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900/50' : 'bg-white/50'} shadow-card border border-green-500/20`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                                            ✓ COMPLETED
                                        </span>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${report.type === 'WASTE' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {report.type === 'WASTE' ? '🗑️ WASTE' : '📦 ASSET'}
                                        </span>
                                    </div>
                                    <h4 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'} flex items-center gap-1.5`}>
                                        {report.type === 'WASTE' ? (
                                            <>
                                                <Trash2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                                <span>Waste Collection - {report.wasteType}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Package className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                                <span>Asset Recovery - {report.wasteType}</span>
                                            </>
                                        )}
                                    </h4>
                                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {report.kilosCollected} kg collected
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Collection Modal */}
            <AnimatePresence>
                {showCollectionModal && selectedReport && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50"
                            onClick={() => setShowCollectionModal(false)}
                        />
                        <motion.div
                            variants={slideUp}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-2xl`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-eco-text'} flex items-center gap-2`}>
                                    {selectedReport.type === 'WASTE' ? (
                                        <>
                                            <Trash2 className="h-5 w-5 text-emerald-500" />
                                            Confirm Waste Collection
                                        </>
                                    ) : (
                                        <>
                                            <Package className="h-5 w-5 text-purple-500" />
                                            Confirm Asset Recovery
                                        </>
                                    )}
                                </h3>
                                <button
                                    onClick={() => setShowCollectionModal(false)}
                                    className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                                >
                                    <X className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                                </button>
                            </div>

                            <div className={`rounded-xl p-4 mb-4 ${selectedReport.type === 'WASTE' ? (isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200') : (isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200')}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {selectedReport.type === 'WASTE' ? (
                                        <Trash2 className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <Package className="h-4 w-4 text-purple-500" />
                                    )}
                                    <p className={`text-xs font-semibold ${selectedReport.type === 'WASTE' ? 'text-emerald-700' : 'text-purple-700'}`}>
                                        {selectedReport.type === 'WASTE' ? 'WASTE COLLECTION' : 'ASSET RECOVERY'}
                                    </p>
                                </div>
                                <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {selectedReport.wasteType}
                                </p>
                                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    📍 {selectedReport.location}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                    {selectedReport.type === 'WASTE' ? 'Weight Collected (kg)' : 'Asset Weight/Units (kg)'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={kilosInput}
                                        onChange={(e) => setKilosInput(e.target.value)}
                                        placeholder="0.0"
                                        step="0.1"
                                        min="0"
                                        className={`w-full text-3xl font-bold text-center py-4 rounded-xl border-2 transition-colors ${isDark
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-eco-green'
                                            : 'bg-slate-50 border-slate-200 text-eco-text placeholder-slate-300 focus:border-eco-green'
                                            } focus:outline-none`}
                                    />
                                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                                        kg
                                    </span>
                                </div>

                                {/* Quick weight buttons */}
                                <div className="flex gap-2 mt-3">
                                    {[1, 5, 10, 20, 50].map((w) => (
                                        <button
                                            key={w}
                                            onClick={() => setKilosInput(String(parseFloat(kilosInput || '0') + w))}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${isDark
                                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            +{w}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleConfirmCollection(selectedReport.id)}
                                disabled={processing || !kilosInput || parseFloat(kilosInput) <= 0}
                                className="w-full py-3.5 rounded-xl bg-eco-green text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-eco-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-5 w-5" />
                                        Confirm Collection
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   HISTORY TAB - Recent Collections List
   ══════════════════════════════════════════════════════════ */
interface HistoryTabProps {
    isDark: boolean;
    collections: WasteCollection[];
}

function HistoryTab({ isDark, collections }: HistoryTabProps): JSX.Element {
    const [filter, setFilter] = useState<WasteCategoryType | 'all'>('all');

    const filteredCollections = filter === 'all'
        ? collections
        : collections.filter(c => c.category === filter);

    // Group by date
    const grouped = filteredCollections.reduce<Record<string, WasteCollection[]>>((acc, col) => {
        const date = new Date(col.timestamp).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(col);
        return acc;
    }, {});

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
        >
            {/* ── Filter Chips ──────────────────────────────── */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <button
                    onClick={() => setFilter('all')}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all'
                        ? 'bg-eco-green text-white'
                        : isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'
                        }`}
                >
                    All
                </button>
                {(Object.values(WASTE_CATEGORIES) as WasteCategoryType[]).slice(0, 4).map((cat) => {
                    const config = categoryConfig[cat];
                    return (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${filter === cat
                                ? `${config.color} text-white`
                                : isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'
                                }`}
                        >
                            <config.icon className="h-3.5 w-3.5" />
                            {config.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Collection List ───────────────────────────── */}
            {Object.entries(grouped).map(([date, items]) => (
                <div key={date}>
                    <h4 className={`text-xs font-semibold mb-2 ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                        {date === new Date().toDateString() ? 'Today' : date}
                    </h4>
                    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                        {items.map((col, idx) => {
                            const config = categoryConfig[col.category];
                            const Icon = config.icon;

                            return (
                                <div
                                    key={col.id}
                                    className={`flex items-center gap-3 p-4 ${idx !== items.length - 1 ? (isDark ? 'border-b border-slate-800' : 'border-b border-slate-100') : ''}`}
                                >
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.lightBg}`}>
                                        <Icon className={`h-5 w-5 ${config.text}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-medium ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                            {config.label}
                                        </p>
                                        <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                                            {col.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                            {col.weight} kg
                                        </p>
                                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                                            {new Date(col.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {filteredCollections.length === 0 && (
                <div className={`text-center py-12 ${isDark ? 'text-slate-500' : 'text-eco-muted'}`}>
                    <Trash2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No collections found</p>
                </div>
            )}
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   STATS TAB - Collection Statistics
   ══════════════════════════════════════════════════════════ */
interface StatsTabProps {
    isDark: boolean;
    collections: WasteCollection[];
}

function StatsTab({ isDark, collections }: StatsTabProps): JSX.Element {
    // Calculate stats by category
    const categoryStats: CategoryStat[] = (Object.values(WASTE_CATEGORIES) as WasteCategoryType[]).map((cat) => {
        const catCollections = collections.filter(c => c.category === cat);
        const total = catCollections.reduce((sum, c) => sum + c.weight, 0);
        return { category: cat, total, count: catCollections.length };
    }).filter(s => s.total > 0).sort((a, b) => b.total - a.total);

    const totalWeight = collections.reduce((sum, c) => sum + c.weight, 0);
    const totalEntries = collections.length;

    // Weekly data
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData: WeekData[] = weekDays.map((day, idx) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - idx));
        const dayCollections = collections.filter(c => new Date(c.timestamp).toDateString() === d.toDateString());
        return {
            day: day,
            weight: dayCollections.reduce((sum, c) => sum + c.weight, 0),
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
            {/* ── Summary Cards ─────────────────────────────── */}
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

            {/* ── Weekly Chart ──────────────────────────────── */}
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

            {/* ── Category Breakdown ────────────────────────── */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-card`}>
                <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-eco-text'}`}>
                    By Category
                </h3>
                <div className="space-y-3">
                    {categoryStats.map((stat) => {
                        const config = categoryConfig[stat.category];
                        const Icon = config.icon;
                        const percentage = (stat.total / totalWeight) * 100;

                        return (
                            <div key={stat.category}>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <Icon className={`h-4 w-4 ${config.text}`} />
                                        <span className={`text-sm ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                            {config.label}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-eco-text'}`}>
                                        {stat.total.toFixed(1)} kg
                                    </span>
                                </div>
                                <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5 }}
                                        className={`h-full rounded-full ${config.color}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Environmental Impact ──────────────────────── */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-gradient-to-br from-eco-green/20 to-teal-500/20' : 'bg-gradient-to-br from-eco-green-light to-teal-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-eco-green" />
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                        Environmental Impact
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                            {(totalWeight * 0.5).toFixed(1)}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                            kg CO₂ saved
                        </p>
                    </div>
                    <div>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-eco-text'}`}>
                            {Math.floor(totalWeight / 2)}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-eco-muted'}`}>
                            Trees equivalent
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
