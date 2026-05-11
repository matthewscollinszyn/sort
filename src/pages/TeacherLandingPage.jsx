/* =========================================================
   EcoLedger – Teacher Hub (Unified landing + dashboard)
   Tabs: Home · Report · Bin Map · Activity
   Extended reporting: Waste, Furniture, Equipment, etc.
   ========================================================= */

import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, Trash2, MapPin, Camera, Clock, ChevronRight, ChevronDown,
    Flame, Trophy, Star, Award, TrendingUp, Globe, Recycle,
    Bell, Sun, Moon, LogOut, User, Sparkles, ArrowRight,
    Target, BookOpen, CalendarDays, Lightbulb,
    TreePine, Droplets, Zap, Shield, BarChart3, MapPinned,
    X, Send, CheckCircle2, AlertTriangle, Image, Navigation,
    MessageSquare, CircleDot, Loader2, Settings,
    Truck, Building2, FlaskConical, Landmark, Wrench,
    Armchair, Monitor, Lamp, Fan, Projector, Package,
    GraduationCap, ClipboardList, FileText, RefreshCw, Filter
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { leaderboard, impactStats, binReports, BIN_STATUS, ASSET_STATUS, ASSET_CATEGORIES, assetReports } from '../data/reportState';
import api from '../services/api';
import { useNotifications } from '../hooks/useNotifications';
import NotificationPanel from '../components/NotificationPanel';
import { useCampusNews, TAG_COLOR_MAP } from '../hooks/useCampusNews';
import { useNewsNotifications } from '../hooks/useNewsNotifications';
import { useAssetCategories, useItemPresets, useLocations, useUrgencyLevels, useAssetConditions } from '../hooks/useSettings';

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ── GlowOrb ─────────────────────────────────────────────── */
function GlowOrb({ className, color = 'bg-eco-green' }) {
    return <div className={`absolute rounded-full pointer-events-none ${color} ${className}`} />;
}

/* ── Static wavy background SVG ──────────────────────────── */
function WavyBg({ variant = 1, theme = 'dark' }) {
    const c = '#10B981';
    const d = theme === 'dark';
    const variants = {
        1: (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-[15%] sm:h-[20%] md:h-[25%] lg:h-1/3 min-h-[60px]">
                    <path d="M0,0 L1440,0 L1440,80 C1200,140 960,30 720,90 C480,150 240,50 0,100 Z" fill={c} fillOpacity={d ? '0.04' : '0.11'} />
                    <path d="M0,0 L1440,0 L1440,50 C1300,100 1100,20 800,70 C500,120 200,30 0,80 Z" fill={c} fillOpacity={d ? '0.025' : '0.07'} />
                </svg>
            </div>
        ),
        2: (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                    <ellipse cx="100" cy="80" rx="280" ry="180" fill={c} fillOpacity={d ? '0.035' : '0.09'} />
                    <ellipse cx="900" cy="520" rx="240" ry="160" fill={c} fillOpacity={d ? '0.03' : '0.08'} />
                    <circle cx="850" cy="100" r="60" fill={c} fillOpacity={d ? '0.02' : '0.055'} />
                </svg>
            </div>
        ),
        3: (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute top-1/4 left-0 w-full h-[40%] sm:h-[45%] md:h-[50%] lg:h-1/2 min-h-[80px]">
                    <ellipse cx="720" cy="200" rx="800" ry="100" fill={c} fillOpacity={d ? '0.03' : '0.085'} />
                    <ellipse cx="400" cy="180" rx="300" ry="60" fill={c} fillOpacity={d ? '0.02' : '0.06'} />
                    <ellipse cx="1050" cy="220" rx="250" ry="50" fill={c} fillOpacity={d ? '0.02' : '0.055'} />
                </svg>
            </div>
        ),
        4: (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[15%] sm:h-[20%] md:h-[25%] lg:h-1/3 min-h-[60px]">
                    <path d="M0,120 C200,60 400,160 600,100 C800,40 1000,140 1200,80 C1340,40 1440,100 1440,100 L1440,200 L0,200 Z" fill={c} fillOpacity={d ? '0.04' : '0.1'} />
                    <path d="M0,160 C300,110 600,180 900,130 C1200,80 1380,150 1440,140 L1440,200 L0,200 Z" fill={c} fillOpacity={d ? '0.025' : '0.06'} />
                </svg>
            </div>
        ),
        5: (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                    <ellipse cx="0" cy="300" rx="120" ry="350" fill={c} fillOpacity={d ? '0.035' : '0.09'} />
                    <ellipse cx="800" cy="250" rx="100" ry="300" fill={c} fillOpacity={d ? '0.03' : '0.08'} />
                    <circle cx="200" cy="500" r="80" fill={c} fillOpacity={d ? '0.02' : '0.055'} />
                    <circle cx="650" cy="100" r="60" fill={c} fillOpacity={d ? '0.015' : '0.05'} />
                </svg>
            </div>
        ),
    };
    return variants[variant] || null;
}

/* ── Status helpers ──────────────────────────────────────── */
const statusDot = {
    [BIN_STATUS.PENDING]: 'bg-amber-400',
    [BIN_STATUS.VERIFIED]: 'bg-eco-green',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-400',
    [BIN_STATUS.COLLECTED]: 'bg-indigo-400',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400',
    [BIN_STATUS.DISMISSED]: 'bg-red-400',
};
const statusBadge = {
    [BIN_STATUS.PENDING]: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
    [BIN_STATUS.VERIFIED]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
    [BIN_STATUS.COLLECTED]: 'bg-indigo-400/15 text-indigo-400 border-indigo-400/20',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400/15 text-slate-400 border-slate-400/20',
    [BIN_STATUS.DISMISSED]: 'bg-red-400/15 text-red-400 border-red-400/20',
};

