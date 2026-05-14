import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Recycle, TrendingUp, Info, Loader2 } from 'lucide-react';
import api from '../services/api';

const PublicMetrics = ({ theme = 'dark' }) => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchMetrics = async (showLoading = true) => {
            try {
                if (showLoading && isMounted) setLoading(true);
                
                // Add a timeout to the fetch
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const response = await api.getPublicMetrics();
                clearTimeout(timeoutId);

                if (isMounted) {
                    if (response && response.success) {
                        setMetrics(response.data);
                        setError(null);
                    } else {
                        console.warn('Public metrics response not successful:', response);
                        setError('Unable to refresh metrics');
                    }
                }
            } catch (err) {
                if (isMounted) {
                    if (err.name === 'AbortError') {
                        console.error('Public metrics fetch timed out');
                        setError('Request timed out');
                    } else {
                        console.error('Error fetching public metrics:', err);
                        setError('Connection error');
                    }
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMetrics(true);
        // Refresh every 30 seconds
        const interval = setInterval(() => fetchMetrics(false), 30000);
        
        return () => {
            isMounted = false;
            controller.abort();
            clearInterval(interval);
        };
    }, []);

    // If we have no metrics and it's not loading, show error or 0s
    if (loading && !metrics) {
        return (
            <div className="flex items-center justify-center py-12 min-h-[200px]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-eco-green" />
                    <p className="text-xs text-slate-500 animate-pulse">Connecting to campus network...</p>
                </div>
            </div>
        );
    }

    if (error && !metrics) {
        return (
            <div className={`p-6 rounded-2xl border flex flex-col items-center text-center gap-3 ${theme === 'dark' ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                <div className="rounded-full p-2 bg-red-500/10">
                    <Info className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-bold">Metrics Unavailable</p>
                    <p className="text-xs opacity-80 mt-1">{error}. Please check your connection.</p>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-2 text-xs font-bold underline underline-offset-4 hover:opacity-80"
                >
                    Try Refreshing Page
                </button>
            </div>
        );
    }

    const { treesSaved, kgRecycled, campusProgress } = metrics || { treesSaved: 0, kgRecycled: 0, campusProgress: 0 };

    const cards = [
        {
            title: 'Trees Saved',
            value: treesSaved,
            unit: 'Trees',
            icon: TreePine,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            description: 'Equivalent environmental impact'
        },
        {
            title: 'Recycled',
            value: kgRecycled,
            unit: 'KG',
            icon: Recycle,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            description: 'Total waste diverted from landfill'
        },
        {
            title: 'Campus Progress',
            value: campusProgress,
            unit: '%',
            icon: TrendingUp,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10',
            description: 'Overall campus recycling rate'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all hover:shadow-lg ${
                        theme === 'dark'
                            ? 'border-white/5 bg-slate-900/60 hover:bg-slate-900/80 shadow-black/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50 shadow-slate-200/50'
                    }`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                {card.title}
                            </p>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {card.value.toLocaleString()}
                                </span>
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {card.unit}
                                </span>
                            </div>
                            <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                                {card.description}
                            </p>
                        </div>
                        <div className={`rounded-xl p-3 ${card.bg} ${card.color}`}>
                            <card.icon className="h-6 w-6" />
                        </div>
                    </div>

                    {/* Decorative accent */}
                    <div className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-10 ${card.bg}`} />
                </motion.div>
            ))}
        </div>
    );
};

export default PublicMetrics;
