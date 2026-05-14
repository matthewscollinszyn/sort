import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, User, Settings, Award, LogOut, Flame, 
  Shield, GraduationCap, Building2, Trophy 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';
import { leaderboard } from '../data/reportState';

interface UserMenuProps {
  theme?: 'light' | 'dark';
  onTabChange?: (tabId: string) => void;
}

const ROLE_CONFIG: Record<string, {
  label: string;
  icon: React.ReactNode;
  gradient: string;
  badgeBg: string;
  badgeText: string;
}> = {
  ADMIN: {
    label: 'System Administrator',
    icon: <Shield className="h-3.5 w-3.5" />,
    gradient: 'from-slate-700 to-slate-900',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
  },
  TEACHER: {
    label: 'Faculty Member',
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    gradient: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
  },
  MRF: {
    label: 'MRF Staff',
    icon: <Building2 className="h-3.5 w-3.5" />,
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
  },
  STUDENT: {
    label: 'Student',
    icon: <Award className="h-3.5 w-3.5" />,
    gradient: 'from-eco-green to-teal-500',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-eco-green',
  },
};

export default function UserMenu({ theme = 'light', onTabChange }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, signout } = useAuth();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User';
  const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const role = user.role || 'STUDENT';
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.STUDENT;
  
  // Find user's rank and points from leaderboard if student
  const leaderboardEntry = leaderboard.find(l => l.name === fullName);
  const points = user.points || leaderboardEntry?.points || 0;
  const rank = leaderboardEntry?.rank || '-';

  const menuItems = role === 'ADMIN' 
    ? [
        { icon: User, label: 'My Profile' },
        { icon: Settings, label: 'Admin Settings' },
        { icon: Building2, label: 'Audit Logs' },
      ]
    : role === 'TEACHER'
    ? [
        { icon: User, label: 'My Profile' },
        { icon: Settings, label: 'Settings' },
      ]
    : role === 'MRF'
    ? [
        { icon: User, label: 'My Profile' },
        { icon: Settings, label: 'Settings' },
      ]
    : [
        { icon: User, label: 'My Profile' },
        { icon: Settings, label: 'Settings' },
        { icon: Award, label: 'My Badges' },
      ];

  const handleAction = (label: string) => {
    setOpen(false);
    if (label === 'My Profile') {
      setProfileOpen(true);
    } else if (label === 'Settings' || label === 'Admin Settings') {
      if (onTabChange) onTabChange('settings');
    } else if (label === 'My Badges' || label === 'Leaderboard') {
      // Per user request: My badges will go to leaderboards
      if (onTabChange) onTabChange('leaderboard');
    } else if (label === 'Audit Logs') {
      if (onTabChange) onTabChange('audit');
    }
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all outline-none ${
          open
            ? theme === 'dark' ? 'border-eco-green/40 bg-eco-green/10' : 'border-eco-green/40 bg-eco-green/5'
            : theme === 'dark'
            ? 'border-white/10 bg-slate-800/40 hover:border-white/20'
            : 'border-slate-300 bg-slate-100/40 hover:border-slate-400'
        }`}
      >
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${cfg.gradient} text-white text-xs font-bold shadow-sm`}>
          {initials}
        </div>
        <span className={`hidden sm:block text-xs font-medium max-w-[7rem] truncate ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {user.firstName || user.username}
        </span>
        <ChevronDown className={`h-3 w-3 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute right-0 top-full mt-2 w-64 rounded-[1.5rem] border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 overflow-hidden ${
              theme === 'dark'
                ? 'border-white/10 bg-slate-900/95 shadow-black/40'
                : 'border-slate-200/60 bg-white/95 shadow-slate-900/10'
            }`}
          >
            {/* Header Section */}
            <div className={`px-4 py-4 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cfg.gradient} text-white text-lg font-bold shadow-lg`}>
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {fullName}
                  </p>
                  <p className="text-xs text-slate-500 truncate font-medium">
                    {user.course || user.department || (role === 'ADMIN' ? 'System Administration' : 'MRF Operations')}
                  </p>
                </div>
              </div>

              {/* Points & Rank (Pill style from design) - Only for students */}
              {role === 'STUDENT' && (
                <div className={`mt-3 flex items-center justify-between rounded-xl px-3 py-2 ${
                  theme === 'dark' ? 'bg-white/[0.03] border border-white/5' : 'bg-slate-50 border border-slate-100'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-orange-500" />
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {points.toLocaleString()} eco-points
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Rank #{rank}
                  </span>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleAction(item.label)}
                  className={`flex w-full items-center gap-3.5 px-5 py-2.5 text-sm font-medium transition-all ${
                    theme === 'dark'
                      ? 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`h-4.5 w-4.5 transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Sign Out Section */}
            <div className={`border-t py-2 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
              <button
                onClick={signout}
                className="flex w-full items-center gap-3.5 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500/5 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4.5 w-4.5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        theme={theme}
      />
    </div>
  );
}