const assetStatusDot = {
    [ASSET_STATUS.REPORTED]: 'bg-amber-400',
    [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-400',
    [ASSET_STATUS.DISPATCHED]: 'bg-blue-400',
    [ASSET_STATUS.IN_REVIEW]: 'bg-violet-400',
    [ASSET_STATUS.RECOVERED]: 'bg-eco-green',
    [ASSET_STATUS.DISPOSED]: 'bg-slate-400',
    dismissed: 'bg-red-400',
};

const assetStatusBadge = {
    [ASSET_STATUS.REPORTED]: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
    [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
    [ASSET_STATUS.DISPATCHED]: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
    [ASSET_STATUS.IN_REVIEW]: 'bg-violet-400/15 text-violet-400 border-violet-400/20',
    [ASSET_STATUS.RECOVERED]: 'bg-eco-green/15 text-eco-green border-eco-green/20',
    [ASSET_STATUS.DISPOSED]: 'bg-slate-400/15 text-slate-400 border-slate-400/20',
    dismissed: 'bg-red-400/15 text-red-400 border-red-400/20',
};

/* ── Campus bin locations ─ read live from admin map localStorage ── */
const DEFAULT_BIN_LOCATIONS = [
    { id: 'LOC-01', name: 'Cafeteria – Block A' },
    { id: 'LOC-02', name: 'Library Entrance' },
    { id: 'LOC-03', name: 'Gym Hallway' },
    { id: 'LOC-04', name: 'Engineering Bldg – 2F' },
    { id: 'LOC-05', name: 'Parking Lot B' },
    { id: 'LOC-06', name: 'Student Center' },
    { id: 'LOC-07', name: 'Science Hall – 1F' },
    { id: 'LOC-08', name: 'Admin Building Lobby' },
    { id: 'LOC-09', name: 'Arts Building – GF' },
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

/* ── Campus rooms/locations for asset reports ────────────── */
const campusRooms = [
    { id: 'ROOM-01', name: 'Room 101 – Science Hall', building: 'Science Hall' },
    { id: 'ROOM-02', name: 'Room 102 – Admin Building', building: 'Admin Building' },
    { id: 'ROOM-03', name: 'Room 201 – Science Hall', building: 'Science Hall' },
    { id: 'ROOM-04', name: 'Room 204 – Arts Building', building: 'Arts Building' },
    { id: 'ROOM-05', name: 'Room 305 – Engineering', building: 'Engineering Building' },
    { id: 'ROOM-06', name: 'Computer Lab 1 – IT Building', building: 'IT Building' },
    { id: 'ROOM-07', name: 'Computer Lab 2 – IT Building', building: 'IT Building' },
    { id: 'ROOM-08', name: 'Computer Lab 3 – IT Building', building: 'IT Building' },
    { id: 'ROOM-09', name: 'Faculty Office – Admin Building', building: 'Admin Building' },
    { id: 'ROOM-10', name: 'Conference Room – Admin Building', building: 'Admin Building' },
    { id: 'ROOM-11', name: 'Library – 2nd Floor', building: 'Library' },
    { id: 'ROOM-12', name: 'Gym – Sports Complex', building: 'Sports Complex' },
];

const binStatusLabel = {
    full: { color: 'text-red-400', bg: 'bg-red-400/15', label: 'Full' },
    half: { color: 'text-amber-400', bg: 'bg-amber-400/15', label: 'Almost Full' },
    empty: { color: 'text-emerald-400', bg: 'bg-emerald-400/15', label: 'Available' },
};

/* ── Icon and color mapping for asset categories ──────────── */
const CATEGORY_DEFAULTS = {
    waste: { icon: Trash2, color: 'from-red-500 to-orange-500', desc: 'Full bins, overflowing waste' },
    furniture: { icon: Armchair, color: 'from-blue-500 to-cyan-500', desc: 'Chairs, tables, desks, cabinets' },
    electronics: { icon: Monitor, color: 'from-violet-500 to-purple-500', desc: 'Computers, projectors, TVs' },
    fixtures: { icon: Lamp, color: 'from-amber-500 to-yellow-500', desc: 'Lights, fans, AC units' },
    equipment: { icon: Wrench, color: 'from-eco-green to-teal-500', desc: 'Lab equipment, tools' },
    other: { icon: Package, color: 'from-slate-500 to-slate-600', desc: 'Misc items not listed above' },
};

/* ── Build report types from API categories ──────────────── */
function buildReportTypes(apiCategories) {
    const wasteType = { id: 'waste', label: 'Waste/Bin', ...CATEGORY_DEFAULTS.waste };

    const assetTypes = apiCategories
        .filter(cat => cat.enabled)
        .map(cat => {
            const defaults = CATEGORY_DEFAULTS[cat.name] || CATEGORY_DEFAULTS.other;
            return {
                id: cat.name,
                label: cat.label,
                icon: defaults.icon,
                color: defaults.color,
                desc: defaults.desc
            };
        });

    return [wasteType, ...assetTypes];
}

/* ── Fallback report types (used when API fails) ──────────── */
const DEFAULT_REPORT_TYPES = [
    { id: 'waste', label: 'Waste/Bin', ...CATEGORY_DEFAULTS.waste },
    { id: 'furniture', label: 'Furniture', ...CATEGORY_DEFAULTS.furniture },
    { id: 'electronics', label: 'Electronics', ...CATEGORY_DEFAULTS.electronics },
    { id: 'fixtures', label: 'Fixtures', ...CATEGORY_DEFAULTS.fixtures },
    { id: 'equipment', label: 'Equipment', ...CATEGORY_DEFAULTS.equipment },
    { id: 'other', label: 'Other', ...CATEGORY_DEFAULTS.other },
];

/* ── Item presets for each category ──────────────────────── */
const ITEM_PRESETS = {
    waste: [
        { name: 'Full Bin – Recyclable', icon: '♻️' },
        { name: 'Full Bin – Biodegradable', icon: '🌿' },
        { name: 'Full Bin – Residual', icon: '🗑️' },
        { name: 'Full Bin – Hazardous', icon: '☣️' },
        { name: 'Overflowing Waste', icon: '⚠️' },
        { name: 'Improper Segregation', icon: '🚫' },
    ],
    furniture: [
        { name: 'Arm Chair (Plastic)', icon: '🪑' },
        { name: 'Arm Chair (Wooden)', icon: '🪑' },
        { name: 'Office Chair', icon: '🪑' },
        { name: 'Student Desk', icon: '🪑' },
        { name: 'Teacher\'s Table', icon: '🪑' },
        { name: 'Wooden Table', icon: '🪑' },
        { name: 'Filing Cabinet', icon: '🗄️' },
        { name: 'Bookshelf', icon: '📚' },
        { name: 'Whiteboard Stand', icon: '📋' },
    ],
    electronics: [
        { name: 'Desktop Computer', icon: '🖥️' },
        { name: 'Laptop', icon: '💻' },
        { name: 'LCD Projector', icon: '📽️' },
        { name: 'LED TV/Monitor', icon: '📺' },
        { name: 'Printer', icon: '🖨️' },
        { name: 'Scanner', icon: '🖨️' },
        { name: 'Speaker System', icon: '🔊' },
        { name: 'Microphone', icon: '🎤' },
        { name: 'Document Camera', icon: '📷' },
    ],
    fixtures: [
        { name: 'Ceiling Light/Fluorescent', icon: '💡' },
        { name: 'Ceiling Fan', icon: '🌀' },
        { name: 'Wall-mounted AC Unit', icon: '❄️' },
        { name: 'Standing Fan', icon: '🌀' },
        { name: 'Exhaust Fan', icon: '🌀' },
        { name: 'Wall Clock', icon: '🕐' },
        { name: 'Whiteboard (Wall-mounted)', icon: '📋' },
        { name: 'Bulletin Board', icon: '📌' },
    ],
    equipment: [
        { name: 'Laboratory Equipment', icon: '🔬' },
        { name: 'Sports Equipment', icon: '⚽' },
        { name: 'Cleaning Tools', icon: '🧹' },
        { name: 'Fire Extinguisher', icon: '🧯' },
        { name: 'First Aid Kit', icon: '🩹' },
        { name: 'Water Dispenser', icon: '💧' },
        { name: 'Ladder', icon: '🪜' },
    ],
    other: [
        { name: 'Curtains/Blinds', icon: '🪟' },
        { name: 'Carpet/Rugs', icon: '🧶' },
        { name: 'Door/Lock', icon: '🚪' },
        { name: 'Window', icon: '🪟' },
        { name: 'Plumbing Fixture', icon: '🚰' },
        { name: 'Custom Item', icon: '📦' },
    ],
};

/* ── Tabs ────────────────────────────────────────────────── */
const TABS = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'report', label: 'Report', icon: ClipboardList },
    { id: 'map', label: 'Bin Map', icon: MapPin },
    { id: 'activity', label: 'Activity', icon: Clock },
];

/* ── Themed Card ─────────────────────────────────────────── */
function Card({ children, className = '', glow = false, theme = 'dark', ...props }) {
    return (
        <div
            className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-sm transition-colors ${theme === 'dark'
                ? `border-white/5 bg-slate-900/60 ${glow ? 'shadow-xl shadow-eco-green/5' : ''}`
                : `border-slate-200 bg-white/60 ${glow ? 'shadow-xl shadow-eco-green/5' : 'shadow-sm'}`
                } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

/* ── User Avatar Dropdown ─────────────────────────────────── */
function UserMenu({ me, theme = 'dark', onSignOut }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setOpen((p) => !p)}
                className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all ${open
                    ? 'border-eco-green/40 bg-eco-green/10'
                    : theme === 'dark'
                        ? 'border-white/10 bg-slate-800/40 hover:border-white/20'
                        : 'border-slate-300 bg-slate-100/40 hover:border-slate-400'
                    }`}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold shadow-sm">
                    {me.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <span className={`hidden sm:block text-xs font-medium max-w-[7rem] truncate ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{me.name.split(' ')[0]}</span>
                <ChevronDown className={`h-3 w-3 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 top-full mt-2 w-60 rounded-2xl border backdrop-blur-xl shadow-2xl z-50 overflow-hidden ${theme === 'dark'
                            ? 'border-white/10 bg-slate-900/95 shadow-black/40'
                            : 'border-slate-200 bg-white/95 shadow-slate-900/10'
                            }`}
                    >
                        <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold">
                                    {me.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.name}</p>
                                    <p className="text-xs text-slate-500">{me.department || 'Environmental Science Dept.'}</p>
                                </div>
                            </div>
                            <div className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-slate-100'}`}>
                                <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Faculty</span>
                                <span className="ml-auto text-xs text-slate-500">{me.reports} reports</span>
                            </div>
                        </div>
                        <div className="py-1.5">
                            {[
                                { icon: User, label: 'My Profile', action: () => setOpen(false) },
                                { icon: Settings, label: 'Settings', action: () => setOpen(false) },
                                { icon: FileText, label: 'My Reports', action: () => setOpen(false) },
                            ].map((item) => (
                                <button key={item.label} onClick={item.action}
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${theme === 'dark'
                                        ? 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                        }`}>
                                    <item.icon className="h-4 w-4 text-slate-500" />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className={`border-t py-1.5 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                            <button onClick={onSignOut}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 hover:text-red-300 transition-colors">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── Helper: Create user object from auth context ────────── */
function createUserFromAuth(authUser) {
    if (!authUser) {
        // Fallback to mock faculty data if not authenticated
        return {
            name: 'Faculty User',
            department: 'Environmental Science Dept.',
            role: 'faculty',
            reports: 0
        };
    }

    const fullName = `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim() || authUser.username;

    return {
        name: fullName,
        department: authUser.department || 'Environmental Science Dept.',
        role: 'faculty',
        reports: authUser.reports || 0,
        email: authUser.email || '',
    };
}

/* ── Static data ───────────────────────────────────────────── */
const quickActions = [
    { label: 'Report Issue', desc: 'Items, waste, equipment', icon: ClipboardList, color: 'from-blue-500 to-indigo-500', tab: 'report' },
    { label: 'Live Bin Map', desc: 'Campus bins status', icon: MapPinned, color: 'from-eco-green to-teal-500', tab: 'map' },
    { label: 'My Activity', desc: 'Track your reports', icon: Clock, color: 'from-violet-500 to-purple-500', tab: 'activity' },
    { label: 'MRF Dashboard', desc: 'View all reports', icon: BarChart3, color: 'from-amber-500 to-orange-500', tab: 'home' },
];

const TAG_ICON_MAP = {
    'MRF Update': Truck,
    'New Facility': Recycle,
    'Achievement': TrendingUp,
    'Event': Award,
    'Program': Droplets,
    'Research': FlaskConical,
    'Maintenance': Wrench,
    'Assets': Armchair,
    'Announcement': Wrench,
    'Update': Globe,
};

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════ */
export default function TeacherLandingPage() {
    const { tab } = useParams();
    const { theme, toggleTheme } = useTheme();
    const { user, signout, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(tab || 'home');
    const [realReports, setRealReports] = useState([]);
    const [realAssetReports, setRealAssetReports] = useState([]);
    const [reportsLoading, setReportsLoading] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    // Notifications
    const { notifications, unreadCount, addNotification, markRead, markAllRead, clearAll } = useNotifications(user?.id);

    // Load asset categories from API
    const { categories: assetCategories, loading: categoriesLoading } = useAssetCategories();

    // Load item presets from API
    const { presets: allItemPresets, loading: presetsLoading } = useItemPresets();

    // Load locations from API (for both bin and room locations)
    const { locations: binLocationsData, loading: binLocationsLoading } = useLocations('BIN_LOCATION');
    const { locations: roomLocationsData, loading: roomLocationsLoading } = useLocations('ROOM_LOCATION');

    // Load urgency levels and asset conditions from API
    const { urgencyLevels, loading: urgencyLevelsLoading } = useUrgencyLevels();
    const { assetConditions, loading: assetConditionsLoading } = useAssetConditions();

    // Build dynamic report types from API categories
    const REPORT_TYPES = assetCategories.length > 0
        ? buildReportTypes(assetCategories)
        : DEFAULT_REPORT_TYPES;

    // Track previous report statuses to detect changes
    const prevReportStatusesRef = useRef({});
    const prevAssetStatusesRef = useRef({});
    const statusInitializedRef = useRef(false); // tracks if we loaded persisted statuses

    // Create user object from auth context
    const me = createUserFromAuth(user);

    // Asset reports: use real API data, fallback to empty
    const myAssetReports = realAssetReports.length > 0 ? realAssetReports : [];

    // Use real reports if available, otherwise fallback to mock
    const myBinReports = realReports.length > 0 ? realReports : [];

    // Fetch real reports from API
    const fetchReports = async () => {
        if (!user) return;

        setReportsLoading(true);
        try {
            const response = await api.getMyReports();
            if (response.success) {
                // Split reports by type
                const allReports = response.data.reports;
                const wasteRaw = allReports.filter(r => r.type === 'WASTE' || !r.type);
                const assetRaw = allReports.filter(r => r.type === 'ASSET');

                // Map API asset statuses → ASSET_STATUS values
                const apiAssetStatusMap = {
                    pending: ASSET_STATUS.REPORTED,
                    verified: ASSET_STATUS.VERIFIED_ASSET,
                    dispatched: ASSET_STATUS.DISPATCHED,
                    in_progress: ASSET_STATUS.IN_REVIEW,
                    collected: ASSET_STATUS.RECOVERED,
                    resolved: ASSET_STATUS.RECOVERED,
                    dismissed: 'dismissed',
                };

                // Transform API reports to match the expected format
                const transformed = wasteRaw.map(r => ({
                    id: r.id,
                    location: r.location,
                    notes: r.notes || '',
                    photoUrl: r.photoUrl,
                    urgency: r.urgency,
                    wasteType: r.wasteType,
                    status: r.status.toLowerCase(),
                    timestamp: r.createdAt,
                    reportedBy: `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() || r.user.username,
                    role: 'faculty'
                }));

                const transformedAssets = assetRaw.map(r => ({
                    id: r.id,
                    item: r.wasteType || 'Asset',
                    location: r.location,
                    notes: r.notes || '',
                    photoUrl: r.photoUrl,
                    status: apiAssetStatusMap[r.status.toLowerCase()] || ASSET_STATUS.REPORTED,
                    timestamp: r.createdAt,
                    role: 'faculty',
                }));

                // On the very first fetch after login, load persisted statuses from
                // localStorage so we can detect changes that happened while offline.
                if (!statusInitializedRef.current) {
                    statusInitializedRef.current = true;
                    try {
                        const storedBin = localStorage.getItem(`ecoledger_report_statuses_${user?.id}`);
                        if (storedBin) prevReportStatusesRef.current = JSON.parse(storedBin);
                        const storedAsset = localStorage.getItem(`ecoledger_asset_statuses_${user?.id}`);
                        if (storedAsset) prevAssetStatusesRef.current = JSON.parse(storedAsset);
                    } catch { /* ignore */ }
                }

                // Detect WASTE report status changes
                transformed.forEach(report => {
                    const prev = prevReportStatusesRef.current[report.id];
                    if (prev && prev !== report.status) {
                        const statusMessages = {
                            verified: { title: 'Report Verified ✓', message: `Your report at "${report.location}" has been verified by admin.` },
                            dispatched: { title: 'Staff Dispatched 🚛', message: `MRF staff is on the way to "${report.location}".` },
                            in_progress: { title: 'In Progress', message: `Your report at "${report.location}" is now being handled.` },
                            collected: { title: 'Collection Complete ✓', message: `Your report at "${report.location}" has been collected.` },
                            resolved: { title: 'Report Resolved ✓', message: `Your report at "${report.location}" has been fully resolved.` },
                            dismissed: { title: 'Report Dismissed', message: `Your report at "${report.location}" was dismissed by admin.` },
                        };
                        const msg = statusMessages[report.status];
                        addNotification({
                            type: 'report_status',
                            title: msg?.title || `Report ${report.status}`,
                            message: msg?.message || `Your report at "${report.location}" is now ${report.status}.`,
                            reportId: report.id,
                        });
                    }
                });

                // Detect ASSET report status changes
                transformedAssets.forEach(report => {
                    const prev = prevAssetStatusesRef.current[report.id];
                    if (prev && prev !== report.status) {
                        const assetMessages = {
                            [ASSET_STATUS.VERIFIED_ASSET]: { title: 'Asset Report Verified ✓', message: `Your asset report "${report.item}" at "${report.location}" has been verified.` },
                            [ASSET_STATUS.DISPATCHED]: { title: 'MRF Staff Dispatched 🚛', message: `Staff has been dispatched to handle "${report.item}" at "${report.location}".` },
                            [ASSET_STATUS.IN_REVIEW]: { title: 'Asset Under Review', message: `Your asset "${report.item}" at "${report.location}" is being reviewed on-site.` },
                            [ASSET_STATUS.RECOVERED]: { title: 'Asset Recovered ✓', message: `Your asset report "${report.item}" has been recovered successfully.` },
                            [ASSET_STATUS.DISPOSED]: { title: 'Asset Disposed', message: `The asset "${report.item}" at "${report.location}" has been disposed.` },
                            dismissed: { title: 'Asset Report Dismissed', message: `Your report for "${report.item}" was dismissed by admin.` },
                        };
                        const msg = assetMessages[report.status];
                        addNotification({
                            type: 'report_status',
                            title: msg?.title || `Asset ${report.status}`,
                            message: msg?.message || `Your asset "${report.item}" status changed.`,
                            reportId: report.id,
                        });
                    }
                });

                // Update tracked statuses and persist to localStorage
                const binStatusMap = {};
                transformed.forEach(r => { binStatusMap[r.id] = r.status; });
                prevReportStatusesRef.current = binStatusMap;
                try { localStorage.setItem(`ecoledger_report_statuses_${user?.id}`, JSON.stringify(binStatusMap)); } catch { /* ignore */ }

                const assetStatusMap = {};
                transformedAssets.forEach(r => { assetStatusMap[r.id] = r.status; });
                prevAssetStatusesRef.current = assetStatusMap;
                try { localStorage.setItem(`ecoledger_asset_statuses_${user?.id}`, JSON.stringify(assetStatusMap)); } catch { /* ignore */ }

                setRealReports(transformed);
                setRealAssetReports(transformedAssets);
            }
        } catch (err) {
            console.error('Failed to fetch reports:', err);
            // Fallback to mock data on error
        } finally {
            setReportsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
        // Poll every 5 seconds for near-realtime status updates
        const interval = setInterval(fetchReports, 5000);
        // Also re-fetch immediately when tab becomes visible again
        const onVisible = () => { if (document.visibilityState === 'visible') fetchReports(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, [user]);

    useEffect(() => {
        if (!user?.id) return;

        const eventSource = new EventSource(api.getReportsStreamUrl());
        const handleRealtimeReport = (event) => {
            try {
                const payload = JSON.parse(event.data);
                console.log('📡 Real-time event received:', payload);
                // Refresh reports for all users to see real-time updates
                fetchReports();
            } catch (err) {
                console.error('Failed to parse realtime report event:', err);
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

    useEffect(() => { if (tab && tab !== activeTab) setActiveTab(tab); }, [tab]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleTab = (id) => {
        setActiveTab(id);
        navigate(id === 'home' ? '/teacher' : `/teacher/${id}`, { replace: true });
    };

    const handleSignOut = () => {
        signout();
    };

    const pendingBinCount = myBinReports.filter((r) => r.status === BIN_STATUS.PENDING).length;
    const pendingAssetCount = myAssetReports.filter((r) => r.status === ASSET_STATUS.REPORTED || r.status === ASSET_STATUS.IN_REVIEW).length;

    return (
        <div className={`flex flex-col min-h-dvh overflow-x-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>

            {/* ════════ NAVBAR ═══════════════════════════════ */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl ${theme === 'dark' ? 'border-white/5 bg-slate-950/70' : 'border-slate-200 bg-white/70'
                    }`}
            >
                <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-5">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-eco-green text-white shadow-lg shadow-eco-green/20">
                            <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span className={`text-base sm:text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            EcoLedger
                        </span>
                        <span className={`hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${theme === 'dark' ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-600'
                            }`}>
                            <GraduationCap className="h-3 w-3" /> Faculty
                        </span>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Reports count pill */}
                        <div className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${theme === 'dark' ? 'border-white/10 bg-slate-800/60 text-white' : 'border-slate-300 bg-slate-100/60 text-slate-900'
                            }`}>
                            <FileText className="h-3.5 w-3.5 text-blue-400" />
                            {myBinReports.length + myAssetReports.length} reports
                        </div>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`flex items-center justify-center h-9 w-9 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setNotifOpen(p => !p)}
                                className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${theme === 'dark' ? 'border-white/10 bg-slate-800/40 text-slate-400 hover:text-white' : 'border-slate-300 bg-slate-100/40 text-slate-600 hover:text-slate-900'
                                    }`}
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
                                theme={theme}
                            />
                        </div>

                        {/* User Avatar Menu */}
                        <UserMenu me={me} theme={theme} onSignOut={handleSignOut} />
                    </div>
                </div>
            </motion.nav>

            {/* ════════ MAIN CONTENT ═════════════════════════ */}
            <main className={`relative flex-1 pt-16 overflow-hidden ${theme === 'light'
                ? 'bg-gradient-to-b from-slate-50 via-white to-blue-50/30'
                : 'bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900'
                }`}>
                {/* BG decoration */}
                <WavyBg variant={1} theme={theme} />
                <div className="absolute inset-0 pointer-events-none">
                    <GlowOrb color={theme === 'dark' ? 'bg-blue-500/8' : 'bg-blue-500/5'} className="-top-20 left-1/2 -translate-x-1/2 h-[22rem] w-[22rem] sm:h-[32rem] sm:w-[32rem] lg:h-[42rem] lg:w-[42rem] blur-[100px] sm:blur-[140px] lg:blur-[180px]" />
                    <GlowOrb color={theme === 'dark' ? 'bg-indigo-500/6' : 'bg-indigo-400/4'} className="hidden sm:block -bottom-24 -right-24 h-[22rem] w-[22rem] lg:h-[30rem] lg:w-[30rem] blur-[120px] lg:blur-[160px]" />
                </div>
                {/* Grid dots */}
                <div
                    className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-[0.025]' : 'opacity-[0.045]'}`}
                    style={{ backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#fff' : '#3B82F6'} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
                />

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-8">

                    {/* ── Tab Bar (desktop only — mobile uses bottom nav) ── */}
                    <div className={`hidden lg:flex gap-1 rounded-2xl border p-1 backdrop-blur-sm mb-8 ${theme === 'dark' ? 'border-white/5 bg-slate-900/60' : 'border-slate-200 bg-white/60'
                        }`}>
                        {TABS.map((t) => (
                            <button key={t.id} onClick={() => handleTab(t.id)}
                                className={`relative flex-1 min-w-[5rem] flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === t.id ? 'text-white' : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900')
                                    }`}>
                                {activeTab === t.id && (
                                    <motion.div layoutId="teacherTab"
                                        className="absolute inset-0 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                                )}
                                <span className="relative z-10 flex items-center gap-1.5">
                                    <t.icon className="h-4 w-4" /> {t.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* ── Tab Content ────────────────────────── */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'home' && <HomeTab key="home" me={me} goTab={handleTab} pendingBinCount={pendingBinCount} pendingAssetCount={pendingAssetCount} myBinReports={myBinReports} myAssetReports={myAssetReports} addNotification={addNotification} userId={user?.id} />}
                        {activeTab === 'report' && <ReportTab key="report" onReportSubmitted={fetchReports} reportTypes={REPORT_TYPES} itemPresets={allItemPresets} binLocations={binLocationsData} roomLocations={roomLocationsData} urgencyLevels={urgencyLevels} assetConditions={assetConditions} />}
                        {activeTab === 'map' && <MapTab key="map" />}
                        {activeTab === 'activity' && <ActivityTab key="activity" myBinReports={myBinReports} myAssetReports={myAssetReports} onRefresh={fetchReports} loading={reportsLoading} />}
                    </AnimatePresence>
                </div>
            </main>

            {/* ════════ FOOTER ═══════════════════════════════ */}
            <footer className={`border-t py-6 sm:py-8 pb-20 lg:pb-8 ${theme === 'dark' ? 'border-white/5 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:px-5 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-eco-green text-white">
                            <Leaf className="h-4 w-4" />
                        </div>
                        <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>EcoLedger</span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                        &copy; 2026 EcoLedger &middot; Campus MRF Management System &middot; v0.1
                    </p>
                </div>
            </footer>

            {/* ════════ MOBILE BOTTOM NAV ════════════════════ */}
            <nav className={`fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t backdrop-blur-xl lg:hidden ${theme === 'dark' ? 'border-white/5 bg-slate-950/90' : 'border-slate-200 bg-white/90'
                }`}
                style={{ height: 'calc(3.5rem + env(safe-area-inset-bottom, 0px))', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
                {TABS.map((t) => {
                    const isActive = activeTab === t.id;
                    return (
                        <button key={t.id} onClick={() => handleTab(t.id)}
                            className="flex items-center justify-center px-4 py-2">
                            <motion.div animate={{ scale: isActive ? 1.2 : 1 }}
                                className={`transition-colors ${isActive ? 'text-blue-500' : (theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}`}>
                                <t.icon className="h-6 w-6" />
                            </motion.div>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   HOME TAB – Welcome hero, quick actions, stats, updates
   ═══════════════════════════════════════════════════════════ */
function HomeTab({ me, goTab, pendingBinCount, pendingAssetCount, myBinReports, myAssetReports, addNotification, userId }) {
    const { theme } = useTheme();
    const { news: campusUpdates } = useCampusNews(true); // defer load after main UI
    useNewsNotifications(userId, campusUpdates, addNotification);
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="space-y-8 sm:space-y-12 pb-20 lg:pb-0">

            {/* ─────── WELCOME HERO ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Card theme={theme} className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-violet-500/10 border-blue-500/20 p-6 sm:p-8">
                    <Sparkles className={`absolute top-4 right-4 h-16 w-16 ${theme === 'dark' ? 'text-blue-500/10' : 'text-blue-500/15'}`} />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-blue-500/20">
                                {me.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Good day, 👋</p>
                                <h1 className={`text-2xl sm:text-3xl font-extrabold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.name}</h1>
                                <p className="text-xs text-slate-500 mt-1">{me.department} · Faculty</p>
                            </div>
                        </div>
                        <div className="flex gap-5 sm:gap-8 sm:text-right">
                            <div>
                                <p className="text-xs text-slate-500">Waste Reports</p>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {myBinReports.length}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Asset Reports</p>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {myAssetReports.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.section>

            {/* ─────── QUICK ACTIONS ─────── */}
            <motion.section variants={stagger} initial="hidden" animate="visible" className="relative overflow-hidden">
                <WavyBg variant={2} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <Zap className="h-5 w-5 text-blue-500" /> Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {quickActions.map((a, i) => (
                        <motion.button key={a.label} variants={fadeUp} custom={i}
                            onClick={() => goTab(a.tab)}
                            className={`group rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-sm transition-all cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 active:scale-[0.97] ${theme === 'dark'
                                ? 'border-white/5 bg-slate-900/60 hover:border-blue-500/20 hover:bg-slate-900/90'
                                : 'border-slate-200 bg-white/60 shadow-sm hover:border-blue-500/20 hover:bg-white/90'
                                }`}>
                            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                <a.icon className="h-5 w-5" />
                            </div>
                            <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{a.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                        </motion.button>
                    ))}
                </div>
            </motion.section>

            {/* ─────── STATS OVERVIEW ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <BarChart3 className="h-5 w-5 text-blue-500" /> My Stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { label: 'Waste Reports', value: myBinReports.length, icon: Trash2, color: 'text-red-400', bg: 'bg-red-400/10' },
                        { label: 'Asset Reports', value: myAssetReports.length, icon: Armchair, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                        { label: 'Pending', value: pendingBinCount + pendingAssetCount, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                        { label: 'Resolved', value: myAssetReports.filter(r => r.status === ASSET_STATUS.RECOVERED).length + myBinReports.filter(r => r.status === BIN_STATUS.RESOLVED).length, icon: CheckCircle2, color: 'text-eco-green', bg: 'bg-eco-green/10' },
                    ].map((s) => (
                        <Card key={s.label} theme={theme}
                            className="flex flex-col items-center text-center !p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.97]"
                            onClick={() => goTab('activity')}
                        >
                            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                                <s.icon className={`h-5 w-5 ${s.color}`} />
                            </div>
                            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.value}</span>
                            <span className="text-xs text-slate-500">{s.label}</span>
                        </Card>
                    ))}
                </div>
            </motion.section>

            {/* ─────── CAMPUS UPDATES ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3} className="relative overflow-hidden">
                <WavyBg variant={5} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="h-5 w-5 text-blue-400" /> Campus Updates
                </h2>
                {campusUpdates.length === 0 ? (
                    <Card theme={theme} className="text-center py-12">
                        <BookOpen className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`} />
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            No campus updates yet
                        </p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
                            Check back soon for updates and announcements
                        </p>
                    </Card>
                ) : (
                    <motion.div variants={stagger} initial="hidden" animate="visible"
                        className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {campusUpdates.map((item, i) => {
                            const tagStyle = (TAG_COLOR_MAP[item.tag] || { tagColor: 'bg-slate-100 text-slate-600', iconBg: 'from-slate-400 to-slate-500' });
                            const IconComp = TAG_ICON_MAP[item.tag] || Globe;
                            return (
                                <motion.article key={item.id} variants={fadeUp} custom={i}
                                    className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 ${theme === 'dark'
                                        ? 'border-white/5 bg-slate-900/60 hover:border-blue-500/20 hover:bg-slate-900/90'
                                        : 'border-slate-200 bg-white/60 hover:border-blue-500/30 hover:bg-white/90'
                                        }`}>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagStyle.tagColor}`}>
                                                {item.tag}
                                            </span>
                                            <span className={`flex items-center gap-1 text-[10px] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                                                <CalendarDays className="h-3 w-3" />
                                                {item.date}
                                            </span>
                                        </div>
                                        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tagStyle.iconBg} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                            <IconComp className="h-5 w-5" />
                                        </div>
                                        <h3 className={`mb-1.5 text-sm font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                                        <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                )}
            </motion.section>

            {/* ─────── CAMPUS IMPACT BANNER ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                <Card theme={theme} className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 border-blue-500/10 !p-6 sm:!p-8">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15">
                            <Globe className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Campus Impact This Semester</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                Faculty reported <strong className="text-blue-500">{assetReports.length}</strong> asset issues,
                                with <strong className="text-eco-green">{assetReports.filter(a => a.status === ASSET_STATUS.RECOVERED).length}</strong> recovered.
                                Together we've serviced <strong className="text-blue-500">{impactStats.binsServiced.toLocaleString()}</strong> bins.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.section>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   REPORT TAB – Multi-category reporting (Waste, Furniture, etc.)
   ═══════════════════════════════════════════════════════════ */
function ReportTab({ onReportSubmitted, reportTypes = DEFAULT_REPORT_TYPES, itemPresets = [], binLocations = [], roomLocations = [], urgencyLevels = [], assetConditions = [] }) {
    const { theme } = useTheme();
    const [reportType, setReportType] = useState(null);
    const [error, setError] = useState('');
    const [photo, setPhoto] = useState(null);
    const [cameraMode, setCameraMode] = useState(false);
    const [location, setLocation] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [itemName, setItemName] = useState('');
    const [notes, setNotes] = useState('');
    const [urgency, setUrgency] = useState('normal');
    const [condition, setCondition] = useState('damaged');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Filter API presets by current report type (category name) - MUST be before any conditional returns
    const presets = useMemo(() => {
        if (!reportType) return [];
        const filtered = (itemPresets || []).filter(p => {
            // Match category name and ensure it's enabled
            return p.category?.name === reportType && p.enabled !== false;
        });

        // Debug logging
        if (reportType && reportType !== 'waste') {
            console.log('🔍 Report Type:', reportType);
            console.log('📦 All Item Presets:', itemPresets);
            console.log('✅ Filtered Presets:', filtered);
        }

        return filtered;
    }, [itemPresets, reportType]);

    const preview = photo ? URL.createObjectURL(photo) : null;

    // Get locations based on report type
    const getLocations = () => {
        if (reportType === 'waste') {
            // For waste reports, use bin locations with status info
            return binLocations;
        } else {
            // For asset reports, use room locations
            return roomLocations;
        }
    };

    const locations = getLocations();
    const filteredLocations = locations.filter(l =>
        l.name.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const startCamera = async () => {
        setCameraMode(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch {
            alert('Unable to access camera. Please check permissions.');
            setCameraMode(false);
        }
    };

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);
            canvasRef.current.toBlob((blob) => {
                setPhoto(new File([blob], `report-${Date.now()}.jpg`, { type: 'image/jpeg' }));
                stopCamera();
            });
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        setCameraMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location) {
            setError('Please select a location');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            // Create report data - categorize by type
            // 'waste' maps to WASTE type, others map to ASSET type
            const fullNotes = reportType === 'waste'
                ? notes
                : `[${reportType.toUpperCase()}] ${itemName}${notes ? ` - ${notes}` : ''}`;

            const reportData = {
                location,
                notes: fullNotes,
                urgency,
                // Pass the actual category - backend will determine WASTE vs ASSET based on this
                wasteType: reportType === 'waste' ? 'general' : reportType,
                photoUrl: photo ? 'photo-captured' : null
            };

            const response = await api.createReport(reportData);

            if (response.success) {
                // Refresh reports list
                if (onReportSubmitted) {
                    await onReportSubmitted();
                }
                setSubmitted(true);
            } else {
                setError(response.message || 'Failed to submit report');
            }
        } catch (err) {
            setError(err.message || 'Failed to submit report');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setReportType(null);
        setPhoto(null);
        setLocation('');
        setLocationSearch('');
        setItemName('');
        setNotes('');
        setUrgency('normal');
        setCondition('damaged');
        setSubmitted(false);
        setError('');
    };

    /* Success screen */
    if (submitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="pb-20 lg:pb-0">
                <Card theme={theme} className="flex flex-col items-center gap-5 py-12 text-center" glow>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/15">
                        <CheckCircle2 className="h-10 w-10 text-blue-500" />
                    </motion.div>
                    <div>
                        <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report Submitted!</h3>
                        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-sm`}>
                            Your waste report has been sent to MRF staff for review and processing.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
                        <FileText className="h-5 w-5 text-blue-400" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report ID: RPT-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <button onClick={resetForm}
                        className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-blue-500/40 transition-all">
                        <ClipboardList className="h-4 w-4" /> Submit Another Report
                    </button>
                </Card>
            </motion.div>
        );
    }

    /* Category selection screen */
    if (!reportType) {
        return (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                className="pb-20 lg:pb-0">
                <Card theme={theme} className="mb-6 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 border-blue-400/15">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                            <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>What would you like to report?</h3>
                            <p className="text-xs text-slate-500">Select a category to proceed with your report.</p>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {reportTypes.map((type, i) => (
                        <motion.button
                            key={type.id}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            onClick={() => setReportType(type.id)}
                            className={`group relative rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-sm transition-all cursor-pointer hover:shadow-xl active:scale-[0.97] ${theme === 'dark'
                                ? 'border-white/5 bg-slate-900/60 hover:border-blue-500/30 hover:bg-slate-900/90'
                                : 'border-slate-200 bg-white/60 shadow-sm hover:border-blue-500/30 hover:bg-white/90'
                                }`}
                        >
                            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                <type.icon className="h-6 w-6" />
                            </div>
                            <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{type.label}</p>
                            <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                            <ChevronRight className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'} group-hover:text-blue-500 transition-colors`} />
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        );
    }

    const currentType = reportTypes.find(t => t.id === reportType);

    return (
        <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-5 pb-20 lg:pb-0">

            {/* Header with back button */}
            <Card theme={theme} className={`bg-gradient-to-r ${currentType.color.replace('from-', 'from-').replace('to-', 'to-')}/10 border-blue-400/15`}>
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setReportType(null)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100'
                            } transition-colors`}>
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${currentType.color}`}>
                        <currentType.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                        <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report {currentType.label}</h3>
                        <p className="text-xs text-slate-500">{currentType.desc}</p>
                    </div>
                </div>
            </Card>

            {/* Item Selection */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Package className="h-4 w-4 text-slate-500" /> Item
                    <span className="text-red-400">*</span>
                </h4>

                {/* Preset items - show all presets */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {presets.map((preset) => (
                        <button key={preset.id || preset.name} type="button"
                            onClick={() => setItemName(preset.name)}
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm font-medium transition-all ${itemName === preset.name
                                ? 'border-blue-500/40 bg-blue-500/10 text-blue-500'
                                : theme === 'dark'
                                    ? 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                                    : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-800'
                                }`}>
                            <span>{preset.icon}</span>
                            <span className="truncate">{preset.name}</span>
                        </button>
                    ))}
                </div>

                {/* Custom input */}
                <div className={`flex items-center gap-2 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50'} px-4 py-3 transition-all ${focusedField === 'item' ? 'border-blue-500/50 ring-2 ring-blue-500/20' : theme === 'dark' ? 'border-slate-700' : 'border-slate-300'
                    }`}>
                    <Package className="h-4 w-4 text-slate-500 shrink-0" />
                    <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}
                        onFocus={() => setFocusedField('item')} onBlur={() => setFocusedField('')}
                        placeholder="Or type custom item name..."
                        className={`flex-1 bg-transparent text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none`} />
                </div>
            </Card>

            {/* Photo Section */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Image className="h-4 w-4 text-slate-500" /> Photo Evidence
                    <span className="text-red-400">*</span>
                </h4>

                {!photo && !cameraMode && (
                    <button type="button" onClick={startCamera}
                        className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed ${theme === 'dark' ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-slate-100/60'} px-4 py-10 sm:py-12 cursor-pointer transition-all hover:border-blue-500/30 hover:bg-blue-500/5 active:bg-blue-500/10`}>
                        <Camera className="h-10 w-10 text-slate-500" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Take a Photo</span>
                        <span className="text-xs text-slate-600">Open camera to capture evidence</span>
                    </button>
                )}

                {cameraMode && (
                    <div className="space-y-3">
                        <video ref={videoRef} autoPlay playsInline
                            className={`w-full rounded-2xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-slate-100'} aspect-video object-cover`} />
                        <div className="flex gap-2">
                            <button type="button" onClick={capturePhoto}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-600 transition-all">
                                <Camera className="h-4 w-4" /> Capture
                            </button>
                            <button type="button" onClick={stopCamera}
                                className={`rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} px-4 py-2.5 text-sm font-medium ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:border-slate-600' : 'text-slate-600 hover:text-slate-900 hover:border-slate-400'} transition-all`}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {photo && (
                    <div className="relative">
                        <img src={preview} alt="Preview" className={`w-full rounded-2xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} object-cover max-h-64`} />
                        <button type="button" onClick={() => setPhoto(null)}
                            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 border border-blue-500/30">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                            <span className="text-xs font-medium text-white">Photo ready</span>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </Card>

            {/* Location */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MapPin className="h-4 w-4 text-slate-500" /> Location
                    <span className="text-red-400">*</span>
                </h4>

                {!location ? (
                    <div>
                        <div className={`flex items-center gap-2 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50'} px-4 py-3 transition-all ${focusedField === 'loc' ? 'border-blue-500/50 ring-2 ring-blue-500/20' : theme === 'dark' ? 'border-slate-700' : 'border-slate-300'
                            }`}>
                            <Navigation className="h-4 w-4 text-slate-500 shrink-0" />
                            <input type="text" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)}
                                onFocus={() => setFocusedField('loc')} onBlur={() => setTimeout(() => setFocusedField(''), 150)}
                                placeholder={reportType === 'waste' ? 'Search bin location...' : 'Search room or building...'}
                                className={`flex-1 bg-transparent text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none`} />
                        </div>
                        <div className={`mt-2 max-h-48 overflow-y-auto space-y-0.5 rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                            {filteredLocations.map((loc) => (
                                <button key={loc.id} type="button"
                                    onClick={() => { setLocation(loc.name); setLocationSearch(''); }}
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-100'} transition-colors`}>
                                    {reportType === 'waste' ? (
                                        <span className={`h-2 w-2 rounded-full ${loc.status === 'full' ? 'bg-red-400' : loc.status === 'half' ? 'bg-amber-400' : 'bg-eco-green'}`} />
                                    ) : (
                                        <Building2 className="h-4 w-4 text-slate-500" />
                                    )}
                                    <span className={`flex-1 text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{loc.name}</span>
                                    {reportType === 'waste' && (
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${(binStatusLabel[loc.status] || binStatusLabel.empty).bg} ${(binStatusLabel[loc.status] || binStatusLabel.empty).color}`}>
                                            {(binStatusLabel[loc.status] || binStatusLabel.empty).label}
                                        </span>
                                    )}
                                </button>
                            ))}
                            {filteredLocations.length === 0 && (
                                <p className="px-4 py-3 text-sm text-slate-600 text-center">No matching locations</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-3">
                        <MapPinned className="h-5 w-5 text-blue-500 shrink-0" />
                        <span className={`flex-1 text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{location}</span>
                        <button type="button" onClick={() => setLocation('')}
                            className="text-slate-500 hover:text-red-400 transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </Card>

            {/* Condition & Urgency (for non-waste) */}
            {reportType !== 'waste' && (
                <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                    <Card theme={theme}>
                        <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            <Shield className="h-4 w-4 text-slate-500" /> Condition
                        </h4>
                        <div className="space-y-1.5">
                            {(assetConditions || []).filter(c => c.enabled).map((c) => (
                                <button key={c.key} type="button" onClick={() => setCondition(c.key)}
                                    className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all ${condition === c.key
                                        ? 'border-blue-500/40 bg-blue-500/10 text-blue-500'
                                        : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600' : 'border-slate-300 text-slate-500 hover:border-slate-400'
                                        }`}>
                                    <CircleDot className={`h-3.5 w-3.5 shrink-0 ${condition === c.key ? '' : 'opacity-40'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium">{c.label}</p>
                                        <p className="text-[10px] opacity-70 truncate">{c.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card theme={theme}>
                        <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            <AlertTriangle className="h-4 w-4 text-slate-500" /> Urgency Level
                        </h4>
                        <div className="space-y-1.5">
                            {(urgencyLevels || []).filter(u => u.enabled).map((u) => {
                                const themeColor = theme === 'dark' ? 'border-slate-600 bg-slate-800/60 text-slate-400' : u.color || 'border-slate-400 bg-slate-100 text-slate-500';
                                return (
                                    <button key={u.key} type="button" onClick={() => setUrgency(u.key)}
                                        className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all ${urgency === u.key
                                            ? `${themeColor} ring-2 ring-offset-1 ${theme === 'dark' ? 'ring-offset-slate-950' : 'ring-offset-white'} ring-blue-500/30`
                                            : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600' : 'border-slate-300 text-slate-500 hover:border-slate-400'
                                            }`}>
                                        <CircleDot className={`h-3.5 w-3.5 shrink-0 ${urgency === u.key ? '' : 'opacity-40'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium">{u.label}</p>
                                            <p className="text-[10px] opacity-70 truncate">{u.description}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            )}

            {/* Waste Type & Urgency for waste reports */}
            {reportType === 'waste' && (
                <Card theme={theme}>
                    <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <AlertTriangle className="h-4 w-4 text-slate-500" /> Urgency Level
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2">
                        {[
                            { key: 'low', label: 'Low', desc: 'Almost full, not urgent', color: theme === 'dark' ? 'border-slate-600 bg-slate-800/60 text-slate-400' : 'border-slate-400 bg-slate-100 text-slate-500' },
                            { key: 'normal', label: 'Normal', desc: 'Full, needs collection', color: 'border-amber-500/30 bg-amber-400/10 text-amber-400' },
                            { key: 'high', label: 'Urgent', desc: 'Overflowing / hazard', color: 'border-red-500/30 bg-red-400/10 text-red-400' },
                        ].map((u) => (
                            <button key={u.key} type="button" onClick={() => setUrgency(u.key)}
                                className={`flex w-full items-center gap-2 sm:gap-3 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 text-left transition-all ${urgency === u.key
                                    ? `${u.color} ring-2 ring-offset-1 ${theme === 'dark' ? 'ring-offset-slate-950' : 'ring-offset-white'} ring-blue-500/30`
                                    : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600' : 'border-slate-300 text-slate-500 hover:border-slate-400'
                                    }`}>
                                <CircleDot className={`h-4 w-4 shrink-0 ${urgency === u.key ? '' : 'opacity-40'}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium">{u.label}</p>
                                    <p className="text-[10px] sm:text-xs opacity-70 truncate">{u.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>
            )}

            {/* Notes */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MessageSquare className="h-4 w-4 text-slate-500" /> Additional Notes
                    <span className="text-xs font-normal text-slate-600">(optional)</span>
                </h4>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    placeholder={reportType === 'waste'
                        ? 'Describe what you see... e.g. "Bin overflowing with plastic cups since morning"'
                        : 'Describe the issue... e.g. "Chair leg broken, still repairable"'
                    }
                    rows={3}
                    className={`w-full rounded-xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-800/80' : 'border-slate-300 bg-slate-50'} px-4 py-3 text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`} />
                <p className="mt-1.5 text-xs text-slate-600">{notes.length}/300 characters</p>
            </Card>

            {/* Error message */}
            {error && (
                <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${theme === 'dark' ? 'border-red-500/30 bg-red-500/10' : 'border-red-300 bg-red-50'}`}>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>{error}</span>
                </div>
            )}

            {/* Submit - waste reports only need location, other reports need itemName too */}
            <button type="submit" disabled={!location || (reportType !== 'waste' && !itemName) || submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                ) : (
                    <><Send className="h-5 w-5" /> Submit Report</>
                )}
            </button>

            <p className="text-center text-xs text-slate-600 pb-2">
                Reports are reviewed by the appropriate department within 24 hours.
            </p>
        </motion.form>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAP TAB – Live campus bin map
   ═══════════════════════════════════════════════════════════ */
function MapTab() {
    const { theme } = useTheme();
    const [selectedBin, setSelectedBin] = useState(null);
    const [filter, setFilter] = useState('all');

    const [liveBins, setLiveBins] = useState([]);
    const [mapImage, setMapImage] = useState(null);
    const [mapTransform] = useState({ zoom: 1, panX: 0, panY: 0 });
    const [lastUpdated, setLastUpdated] = useState(null);

    const loadMapData = async () => {
        try {
            const [locationsResult, statusesResult, mapResult] = await Promise.allSettled([
                api.getLocations('BIN_LOCATION'),
                api.getBinStatuses(),
                api.getCampusMap(),
            ]);

            const locationsData = locationsResult.status === 'fulfilled' ? locationsResult.value : [];
            const statusesResponse = statusesResult.status === 'fulfilled' ? statusesResult.value : null;
            const mapResponse = mapResult.status === 'fulfilled' ? mapResult.value : null;

            const statuses = statusesResponse?.data || [];
            const statusMap = new Map(statuses.map(s => [Number(s.locationId), s.fillStatus]));

            const bins = (Array.isArray(locationsData) ? locationsData : [])
                .filter(l => l.type === 'BIN_LOCATION')
                .map((loc, idx) => ({
                    id: loc.id,
                    name: loc.name,
                    lat: loc.mapX ?? (10 + (idx % 4) * 22),
                    lng: loc.mapY ?? (10 + Math.floor(idx / 4) * 25),
                    type: 'general',
                    status: statusMap.get(Number(loc.id)) || 'empty',
                }));

            setLiveBins(bins);

            if (mapResponse?.data?.imageData) {
                setMapImage(mapResponse.data.imageData);
            }

            setLastUpdated(new Date());
        } catch (e) {
            console.error('Failed to load map data:', e);
            setLastUpdated(new Date());
        }
    };

    useEffect(() => {
        loadMapData();
        const interval = setInterval(loadMapData, 10000);
        const onVisible = () => {
            if (document.visibilityState === 'visible') loadMapData();
        };
        window.addEventListener('focus', onVisible);
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', onVisible);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    const filtered = filter === 'all' ? liveBins : liveBins.filter(b => b.status === filter);
    const counts = {
        all: liveBins.length,
        full: liveBins.filter(b => b.status === 'full').length,
        half: liveBins.filter(b => b.status === 'half').length,
        empty: liveBins.filter(b => b.status === 'empty').length,
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-5 pb-20 lg:pb-0">

            <Card theme={theme}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                        <MapPinned className="h-5 w-5 text-blue-500" /> Live Bin Map
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-eco-green animate-pulse" /> Live
                        </span>
                        <span>{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Loading...'}</span>
                    </div>
                </div>

                {/* Filter pills */}
                <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto mb-4 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    <div className="flex gap-2 w-max">
                        {[
                            { key: 'all', label: 'All Bins', color: 'bg-slate-400/15 text-slate-300' },
                            { key: 'full', label: 'Full', color: 'bg-red-400/15 text-red-400' },
                            { key: 'half', label: 'Almost Full', color: 'bg-amber-400/15 text-amber-400' },
                            { key: 'empty', label: 'Available', color: 'bg-emerald-400/15 text-emerald-400' },
                        ].map((f) => (
                            <button key={f.key} onClick={() => setFilter(f.key)}
                                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all border ${filter === f.key
                                    ? `${f.color} ${theme === 'dark' ? 'border-white/15' : 'border-slate-300'} shadow-sm`
                                    : `${theme === 'dark' ? 'bg-slate-900/40 border-white/5 text-slate-600 hover:text-slate-400 hover:border-white/10' : 'bg-slate-100/60 border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300'}`
                                    }`}>
                                {f.label}
                                <span className={`rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} px-1.5 py-0.5 text-xs`}>{counts[f.key]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Visual Map */}
                <div
                    className={`relative h-80 sm:h-96 rounded-2xl ${!mapImage ? (theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-800/80 border border-slate-700/50' : 'bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 border border-slate-300/50') : 'border border-slate-300/50'} overflow-hidden`}
                    style={mapImage ? {
                        backgroundImage: `url(${mapImage})`,
                        backgroundSize: `${mapTransform.zoom * 100}%`,
                        backgroundPosition: `calc(50% + ${mapTransform.panX}px) calc(50% + ${mapTransform.panY}px)`,
                    } : {}}
                >
                    {!mapImage && (
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    )}
                    <div className={`absolute top-3 left-3 flex items-center gap-2 rounded-lg ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-sm px-3 py-1.5 border ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>📍 Campus Map</span>
                    </div>

                    {filtered.map((bin) => {
                        const pinColor = bin.status === 'full' ? 'bg-red-500' : bin.status === 'half' ? 'bg-amber-400' : 'bg-eco-green';
                        return (
                            <button key={bin.id} type="button" onClick={() => setSelectedBin(bin)}
                                className="group absolute" style={{ left: `${bin.lat}%`, top: `${bin.lng}%`, transform: 'translate(-50%, -50%)' }}>
                                <div className={`pulse-pin relative h-5 w-5 rounded-full ${pinColor} cursor-pointer border-2 ${theme === 'dark' ? 'border-slate-900' : 'border-white'} shadow-md transition-transform hover:scale-125`} />
                                <div className={`pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[200px] rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'} border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} px-3 py-2 text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-900'} opacity-0 shadow-xl transition-opacity group-hover:opacity-100 z-10`}>
                                    <p className="font-semibold">{bin.name}</p>
                                    <p className={`capitalize ${(binStatusLabel[bin.status] || binStatusLabel.empty).color}`}>{(binStatusLabel[bin.status] || binStatusLabel.empty).label}</p>
                                </div>
                            </button>
                        );
                    })}

                    {filtered.length === 0 && (
                        <p className={`absolute inset-0 flex items-center justify-center text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>No bins match this filter</p>
                    )}
                </div>

                {/* Legend */}
                <div className={`mt-4 flex flex-wrap items-center gap-4 text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Full</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Almost Full</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-eco-green" /> Available</span>
                </div>

                {/* Selected Bin Detail */}
                <AnimatePresence>
                    {selectedBin && (
                        <motion.div key="teacher-bin-detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4">
                            <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-white/10 bg-slate-800/60' : 'border-emerald-200 bg-emerald-50/50'}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).bg}`}>
                                            <Trash2 className={`h-5 w-5 ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).color}`} />
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedBin.name}</h4>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).bg} ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).color}`}>
                                                {(binStatusLabel[selectedBin.status] || binStatusLabel.empty).label}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedBin(null)} className={`${theme === 'dark' ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'} transition-colors`}>
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    {[
                                        { label: 'Position X', value: `${selectedBin.lat.toFixed(1)}%` },
                                        { label: 'Position Y', value: `${selectedBin.lng.toFixed(1)}%` },
                                        { label: 'Type', value: selectedBin.type },
                                    ].map((d) => (
                                        <div key={d.label} className={`rounded-xl border p-3 ${theme === 'dark' ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200'}`}>
                                            <p className={`text-sm font-bold truncate capitalize ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{d.value}</p>
                                            <p className="text-xs text-slate-500">{d.label}</p>
                                        </div>
                                    ))}
                                </div>
                                {selectedBin.status === 'full' && (
                                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-400/10 border border-red-400/15 px-4 py-3">
                                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                                        <p className="text-xs text-red-300">This bin is full and needs immediate attention.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* Bin List */}
            <Card theme={theme}>
                <h4 className={`mb-3 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
                    <Filter className="h-4 w-4 text-slate-500" /> All Campus Bins ({filtered.length})
                </h4>
                <div className="space-y-1">
                    {filtered.map((bin) => (
                        <button key={bin.id} type="button"
                            onClick={() => setSelectedBin(bin)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${selectedBin?.id === bin.id
                                ? 'bg-blue-500/10 border border-blue-500/20'
                                : theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-100'
                                }`}>
                            <span className={`h-2.5 w-2.5 rounded-full ${bin.status === 'full' ? 'bg-red-400' : bin.status === 'half' ? 'bg-amber-400' : 'bg-eco-green'}`} />
                            <span className={`flex-1 text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{bin.name}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${(binStatusLabel[bin.status] || binStatusLabel.empty).bg} ${(binStatusLabel[bin.status] || binStatusLabel.empty).color}`}>
                                {(binStatusLabel[bin.status] || binStatusLabel.empty).label}
                            </span>
                        </button>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   ACTIVITY TAB – Report history (both waste and assets)
   ═══════════════════════════════════════════════════════════ */
function ActivityTab({ myBinReports, myAssetReports, onRefresh, loading }) {
    const { theme } = useTheme();
    const [filter, setFilter] = useState('all');

    const allReports = [
        ...myBinReports.map(r => ({ ...r, type: 'waste' })),
        ...myAssetReports.map(r => ({ ...r, type: 'asset' })),
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const filtered = filter === 'all'
        ? allReports
        : filter === 'waste'
            ? allReports.filter(r => r.type === 'waste')
            : allReports.filter(r => r.type === 'asset');

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-5 pb-20 lg:pb-0">

            <Card theme={theme}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                        <Clock className="h-5 w-5 text-blue-500" /> My Reports
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                            {allReports.length} total
                        </span>
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className={`p-1.5 rounded-lg transition-colors ${theme === 'dark'
                                ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'} disabled:opacity-50`}
                            title="Refresh reports"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-4">
                    {[
                        { key: 'all', label: 'All' },
                        { key: 'waste', label: 'Waste' },
                        { key: 'asset', label: 'Assets' },
                    ].map((f) => (
                        <button key={f.key} onClick={() => setFilter(f.key)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === f.key
                                ? 'bg-blue-500 text-white'
                                : theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Reports list */}
                <div className="space-y-2">
                    {filtered.length === 0 ? (
                        <div className={`text-center py-10 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                            <FileText className="h-10 w-10 mx-auto mb-2 opacity-40" />
                            <p className="text-sm">No reports yet</p>
                        </div>
                    ) : (
                        filtered.map((report) => {
                            const isWaste = report.type === 'waste';
                            const status = isWaste ? report.status : report.status;
                            const dot = isWaste ? statusDot[status] : assetStatusDot[status];
                            const badge = isWaste ? statusBadge[status] : assetStatusBadge[status];

                            return (
                                <div key={report.id}
                                    className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-colors ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'
                                        }`}>
                                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                {isWaste ? report.location : report.item}
                                            </p>
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isWaste ? 'bg-red-400/10 text-red-400' : 'bg-blue-400/10 text-blue-400'
                                                }`}>
                                                {isWaste ? <Trash2 className="h-2.5 w-2.5" /> : <Armchair className="h-2.5 w-2.5" />}
                                                {isWaste ? 'Waste' : 'Asset'}
                                            </span>
                                        </div>
                                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                                            {isWaste ? report.notes : report.location} · {new Date(report.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${badge}`}>
                                        {status.replace('-', ' ')}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
