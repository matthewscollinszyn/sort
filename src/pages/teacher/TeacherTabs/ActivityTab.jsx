import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trash2, RefreshCw, FileText, Armchair } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Card, statusDot, statusBadge, assetStatusDot, assetStatusBadge } from './shared';

export default function ActivityTab({ myBinReports, myAssetReports, onRefresh, loading }) {
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
                    <h3 className={`text-lg font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <Clock className="h-5 w-5 text-blue-500" /> My Reports
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                            {allReports.length} total
                        </span>
                        <button onClick={onRefresh} disabled={loading}
                            className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'} disabled:opacity-50`}
                            title="Refresh reports">
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-4">
                    {[{ key: 'all', label: 'All' }, { key: 'waste', label: 'Waste' }, { key: 'asset', label: 'Assets' }].map(f => (
                        <button key={f.key} onClick={() => setFilter(f.key)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === f.key
                                ? 'bg-blue-500 text-white'
                                : theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}>
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
                        filtered.map(report => {
                            const isWaste = report.type === 'waste';
                            const status = report.status;
                            const dot = isWaste ? statusDot[status] : assetStatusDot[status];
                            const badge = isWaste ? statusBadge[status] : assetStatusBadge[status];
                            return (
                                <div key={report.id}
                                    className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-colors ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                {isWaste ? report.location : report.item}
                                            </p>
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isWaste ? 'bg-red-400/10 text-red-400' : 'bg-blue-400/10 text-blue-400'}`}>
                                                {isWaste ? <Trash2 className="h-2.5 w-2.5" /> : <Armchair className="h-2.5 w-2.5" />}
                                                {isWaste ? 'Waste' : 'Asset'}
                                            </span>
                                        </div>
                                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                                            {isWaste ? report.notes : report.location} · {new Date(report.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${badge}`}>
                                        {status?.replace('-', ' ')}
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
