import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, Flame, Zap, BarChart3, Clock, Trash2, Shield, Star, BookOpen, Globe,
    Target, Award, Landmark, Lightbulb, ChevronRight, CalendarDays, TrendingUp,
    Recycle, TreePine, Droplets, Truck, FlaskConical, Wrench, Building2, HandMetal,
    Heart, Users, MapPinned, Camera, Trophy,
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { leaderboard, impactStats } from '../../../data/reportState';
import { useCampusNews, TAG_COLOR_MAP } from '../../../hooks/useCampusNews';
import { useNewsNotifications } from '../../../hooks/useNewsNotifications';
import { fadeUp, stagger, WavyBg, Card } from './shared';
import api from '../../../services/api';

const quickActions = [
    { label: 'Report Bin', desc: 'Snap a full bin', icon: Camera, color: 'from-red-500 to-orange-500', tab: 'report' },
    { label: 'Live Bin Map', desc: 'Campus bins status', icon: MapPinned, color: 'from-blue-500 to-cyan-500', tab: 'map' },
    { label: 'My Activity', desc: 'Track your reports', icon: Clock, color: 'from-violet-500 to-purple-500', tab: 'activity' },
    { label: 'Leaderboard', desc: 'See top eco-champs', icon: Trophy, color: 'from-amber-500 to-yellow-500', tab: 'leaderboard' },
];

const ecoTips = [
    { icon: Recycle, title: 'Recycle Right', text: 'Rinse containers before tossing them into the blue bin.' },
    { icon: Droplets, title: 'Save Water', text: 'Turn off taps while soaping hands — saves 6L per wash.' },
    { icon: TreePine, title: 'Go Paper-Free', text: 'Use digital notes — one tree makes only 8,333 sheets.' },
    { icon: Lightbulb, title: 'Switch Off', text: 'Unplug chargers when done — phantom loads add up.' },
];

const TAG_ICON_MAP = {
    'MRF Update': Truck,
    'New Facility': Recycle,
    'Achievement': TrendingUp,
    'Event': Award,
    'Program': Droplets,
    'Research': FlaskConical,
    'Maintenance': Wrench,
    'Assets': Building2,
    'Announcement': Wrench,
    'Update': Globe,
};

const challenges = [
    { title: 'Zero-Waste Week', points: 200, icon: Target, deadline: 'Mar 3 – Mar 9', progress: 45, color: 'text-eco-green' },
    { title: 'Campus Clean-Up Drive', points: 150, icon: Heart, deadline: 'Mar 15', progress: 0, color: 'text-pink-400' },
    { title: 'Report 10 Bins', points: 100, icon: Trash2, deadline: 'Ongoing', progress: 70, color: 'text-amber-400' },
];

const campusPartners = [
    { name: 'Office of Student Affairs', icon: Building2, desc: 'Student engagement & events' },
    { name: 'Environmental Science Dept.', icon: FlaskConical, desc: 'Research & waste audits' },
    { name: 'Facilities Management Office', icon: Wrench, desc: 'Bin maintenance & logistics' },
    { name: 'Campus Sustainability Council', icon: Landmark, desc: 'Policy & green initiatives' },
    { name: 'Student Government Association', icon: HandMetal, desc: 'Volunteer drives & awareness' },
    { name: 'General Services Division', icon: Truck, desc: 'Collection & MRF operations' },
];

const timelineMilestones = [
    { year: '2024', quarter: 'Q3', title: 'EcoLedger Concept Born', desc: 'Environmental Science Dept. partners with IT to build a campus waste tracking platform.', icon: Sparkles, color: 'from-violet-500 to-purple-500' },
    { year: '2025', quarter: 'Q1', title: 'Pilot with 3 Buildings', desc: 'First deployment covers Science Hall, Library, and Admin Bldg — 50 students onboard.', icon: Building2, color: 'from-blue-500 to-cyan-500' },
    { year: '2025', quarter: 'Q3', title: '500+ Active Reporters', desc: 'Campus-wide rollout. Gamification with eco-points and leaderboards drives adoption.', icon: Users, color: 'from-amber-400 to-orange-500' },
    { year: '2026', quarter: 'Q1', title: '2,000+ Reports Filed', desc: 'Record-breaking semester with 68% more reports. MRF response time cut by 40%.', icon: TrendingUp, color: 'from-eco-green to-teal-500' },
    { year: '2026', quarter: 'Q2', title: 'Zero-Waste Campus Goal', desc: 'New initiatives target 80% waste diversion by year-end. Community partnerships expand.', icon: Globe, color: 'from-pink-500 to-rose-500' },
];

