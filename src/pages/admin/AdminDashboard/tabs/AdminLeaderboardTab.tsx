import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Search, RefreshCw, Flame, Award, Loader2 } from 'lucide-react';
import api from '../../../../services/api';
import { Card } from '../components/Card';

export function AdminLeaderboardTab() {
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const res = await api.getLeaderboard();
            if (res.success && res.data?.leaderboard) setLeaderboardData(res.data.leaderboard);
        } catch (e) { console.error('Failed to fetch leaderboard:', e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchLeaderboard(); }, []);

    const filtered = leaderboardData.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) || (u.department || '').toLowerCase().includes(search.toLowerCase())
    );

    const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const rankColors: Record<number, string> = {
        1: 'from-amber-50 to-yellow-50 border-amber-200',
        2: 'from-slate-50 to-slate-100 border-slate-300',
        3: 'from-orange-50 to-amber-50 border-orange-200',
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-500" /> Eco-Points Leaderboard</h2>
                    <p className="text-sm text-slate-500 mt-1">Top student eco-champions ranked by verified report points</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students…"
                            className="text-sm bg-transparent focus:outline-none text-slate-700 placeholder-slate-400 w-40" />
                    </div>
                    <button onClick={fetchLeaderboard} className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                        <RefreshCw className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
            </div>
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2"><Award className="h-5 w-5 text-amber-500" /><span className="text-sm font-semibold text-slate-700">Points System:</span></div>
                    <div className="flex flex-wrap gap-3">
                        {[{ label: '1st reporter', pts: 15, color: 'bg-amber-100 text-amber-700 border-amber-200' },
                        { label: '2nd reporter', pts: 10, color: 'bg-slate-100 text-slate-600 border-slate-200' },
                        { label: '3rd reporter', pts: 5, color: 'bg-orange-100 text-orange-600 border-orange-200' }
                        ].map(p => (
                            <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${p.color}`}>
                                <Flame className="h-3 w-3" /> {p.pts} pts — {p.label}
                            </span>
                        ))}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-slate-50 text-slate-400 border-slate-200">4th+ reporter — no points</span>
                    </div>
                </div>
            </Card>
            {!loading && filtered.length >= 3 && (
                <div className="grid grid-cols-3 gap-3">
                    {[filtered[1], filtered[0], filtered[2]].map((u, podiumIdx) => {
                        if (!u) return null;
                        const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
                        return (
                            <Card key={u.rank} className={`flex flex-col items-center justify-end text-center bg-gradient-to-b ${rankColors[actualRank] || 'border-slate-200'} !p-4`}>
                                <span className="text-3xl mb-1">{medals[actualRank]}</span>
                                <p className="text-sm font-bold text-slate-900 leading-tight">{u.name}</p>
                                <p className="text-xs text-slate-500 mb-2 truncate w-full">{u.department || 'Student'}</p>
                                <div className="flex items-center gap-1 text-base font-extrabold text-slate-900"><Flame className="h-4 w-4 text-orange-400" /> {u.points.toLocaleString()}</div>
                                <p className="text-xs text-slate-500 mt-0.5">{u.reports} reports</p>
                            </Card>
                        );
                    })}
                </div>
            )}
            <Card>
                {loading ? (
                    <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-slate-400" /></div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <Trophy className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                        <p className="text-slate-500 font-medium">No students found</p>
                        <p className="text-sm text-slate-400 mt-1">Rankings appear once students submit and verify reports</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Rank</th>
                                    <th className="text-left py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Student</th>
                                    <th className="text-left py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Course / Dept</th>
                                    <th className="text-right py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Reports</th>
                                    <th className="text-right py-3 px-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map(u => (
                                    <tr key={u.rank} className={`transition-colors ${u.rank <= 3 ? 'bg-amber-50/40 hover:bg-amber-50' : 'hover:bg-slate-50'}`}>
                                        <td className="py-3 px-3"><span className="text-lg">{medals[u.rank] || `#${u.rank}`}</span></td>
                                        <td className="py-3 px-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">{u.name.charAt(0)}</div>
                                                <span className="font-semibold text-slate-900">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">{u.department || '—'}</td>
                                        <td className="py-3 px-3 text-right font-medium text-slate-700">{u.reports}</td>
                                        <td className="py-3 px-3 text-right"><span className="inline-flex items-center gap-1 font-extrabold text-slate-900"><Flame className="h-3.5 w-3.5 text-orange-400" /> {u.points.toLocaleString()}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </motion.div>
    );
}
