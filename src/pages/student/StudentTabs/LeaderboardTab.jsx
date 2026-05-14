import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Flame, RefreshCw, Search, X } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { Card, fadeUp } from './shared';

export default function LeaderboardTab({ me, liveLeaderboard, onRefresh }) {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('monthly'); // 'monthly', 'quarterly', or 'lifetime'
    const isDark = theme === 'dark';
    const [pointsSettings, setPointsSettings] = useState([
        { key: 'points_1st', value: '15' },
        { key: 'points_2nd', value: '10' },
        { key: 'points_3rd', value: '5' },
    ]);

    useEffect(() => {
        api.getSystemSettings().then(res => {
            if (res?.data) setPointsSettings(res.data);
        }).catch(() => { });
    }, []);

    const handleRefresh = async () => {
        setLoading(true);
        try { await onRefresh(); } finally { setLoading(false); }
    };

    // Sort leaderboard based on viewMode
    const sortedLeaderboard = [...(liveLeaderboard || [])].sort((a, b) => {
        if (viewMode === 'monthly') return b.points - a.points;
        if (viewMode === 'quarterly') return (b.quarterlyPoints || 0) - (a.quarterlyPoints || 0);
        return (b.lifetimePoints - a.lifetimePoints);
    }).map((u, idx) => ({ ...u, displayRank: idx + 1 }));

    const filtered = sortedLeaderboard.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        (u.department || '').toLowerCase().includes(search.toLowerCase())
    );

    const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const podiumOrder = [filtered[1], filtered[0], filtered[2]];

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="space-y-6 pb-24 lg:pb-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <Trophy className="h-5 w-5 text-amber-400" /> Eco-Champions Leaderboard
                    </h2>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {viewMode === 'monthly' ? 'Showing top reporters for this month' 
                        : viewMode === 'quarterly' ? 'Showing top reporters for this academic quarter'
                        : 'Showing all-time top reporters'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`flex p-1 rounded-xl border ${isDark ? 'border-white/10 bg-slate-900/60' : 'border-slate-200 bg-white'}`}>
                        <button 
                            onClick={() => setViewMode('monthly')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'monthly' ? 'bg-eco-green text-white shadow-lg shadow-eco-green/20' : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-900')}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setViewMode('quarterly')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'quarterly' ? 'bg-eco-green text-white shadow-lg shadow-eco-green/20' : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-900')}`}
                        >
                            Quarterly
                        </button>
                        <button 
                            onClick={() => setViewMode('lifetime')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'lifetime' ? 'bg-eco-green text-white shadow-lg shadow-eco-green/20' : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-900')}`}
                        >
                            Lifetime
                        </button>
                    </div>
                    <button onClick={handleRefresh} disabled={loading}
                        className={`p-2.5 rounded-xl border transition-colors ${isDark ? 'border-white/10 hover:bg-slate-800' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''} ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    </button>
                </div>
            </div>

            {/* Points system info */}
            <Card theme={theme} className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-400/20">
                <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>How Points Work</span>
                </div>
                <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    When the same bin is reported by multiple students, only the first 3 get points after admin verification:
                </p>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: '1st reporter', key: 'points_1st', emoji: '🥇', color: isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700' },
                        { label: '2nd reporter', key: 'points_2nd', emoji: '🥈', color: isDark ? 'bg-slate-600/50 text-slate-300' : 'bg-slate-100 text-slate-600' },
                        { label: '3rd reporter', key: 'points_3rd', emoji: '🥉', color: isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600' },
                    ].map(p => {
                        const pts = pointsSettings.find(s => s.key === p.key)?.value ?? '0';
                        return (
                            <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${p.color}`}>
                                {p.emoji} {pts} pts — {p.label}
                            </span>
                        );
                    })}
                </div>
            </Card>

            {/* Podium */}
            {filtered.length >= 3 && (
                <div className="grid grid-cols-3 gap-2 items-end">
                    {podiumOrder.map((u, podiumIdx) => {
                        if (!u) return <div key={podiumIdx} />;
                        const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
                        const isMe = u.name === me?.name;
                        const podiumBg = isDark
                            ? ['bg-slate-700/50', 'bg-amber-500/20', 'bg-orange-500/15']
                            : ['bg-slate-100', 'bg-amber-50', 'bg-orange-50'];
                        return (
                            <Card key={u.displayRank} theme={theme}
                                className={`flex flex-col items-center text-center !p-3 ${podiumBg[podiumIdx]} ${isMe ? 'ring-2 ring-eco-green' : ''}`}>
                                <span className="text-2xl mb-1">{medals[actualRank]}</span>
                                <p className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {u.name}{isMe ? ' (You)' : ''}
                                </p>
                                <p className="text-[10px] text-slate-500 truncate w-full mt-0.5">{u.department || 'Student'}</p>
                                <div className={`flex items-center gap-1 text-sm font-extrabold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    <Flame className="h-3.5 w-3.5 text-orange-400" /> 
                                    {viewMode === 'monthly' ? u.points.toLocaleString() : 
                                     viewMode === 'quarterly' ? (u.quarterlyPoints || 0).toLocaleString() : 
                                     (u.lifetimePoints || 0).toLocaleString()}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Search */}
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${isDark ? 'border-white/10 bg-slate-900/60' : 'border-slate-200 bg-white'}`}>
                <Search className={`h-4 w-4 shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or course…"
                    className={`flex-1 text-sm bg-transparent focus:outline-none ${isDark ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'}`} />
                {search && (
                    <button onClick={() => setSearch('')}>
                        <X className={`h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    </button>
                )}
            </div>

            {/* Full rankings */}
            <Card theme={theme} className="!p-0 overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <Trophy className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-700' : 'text-slate-300'}`} />
                        <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {liveLeaderboard.length === 0 ? 'No rankings yet — be the first to report!' : 'No students match your search'}
                        </p>
                    </div>
                ) : (
                    <div className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                        {filtered.map((u) => {
                            const isMe = u.name === me?.name;
                            return (
                                <div key={u.displayRank}
                                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${isMe
                                        ? isDark ? 'bg-eco-green/10 border-l-2 border-eco-green' : 'bg-eco-green/5 border-l-2 border-eco-green'
                                        : isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'
                                        }`}>
                                    <span className="w-8 text-center text-lg shrink-0">{medals[u.displayRank] || `#${u.displayRank}`}</span>
                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-sm ${isMe ? 'bg-eco-green text-white' : isDark ? 'bg-slate-700 text-slate-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                        {u.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold truncate ${isMe ? 'text-eco-green' : isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {u.name}{isMe ? ' (You)' : ''}
                                        </p>
                                        <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                            {u.department || 'Student'} · {u.reports} reports
                                        </p>
                                    </div>
                                    <div className={`flex items-center gap-1 font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        <Flame className="h-3.5 w-3.5 text-orange-400" /> 
                                        {viewMode === 'monthly' ? u.points.toLocaleString() : 
                                         viewMode === 'quarterly' ? (u.quarterlyPoints || 0).toLocaleString() : 
                                         (u.lifetimePoints || 0).toLocaleString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </motion.div>
    );
}