export default function HomeTab({ me, myReports, pendingCount, resolvedCount, goTab, showAllTips, setShowAllTips, liveLeaderboard, addNotification, userId, openCertificate }) {
    const { theme } = useTheme();
    const { news: campusUpdates } = useCampusNews(true);
    useNewsNotifications(userId, campusUpdates, addNotification);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="space-y-8 sm:space-y-12 pb-20 lg:pb-0">

            {/* ─────── WELCOME HERO ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Card theme={theme} className="relative overflow-hidden bg-gradient-to-br from-eco-green/15 via-emerald-500/10 to-teal-500/10 border-eco-green/20 p-6 sm:p-8">
                    <Sparkles className={`absolute top-4 right-4 h-16 w-16 ${theme === 'dark' ? 'text-eco-green/10' : 'text-eco-green/15'}`} />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-eco-green to-teal-500 text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-eco-green/20">
                                {me.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Welcome back, 👋</p>
                                <h1 className={`text-2xl sm:text-3xl font-extrabold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.name}</h1>
                                <p className="text-xs text-slate-500 mt-1">{me.department} &middot; Student</p>
                            </div>
                        </div>
                        <div className="flex gap-5 sm:gap-8 sm:text-right">
                            <div>
                                <p className="text-xs text-slate-500">Rank</p>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    <span className="text-yellow-400">#</span>{me.rank}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Eco-Points</p>
                                <p className={`flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    <Flame className="h-5 w-5 text-orange-400" /> {me.points.toLocaleString()}
                                </p>
                                {me.points >= 100 && (
                                    <button
                                        onClick={openCertificate}
                                        className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-medium rounded-md transition-colors"
                                    >
                                        <Award className="h-3 w-3" />
                                        View Certificate
                                    </button>
                                )}
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Reports</p>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{me.reports}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.section>

            {/* ─────── QUICK ACTIONS ─────── */}
            <motion.section variants={stagger} initial="hidden" animate="visible" className="relative overflow-hidden">
                <WavyBg variant={2} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <Zap className="h-5 w-5 text-eco-green" /> Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {quickActions.map((a, i) => (
                        <motion.button key={a.label} variants={fadeUp} custom={i}
                            onClick={() => goTab(a.tab)}
                            className={`group rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-sm transition-all cursor-pointer hover:shadow-xl hover:shadow-eco-green/5 active:scale-[0.97] ${theme === 'dark'
                                ? 'border-white/5 bg-slate-900/60 hover:border-eco-green/20 hover:bg-slate-900/90'
                                : 'border-slate-200 bg-white/60 shadow-sm hover:border-eco-green/20 hover:bg-white/90'
                                }`}>
                            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                <a.icon className="h-5 w-5" />
                            </div>
                            <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{a.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                        </motion.button>
                    ))}
                </div>
            </motion.section>

            {/* ─────── STATS OVERVIEW ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <BarChart3 className="h-5 w-5 text-eco-green" /> My Stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { label: 'Total Reports', value: myReports.length, icon: Trash2, color: 'text-eco-green', bg: 'bg-eco-green/10' },
                        { label: 'Pending', value: pendingCount, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                        { label: 'Resolved', value: resolvedCount, icon: Shield, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                        { label: 'Points Today', value: '+45', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                    ].map((s) => (
                        <Card key={s.label} theme={theme}
                            className="flex flex-col items-center text-center !p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.97]"
                            onClick={() => goTab('activity')}
                        >
                            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                                <s.icon className={`h-5 w-5 ${s.color}`} />
                            </div>
                            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.value}</span>
                            <span className="text-xs text-slate-500">{s.label}</span>
                        </Card>
                    ))}
                </div>
            </motion.section>

            {/* ─────── CAMPUS UPDATES ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3} className="relative overflow-hidden">
                <WavyBg variant={5} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="h-5 w-5 text-blue-400" /> Campus News &amp; Updates
                </h2>
                {campusUpdates.length === 0 ? (
                    <Card theme={theme} className="text-center py-12">
                        <BookOpen className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`} />
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>No campus news yet</p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Check back soon for updates and announcements</p>
                    </Card>
                ) : (
                    <motion.div variants={stagger} initial="hidden" animate="visible"
                        className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {campusUpdates.map((item, i) => {
                            const tagStyle = (TAG_COLOR_MAP[item.tag] || { tagColor: 'bg-slate-100 text-slate-600', iconBg: 'from-slate-400 to-slate-500' });
                            const IconComp = TAG_ICON_MAP[item.tag] || Globe;
                            return (
                                <motion.article key={item.id} variants={fadeUp} custom={i}
                                    className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-xl hover:shadow-eco-green/5 ${theme === 'dark'
                                        ? 'border-white/5 bg-slate-900/60 hover:border-eco-green/20 hover:bg-slate-900/90'
                                        : 'border-slate-200 bg-white/60 hover:border-eco-green/30 hover:bg-white/90'
                                        }`}>
                                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-eco-green/4 blur-xl transition-all duration-500 group-hover:bg-eco-green/8" />
                                    <div className="relative">
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
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                )}
            </motion.section>

            {/* ─────── CHALLENGES ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={4} className="relative overflow-hidden">
                <WavyBg variant={4} theme={theme} />
                <Card theme={theme}>
                    <h3 className={`text-base font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <Target className="h-5 w-5 text-eco-green" /> Active Challenges
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {challenges.map((c) => (
                            <div key={c.title} className={`rounded-xl p-3.5 transition-colors ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/80' : 'bg-slate-50 hover:bg-slate-100'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme === 'dark' ? 'bg-slate-700/60' : 'bg-white'} ${c.color}`}>
                                        <c.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{c.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-slate-500">{c.deadline}</span>
                                            <span className="text-[10px] text-eco-green font-semibold">+{c.points} pts</span>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold shrink-0 ${c.progress > 0 ? 'text-eco-green' : (theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}`}>{c.progress}%</span>
                                </div>
                                <div className={`mt-2.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                                        className="h-full rounded-full bg-gradient-to-r from-eco-green to-teal-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.section>

            {/* ─────── LEADERBOARD PREVIEW ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                <Card theme={theme}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-base font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <Award className="h-5 w-5 text-yellow-400" /> Top Eco-Champions
                        </h3>
                    </div>
                    {(liveLeaderboard.length > 0 ? liveLeaderboard : leaderboard).length === 0 ? (
                        <p className={`text-sm text-center py-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>No rankings yet — be the first to report!</p>
                    ) : (
                        <div className="space-y-1">
                            {(liveLeaderboard.length > 0 ? liveLeaderboard : leaderboard).slice(0, 5).map((u) => {
                                const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
                                const isMe = u.name === me.name;
                                return (
                                    <div key={u.rank}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${isMe
                                            ? 'bg-eco-green/10 border border-eco-green/20 font-semibold text-eco-green'
                                            : theme === 'dark' ? 'hover:bg-white/[0.02] text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                                            }`}>
                                        <span className="w-6 text-center font-bold">{medals[u.rank] || `#${u.rank}`}</span>
                                        <span className="flex-1 truncate">{u.name}{isMe ? ' (You)' : ''}</span>
                                        <span className="flex items-center gap-1 text-slate-500">
                                            <Flame className="h-3.5 w-3.5 text-orange-400" /> {u.points.toLocaleString()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </motion.section>

            {/* ─────── CAMPUS PARTNERS ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={6} className="relative overflow-hidden">
                <WavyBg variant={2} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <Landmark className="h-5 w-5 text-eco-green" /> Campus Partners
                </h2>
                <motion.div variants={stagger} initial="hidden" animate="visible"
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {campusPartners.map((p, i) => (
                        <motion.div key={p.name} variants={fadeUp} custom={i}
                            className={`group flex flex-col items-center text-center rounded-2xl border backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-eco-green/5 ${theme === 'dark'
                                ? 'border-white/5 bg-slate-900/50 hover:border-eco-green/20 hover:bg-slate-900/80'
                                : 'border-slate-200 bg-white/50 hover:border-eco-green/30 hover:bg-white/90 shadow-sm'
                                }`}>
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-eco-green/10 group-hover:bg-eco-green/15 transition-colors">
                                <p.icon className="h-5 w-5 text-eco-green" />
                            </div>
                            <p className={`text-xs font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{p.name}</p>
                            <p className="mt-1 text-[10px] leading-tight text-slate-500">{p.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* ─────── OUR GREEN JOURNEY ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={7} className="relative overflow-hidden">
                <WavyBg variant={1} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <Sparkles className="h-5 w-5 text-violet-400" /> Our Green Journey
                </h2>
                <Card theme={theme}>
                    <div className="relative">
                        <div className={`absolute left-4 top-0 bottom-0 w-px ${theme === 'dark'
                            ? 'bg-gradient-to-b from-eco-green/20 via-eco-green/10 to-transparent'
                            : 'bg-gradient-to-b from-eco-green/30 via-eco-green/15 to-transparent'
                            }`} />
                        <div className="space-y-6">
                            {timelineMilestones.map((m, i) => (
                                <motion.div key={m.title} variants={fadeUp} custom={i} className="relative flex gap-5 items-start">
                                    <div className="relative z-10 mt-0.5">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${m.color} text-white shadow-lg`}>
                                            <m.icon className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0 pb-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={`rounded-full bg-gradient-to-r ${m.color} px-2.5 py-0.5 text-[10px] font-bold text-white`}>
                                                {m.year} {m.quarter}
                                            </span>
                                        </div>
                                        <h4 className={`text-sm font-bold mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{m.title}</h4>
                                        <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{m.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Card>
            </motion.section>

            {/* ─────── ECO TIPS ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={8} className="relative overflow-hidden">
                <WavyBg variant={5} theme={theme} />
                <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <Lightbulb className="h-5 w-5 text-yellow-400" /> Eco Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {(showAllTips ? ecoTips : ecoTips.slice(0, 2)).map((tip) => (
                        <Card key={tip.title} theme={theme} className="!p-4">
                            <div className="flex items-start gap-3">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-yellow-400/10' : 'bg-yellow-50'}`}>
                                    <tip.icon className="h-4 w-4 text-yellow-500" />
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{tip.title}</p>
                                    <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{tip.text}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                {!showAllTips && (
                    <button onClick={() => setShowAllTips(true)}
                        className={`mt-3 text-xs font-medium flex items-center gap-1 ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                        Show more tips <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                )}
            </motion.section>

            {/* ─────── CAMPUS IMPACT BANNER ─────── */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={9}>
                <Card theme={theme} className="bg-gradient-to-r from-eco-green/10 via-teal-500/10 to-emerald-500/10 border-eco-green/10 !p-6 sm:!p-8">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-eco-green/15">
                            <Globe className="h-8 w-8 text-eco-green" />
                        </div>
                        <div className="flex-1">
                            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Our Campus Impact</p>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                Together we&apos;ve diverted <strong className="text-eco-green">{impactStats.co2Saved}</strong> of CO₂,
                                serviced <strong className="text-eco-green">{impactStats.binsServiced.toLocaleString()}</strong> bins,
                                and have <strong className="text-eco-green">{impactStats.activeStudents}</strong> active student reporters this semester.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.section>
        </motion.div>
    );
}
