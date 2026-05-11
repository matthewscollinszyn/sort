/* =========================================================
   EcoLedger – Landing Page  (Public · First Impression)
   Modern, dense layout with rich animations, login section.
   TypeScript version.
   ========================================================= */

import { useState, useEffect, useRef, type ChangeEvent, type FormEvent, type RefObject } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
  Leaf, MapPin, ShieldCheck, BarChart3, Recycle,
  Users, Truck, Sparkles, GraduationCap, Wrench, Eye,
  Quote, Globe, HeartHandshake, LogIn, ChevronDown,
  TreePine, Droplets, Wind, Sun, IdCard, Lock, UserPlus,
  BookOpen, Hash, Upload, X, Mail, Phone, Moon,
  CalendarDays, Megaphone, TrendingUp, Award, Newspaper,
  Building2, FlaskConical, Landmark, HandMetal, ArrowRight,
  User, Loader2,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { impactStats } from '../data/reportState';

/* ── Type Definitions ───────────────────────────────────── */
interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  suffix: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface CampusUpdate {
  id: number;
  tag: string;
  tagColor: string;
  date: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  iconBg: string;
}

interface CampusPartner {
  name: string;
  icon: LucideIcon;
  desc: string;
}

interface DemoCredential {
  role: string;
  username: string;
  password: string;
  icon: LucideIcon;
  color: string;
}

interface SignupForm {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phone: string;
  course: string;
  section: string;
  schoolId: string;
  password: string;
  confirmPassword: string;
}

/* ── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ── Animated counter ───────────────────────────────────── */
interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix = '' }: CounterProps): JSX.Element {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number): void => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

/* ── Floating particle ──────────────────────────────────── */
interface FloatingIconProps {
  icon: LucideIcon;
  className: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

function FloatingIcon({ icon: Icon, className, delay = 0, size = 'md', theme = 'dark' }: FloatingIconProps): JSX.Element {
  const sz = size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 0.15, 0.15], y: [10, -8, 10] }}
      transition={{ duration: 12, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute pointer-events-none ${className}`}
    >
      <Icon className={`${sz} ${theme === 'dark' ? 'text-white/15' : 'text-eco-green/20'}`} />
    </motion.div>
  );
}

/* ── Animated glow orb ──────────────────────────────────── */
interface GlowOrbProps {
  className: string;
  duration?: number;
  delay?: number;
  color?: string;
}

function GlowOrb({ className, duration = 9, delay = 0, color = 'bg-eco-green' }: GlowOrbProps): JSX.Element {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute rounded-full pointer-events-none ${color} ${className}`}
    />
  );
}

/* ── Spinning ring ──────────────────────────────────────── */
interface SpinRingProps {
  className: string;
  duration?: number;
  reverse?: boolean;
}

