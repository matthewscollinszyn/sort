import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Shield, Award, GraduationCap, Building2, Calendar, Flame, FileText, Hash } from 'lucide-react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    theme?: 'light' | 'dark';
}

const ROLE_CONFIG: Record<string, {
    label: string;
    icon: React.ReactNode;
    gradient: string;
    avatarGradient: string;
    badgeBg: string;
    badgeText: string;
}> = {
    ADMIN: {
        label: 'System Administrator',
        icon: <Shield className="h-3.5 w-3.5" />,
        gradient: 'from-slate-700 to-slate-900',
        avatarGradient: 'from-slate-600 to-slate-900',
        badgeBg: 'bg-slate-100',
        badgeText: 'text-slate-700',
    },
    TEACHER: {
        label: 'Faculty Member',
        icon: <GraduationCap className="h-3.5 w-3.5" />,
        gradient: 'from-blue-500 to-indigo-600',
        avatarGradient: 'from-blue-500 to-indigo-600',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-700',
    },
    MRF: {
        label: 'MRF Staff',
        icon: <Building2 className="h-3.5 w-3.5" />,
        gradient: 'from-emerald-500 to-teal-600',
        avatarGradient: 'from-emerald-500 to-teal-600',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700',
    },
    STUDENT: {
        label: 'Student',
        icon: <Award className="h-3.5 w-3.5" />,
        gradient: 'from-eco-green to-teal-500',
        avatarGradient: 'from-eco-green to-teal-500',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-eco-green',
    },
};

export default function ProfileModal({ isOpen, onClose, user, theme = 'light' }: ProfileModalProps) {
    if (!user) return null;

    const isDark = theme === 'dark';
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User';
    const role: string = user.role || 'STUDENT';
    const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.STUDENT;
    const initials = fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
    const joinDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'May 2026';

    const infoRows = [
        {
            icon: <Mail className="h-4 w-4" />,
            iconBg: 'bg-blue-500/10 text-blue-500',
            label: 'Email Address',
            value: user.email || '—',
        },
        ...(role === 'STUDENT' ? [{
            icon: <Hash className="h-4 w-4" />,
            iconBg: 'bg-amber-500/10 text-amber-500',
            label: 'Student ID',
            value: user.studentId || '—',
        }] : []),
        ...((role === 'STUDENT' || role === 'TEACHER') ? [{
            icon: <Building2 className="h-4 w-4" />,
            iconBg: 'bg-purple-500/10 text-purple-500',
            label: role === 'STUDENT' ? 'Year Level & Section' : 'Major',
            value: role === 'STUDENT' 
                ? (user.section || user.course || '—') 
                : (user.department || '—'),
        }] : []),
        ...(role === 'STUDENT' ? [{
            icon: <Flame className="h-4 w-4" />,
            iconBg: 'bg-orange-500/10 text-orange-500',
            label: 'Eco Points',
            value: user.points != null ? `${user.points} pts` : '0 pts',
        }] : []),
        ...((role === 'STUDENT' || role === 'TEACHER') ? [{
            icon: <FileText className="h-4 w-4" />,
            iconBg: 'bg-eco-green/10 text-eco-green',
            label: 'Total Reports',
            value: user.reports != null ? `${user.reports} reports` : '0 reports',
        }] : []),
        {
            icon: <Calendar className="h-4 w-4" />,
            iconBg: 'bg-emerald-500/10 text-emerald-500',
            label: 'Member Since',
            value: joinDate,
        },
    ];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className={`relative z-[10000] w-full max-w-[420px] flex flex-col rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] ${isDark
                                ? 'bg-slate-900 border border-white/10'
                                : 'bg-white border border-slate-200'
                            }`}
                        style={{ maxHeight: 'min(90vh, 760px)' }}
                    >
                        {/* Unified Scrollable Container */}
                        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ scrollbarWidth: 'none' }}>
                            {/* Header banner */}
                            <div className={`relative h-28 bg-gradient-to-br ${cfg.gradient} overflow-hidden`}>
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2 blur-xl" />
                                
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all active:scale-90"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="px-6 pb-8">
                                {/* Avatar (overlaps banner perfectly now) */}
                                <div className="relative z-10 flex flex-col items-center -mt-12 mb-5">
                                    <div className={`h-24 w-24 rounded-[2rem] bg-gradient-to-br ${cfg.avatarGradient} flex items-center justify-center text-white text-3xl font-black shadow-2xl ring-8 ${isDark ? 'ring-slate-900' : 'ring-white'}`}>
                                        {initials}
                                    </div>
                                </div>

                                {/* Name + role badge */}
                                <div className="text-center mb-8">
                                    <h2 className={`text-2xl font-black leading-tight mb-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {fullName}
                                    </h2>
                                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase ${cfg.badgeBg} ${cfg.badgeText}`}>
                                        {cfg.icon}
                                        {cfg.label}
                                    </span>
                                </div>

                                {/* Info rows */}
                                <div className={`rounded-3xl overflow-hidden border divide-y ${isDark ? 'border-white/10 divide-white/5' : 'border-slate-100 divide-slate-100'} mb-8`}>
                                    {infoRows.map((row, i) => (
                                        <div key={i} className={`flex items-center gap-4 px-5 py-4 ${isDark ? 'bg-white/[0.03]' : 'bg-slate-50/50'}`}>
                                            <div className={`h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center ${row.iconBg}`}>
                                                {row.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                                    {row.label}
                                                </p>
                                                <p className={`text-[15px] font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                                    {row.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action button (Close) */}
                                <button
                                    onClick={onClose}
                                    className={`w-full py-4 rounded-[1.5rem] text-sm font-black transition-all ${isDark
                                            ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                            : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm'
                                        }`}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );


}
