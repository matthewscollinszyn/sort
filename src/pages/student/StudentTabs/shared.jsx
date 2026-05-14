/* =========================================================
   Shared utilities for Student page tabs
   ========================================================= */
import { BIN_STATUS } from '../../../data/reportState';

/* ── Animations ── */
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};
export const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ── GlowOrb ── */
export function GlowOrb({ className, color = 'bg-eco-green' }) {
    return <div className={`absolute rounded-full pointer-events-none ${color} ${className}`} />;
}

/* ── WavyBg ── */
export function WavyBg({ variant = 1, theme = 'dark' }) {
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

/* ── Themed Card ── */
export function Card({ children, className = '', glow = false, theme = 'dark', ...props }) {
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

/* ── Status helpers ── */
export const statusDot = {
    [BIN_STATUS.PENDING]: 'bg-amber-400',
    [BIN_STATUS.VERIFIED]: 'bg-eco-green',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400',
    [BIN_STATUS.DISMISSED]: 'bg-red-400',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-400',
    [BIN_STATUS.COLLECTED]: 'bg-emerald-400',
};
export const statusBadge = {
    [BIN_STATUS.PENDING]: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
    [BIN_STATUS.VERIFIED]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400/15 text-slate-400 border-slate-400/20',
    [BIN_STATUS.DISMISSED]: 'bg-red-400/15 text-red-400 border-red-400/20',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
    [BIN_STATUS.COLLECTED]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
};
export const binStatusLabel = {
    full: { color: 'text-red-400', bg: 'bg-red-400/15', label: 'Bin Location Unavailable' },
    empty: { color: 'text-emerald-400', bg: 'bg-emerald-400/15', label: 'Available' },
};
