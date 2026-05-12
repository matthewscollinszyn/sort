import { motion } from 'framer-motion';
import { 
    Sparkles, Shield, BarChart3, Trash2, Armchair, Clock, 
    AlertTriangle, CheckCircle2, Recycle, Users, GraduationCap, 
    Building2, Globe, Loader2 
} from 'lucide-react';
import { Card } from '../components/Card';
import { 
    fadeUp, 
    BIN_STATUS, 
    ASSET_STATUS, 
    type BinReport, 
    type AssetReport 
} from '../types';
import { useState, useEffect } from 'react';
import api from '../../../../services/api';

interface OverviewTabProps {
    binReports: BinReport[];
    assetReports: AssetReport[];
    onTabChange: (tab: string) => void;
    adminName: string;
}

export function OverviewTab({ binReports, assetReports, onTabChange, adminName }: OverviewTabProps) {
    const [analytics, setAnalytics] = useState<any>(null);
    const [loadingAnalytics, setLoadingAnalytics] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoadingAnalytics(true);
            const response = await api.getAnalytics();
            if (response.success && response.data) {
                setAnalytics(response.data);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoadingAnalytics(false);
        }
    };

    const pendingBin = binReports.filter(r => r.status === BIN_STATUS.PENDING).length;
    const resolvedBin = binReports.filter(r => r.status === BIN_STATUS.RESOLVED).length;
    const pendingAsset = assetReports.filter(r => r.status === ASSET_STATUS.REPORTED || r.status === ASSET_STATUS.IN_REVIEW).length;
    const recoveredAsset = assetReports.filter(r => r.status === ASSET_STATUS.RECOVERED).length;
    const studentBinReports = binReports.filter(r => r.reporterRole === 'student');
    const facultyBinReports = binReports.filter(r => r.reporterRole === 'teacher');

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-8 pb-8 min-h-full"
        >
            {/* Welcome Hero */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white">
                    <Sparkles className="absolute top-4 right-4 h-16 w-16 text-white/10" />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-white">
                                <Shield className="h-8 w-8 sm:h-10 sm:w-10" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Welcome back, 👋</p>
                                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{adminName}</h1>
                                <p className="text-xs text-slate-400 mt-1">System Administrator</p>
                            </div>
                        </div>
                        <div className="flex gap-5 sm:gap-8 sm:text-right">
                            <div>
                                <p className="text-xs text-slate-400">Total Reports</p>
                                <p className="text-2xl sm:text-3xl font-extrabold">{binReports.length + assetReports.length}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Pending</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{pendingBin + pendingAsset}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.section>

            {/* Quick Stats */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <BarChart3 className="h-5 w-5 text-emerald-500" /> Quick Stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {[
                        { label: 'Waste Reports', value: binReports.length, icon: Trash2, color: 'text-red-500', bg: 'bg-red-100', tab: 'reports' },
                        { label: 'Asset Reports', value: assetReports.length, icon: Armchair, color: 'text-blue-500', bg: 'bg-blue-100', tab: 'reports' },
                        { label: 'Pending Waste', value: pendingBin, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100', tab: 'reports' },
                        { label: 'Pending Assets', value: pendingAsset, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-100', tab: 'reports' },
                        { label: 'Resolved Bins', value: resolvedBin, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100', tab: 'reports' },
                        { label: 'Recovered Assets', value: recoveredAsset, icon: Recycle, color: 'text-teal-500', bg: 'bg-teal-100', tab: 'reports' },
                    ].map((s, i) => (
                        <motion.div key={s.label} variants={fadeUp} custom={i}>
                            <Card
                                className="flex flex-col items-center text-center !p-4 cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all active:scale-[0.97]"
                                onClick={() => onTabChange(s.tab)}
                            >
                                <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                                    <s.icon className={`h-5 w-5 ${s.color}`} />
                                </div>
                                <span className="text-xl font-bold text-slate-900">{s.value}</span>
                                <span className="text-xs text-slate-500">{s.label}</span>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Reports by Role */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <Users className="h-5 w-5 text-emerald-500" /> Reports by Role
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                <GraduationCap className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Student Reports</h3>
                                <p className="text-xs text-slate-500">Waste bin reports from students</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">{studentBinReports.length}</p>
                                <p className="text-xs text-slate-500">total reports</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-amber-500">
                                    {studentBinReports.filter(r => r.status === BIN_STATUS.PENDING).length} pending
                                </p>
                                <p className="text-sm font-semibold text-emerald-500">
                                    {studentBinReports.filter(r => r.status === BIN_STATUS.RESOLVED).length} resolved
                                </p>
                            </div>
                        </div>
                        <button onClick={() => onTabChange('reports')} className="mt-4 w-full text-xs font-semibold text-emerald-600 hover:text-emerald-800 text-right">
                            View all waste reports →
                        </button>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                                <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Faculty Reports</h3>
                                <p className="text-xs text-slate-500">Waste & asset reports from teachers</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">{facultyBinReports.length + assetReports.length}</p>
                                <p className="text-xs text-slate-500">total reports</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-amber-500">{pendingAsset} pending assets</p>
                                <p className="text-sm font-semibold text-emerald-500">{recoveredAsset} recovered</p>
                            </div>
                        </div>
                        <button onClick={() => onTabChange('reports')} className="mt-4 w-full text-xs font-semibold text-blue-600 hover:text-blue-800 text-right">
                            View all asset reports →
                        </button>
                    </Card>
                </div>
            </motion.section>

            {/* Campus Impact */}
            <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                            <Globe className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-slate-900">Campus Impact This Semester</p>
                            {loadingAnalytics ? (
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading analytics...
                                </div>
                            ) : analytics ? (
                                <p className="text-sm mt-1 text-slate-600">
                                    Together we've diverted <strong className="text-emerald-600">{analytics.co2Saved} kg</strong> of CO₂,
                                    collected <strong className="text-emerald-600">{analytics.kgCollected} kg</strong> of waste,
                                    and have <strong className="text-emerald-600">{analytics.activeUsers}</strong> active reporters.
                                </p>
                            ) : (
                                <p className="text-sm mt-1 text-slate-500">
                                    No data available yet
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </motion.section>
        </motion.div>
    );
}
