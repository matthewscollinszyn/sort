/* =========================================================
   Multi-Metric Impact Analysis Dashboard Module
   Advanced analytics and metrics visualization
   ========================================================= */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Zap, Leaf, Droplets, Flame,
    BarChart3, PieChart, Target, Award, ArrowUpRight, ArrowDownRight,
    Recycle, Trees, Wind, Sun, Activity, Users, Calendar, Globe
} from 'lucide-react';
import { Card } from '../components/Card';
import api from '../../../services/api';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const buildDefaultTrends = () => {
    const now = new Date();
    const buckets = [];
    for (let i = 5; i >= 0; i -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        buckets.push({ month: MONTH_LABELS[date.getMonth()], waste: 0, recycling: 0, participation: 0 });
    }
    return buckets;
};

const defaultImpactMetrics = {
    waste: {
        totalCollected: 0,
        monthlyIncrease: 0,
        recyclingRate: 0,
        divertedFromLandfill: 0,
        activeCollectionPoints: 0,
    },
    environmental: {
        co2Reduced: 0,
        treesEquivalent: 0,
        waterSaved: 0,
        energySaved: 0,
    },
    participation: {
        activeUsers: 0,
        totalReports: 0,
        avgResponseTime: 0,
        satisfactionScore: 0,
    },
    trends: buildDefaultTrends(),
    breakdown: [],
};

