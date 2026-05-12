import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trash2, Info, RefreshCw } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { BIN_STATUS } from '../../../data/reportState';
import { Card, fadeUp, statusBadge } from './shared';

export default function ActivityTab({ me, myReports, onRefresh, loading }) {
    const { theme } = useTheme();
    const [filterStatus, setFilterStatus] = useState('all');
    const allReports = [...myReports].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const filtered = filterStatus === 'all' ? allReports : allReports.filter(r => r.status === filterStatus);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-4 pb-20 lg:pb-0">

            {/* Header */}
            <div className="flex items-center gap-2 px-1">
                <Clock className="h-5 w-5 text-slate-500" />
                <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report History</h3>
                <span className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-slate-600">{filtered.length} report{filtered.length !== 1 ? 's' : ''}</span>
                    <button onClick={onRefresh} disabled={loading}
                        className={`p-1.5 rounded-lg transition-colors ${theme === 'dark'
                            ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                            : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'} disabled:opacity-50`}
                        title="Refresh reports">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </span>
            </div>

            {/* Filter strip */}
            <div className="-mx-3 sm:-mx-5 px-3 sm:px-5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                <div className="flex gap-2 w-max">
                    {[
                        { key: 'all', label: 'All', dot: 'bg-slate-400' },
                        { key: BIN_STATUS.PENDING, label: 'Pending', dot: 'bg-amber-400' },
                        { key: BIN_STATUS.VERIFIED, label: 'Verified', dot: 'bg-emerald-400' },
                        { key: BIN_STATUS.DISPATCHED, label: 'Dispatched', dot: 'bg-blue-400' },
                        { key: BIN_STATUS.COLLECTED, label: 'Collected', dot: 'bg-indigo-400' },
                        { key: BIN_STATUS.RESOLVED, label: 'Resolved', dot: 'bg-slate-400' },
                        { key: BIN_STATUS.DISMISSED, label: 'Dismissed', dot: 'bg-red-400' },
                    ].map((f) => {
                        const isActive = filterStatus === f.key;
                        return (
                            <button key={f.key} onClick={() => setFilterStatus(f.key)}
                                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${isActive
                                    ? `${theme === 'dark' ? 'bg-slate-800 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'}`
                                    : `${theme === 'dark' ? 'bg-slate-900/40 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10' : 'bg-slate-100/60 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'}`
                                    }`}>
                                <span className={`h-2 w-2 rounded-full ${f.dot} ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                                {f.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((r, i) => {
                    const badge = statusBadge[r.status] || 'bg-slate-400/15 text-slate-400 border-slate-400/20';
                    return (
                        <motion.div key={r.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                            <Card theme={theme}>
                                <div className="flex items-start gap-4">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${badge.split(' ')[0]}`}>
                                        <Trash2 className={`h-5 w-5 ${badge.split(' ')[1]}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start sm:items-center justify-between gap-2">
                                            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-sm sm:text-base truncate`}>{r.location}</p>
                                            <span className={`shrink-0 rounded-full border px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold capitalize ${badge}`}>
                                                {r.status}
                                            </span>
                                        </div>
                                        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1 line-clamp-2`}>{r.notes}</p>
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-[10px] sm:text-xs text-slate-600">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(r.timestamp).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span>By: {r.reportedBy}</span>
                                            <span className={`hidden sm:inline font-mono text-xs ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded px-1.5 py-0.5`}>{r.id}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <Card className="text-center py-12" theme={theme}>
                    <Info className={`h-10 w-10 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-400'} mx-auto mb-3`} />
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>No reports match this filter.</p>
                </Card>
            )}
        </motion.div>
    );
}
