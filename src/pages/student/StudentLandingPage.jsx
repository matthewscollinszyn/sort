/* =========================================================
   EcoLedger – Student Hub  (Unified landing + dashboard)
   Tabs: Home · Report · Bin Map · Activity
   ========================================================= */

import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Trash2, MapPin, Camera, Clock, ChevronRight, ChevronDown,
  Flame, Trophy, Star, Award, TrendingUp, Globe, Recycle,
  Bell, Sun, Moon, LogOut, User, Users, Sparkles, ArrowRight,
  Target, BookOpen, CalendarDays, Lightbulb, Heart,
  TreePine, Droplets, Zap, Shield, BarChart3, MapPinned,
  X, Send, CheckCircle2, AlertTriangle, Image, Navigation,
  MessageSquare, Filter, Info, CircleDot, Loader2, Settings,
  Truck, Building2, FlaskConical, Landmark, HandMetal, Wrench,
  RefreshCw, Search
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { leaderboard, impactStats, binReports, BIN_STATUS } from '../../data/reportState';
import api from '../../services/api';
import realtimeEvents from '../../lib/realtimeEvents';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationPanel from '../../components/NotificationPanel';
import RewardCertificate from '../../components/RewardCertificate';
import { useLocations, useWasteTypes, useUrgencyLevels } from '../../hooks/useSettings';
import HomeTab from './StudentTabs/HomeTab';
import ReportTab from './StudentTabs/ReportTab';
import StudentMapTab from './StudentTabs/StudentMapTab';
import ActivityTab from './StudentTabs/ActivityTab';
import LeaderboardTab from './StudentTabs/LeaderboardTab';

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
  [BIN_STATUS.RESOLVED]: 'bg-slate-400',
  [BIN_STATUS.DISMISSED]: 'bg-red-400',
  [BIN_STATUS.DISPATCHED]: 'bg-blue-400',
  [BIN_STATUS.COLLECTED]: 'bg-emerald-400',
};
const statusBadge = {
  [BIN_STATUS.PENDING]: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
  [BIN_STATUS.VERIFIED]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
  [BIN_STATUS.RESOLVED]: 'bg-slate-400/15 text-slate-400 border-slate-400/20',
  [BIN_STATUS.DISMISSED]: 'bg-red-400/15 text-red-400 border-red-400/20',
  [BIN_STATUS.DISPATCHED]: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
  [BIN_STATUS.COLLECTED]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
};

const binStatusLabel = {
  full: { color: 'text-red-400', bg: 'bg-red-400/15', label: 'Full' },
  empty: { color: 'text-emerald-400', bg: 'bg-emerald-400/15', label: 'Available' },
};

