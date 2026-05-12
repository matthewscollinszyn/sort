import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinned, Trash2, X, AlertTriangle, Filter } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { Card, binStatusLabel } from './shared';

export default function TeacherMapTab() {
    const { theme } = useTheme();
    const [selectedBin, setSelectedBin] = useState(null);
    const [filter, setFilter] = useState('all');
    const [liveBins, setLiveBins] = useState([]);
    const [mapImage, setMapImage] = useState(null);
    const [mapTransform] = useState({ zoom: 1, panX: 0, panY: 0 });
    const [lastUpdated, setLastUpdated] = useState(null);

    const loadMapData = async () => {
        try {
            const [locationsResult, statusesResult, mapResult] = await Promise.allSettled([
                api.getLocations('BIN_LOCATION'),
                api.getBinStatuses(),
                api.getCampusMap(),
            ]);

            const locationsResponse = locationsResult.status === 'fulfilled' ? locationsResult.value : null;
            const statusesResponse = statusesResult.status === 'fulfilled' ? statusesResult.value : null;
            const mapResponse = mapResult.status === 'fulfilled' ? mapResult.value : null;

            const locationsData = locationsResponse?.data || [];
            const statuses = statusesResponse?.data || [];
            
            const statusMap = new Map(statuses.map(s => [Number(s.locationId), s.fillStatus]));

            const bins = (Array.isArray(locationsData) ? locationsData : [])
                .filter(l => l.type === 'BIN_LOCATION')
                .map((loc, idx) => ({
                    id: loc.id,
                    name: loc.name,
                    lat: loc.mapX ?? (10 + (idx % 4) * 22),
                    lng: loc.mapY ?? (10 + Math.floor(idx / 4) * 25),
                    type: 'general',
                    status: statusMap.get(Number(loc.id)) || 'empty',
                }));

            setLiveBins(bins);
            if (mapResponse?.data?.imageData) setMapImage(mapResponse.data.imageData);
            setLastUpdated(new Date());
        } catch (e) {
            console.error('Failed to load map data:', e);
            setLastUpdated(new Date());
        }
    };

    useEffect(() => {
        loadMapData();
        
        // Polling fallback
        const interval = setInterval(loadMapData, 30000);

        // Real-time subscriptions
        const unsubStatus = realtimeEvents.subscribe('binStatus.updated', (data) => {
            console.log('📍 [TeacherMap] Real-time bin status update received:', data);
            setLiveBins(prev => prev.map(bin => 
                Number(bin.id) === Number(data.locationId)
                    ? { ...bin, status: data.fillStatus }
                    : bin
            ));
            setLastUpdated(new Date());
        });

        const unsubCreated = realtimeEvents.subscribe('location.created', () => {
            console.log('📍 [TeacherMap] New location created, refreshing...');
            loadMapData();
        });

        const unsubUpdated = realtimeEvents.subscribe('location.updated', () => {
            console.log('📍 [TeacherMap] Location updated, refreshing...');
            loadMapData();
        });

        const unsubDeleted = realtimeEvents.subscribe('location.deleted', () => {
            console.log('📍 [TeacherMap] Location deleted, refreshing...');
            loadMapData();
        });

        const onVisible = () => { if (document.visibilityState === 'visible') loadMapData(); };
        window.addEventListener('focus', onVisible);
        document.addEventListener('visibilitychange', onVisible);
        
        return () => {
            clearInterval(interval);
            unsubStatus();
            unsubCreated();
            unsubUpdated();
            unsubDeleted();
            window.removeEventListener('focus', onVisible);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    const filtered = filter === 'all' ? liveBins : liveBins.filter(b => b.status === filter);
    const counts = {
        all: liveBins.length,
        full: liveBins.filter(b => b.status === 'full').length,
        empty: liveBins.filter(b => b.status === 'empty').length,
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-5 pb-20 lg:pb-0">

            <Card theme={theme}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <MapPinned className="h-5 w-5 text-blue-500" /> Live Bin Map
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-eco-green animate-pulse" /> Live</span>
                        <span>{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Loading...'}</span>
                    </div>
                </div>

                {/* Filter pills */}
                <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto mb-4 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    <div className="flex gap-2 w-max">
                        {[
                            { key: 'all', label: 'All Bins', color: 'bg-slate-400/15 text-slate-300' },
                            { key: 'full', label: 'Full', color: 'bg-red-400/15 text-red-400' },
                            { key: 'empty', label: 'Available', color: 'bg-emerald-400/15 text-emerald-400' },
                        ].map(f => (
                            <button key={f.key} onClick={() => setFilter(f.key)}
                                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all border ${filter === f.key
                                    ? `${f.color} ${theme === 'dark' ? 'border-white/15' : 'border-slate-300'} shadow-sm`
                                    : theme === 'dark' ? 'bg-slate-900/40 border-white/5 text-slate-600 hover:text-slate-400' : 'bg-slate-100/60 border-slate-200 text-slate-600 hover:text-slate-800'}`}>
                                {f.label}
                                <span className={`rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} px-1.5 py-0.5 text-xs`}>{counts[f.key]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Visual map */}
                <div className={`relative h-80 sm:h-96 rounded-2xl ${!mapImage
                    ? theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-800/80 border border-slate-700/50' : 'bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 border border-slate-300/50'
                    : 'border border-slate-300/50'} overflow-hidden`}
                    style={mapImage ? {
                        backgroundImage: `url(${mapImage})`,
                        backgroundSize: `${mapTransform.zoom * 100}%`,
                        backgroundPosition: `calc(50% + ${mapTransform.panX}px) calc(50% + ${mapTransform.panY}px)`,
                    } : {}}>
                    {!mapImage && (
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    )}
                    <div className={`absolute top-3 left-3 flex items-center gap-2 rounded-lg ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-sm px-3 py-1.5 border ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>📍 Campus Map</span>
                    </div>
                    {filtered.map(bin => {
                        const pinColor = bin.status === 'full' ? 'bg-red-500' : 'bg-eco-green';
                        return (
                            <button key={bin.id} type="button" onClick={() => setSelectedBin(bin)}
                                className="group absolute" style={{ left: `${bin.lat}%`, top: `${bin.lng}%`, transform: 'translate(-50%, -50%)' }}>
                                <div className={`relative h-5 w-5 rounded-full ${pinColor} cursor-pointer border-2 ${theme === 'dark' ? 'border-slate-900' : 'border-white'} shadow-md transition-transform hover:scale-125`} />
                                <div className={`pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[200px] rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'} border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} px-3 py-2 text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-900'} opacity-0 shadow-xl transition-opacity group-hover:opacity-100 z-10`}>
                                    <p className="font-semibold">{bin.name}</p>
                                    <p className={`capitalize ${(binStatusLabel[bin.status] || binStatusLabel.empty).color}`}>{(binStatusLabel[bin.status] || binStatusLabel.empty).label}</p>
                                </div>
                            </button>
                        );
                    })}
                    {filtered.length === 0 && (
                        <p className={`absolute inset-0 flex items-center justify-center text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>No bins match this filter</p>
                    )}
                </div>

                {/* Legend */}
                <div className={`mt-4 flex flex-wrap items-center gap-4 text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Full</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-eco-green" /> Available</span>
                </div>

                {/* Selected bin detail */}
                <AnimatePresence>
                    {selectedBin && (
                        <motion.div key="teacher-map-detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4">
                            <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-white/10 bg-slate-800/60' : 'border-emerald-200 bg-emerald-50/50'}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).bg}`}>
                                            <Trash2 className={`h-5 w-5 ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).color}`} />
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedBin.name}</h4>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).bg} ${(binStatusLabel[selectedBin.status] || binStatusLabel.empty).color}`}>
                                                {(binStatusLabel[selectedBin.status] || binStatusLabel.empty).label}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedBin(null)} className={`${theme === 'dark' ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}>
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                {selectedBin.status === 'full' && (
                                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-400/10 border border-red-400/15 px-4 py-3">
                                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                                        <p className="text-xs text-red-300">This bin is full and needs immediate attention.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* Bin list */}
            <Card theme={theme}>
                <h4 className={`mb-3 text-sm font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Filter className="h-4 w-4 text-slate-500" /> All Campus Bins ({filtered.length})
                </h4>
                <div className="space-y-1">
                    {filtered.map(bin => (
                        <button key={bin.id} type="button" onClick={() => setSelectedBin(bin)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${selectedBin?.id === bin.id
                                ? 'bg-blue-500/10 border border-blue-500/20'
                                : theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-100'}`}>
                            <span className={`h-2.5 w-2.5 rounded-full ${bin.status === 'full' ? 'bg-red-400' : 'bg-eco-green'}`} />
                            <span className={`flex-1 text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{bin.name}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${(binStatusLabel[bin.status] || binStatusLabel.empty).bg} ${(binStatusLabel[bin.status] || binStatusLabel.empty).color}`}>
                                {(binStatusLabel[bin.status] || binStatusLabel.empty).label}
                            </span>
                        </button>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
}