function SpinRing({ className, duration = 20, reverse = false }: SpinRingProps): JSX.Element {
  return (
    <motion.div
      animate={{ rotate: reverse ? [0, -360] : [0, 360] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className={`absolute rounded-full border pointer-events-none ${className}`}
    />
  );
}

/* ── SVG Wave Divider ───────────────────────────────────── */
interface WaveDividerProps {
  flip?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

function WaveDivider({ flip = false, className = '', theme = 'dark' }: WaveDividerProps): JSX.Element {
  const fill = theme === 'dark' ? '#0f172a' : '#f8fafc';
  return (
    <div className={`absolute left-0 right-0 overflow-hidden pointer-events-none leading-[0] ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] sm:h-[80px] lg:h-[100px]">
        <path d="M0,40 C360,120 720,0 1080,80 C1260,110 1380,60 1440,40 L1440,120 L0,120 Z" fill={fill} fillOpacity="0.6" />
        <path d="M0,60 C240,10 480,100 720,50 C960,0 1200,90 1440,60 L1440,120 L0,120 Z" fill={fill} fillOpacity="0.4" />
        <path d="M0,80 C180,40 360,90 540,60 C720,30 900,100 1080,70 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z" fill={fill} />
      </svg>
    </div>
  );
}

/* ── Static SVG background decoration ───────────────────── */
interface WavyBgProps {
  className?: string;
  variant?: 1 | 2 | 3 | 4 | 5;
  theme?: 'dark' | 'light';
}

function WavyBg({ className = '', variant = 1, theme = 'dark' }: WavyBgProps): JSX.Element | null {
  const c = '#10B981';
  const d = theme === 'dark';
  const variants: Record<number, JSX.Element> = {
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

/* ── Static Data ────────────────────────────────────────── */
const steps: Step[] = [
  { icon: MapPin, title: 'Spot & Report', desc: 'See a full bin or broken furniture? Drop a pin on our live campus map in seconds.', color: 'from-amber-400 to-orange-500' },
  { icon: ShieldCheck, title: 'MRF Verifies', desc: 'Staff review and verify every report, then dispatch the right response team.', color: 'from-eco-green to-teal-500' },
  { icon: Recycle, title: 'Track & Earn', desc: 'Earn eco-points, climb the leaderboard, and track your environmental impact.', color: 'from-blue-500 to-indigo-500' },
];

const stats: StatItem[] = [
  { label: 'Reports Filed', value: impactStats.totalReports, icon: BarChart3, suffix: '+' },
  { label: 'Bins Serviced', value: impactStats.binsServiced, icon: Truck, suffix: '+' },
  { label: 'Assets Recovered', value: impactStats.assetsRecovered, icon: Recycle, suffix: '' },
  { label: 'Active Users', value: impactStats.activeStudents, icon: Users, suffix: '+' },
];

const features: Feature[] = [
  { icon: Eye, title: 'Live Campus Map', desc: 'Interactive map with pulsing pins — see every bin status in real time.' },
  { icon: Wrench, title: 'Asset Recovery', desc: 'Report broken chairs, desks & equipment. Track repairs from report to fixed.' },
  { icon: GraduationCap, title: 'Gamified Points', desc: 'Earn eco-points for every verified report and compete on the leaderboard.' },
  { icon: ShieldCheck, title: 'Instant Verify', desc: 'MRF staff verify, resolve, or dismiss reports with a single tap.' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'Weekly charts, audit logs, and full transparency into campus operations.' },
  { icon: HeartHandshake, title: 'Community Impact', desc: 'Every report contributes to CO₂ reduction and campus sustainability goals.' },
];

const testimonials: Testimonial[] = [
  { name: 'Maria Santos', role: 'BS Environmental Sci · 3rd Year', text: "I've earned 1,200+ points this semester. Reporting is so quick it's almost fun!", avatar: '👩‍🎓' },
  { name: 'Dr. Elena Reyes', role: 'Faculty · Arts Building', text: 'A broken whiteboard was fixed in 3 days after I reported it. Game changer.', avatar: '👩‍🏫' },
  { name: 'Rico Mendoza', role: 'MRF Staff Lead', text: 'We resolve reports 40% faster now. The queue system is incredibly efficient.', avatar: '👷' },
];

const campusUpdates: CampusUpdate[] = [
  { id: 1, tag: 'MRF Update', tagColor: 'bg-eco-green/15 text-eco-green', date: 'Feb 24, 2026', title: 'Extended Collection Hours Campus-Wide', desc: 'Starting March 1, MRF collection trucks will operate from 6 AM to 8 PM on weekdays.', icon: Truck, iconBg: 'from-eco-green to-teal-500' },
  { id: 2, tag: 'New Facility', tagColor: 'bg-blue-400/15 text-blue-400', date: 'Feb 20, 2026', title: '5 New Segregation Stations Installed', desc: 'Color-coded recycling stations are now live near Science Hall, the Gym, and Admin Building.', icon: Recycle, iconBg: 'from-blue-500 to-indigo-500' },
  { id: 3, tag: 'Achievement', tagColor: 'bg-amber-400/15 text-amber-400', date: 'Feb 18, 2026', title: 'Campus Hits 2,000+ Reports This Semester', desc: 'Thanks to student participation, our campus filed over 2,000 waste reports.', icon: TrendingUp, iconBg: 'from-amber-400 to-orange-500' },
  { id: 4, tag: 'Event', tagColor: 'bg-pink-400/15 text-pink-400', date: 'Feb 15, 2026', title: 'Eco-Points Double Weekend This March', desc: 'Report bins on March 8–9 and earn 2× eco-points.', icon: Award, iconBg: 'from-pink-500 to-rose-500' },
  { id: 5, tag: 'Program', tagColor: 'bg-violet-400/15 text-violet-400', date: 'Feb 12, 2026', title: 'Zero-Waste Cafeteria Pilot Launches', desc: 'Block A cafeteria is going zero-waste for 30 days.', icon: Droplets, iconBg: 'from-violet-500 to-purple-500' },
  { id: 6, tag: 'Research', tagColor: 'bg-cyan-400/15 text-cyan-400', date: 'Feb 10, 2026', title: 'Waste Audit Reveals 42% Recyclable Content', desc: 'A campus-wide waste audit found that 42% of waste is recyclable.', icon: FlaskConical, iconBg: 'from-cyan-500 to-sky-500' },
];

const campusPartners: CampusPartner[] = [
  { name: 'Office of Student Affairs', icon: Building2, desc: 'Student engagement & events' },
  { name: 'Environmental Science Dept.', icon: FlaskConical, desc: 'Research & waste audits' },
  { name: 'Facilities Management Office', icon: Wrench, desc: 'Bin maintenance & logistics' },
  { name: 'Campus Sustainability Council', icon: Landmark, desc: 'Policy & green initiatives' },
  { name: 'Student Government Association', icon: HandMetal, desc: 'Volunteer drives & awareness' },
  { name: 'General Services Division', icon: Truck, desc: 'Collection & MRF operations' },
];

const demoCredentials: DemoCredential[] = [
  { role: 'Student', username: 'student', password: 'student123', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
  { role: 'Teacher', username: 'teacher', password: 'teacher123', icon: Users, color: 'from-amber-500 to-orange-500' },
  { role: 'Admin', username: 'admin', password: 'admin123', icon: ShieldCheck, color: 'from-purple-500 to-pink-500' },
  { role: 'MRF Staff', username: 'ricomendoza', password: 'rico123', icon: Truck, color: 'from-eco-green to-teal-500' },
];

/* ════════════════════════════════════════════════════════ */
export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { signin, error: authError, loading: authLoading, clearError } = useAuth();

  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFocused, setLoginFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  // Auto-fill demo credentials
  const fillDemoCredentials = (cred: DemoCredential): void => {
    setUsername(cred.username);
    setPassword(cred.password);
    clearError();
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setSigningIn(true);
    try {
      await signin(username, password);
    } catch {
      // Error is handled by AuthContext
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className={`flex flex-col overflow-x-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>

      {/* ══════════ NAVBAR ══════════════════════════════ */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl ${theme === 'dark'
          ? 'border-white/5 bg-slate-950/70'
          : 'border-slate-200 bg-white/70'
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-eco-green text-white shadow-lg shadow-eco-green/20">
              <Leaf className="h-5 w-5" />
            </div>
            <span className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>EcoLedger</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="#features" className={`hidden sm:block text-sm transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Features</a>
            <a href="#how-it-works" className={`hidden sm:block text-sm transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>How It Works</a>
            <a href="#updates" className={`hidden sm:block text-sm transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Updates</a>
            <button onClick={toggleTheme}
              className={`flex items-center justify-center h-9 w-9 rounded-lg transition-all ${theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#login" className="eco-btn-primary text-xs !px-3 !py-1.5 sm:!px-4 sm:!py-2 shadow-lg shadow-eco-green/25">
              <LogIn className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Sign In</span>
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ══════════ HERO ═══════════════════════════════ */}
      <section className={`relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 ${theme === 'light' ? 'bg-gradient-to-b from-slate-50 via-white to-emerald-50/40' : ''}`}>
        <GlowOrb color="bg-eco-green/8" duration={15} delay={0}
          className="top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[20rem] w-[20rem] sm:h-[30rem] sm:w-[30rem] lg:h-[40rem] lg:w-[40rem] blur-[60px] sm:blur-[80px]" />
        <GlowOrb color="bg-teal-500/6" duration={20} delay={3}
          className="bottom-0 right-0 h-[16rem] w-[16rem] sm:h-[22rem] sm:w-[22rem] lg:h-[30rem] lg:w-[30rem] blur-[50px] sm:blur-[70px]" />
        <WavyBg variant={1} theme={theme} />
        <WaveDivider theme={theme === 'dark' ? 'dark' : 'light'} className="z-10" />
        <SpinRing duration={40} className="hidden sm:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] border-eco-green/6" />
        <FloatingIcon icon={TreePine} className="hidden sm:block top-[18%] left-[7%]" delay={0} theme={theme} />
        <FloatingIcon icon={Recycle} className="hidden sm:block bottom-[28%] right-[7%]" delay={2} theme={theme} />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.04]'}`}
          style={{ backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? 'white' : '#10B981'} 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-20 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex items-center gap-2 rounded-full border border-eco-green/30 bg-eco-green/10 px-4 py-1.5 text-sm font-medium text-eco-green backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Campus Sustainability Platform
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className={`max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Make Your Campus{' '}
            <span className="bg-gradient-to-r from-eco-green via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Cleaner
            </span>
            <br />
            One Report at a Time
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className={`max-w-xl text-base sm:text-lg leading-relaxed px-2 sm:px-0 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Report full bins, broken furniture, and waste issues. Earn points. Watch your campus transform — all from your phone.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full px-4 sm:px-0">
            <a href="#login"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-eco-green px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-eco-green/25 transition-all duration-200 hover:bg-eco-green-dark hover:shadow-eco-green/40 hover:scale-[1.02] active:scale-[0.98]">
              <LogIn className="h-4 w-4" /> Sign In
            </a>
            <a href="#how-it-works"
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border backdrop-blur-sm px-6 py-3.5 text-sm font-semibold transition-all ${theme === 'dark'
                ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white'
                : 'border-slate-300 bg-slate-100/50 text-slate-700 hover:border-slate-400 hover:bg-slate-200 hover:text-slate-900'
                }`}>
              See How It Works
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className={`h-5 w-5 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ LIVE STATS RIBBON ══════════════════ */}
      <section className={`relative border-y backdrop-blur-sm ${theme === 'dark' ? 'border-white/5 bg-slate-900/80' : 'border-slate-200 bg-slate-50/80'}`}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className={`flex flex-col items-center gap-2 py-8 px-4 transition-colors ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-100/50'}`}
            >
              <s.icon className="h-5 w-5 text-eco-green" />
              <span className={`text-2xl font-extrabold sm:text-3xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <Counter target={s.value} suffix={s.suffix} />
              </span>
              <span className={`text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ FEATURES BENTO GRID ════════════════ */}
      <section id="features" className={`relative py-14 sm:py-20 lg:py-24 overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-white via-emerald-50/30 to-slate-50' : ''}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[16rem] w-[24rem] sm:h-[30rem] sm:w-[50rem] rounded-full bg-eco-green/4 blur-[60px]" />
        <WavyBg variant={2} theme={theme} />
        <div className="relative mx-auto max-w-6xl px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 sm:mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-eco-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-eco-green">Features</span>
            <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Everything Your Campus Needs</h2>
            <p className={`mx-auto mt-3 max-w-md ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>A complete platform for waste management, asset tracking, and sustainability gamification.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}
                className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:shadow-eco-green/5 ${theme === 'dark'
                  ? 'border-white/5 bg-slate-900/60 hover:border-eco-green/20 hover:bg-slate-900/90'
                  : 'border-slate-200 bg-white/60 hover:border-eco-green/30 hover:bg-white/90'
                  }`}>
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-eco-green/4 blur-xl transition-all duration-500 group-hover:bg-eco-green/8" />
                <div className="relative">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-eco-green/10 text-eco-green transition-colors group-hover:bg-eco-green/15">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mb-2 font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ═══════════════════════ */}
      <section id="how-it-works" className={`relative border-t py-14 sm:py-20 lg:py-24 overflow-hidden ${theme === 'dark' ? 'border-white/5 bg-slate-900/40' : 'border-slate-200 bg-slate-50/40'}`}>
        <WavyBg variant={3} theme={theme} />
        <div className="mx-auto max-w-5xl px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 sm:mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-eco-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-eco-green">How It Works</span>
            <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Three Steps to a Cleaner Campus</h2>
          </motion.div>

          <div className="relative">
            <div className={`absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent to-transparent sm:block ${theme === 'dark' ? 'via-eco-green/20' : 'via-eco-green/50'}`} />
            <div className="flex flex-col gap-8 sm:gap-12">
              {steps.map((s, i) => (
                <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className={`flex flex-col items-center gap-6 sm:flex-row ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center sm:text-left">
                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${s.color} px-3 py-1 text-xs font-bold text-white mb-3`}>Step {i + 1}</div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                    <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{s.desc}</p>
                  </div>
                  <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border shadow-xl ${theme === 'dark' ? 'border-white/10 bg-slate-800' : 'border-slate-300 bg-white'}`}>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-10`} />
                    <s.icon className={`h-7 w-7 ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`} />
                  </div>
                  <div className="hidden flex-1 sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ═══════════════════════ */}
      <section className={`relative py-14 sm:py-20 lg:py-24 overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-slate-50 via-white to-emerald-50/20' : ''}`}>
        <div className="absolute bottom-0 right-0 h-[16rem] w-[16rem] sm:h-[25rem] sm:w-[25rem] rounded-full bg-teal-500/3 blur-[60px]" />
        <WavyBg variant={4} theme={theme} />
        <div className="relative mx-auto max-w-6xl px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 sm:mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-eco-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-eco-green">Testimonials</span>
            <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loved by the Community</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}
                className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm p-6 ${theme === 'dark' ? 'border-white/5 bg-slate-900/60' : 'border-slate-200 bg-white/60'}`}>
                <Quote className="absolute -right-2 -top-2 h-16 w-16 text-eco-green/5 rotate-12" />
                <div className="relative">
                  <p className={`mb-5 text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>{t.avatar}</span>
                    <div>
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.name}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ CAMPUS UPDATES ══════════════════════ */}
      <section id="updates" className={`relative border-t py-14 sm:py-20 lg:py-24 overflow-hidden ${theme === 'dark' ? 'border-white/5 bg-slate-900/40' : 'border-slate-200 bg-gradient-to-b from-slate-50 via-white to-emerald-50/20'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[16rem] w-[28rem] sm:h-[25rem] sm:w-[45rem] rounded-full bg-eco-green/4 blur-[80px]" />
        <WavyBg variant={5} theme={theme} />
        <div className="relative mx-auto max-w-6xl px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 sm:mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-eco-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-eco-green">Campus Updates</span>
            <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>What&apos;s Happening on Campus</h2>
            <p className={`mx-auto mt-3 max-w-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Stay informed with the latest sustainability news.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campusUpdates.map((item, i) => (
              <motion.article key={item.id} variants={fadeUp} custom={i}
                className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:shadow-eco-green/5 ${theme === 'dark'
                  ? 'border-white/5 bg-slate-900/60 hover:border-eco-green/20 hover:bg-slate-900/90'
                  : 'border-slate-200 bg-white/60 hover:border-eco-green/30 hover:bg-white/90'
                  }`}>
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-eco-green/4 blur-xl transition-all duration-500 group-hover:bg-eco-green/8" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${item.tagColor}`}>{item.tag}</span>
                    <span className={`flex items-center gap-1 text-[10px] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                      <CalendarDays className="h-3 w-3" />{item.date}
                    </span>
                  </div>
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.iconBg} text-white shadow-lg transition-transform group-hover:scale-110`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mb-2 font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ CAMPUS PARTNERS ═══════════════════ */}
      <section className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-emerald-50/30 via-white to-slate-50' : ''}`}>
        <WavyBg variant={2} theme={theme} />
        <div className="mx-auto max-w-6xl px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 sm:mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-eco-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-eco-green">Partners</span>
            <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Working Together for a Greener Campus</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {campusPartners.map((p, i) => (
              <motion.div key={p.name} variants={fadeUp} custom={i}
                className={`group flex flex-col items-center text-center rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-lg hover:shadow-eco-green/5 ${theme === 'dark'
                  ? 'border-white/5 bg-slate-900/50 hover:border-eco-green/20 hover:bg-slate-900/80'
                  : 'border-slate-200 bg-white/50 hover:border-eco-green/30 hover:bg-white/90 shadow-sm'
                  }`}>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-eco-green/10 group-hover:bg-eco-green/15">
                  <p.icon className="h-6 w-6 text-eco-green" />
                </div>
                <p className={`text-xs font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{p.name}</p>
                <p className={`mt-1 text-[10px] leading-tight ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ LOGIN ════════════════════════════════ */}
      <section id="login" className={`relative border-t py-14 sm:py-20 lg:py-24 ${theme === 'dark' ? 'border-white/5 bg-slate-900/60' : 'border-slate-200 bg-gradient-to-b from-white to-slate-50'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[14rem] w-[22rem] sm:h-[20rem] sm:w-[35rem] rounded-full bg-eco-green/5 blur-[60px]" />
        <div className="relative mx-auto max-w-md px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-eco-green/10 text-eco-green">
              <Leaf className="h-7 w-7" />
            </div>
            <h2 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Sign in with your credentials</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22 }}
            onSubmit={handleLogin}
            className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl p-8 transition-all duration-300 ${theme === 'dark'
              ? `bg-slate-900/80 ${loginFocused || pwFocused ? 'border-eco-green/40 shadow-2xl shadow-eco-green/10' : 'border-white/10 shadow-xl'}`
              : `bg-white/80 ${loginFocused || pwFocused ? 'border-eco-green/40 shadow-2xl shadow-eco-green/10' : 'border-slate-200 shadow-xl'}`
              }`}
          >
            <div className={`absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-eco-green/8 blur-2xl transition-opacity duration-500 ${loginFocused || pwFocused ? 'opacity-100' : 'opacity-0'}`} />
            <div className="relative space-y-5">
              {/* Demo Credentials */}
              <div>
                <p className={`mb-3 text-xs font-semibold uppercase tracking-wider text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Quick Demo Access</p>
                <div className="grid grid-cols-2 gap-2">
                  {demoCredentials.map((cred) => (
                    <button
                      key={cred.role}
                      type="button"
                      onClick={() => fillDemoCredentials(cred)}
                      className={`group relative overflow-hidden rounded-xl border p-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${username === cred.username
                        ? 'border-eco-green/50 ring-2 ring-eco-green/20'
                        : theme === 'dark'
                          ? 'border-white/10 bg-slate-800/50 hover:border-white/20 hover:bg-slate-800'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${cred.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="relative flex flex-col items-center gap-1.5">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${cred.color} text-white`}>
                          <cred.icon className="h-4 w-4" />
                        </div>
                        <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{cred.role}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
                <div className="flex-1 h-px bg-current opacity-30" />
                <span className="text-xs font-medium">or enter credentials</span>
                <div className="flex-1 h-px bg-current opacity-30" />
              </div>

              {authError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center">
                  <p className="text-sm text-red-400">{authError}</p>
                </motion.div>
              )}

              {/* Username Input */}
              <div>
                <label className={`mb-2 block text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Username</label>
                <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50'} ${loginFocused ? 'border-eco-green/50 ring-2 ring-eco-green/20' : (theme === 'dark' ? 'border-slate-700' : 'border-slate-300')}`}>
                  <User className="h-5 w-5 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); clearError(); }}
                    onFocus={() => setLoginFocused(true)}
                    onBlur={() => setLoginFocused(false)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className={`flex-1 bg-transparent text-sm outline-none ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className={`mb-2 block text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Password</label>
                <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50'} ${pwFocused ? 'border-eco-green/50 ring-2 ring-eco-green/20' : (theme === 'dark' ? 'border-slate-700' : 'border-slate-300')}`}>
                  <Lock className="h-5 w-5 text-slate-500 shrink-0" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); clearError(); }}
                    onFocus={() => setPwFocused(true)}
                    onBlur={() => setPwFocused(false)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`flex-1 bg-transparent text-sm outline-none ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!username.trim() || !password.trim() || signingIn}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-eco-green py-3.5 text-sm font-bold text-white shadow-lg shadow-eco-green/25 transition-all duration-200 hover:bg-eco-green-dark hover:shadow-eco-green/40 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {signingIn ? <><Loader2 className="h-4 w-4 animate-spin" />Signing In...</> : <><LogIn className="h-4 w-4" />Sign In</>}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ══════════ CO₂ IMPACT BANNER ═════════════════ */}
      <section className={`border-t bg-gradient-to-r from-eco-green/10 via-teal-500/10 to-emerald-500/10 py-12 ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 text-center">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-eco-green" />
            <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <strong className="text-eco-green">{impactStats.co2Saved}</strong> of CO₂ diverted this semester
            </span>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Every report you submit helps reduce campus waste and carbon emissions.</p>
        </motion.div>
      </section>

      {/* ══════════ FOOTER ════════════════════════════ */}
      <footer className={`border-t py-8 ${theme === 'dark' ? 'border-white/5 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-eco-green text-white">
              <Leaf className="h-4 w-4" />
            </div>
            <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>EcoLedger</span>
          </div>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>© 2026 EcoLedger · Campus MRF Management System · v0.1</p>
        </div>
      </footer>
    </div>
  );
}
