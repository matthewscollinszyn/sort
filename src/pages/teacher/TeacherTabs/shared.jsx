import { BIN_STATUS, ASSET_STATUS } from '../../../data/reportState';

/* ── Animations ── */
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};
export const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

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

/* ── Bin status helpers ── */
export const binStatusLabel = {
    full: { color: 'text-red-400', bg: 'bg-red-400/15', label: 'Bin Location Unavailable' },
    empty: { color: 'text-emerald-400', bg: 'bg-emerald-400/15', label: 'Available' },
};

/* ── Waste report status ── */
export const statusDot = {
    [BIN_STATUS.PENDING]: 'bg-amber-400',
    [BIN_STATUS.VERIFIED]: 'bg-eco-green',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-400',
    [BIN_STATUS.COLLECTED]: 'bg-indigo-400',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400',
    [BIN_STATUS.DISMISSED]: 'bg-red-400',
};
export const statusBadge = {
    [BIN_STATUS.PENDING]: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
    [BIN_STATUS.VERIFIED]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
    [BIN_STATUS.COLLECTED]: 'bg-indigo-400/15 text-indigo-400 border-indigo-400/20',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400/15 text-slate-400 border-slate-400/20',
    [BIN_STATUS.DISMISSED]: 'bg-red-400/15 text-red-400 border-red-400/20',
};

/* ── Asset report status ── */
export const assetStatusDot = {
    [ASSET_STATUS.REPORTED]: 'bg-amber-400',
    [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-400',
    [ASSET_STATUS.DISPATCHED]: 'bg-blue-400',
    [ASSET_STATUS.IN_REVIEW]: 'bg-violet-400',
    [ASSET_STATUS.RECOVERED]: 'bg-eco-green',
    [ASSET_STATUS.DISPOSED]: 'bg-slate-400',
    dismissed: 'bg-red-400',
};
export const assetStatusBadge = {
    [ASSET_STATUS.REPORTED]: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
    [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
    [ASSET_STATUS.DISPATCHED]: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
    [ASSET_STATUS.IN_REVIEW]: 'bg-violet-400/15 text-violet-400 border-violet-400/20',
    [ASSET_STATUS.RECOVERED]: 'bg-eco-green/15 text-eco-green border-eco-green/20',
    [ASSET_STATUS.DISPOSED]: 'bg-slate-400/15 text-slate-400 border-slate-400/20',
    dismissed: 'bg-red-400/15 text-red-400 border-red-400/20',
};
