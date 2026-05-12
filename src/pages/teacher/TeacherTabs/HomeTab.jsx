import { motion } from 'framer-motion';
import {
    Sparkles, Zap, BarChart3, Trash2, Clock, CheckCircle2,
    Globe, BookOpen, CalendarDays, Truck, Recycle, TrendingUp,
    Award, Droplets, FlaskConical, Wrench, Armchair, MapPinned
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { impactStats, assetReports, ASSET_STATUS, BIN_STATUS } from '../../../data/reportState';
import { useCampusNews, TAG_COLOR_MAP } from '../../../hooks/useCampusNews';
import { useNewsNotifications } from '../../../hooks/useNewsNotifications';
import { Card, fadeUp, stagger } from './shared';

const quickActions = [
    { label: 'Report Issue', desc: 'Items, waste, equipment', icon: Armchair, color: 'from-blue-500 to-indigo-500', tab: 'report' },
    { label: 'Live Bin Map', desc: 'Campus bins status', icon: MapPinned, color: 'from-eco-green to-teal-500', tab: 'map' },
    { label: 'My Activity', desc: 'Track your reports', icon: Clock, color: 'from-violet-500 to-purple-500', tab: 'activity' },
    { label: 'MRF Dashboard', desc: 'View all reports', icon: BarChart3, color: 'from-amber-500 to-orange-500', tab: 'home' },
];

const TAG_ICON_MAP = {
    'MRF Update': Truck,
    'New Facility': Recycle,
    'Achievement': TrendingUp,
    'Event': Award,
    'Program': Droplets,
    'Research': FlaskConical,
    'Maintenance': Wrench,
    'Assets': Armchair,
    'Announcement': Wrench,
    'Update': Globe,
};

export default function HomeTab({ me, goTab, pendingBinCount, pendingAssetCount, myBinReports, myAssetReports, addNotification, userId }) {
    const { theme } = useTheme();
    const { news: campusUpdates } = useCampusNews(true);
    useNewsNotifications(userId, campusUpdates, addNotification);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="space-y-8 sm:space-y-12 pb-20 lg:pb-0">

            {/* ─── WELCOME HERO ─── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Card theme={theme} className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-violet-500/10 border-blue-500/20 p-6 sm:p-8">
                    <Sparkles className={`absolute top-4 right-4 h-16 w-16 ${theme === 'dark' ? 'text-blue-500/10' : 'text-blue-500/15'}`} />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-blue-500/20">
                                {me.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Good day, 👋</p>
                                <h1 className={`text-2xl sm:text-3xl font-extrabold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.name}</h1>
                                <p className="text-xs text-slate-500 mt-1">{me.department} · Faculty</p>
                            </div>
                        </div>
                        <div className="flex gap-5 sm:gap-8 sm:text-right">
                            <div>
                                <p className="text-xs text-slate-500">Waste Reports</p>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{myBinReports.length}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Asset Reports</p>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{myAssetReports.length}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.section>

            {/* ─── QUICK ACTIONS ─── */}
            <motion.section variants={stagger} initial="hidden" animate="visible">
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <Zap className="h-5 w-5 text-blue-500" /> Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {quickActions.map((a, i) => (
                        <motion.button key={a.label} variants={fadeUp} custom={i}
                            onClick={() => goTab(a.tab)}
                            className={`group rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-sm transition-all cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 active:scale-[0.97] ${theme === 'dark'
                                ? 'border-white/5 bg-slate-900/60 hover:border-blue-500/20 hover:bg-slate-900/90'
                                : 'border-slate-200 bg-white/60 shadow-sm hover:border-blue-500/20 hover:bg-white/90'}`}>
                            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                <a.icon className="h-5 w-5" />
                            </div>
                            <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{a.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                        </motion.button>
                    ))}
                </div>
            </motion.section>

            {/* ─── STATS ─── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <BarChart3 className="h-5 w-5 text-blue-500" /> My Stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { label: 'Waste Reports', value: myBinReports.length, icon: Trash2, color: 'text-red-400', bg: 'bg-red-400/10' },
                        { label: 'Asset Reports', value: myAssetReports.length, icon: Armchair, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                        { label: 'Pending', value: pendingBinCount + pendingAssetCount, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                        {
                            label: 'Resolved',
                            value: myAssetReports.filter(r => r.status === ASSET_STATUS.RECOVERED).length
                                + myBinReports.filter(r => r.status === BIN_STATUS.RESOLVED).length,
                            icon: CheckCircle2, color: 'text-eco-green', bg: 'bg-eco-green/10'
                        },
                    ].map(s => (
                        <Card key={s.label} theme={theme}
                            className="flex flex-col items-center text-center !p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.97]"
                            onClick={() => goTab('activity')}>
                            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                                <s.icon className={`h-5 w-5 ${s.color}`} />
                            </div>
                            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.value}</span>
                            <span className="text-xs text-slate-500">{s.label}</span>
                        </Card>
                    ))}
                </div>
            </motion.section>

            {/* ─── CAMPUS UPDATES ─── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="h-5 w-5 text-blue-400" /> Campus Updates
                </h2>
                {campusUpdates.length === 0 ? (
                    <Card theme={theme} className="text-center py-12">
                        <BookOpen className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`} />
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>No campus updates yet</p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Check back soon for updates and announcements</p>
                    </Card>
                ) : (
                    <motion.div variants={stagger} initial="hidden" animate="visible"
                        className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {campusUpdates.map((item, i) => {
                            const tagStyle = TAG_COLOR_MAP[item.tag] || { tagColor: 'bg-slate-100 text-slate-600', iconBg: 'from-slate-400 to-slate-500' };
                            const IconComp = TAG_ICON_MAP[item.tag] || Globe;
                            return (
                                <motion.article key={item.id} variants={fadeUp} custom={i}
                                    className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 ${theme === 'dark'
                                        ? 'border-white/5 bg-slate-900/60 hover:border-blue-500/20 hover:bg-slate-900/90'
                                        : 'border-slate-200 bg-white/60 hover:border-blue-500/30 hover:bg-white/90'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagStyle.tagColor}`}>{item.tag}</span>
                                        <span className={`flex items-center gap-1 text-[10px] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                                            <CalendarDays className="h-3 w-3" />{item.date}
                                        </span>
                                    </div>
                                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tagStyle.iconBg} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                        <IconComp className="h-5 w-5" />
                                    </div>
                                    <h3 className={`mb-1.5 text-sm font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                )}
            </motion.section>

            {/* ─── IMPACT BANNER ─── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                <Card theme={theme} className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 border-blue-500/10 !p-6 sm:!p-8">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15">
                            <Globe className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Campus Impact This Semester</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                Faculty reported <strong className="text-blue-500">{assetReports.length}</strong> asset issues,
                                with <strong className="text-eco-green">{assetReports.filter(a => a.status === ASSET_STATUS.RECOVERED).length}</strong> recovered.
                                Together we've serviced <strong className="text-blue-500">{impactStats.binsServiced.toLocaleString()}</strong> bins.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.section>
        </motion.div>
    );
}