/* ── Metric Card Component ────────────────────────────────── */
function MetricCard({ icon: Icon, title, value, unit, trend, trendValue, color = 'emerald' }) {
    const isPositive = trend === 'up';
    const colorClasses = {
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        amber: 'bg-amber-50 text-amber-600 border-amber-200',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${colorClasses[color]}`}>
                    <Icon className="h-5 w-5" />
                </div>
                {trendValue && (
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {isPositive ? (
                            <ArrowUpRight className="h-3 w-3" />
                        ) : (
                            <ArrowDownRight className="h-3 w-3" />
                        )}
                        {trendValue}%
                    </div>
                )}
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
                {unit && <span className="text-sm text-slate-500">{unit}</span>}
            </div>
        </motion.div>
    );
}

/* ── Simple Bar Chart Component ──────────────────────────── */
function SimpleBarChart({ data, label }) {
    if (!data.length) {
        return <p className="text-sm text-slate-500">No data yet.</p>;
    }

    const maxValue = Math.max(1, ...data.map(d => d.waste));

    return (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
            <div className="flex items-end justify-between gap-2 h-48">
                {data.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full relative group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(item.waste / maxValue) * 100}%` }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md min-h-[20px] hover:from-emerald-600 hover:to-emerald-500 transition-colors cursor-pointer"
                                title={`${item.waste} kg`}
                            />
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {item.waste} kg
                            </div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Donut Chart Component ──────────────────────────────── */
function DonutChart({ data, title }) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    if (total === 0) {
        return <p className="text-sm text-slate-500">No data yet.</p>;
    }

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
            <div className="flex items-center gap-6">
                {/* SVG Donut */}
                <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {data.map((item, idx) => {
                            const percent = (item.value / total) * 100;
                            const offset = cumulativePercent;
                            cumulativePercent += percent;

                            const strokeDasharray = `${percent} ${100 - percent}`;
                            const strokeDashoffset = -offset;

                            return (
                                <circle
                                    key={idx}
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth="12"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-300 hover:opacity-80"
                                />
                            );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900">{total}%</p>
                            <p className="text-xs text-slate-500">Total</p>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-slate-700">{item.category}</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Main Impact Analysis Component ───────────────────────── */
export function ImpactAnalysisTab() {
    const [impactMetrics, setImpactMetrics] = useState(defaultImpactMetrics);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        const loadMetrics = async () => {
            setIsLoading(true);
            setLoadError(null);
            try {
                const response = await api.getImpactMetrics();
                if (!isActive) return;
                if (response.success && response.data?.impactMetrics) {
                    setImpactMetrics(response.data.impactMetrics);
                } else {
                    setLoadError(response.message || 'Failed to load impact metrics.');
                }
            } catch (error: any) {
                if (!isActive) return;
                setLoadError(error?.message || 'Failed to load impact metrics.');
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        loadMetrics();
        return () => {
            isActive = false;
        };
    }, []);

    return (
        <div className="space-y-6 pb-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Multi-Metric Impact Analysis
                    </h2>
                    <p className="text-sm text-slate-600">
                        Comprehensive environmental and operational metrics
                    </p>
                    {(isLoading || loadError) && (
                        <p className="text-xs text-slate-500 mt-2">
                            {isLoading ? 'Loading real-time metrics...' : loadError}
                        </p>
                    )}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold shadow-lg shadow-emerald-500/30">
                    <Target className="h-4 w-4" />
                    Set Goals
                </button>
            </div>

            {/* Waste Metrics */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Recycle className="h-5 w-5 text-emerald-600" />
                    Waste Management Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        icon={Leaf}
                        title="Total Waste Collected"
                        value={impactMetrics.waste.totalCollected}
                        unit="kg"
                        trend="up"
                        trendValue={impactMetrics.waste.monthlyIncrease}
                        color="emerald"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        title="Recycling Rate"
                        value={impactMetrics.waste.recyclingRate}
                        unit="%"
                        trend="up"
                        trendValue={5.2}
                        color="blue"
                    />
                    <MetricCard
                        icon={Target}
                        title="Diverted from Landfill"
                        value={impactMetrics.waste.divertedFromLandfill}
                        unit="kg"
                        trend="up"
                        trendValue={8.7}
                        color="purple"
                    />
                    <MetricCard
                        icon={Activity}
                        title="Active Collection Points"
                        value={impactMetrics.waste.activeCollectionPoints}
                        unit="locations"
                        color="amber"
                    />
                </div>
            </div>

            {/* Environmental Impact */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Environmental Impact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        icon={Wind}
                        title="CO₂ Reduced"
                        value={impactMetrics.environmental.co2Reduced}
                        unit="kg"
                        trend="up"
                        trendValue={15.3}
                        color="blue"
                    />
                    <MetricCard
                        icon={Trees}
                        title="Trees Equivalent"
                        value={impactMetrics.environmental.treesEquivalent}
                        unit="trees"
                        trend="up"
                        trendValue={12.1}
                        color="emerald"
                    />
                    <MetricCard
                        icon={Droplets}
                        title="Water Saved"
                        value={impactMetrics.environmental.waterSaved}
                        unit="L"
                        trend="up"
                        trendValue={9.8}
                        color="blue"
                    />
                    <MetricCard
                        icon={Sun}
                        title="Energy Saved"
                        value={impactMetrics.environmental.energySaved}
                        unit="kWh"
                        trend="up"
                        trendValue={7.5}
                        color="amber"
                    />
                </div>
            </div>

            {/* Participation & Performance */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Participation & Performance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        icon={Users}
                        title="Active Users"
                        value={impactMetrics.participation.activeUsers}
                        trend="up"
                        trendValue={18.2}
                        color="purple"
                    />
                    <MetricCard
                        icon={BarChart3}
                        title="Total Reports"
                        value={impactMetrics.participation.totalReports}
                        trend="up"
                        trendValue={22.5}
                        color="emerald"
                    />
                    <MetricCard
                        icon={Zap}
                        title="Avg Response Time"
                        value={impactMetrics.participation.avgResponseTime}
                        unit="hrs"
                        trend="down"
                        trendValue={15.7}
                        color="amber"
                    />
                    <MetricCard
                        icon={Award}
                        title="Satisfaction Score"
                        value={impactMetrics.participation.satisfactionScore}
                        unit="/5"
                        trend="up"
                        trendValue={3.2}
                        color="blue"
                    />
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trend Chart */}
                <Card title="Waste Collection Trends" icon={TrendingUp}>
                    <SimpleBarChart data={impactMetrics.trends} label="Monthly Collection (kg)" />
                </Card>

                {/* Breakdown Chart */}
                <Card title="Waste Category Breakdown" icon={PieChart}>
                    <DonutChart data={impactMetrics.breakdown} title="Composition by Type" />
                </Card>
            </div>

            {/* Goals & Targets */}
            <Card title="Sustainability Goals Progress" icon={Target}>
                <div className="space-y-4">
                    {[
                        { goal: 'Achieve 75% Recycling Rate', current: 68.3, target: 75, color: 'emerald' },
                        { goal: 'Reduce Collection Time to 2hrs', current: 2.4, target: 2, color: 'blue', inverse: true },
                        { goal: 'Engage 1500 Active Users', current: 1247, target: 1500, color: 'purple' },
                        { goal: 'Divert 2500kg from Landfill', current: 1943, target: 2500, color: 'amber' },
                    ].map((item, idx) => {
                        const progress = item.inverse
                            ? Math.max(0, 100 - ((item.current - item.target) / item.target) * 100)
                            : (item.current / item.target) * 100;

                        const colorClasses = {
                            emerald: 'bg-emerald-500',
                            blue: 'bg-blue-500',
                            purple: 'bg-purple-500',
                            amber: 'bg-amber-500',
                        };

                        return (
                            <div key={idx}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-700">{item.goal}</span>
                                    <span className="text-sm font-semibold text-slate-900">
                                        {item.current.toLocaleString()} / {item.target.toLocaleString()}
                                        {!item.inverse && item.target > 100 ? '' : item.inverse ? ' hrs' : '%'}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(progress, 100)}%` }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        className={`h-2 rounded-full ${colorClasses[item.color]}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
