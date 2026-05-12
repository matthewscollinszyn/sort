import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Search, Loader2 } from 'lucide-react';
import { type BinReport } from '../types';
import { Card } from '../components/Card';

interface CollectionsTabProps {
    binReports: BinReport[];
    loading: boolean;
    reportsError: string | null;
}

export function CollectionsTab({ binReports, loading, reportsError }: CollectionsTabProps) {
    const [search, setSearch] = useState('');
    const collectedReports = binReports.filter(r => r.kilosCollected !== null && r.kilosCollected !== undefined);

    const filteredReports = collectedReports
        .filter(r => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (r.assignedStaff?.name?.toLowerCase() || '').includes(q) || (r.location?.toLowerCase() || '').includes(q);
        })
        .sort((a, b) => new Date(b.collectionDate || b.timestamp || 0).getTime() - new Date(a.collectionDate || a.timestamp || 0).getTime());

    const totalKg = collectedReports.reduce((sum, r) => sum + (r.kilosCollected || 0), 0);
    const averageKg = collectedReports.length ? totalKg / collectedReports.length : 0;

    const staffTotals = collectedReports.reduce((acc, r) => {
        const name = r.assignedStaff?.name || 'Unassigned';
        if (!acc[name]) acc[name] = { total: 0, count: 0 };
        acc[name].total += r.kilosCollected || 0;
        acc[name].count += 1;
        return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const staffSummary = Object.entries(staffTotals).map(([name, stats]) => ({ name, ...stats })).sort((a, b) => b.total - a.total);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Scale className="h-5 w-5 text-emerald-500" /> MRF Collections</h2>
                <p className="text-sm text-slate-500 mt-1">{collectedReports.length} collected reports</p>
            </div>
            {reportsError && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{reportsError}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="!p-4"><p className="text-xs text-slate-500">Total Collected</p><p className="text-2xl font-bold text-slate-900">{totalKg.toFixed(1)} kg</p></Card>
                <Card className="!p-4"><p className="text-xs text-slate-500">Average per Collection</p><p className="text-2xl font-bold text-slate-900">{averageKg.toFixed(1)} kg</p></Card>
                <Card className="!p-4"><p className="text-xs text-slate-500">Collections Logged</p><p className="text-2xl font-bold text-slate-900">{collectedReports.length}</p></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 !p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Collected Waste Log</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" placeholder="Search staff or location..." value={search} onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm" />
                        </div>
                    </div>
                    {loading && filteredReports.length === 0 ? (
                        <div className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin text-emerald-500 mx-auto mb-2" /><p className="text-sm text-slate-500">Loading collections...</p></div>
                    ) : filteredReports.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm">No collections recorded yet.</div>
                    ) : (
                        <div className="space-y-3">
                            {filteredReports.map(r => (
                                <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{r.location}</p>
                                        <p className="text-xs text-slate-500">{r.assignedStaff?.name || 'Unassigned'} · {r.wasteType || 'Waste'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-emerald-600">{(r.kilosCollected || 0).toFixed(1)} kg</p>
                                        <p className="text-xs text-slate-400">{new Date(r.collectionDate || r.timestamp || '').toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
                <Card className="!p-4">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">By MRF Staff</h3>
                    {staffSummary.length === 0 ? (
                        <p className="text-sm text-slate-500">No collections yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {staffSummary.map(s => (
                                <div key={s.name} className="flex items-center justify-between">
                                    <div><p className="text-sm font-semibold text-slate-900">{s.name}</p><p className="text-xs text-slate-500">{s.count} collections</p></div>
                                    <p className="text-sm font-bold text-emerald-600">{s.total.toFixed(1)} kg</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </motion.div>
    );
}