/* ── Tabs ────────────────────────────────────────────────── */
const TABS = [
  { id: 'home', label: 'Home', icon: Zap },
  { id: 'report', label: 'Report', icon: Camera },
  { id: 'map', label: 'Bin Map', icon: MapPin },
  { id: 'activity', label: 'Activity', icon: Clock },
  { id: 'leaderboard', label: 'Ranks', icon: Trophy },
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
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-eco-green to-teal-500 text-white text-xs font-bold shadow-sm">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-eco-green to-teal-500 text-white text-sm font-bold">
                  {me.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.name}</p>
                  <p className="text-xs text-slate-500">{me.department || 'BS Environmental Sci'}</p>
                </div>
              </div>
              <div className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-slate-100'}`}>
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.points.toLocaleString()} eco-points</span>
                <span className="ml-auto text-xs text-slate-500">Rank #{me.rank}</span>
              </div>
            </div>
            <div className="py-1.5">
              {[
                { icon: User, label: 'My Profile', action: () => setOpen(false) },
                { icon: Settings, label: 'Settings', action: () => setOpen(false) },
                { icon: Award, label: 'My Badges', action: () => setOpen(false) },
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
    return leaderboard[0] || {
      name: 'Guest Student', points: 0, reports: 0, rank: 1,
      department: 'BS Environmental Science', studentId: '', section: '', email: '',
    };
  }

  const fullName = `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim() || authUser.username;

  // Find user's rank in leaderboard or default to their position
  const leaderboardEntry = leaderboard.find(l => l.name === fullName);
  const rank = leaderboardEntry?.rank || 1;

  return {
    name: fullName,
    points: authUser.points || leaderboardEntry?.points || 0,
    reports: authUser.reports || leaderboardEntry?.reports || 0,
    rank: rank,
    department: authUser.course || authUser.department || 'BS Environmental Science',
    studentId: authUser.studentId || '',
    section: authUser.section || '',
    email: authUser.email || '',
  };
}

/* ── Helper: Get user's reports from binReports ──────────── */
function getUserReports(userName) {
  return binReports.filter((r) => r.reportedBy === userName);
}

const quickActions = [
  { label: 'Report Bin', desc: 'Snap a full bin', icon: Camera, color: 'from-red-500 to-orange-500', tab: 'report' },
  { label: 'Live Bin Map', desc: 'Campus bins status', icon: MapPinned, color: 'from-blue-500 to-cyan-500', tab: 'map' },
  { label: 'My Activity', desc: 'Track your reports', icon: Clock, color: 'from-violet-500 to-purple-500', tab: 'activity' },
  { label: 'Leaderboard', desc: 'See top eco-champs', icon: Trophy, color: 'from-amber-500 to-yellow-500', tab: 'leaderboard' },
];

const ecoTips = [
  { icon: Recycle, title: 'Recycle Right', text: 'Rinse containers before tossing them into the blue bin.' },
  { icon: Droplets, title: 'Save Water', text: 'Turn off taps while soaping hands — saves 6L per wash.' },
  { icon: TreePine, title: 'Go Paper-Free', text: 'Use digital notes — one tree makes only 8,333 sheets.' },
  { icon: Lightbulb, title: 'Switch Off', text: 'Unplug chargers when done — phantom loads add up.' },
];

const TAG_ICON_MAP = {
  'MRF Update': Truck,
  'New Facility': Recycle,
  'Achievement': TrendingUp,
  'Event': Award,
  'Program': Droplets,
  'Research': FlaskConical,
  'Maintenance': Wrench,
  'Assets': Building2,
  'Announcement': Wrench,
  'Update': Globe,
};

const challenges = [
  { title: 'Zero-Waste Week', points: 200, icon: Target, deadline: 'Mar 3 – Mar 9', progress: 45, color: 'text-eco-green' },
  { title: 'Campus Clean-Up Drive', points: 150, icon: Heart, deadline: 'Mar 15', progress: 0, color: 'text-pink-400' },
  { title: 'Report 10 Bins', points: 100, icon: Trash2, deadline: 'Ongoing', progress: 70, color: 'text-amber-400' },
];

const announcements = [
  { id: 1, title: 'MRF Hours Extended', text: 'Collection hours now run 6 AM \u2013 8 PM on weekdays.', date: 'Feb 25', tag: 'Info' },
  { id: 2, title: 'New Recycling Stations', text: '5 new segregation stations installed near the Science Hall.', date: 'Feb 23', tag: 'Update' },
  { id: 3, title: 'Eco-Points Double Weekend!', text: 'Report bins this Saturday & Sunday for 2\u00D7 points.', date: 'Feb 22', tag: 'Promo' },
];

const campusPartners = [
  { name: 'Office of Student Affairs', icon: Building2, desc: 'Student engagement & events' },
  { name: 'Environmental Science Dept.', icon: FlaskConical, desc: 'Research & waste audits' },
  { name: 'Facilities Management Office', icon: Wrench, desc: 'Bin maintenance & logistics' },
  { name: 'Campus Sustainability Council', icon: Landmark, desc: 'Policy & green initiatives' },
  { name: 'Student Government Association', icon: HandMetal, desc: 'Volunteer drives & awareness' },
  { name: 'General Services Division', icon: Truck, desc: 'Collection & MRF operations' },
];

const timelineMilestones = [
  { year: '2024', quarter: 'Q3', title: 'EcoLedger Concept Born', desc: 'Environmental Science Dept. partners with IT to build a campus waste tracking platform.', icon: Sparkles, color: 'from-violet-500 to-purple-500' },
  { year: '2025', quarter: 'Q1', title: 'Pilot with 3 Buildings', desc: 'First deployment covers Science Hall, Library, and Admin Bldg \u2014 50 students onboard.', icon: Building2, color: 'from-blue-500 to-cyan-500' },
  { year: '2025', quarter: 'Q3', title: '500+ Active Reporters', desc: 'Campus-wide rollout. Gamification with eco-points and leaderboards drives adoption.', icon: Users, color: 'from-amber-400 to-orange-500' },
  { year: '2026', quarter: 'Q1', title: '2,000+ Reports Filed', desc: 'Record-breaking semester with 68% more reports. MRF response time cut by 40%.', icon: TrendingUp, color: 'from-eco-green to-teal-500' },
  { year: '2026', quarter: 'Q2', title: 'Zero-Waste Campus Goal', desc: 'New initiatives target 80% waste diversion by year-end. Community partnerships expand.', icon: Globe, color: 'from-pink-500 to-rose-500' },
];

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════ */
export default function StudentLandingPage() {
  const { tab } = useParams();
  const { theme, toggleTheme } = useTheme();
  const { user, signout, loading, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || 'home');
  const [showAllTips, setShowAllTips] = useState(false);
  const [realReports, setRealReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [liveLeaderboard, setLiveLeaderboard] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  // Notifications
  const { notifications, unreadCount, addNotification, markRead, markAllRead, clearAll } = useNotifications(user);

  // Load locations from API (for both bin and room locations)
  const { locations: binLocations, loading: binLocationsLoading } = useLocations('BIN_LOCATION');
  const { locations: roomLocations, loading: roomLocationsLoading } = useLocations('ROOM_LOCATION');

  // Load waste types and urgency levels from API
  const { wasteTypes, loading: wasteTypesLoading } = useWasteTypes();
  const { urgencyLevels, loading: urgencyLevelsLoading } = useUrgencyLevels();

  // Track previous report statuses to detect changes
  const prevReportStatusesRef = useRef({});
  const statusInitializedRef = useRef(false); // tracks if we loaded persisted statuses
  const prevPointsRef = useRef(null);
  const rewardNotifiedRef = useRef(false);

  // Create user object from auth context
  const me = createUserFromAuth(user);

  // Use real reports if available, otherwise fallback to mock data
  const myReports = realReports.length > 0 ? realReports : getUserReports(me.name);

  const buildRewardCode = (userId) => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `REWARD-${userId}-${datePart}`;
  };

  const openCertificate = () => {
    if (!user) return;
    const rewardCode = buildRewardCode(user.id);
    setCertificateData({
      studentName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
      studentId: user.studentId || user.id,
      points: Number.isFinite(me.points) ? me.points : 0,
      rewardCode: rewardCode,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
    setCertificateOpen(true);
  };

  // Fetch real reports from API
  const fetchReports = async () => {
    if (!user) return;

    setReportsLoading(true);
    try {
      const response = await api.getMyReports();
      if (response.success) {
        // Transform API reports to match the expected format
        const transformed = response.data.reports.map(r => ({
          id: r.id,
          location: r.location,
          notes: r.notes || '',
          photoUrl: r.photoUrl,
          urgency: r.urgency,
          wasteType: r.wasteType,
          status: r.status.toLowerCase(),
          timestamp: r.createdAt,
          reportedBy: `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() || r.user.username
        }));

        // On the very first fetch after login, load persisted statuses from
        // localStorage so we can detect changes that happened while offline.
        if (!statusInitializedRef.current) {
          statusInitializedRef.current = true;
          try {
            const stored = localStorage.getItem(`ecoledger_report_statuses_${user?.id}`);
            if (stored) prevReportStatusesRef.current = JSON.parse(stored);
          } catch { /* ignore */ }
        }

        // Detect status changes and fire notifications
        transformed.forEach(report => {
          const prev = prevReportStatusesRef.current[report.id];
          if (prev && prev !== report.status) {
            const statusMessages = {
              verified: { title: 'Report Verified ✓', message: `Your waste report at "${report.location}" has been verified by admin.` },
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
            // Eco-points notification for positive outcomes
            if (report.status === 'verified') {
              addNotification({ type: 'points', title: 'Eco-Points Awarded!', message: `Your verified report at "${report.location}" earned eco-points. Check your total points.` });
            } else if (['resolved', 'collected'].includes(report.status)) {
              addNotification({ type: 'points', title: '+20 Eco-Points Earned!', message: `You earned 20 points for your resolved report at "${report.location}".` });
            }
          }
        });

        // Update tracked statuses and persist to localStorage
        const statusMap = {};
        transformed.forEach(r => { statusMap[r.id] = r.status; });
        prevReportStatusesRef.current = statusMap;
        try {
          localStorage.setItem(`ecoledger_report_statuses_${user?.id}`, JSON.stringify(statusMap));
        } catch { /* quota exceeded */ }

        setRealReports(transformed);
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err);
      // Fallback to mock data on error
    } finally {
      setReportsLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await api.getLeaderboard();
      if (response.success && response.data?.leaderboard) {
        setLiveLeaderboard(response.data.leaderboard);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchLeaderboard();
    // Poll every 5 seconds for near-realtime status updates
    const interval = setInterval(fetchReports, 5000);
    // Re-fetch immediately when tab becomes visible again
    const onVisible = () => { if (document.visibilityState === 'visible') fetchReports(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    const currentPoints = Number.isFinite(me.points) ? me.points : 0;
    const previousPoints = prevPointsRef.current;
    const crossedThreshold = previousPoints !== null && previousPoints < 100 && currentPoints >= 100;

    if (!rewardNotifiedRef.current && (crossedThreshold || (previousPoints === null && currentPoints >= 100))) {
      const rewardCode = buildRewardCode(user.id);
      addNotification({
        type: 'reward',
        title: 'Reward Ready 🎉',
        message: `You reached 100 eco-points! Click to view and download your official certificate.`,
        hasAction: true,
      });
      rewardNotifiedRef.current = true;
    }

    prevPointsRef.current = currentPoints;
  }, [user?.id, me.points, addNotification]);

  useEffect(() => {
    if (!user?.id) return;

    const handleRealtimeReport = (payload) => {
      console.log('📡 Real-time event received:', payload);
      // Refresh reports and leaderboard for all users to see real-time updates
      fetchReports();
      fetchLeaderboard();
      // Refetch user data to update points in real-time
      if (payload.userId === user.id && payload.pointsAwarded > 0) {
        console.log(`🎉 You received ${payload.pointsAwarded} points!`);
        refreshUser();
      }
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
    navigate(id === 'home' ? '/student' : `/student/${id}`, { replace: true });
  };

  const handleSignOut = () => {
    signout();
  };

  const pendingCount = myReports.filter((r) => r.status === BIN_STATUS.PENDING).length;
  const resolvedCount = myReports.filter((r) => r.status === BIN_STATUS.RESOLVED || r.status === BIN_STATUS.COLLECTED).length;

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
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Points pill */}
            <div className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${theme === 'dark' ? 'border-white/10 bg-slate-800/60 text-white' : 'border-slate-300 bg-slate-100/60 text-slate-900'
              }`}>
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              {me.points.toLocaleString()} pts
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
                notifications={notifications.map(n =>
                  n.type === 'reward' && n.hasAction ? { ...n, onClick: openCertificate } : n
                )}
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
        ? 'bg-gradient-to-b from-slate-50 via-white to-emerald-50/30'
        : 'bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900'
        }`}>
        {/* BG decoration */}
        <WavyBg variant={1} theme={theme} />
        <div className="absolute inset-0 pointer-events-none">
          <GlowOrb color={theme === 'dark' ? 'bg-eco-green/8' : 'bg-eco-green/5'} className="-top-20 left-1/2 -translate-x-1/2 h-[22rem] w-[22rem] sm:h-[32rem] sm:w-[32rem] lg:h-[42rem] lg:w-[42rem] blur-[100px] sm:blur-[140px] lg:blur-[180px]" />
          <GlowOrb color={theme === 'dark' ? 'bg-teal-500/6' : 'bg-teal-400/4'} className="hidden sm:block -bottom-24 -right-24 h-[22rem] w-[22rem] lg:h-[30rem] lg:w-[30rem] blur-[120px] lg:blur-[160px]" />
          <GlowOrb color={theme === 'dark' ? 'bg-emerald-600/4' : 'bg-emerald-400/3'} className="hidden lg:block top-1/2 -left-32 h-[26rem] w-[26rem] blur-[140px]" />
          {/* Rings — hidden on mobile */}
          <div className={`hidden sm:block absolute -top-32 -right-32 h-80 w-80 rounded-full border ${theme === 'dark' ? 'border-eco-green/[0.04]' : 'border-eco-green/[0.07]'}`} />
          <div className={`hidden sm:block absolute -top-24 -right-24 h-64 w-64 rounded-full border ${theme === 'dark' ? 'border-eco-green/[0.03]' : 'border-eco-green/[0.05]'}`} />
          <div className={`hidden sm:block absolute -bottom-16 -left-16 h-48 w-48 rounded-full border ${theme === 'dark' ? 'border-teal-400/[0.04]' : 'border-teal-400/[0.06]'}`} />
          {/* Vertical line accents — hidden on mobile */}
          <div className={`hidden sm:block absolute top-40 right-0 w-px h-64 ${theme === 'dark'
            ? 'bg-gradient-to-b from-transparent via-eco-green/[0.06] to-transparent'
            : 'bg-gradient-to-b from-transparent via-eco-green/[0.08] to-transparent'
            }`} />
          <div className={`hidden sm:block absolute top-96 left-0 w-px h-48 ${theme === 'dark'
            ? 'bg-gradient-to-b from-transparent via-teal-400/[0.05] to-transparent'
            : 'bg-gradient-to-b from-transparent via-teal-400/[0.07] to-transparent'
            }`} />
        </div>
        {/* Grid dots */}
        <div
          className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-[0.025]' : 'opacity-[0.045]'}`}
          style={{ backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#fff' : '#10B981'} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        />
        {/* Top-edge highlight */}
        <div className={`absolute top-16 inset-x-0 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-eco-green/10 to-transparent' : 'bg-gradient-to-r from-transparent via-eco-green/15 to-transparent'}`} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-8">

          {/* ── Tab Bar (desktop only — mobile uses bottom nav) ── */}
          <div className={`hidden lg:flex gap-1 rounded-2xl border p-1 backdrop-blur-sm mb-8 ${theme === 'dark' ? 'border-white/5 bg-slate-900/60' : 'border-slate-200 bg-white/60'
            }`}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => handleTab(t.id)}
                className={`relative flex-1 min-w-[5rem] flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === t.id ? 'text-white' : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900')
                  }`}>
                {activeTab === t.id && (
                  <motion.div layoutId="stuTab"
                    className="absolute inset-0 rounded-xl bg-eco-green shadow-lg shadow-eco-green/20"
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
            {activeTab === 'home' && <HomeTab key="home" me={me} myReports={myReports} pendingCount={pendingCount} resolvedCount={resolvedCount} goTab={handleTab} showAllTips={showAllTips} setShowAllTips={setShowAllTips} liveLeaderboard={liveLeaderboard} addNotification={addNotification} userId={user?.id} openCertificate={openCertificate} />}
            {activeTab === 'report' && <ReportTab key="report" binLocations={binLocations} roomLocations={roomLocations} wasteTypes={wasteTypes} urgencyLevels={urgencyLevels} />}
            {activeTab === 'map' && <StudentMapTab key="map" />}
            {activeTab === 'activity' && <ActivityTab key="activity" me={me} myReports={myReports} onRefresh={fetchReports} loading={reportsLoading} />}
            {activeTab === 'leaderboard' && <LeaderboardTab key="leaderboard" me={me} liveLeaderboard={liveLeaderboard} onRefresh={async () => { try { const r = await api.getLeaderboard(); if (r.success && r.data?.leaderboard) setLiveLeaderboard(r.data.leaderboard); } catch (e) { } }} />}
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
                className={`transition-colors ${isActive ? 'text-eco-green' : (theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}`}>
                <t.icon className="h-6 w-6" />
              </motion.div>
            </button>
          );
        })}
      </nav>

      {/* ════════ REWARD CERTIFICATE MODAL ════════════ */}
      {certificateData && (
        <RewardCertificate
          isOpen={certificateOpen}
          onClose={() => setCertificateOpen(false)}
          studentName={certificateData.studentName}
          studentId={certificateData.studentId}
          points={certificateData.points}
          rewardCode={certificateData.rewardCode}
          date={certificateData.date}
        />
      )}
    </div>
  );
}

