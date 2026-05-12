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
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { leaderboard, impactStats, binReports, BIN_STATUS, ASSET_STATUS, ASSET_CATEGORIES, assetReports } from '../../data/reportState';
import api from '../../services/api';
import realtimeEvents from '../../lib/realtimeEvents';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationPanel from '../../components/NotificationPanel';
import { useCampusNews, TAG_COLOR_MAP } from '../../hooks/useCampusNews';
import { useNewsNotifications } from '../../hooks/useNewsNotifications';
import { useAssetCategories, useItemPresets, useLocations, useUrgencyLevels, useAssetConditions, useWasteTypes } from '../../hooks/useSettings';
import HomeTab from './TeacherTabs/HomeTab';
import ReportTab from './TeacherTabs/ReportTab';
import TeacherMapTab from './TeacherTabs/TeacherMapTab';
import ActivityTab from './TeacherTabs/ActivityTab';

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

const binStatusLabel = {
  full: { color: 'text-red-400', bg: 'bg-red-400/15', label: 'Full' },
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
    const { notifications, unreadCount, addNotification, markRead, markAllRead, clearAll } = useNotifications(user);

    // Load asset categories from API
    const { categories: assetCategories, loading: categoriesLoading } = useAssetCategories();

    // Load item presets from API
    const { presets: allItemPresets, loading: presetsLoading } = useItemPresets();

    // Load locations from API (for both bin and room locations)
    const { locations: binLocationsData, loading: binLocationsLoading } = useLocations('BIN_LOCATION');
    const { locations: roomLocationsData, loading: roomLocationsLoading } = useLocations('ROOM_LOCATION');

    // Load waste types and urgency levels from API
    const { wasteTypes, loading: wasteTypesLoading } = useWasteTypes();
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

        const handleRealtimeReport = (payload) => {
            console.log('📡 Real-time event received:', payload);
            fetchReports();
        };

        const unsub1 = realtimeEvents.subscribe('report.created', handleRealtimeReport);
        const unsub2 = realtimeEvents.subscribe('report.updated', handleRealtimeReport);
        const unsub3 = realtimeEvents.subscribe('report.deleted', handleRealtimeReport);

        return () => { unsub1(); unsub2(); unsub3(); };
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
                        {activeTab === 'report' && <ReportTab key="report" onReportSubmitted={fetchReports} reportTypes={REPORT_TYPES} itemPresets={allItemPresets} binLocations={binLocationsData} roomLocations={roomLocationsData} wasteTypes={wasteTypes} urgencyLevels={urgencyLevels} assetConditions={assetConditions} />}
                        {activeTab === 'map' && <TeacherMapTab key="map" />}
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
