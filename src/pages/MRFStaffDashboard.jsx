/* =========================================================
   EcoLedger – MRF Staff Mobile Dashboard
   Mobile-optimized interface for Materials Recovery Facility staff
   to input collected waste with weight and category.
   ========================================================= */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scale, Trash2, Recycle, Plus, Check, ChevronRight, ChevronDown,
    Leaf, Clock, TrendingUp, Calendar, Package, Truck, AlertCircle,
    X, Send, CheckCircle2, FileText, BarChart3, History, User,
    Sun, Moon, Settings, LogOut, Loader2, Sparkles,
    TreePine, Droplets, Apple, Coffee, Newspaper, Wine, Lightbulb,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import {
    WASTE_CATEGORIES,
    wasteCollections,
    mrfStats,
    collectionLocations,
} from '../data/reportState';

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

/* ── Category Icons & Colors ─────────────────────────────── */
const categoryConfig = {
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
const TABS = [
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
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('input');
    const [collections, setCollections] = useState(wasteCollections);
    const [showSuccess, setShowSuccess] = useState(false);

    /* ── Calculate today's totals ─────────────────────────── */
    const today = new Date().toDateString();
    const todayCollections = collections.filter(
        c => new Date(c.timestamp).toDateString() === today
    );
    const todayTotal = todayCollections.reduce((sum, c) => sum + c.weight, 0);

    /* ── Handle new collection submission ─────────────────── */
    const handleNewCollection = (newEntry) => {
        const entry = {
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

            {/* ── Success Toast ─────────────────────────────── */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-20 left-1/2 z-50 flex items-center gap-2 rounded-full bg-eco-green px-4 py-2 text-white shadow-lg"
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Collection recorded!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Quick Stats Banner ────────────────────────── */}
            <div className="px-4 py-4">
                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className={`rounded-2xl p-4 ${isDark ? 'bg-gradient-to-r from-eco-green/20 to-teal-500/20 border border-eco-green/30' : 'bg-gradient-to-r from-eco-green to-teal-500'}`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-xs font-medium ${isDark ? 'text-eco-green' : 'text-emerald-100'}`}>
                                Today's Collection
                            </p>
                            <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-white'}`}>
                                {todayTotal.toFixed(1)} <span className="text-lg font-medium">kg</span>
                            </p>
                        </div>
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-eco-green/20' : 'bg-white/20'}`}>
                            <Scale className={`h-7 w-7 ${isDark ? 'text-eco-green' : 'text-white'}`} />
                        </div>
                    </div>
                    <div className="mt-3 flex gap-4">
                        <div>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-emerald-100'}`}>Entries</p>
                            <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-white'}`}>
                                {todayCollections.length}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-emerald-100'}`}>Locations</p>
                            <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-white'}`}>
                                {new Set(todayCollections.map(c => c.location)).size}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Tab Content ───────────────────────────────── */}
            <div className="px-4">
                <AnimatePresence mode="wait">
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
function InputTab({ isDark, onSubmit }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [weight, setWeight] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);

    const categories = Object.values(WASTE_CATEGORIES);

    const handleSubmit = () => {
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
                        onChange={(e) => setWeight(e.target.value)}
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
                            onClick={() => setWeight(String(parseFloat(weight || 0) + w))}
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
                    onChange={(e) => setNotes(e.target.value)}
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
                        onSelect={(loc) => {
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
function LocationPicker({ isDark, onSelect, onClose }) {
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
                onClick={(e) => e.stopPropagation()}
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
                                    <Truck className={`h-5 w-5 ${isDark ? 'text-eco-green' : 'text-eco-green'}`} />
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
   HISTORY TAB - Recent Collections List
   ══════════════════════════════════════════════════════════ */
function HistoryTab({ isDark, collections }) {
    const [filter, setFilter] = useState('all');

    const filteredCollections = filter === 'all'
        ? collections
        : collections.filter(c => c.category === filter);

    // Group by date
    const grouped = filteredCollections.reduce((acc, col) => {
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
                {Object.values(WASTE_CATEGORIES).slice(0, 4).map((cat) => {
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
function StatsTab({ isDark, collections }) {
    // Calculate stats by category
    const categoryStats = Object.values(WASTE_CATEGORIES).map((cat) => {
        const catCollections = collections.filter(c => c.category === cat);
        const total = catCollections.reduce((sum, c) => sum + c.weight, 0);
        return { category: cat, total, count: catCollections.length };
    }).filter(s => s.total > 0).sort((a, b) => b.total - a.total);

    const totalWeight = collections.reduce((sum, c) => sum + c.weight, 0);
    const totalEntries = collections.length;

    // Weekly data
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = weekDays.map((day, idx) => {
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
