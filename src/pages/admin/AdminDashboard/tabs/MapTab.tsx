import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Trash2, Image, Building2, Plus, Save, X, AlertTriangle, Loader2, Zap, Pencil, CheckCircle2, Edit2 } from 'lucide-react';
import api from '../../../../services/api';
import realtimeEvents from '../../../../lib/realtimeEvents';
import { BIN_FILL_STATUS, type CampusBin, type BinFillStatus } from '../types';
import { useToast } from '../components/Toast';
import { Card } from '../components/Card';

interface BinLocation {
    id: string;
    code: string;
    name: string;
    type: 'BIN_LOCATION';
    enabled: boolean;
    sortOrder: number;
}

function BinLocationManager({ onRefresh }: { onRefresh: () => void }) {
    const { addToast } = useToast();
    const [locations, setLocations] = useState<BinLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState('');
    const [newLocation, setNewLocation] = useState({ code: '', name: '' });

    useEffect(() => { loadBinLocations(); }, []);

    const handleAdd = async () => {
        if (!newLocation.code.trim() || !newLocation.name.trim()) { addToast('Code and name are required', 'error'); return; }
        try {
            const response = await api.createLocation({ code: newLocation.code, name: newLocation.name, type: 'BIN_LOCATION', building: '' });
            setLocations([...locations, response.data || response]);
            setNewLocation({ code: '', name: '' });
            setAdding(false);
            addToast('Bin location added successfully', 'success');
            onRefresh();
        } catch (err: any) { addToast(err.message || 'Failed to add location', 'error'); }
    };

    const loadBinLocations = async () => {
        try {
            setLoading(true);
            const response = await api.getLocations('BIN_LOCATION');
            const data = response.data || response;
            const locationsArray = Array.isArray(data) ? data : [];
            setLocations(locationsArray.filter((l: any) => l.type === 'BIN_LOCATION'));
        } catch (err: any) { addToast(err.message || 'Failed to load bin locations', 'error'); }
        finally { setLoading(false); }
    };

    const handleUpdate = async (id: string, name: string) => {
        try {
            await api.updateLocation(id, { name });
            setLocations(locations.map(l => l.id === id ? { ...l, name } : l));
            setEditingId(null);
            addToast('Location updated successfully', 'success');
            onRefresh();
        } catch (err: any) { addToast(err.message || 'Failed to update location', 'error'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this bin location?')) return;
        try {
            await api.deleteLocation(id);
            setLocations(locations.filter(l => l.id !== id));
            addToast('Location deleted successfully', 'success');
            onRefresh();
        } catch (err: any) { addToast(err.message || 'Failed to delete location', 'error'); }
    };

    const handleToggleEnabled = async (id: string, enabled: boolean) => {
        try {
            await api.updateLocation(id, { enabled: !enabled });
            setLocations(locations.map(l => l.id === id ? { ...l, enabled: !enabled } : l));
            addToast(`Location ${!enabled ? 'enabled' : 'disabled'} successfully`, 'success');
            onRefresh();
        } catch (err: any) { addToast(err.message || 'Failed to update location', 'error'); }
    };

    return (
        <Card className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Building2 className="h-5 w-5 text-blue-500" /> Bin Locations</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage available locations for waste bin reports</p>
                </div>
                <button onClick={() => setAdding(!adding)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium shadow-md shadow-blue-500/20">
                    <Plus className="h-4 w-4" /> Add Location
                </button>
            </div>
            <AnimatePresence>
                {adding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
                        <input type="text" placeholder="Location code (e.g., LOC-11)" value={newLocation.code} onChange={e => setNewLocation({ ...newLocation, code: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="text" placeholder="Location name (e.g., Science Building Entrance)" value={newLocation.name} onChange={e => setNewLocation({ ...newLocation, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <div className="flex gap-2">
                            <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"><Save className="h-4 w-4" /> Save</button>
                            <button onClick={() => { setAdding(false); setNewLocation({ code: '', name: '' }); }} className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"><X className="h-4 w-4" /> Cancel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="space-y-2">
                {loading ? (
                    <div className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin mx-auto text-slate-400" /><p className="text-sm text-slate-500 mt-2">Loading locations...</p></div>
                ) : locations.length === 0 ? (
                    <div className="text-center py-8"><MapPin className="h-10 w-10 mx-auto text-slate-300 mb-2" /><p className="text-sm text-slate-500">No bin locations yet</p><p className="text-xs text-slate-400 mt-1">Click "Add Location" to create one</p></div>
                ) : locations.map(location => (
                    <div key={location.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                        {editingId === location.id ? (
                            <div className="space-y-2">
                                <input autoFocus type="text" value={editedName} onChange={e => setEditedName(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') handleUpdate(location.id, editedName); if (e.key === 'Escape') setEditingId(null); }}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdate(location.id, editedName)} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs font-medium"><Save className="h-3 w-3" /> Save</button>
                                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1 bg-slate-500 text-white rounded-lg hover:bg-slate-600 text-xs font-medium"><X className="h-3 w-3" /> Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-slate-900">{location.name}</p>
                                        <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">{location.code}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleToggleEnabled(location.id, location.enabled)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${location.enabled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}>
                                        {location.enabled ? 'Enabled' : 'Disabled'}
                                    </button>
                                    <button onClick={() => { setEditingId(location.id); setEditedName(location.name); }} className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Edit location"><Edit2 className="h-4 w-4 text-blue-500" /></button>
                                    <button onClick={() => handleDelete(location.id)} className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Delete location"><Trash2 className="h-4 w-4 text-red-500" /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}

export function MapTab() {
    const { addToast } = useToast();
    const mapRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const previewDragActive = useRef(false);
    const previewDragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
    const didDrag = useRef(false);

    const [bins, setBins] = useState<CampusBin[]>([]);
    const [loading, setLoading] = useState(true);
    const [mapImage, setMapImage] = useState<string | null>(null);
    const [previewZoom, setPreviewZoom] = useState(1);
    const [previewPan, setPreviewPan] = useState({ x: 0, y: 0 });
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedBin, setSelectedBin] = useState<CampusBin | null>(null);
    const [isRenamingBin, setIsRenamingBin] = useState(false);
    const [renameValue, setRenameValue] = useState('');
    const [filter, setFilter] = useState<BinFillStatus | 'all'>('all');
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState<{ url: string; name: string; size: string } | null>(null);
    const [draggingBinId, setDraggingBinId] = useState<string | number | null>(null);
    const [addBinPos, setAddBinPos] = useState<{ x: number; y: number } | null>(null);
    const [newBinName, setNewBinName] = useState('');
    const [newBinCode, setNewBinCode] = useState('');

    const confirmAddBin = async () => {
        if (!addBinPos || !newBinName.trim() || !newBinCode.trim()) {
            addToast('Name and code are required', 'error');
            return;
        }

        try {
            const created = await api.createLocation({
                code: newBinCode.trim().toUpperCase(),
                name: newBinName.trim(),
                type: 'BIN_LOCATION',
                mapX: addBinPos.x,
                mapY: addBinPos.y
            });

            const newBin: CampusBin = {
                id: created.data.id,
                name: created.data.name,
                code: created.data.code,
                x: created.data.mapX,
                y: created.data.mapY,
                fillStatus: 'empty'
            };

            setBins([...bins, newBin]);
            setAddBinPos(null);
            setNewBinName('');
            setNewBinCode('');
            addToast('Bin added to map', 'success');
        } catch (error: any) {
            console.error('Error adding bin:', error);
            addToast(error.message || 'Failed to add bin', 'error');
        }
    };

    useEffect(() => { loadData(); }, []);

    // Listen for real-time bin status updates
    useEffect(() => {
        const unsubscribe = realtimeEvents.subscribe('binStatus.updated', (data: any) => {
            console.log('📍 Real-time bin status update received:', data);
            setBins(prev => prev.map(bin => {
                const isMatch = String(bin.id) === String(data.locationId) || 
                              (data.locationName && bin.name === data.locationName);
                if (isMatch) {
                    return { ...bin, fillStatus: data.fillStatus as BinFillStatus };
                }
                return bin;
            }));
            
            // Also update selected bin if it's the one that changed
            if (selectedBin) {
                const isSelectedMatch = String(selectedBin.id) === String(data.locationId) || 
                                      (data.locationName && selectedBin.name === data.locationName);
                if (isSelectedMatch) {
                    setSelectedBin(prev => prev ? { ...prev, fillStatus: data.fillStatus as BinFillStatus } : null);
                }
            }
        });
        return () => unsubscribe();
    }, [selectedBin]);
    useEffect(() => {
        const interval = setInterval(loadBinStatuses, 10000);
        return () => clearInterval(interval);
    }, [bins.length]);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await api.getLocations('BIN_LOCATION');
            const locationsData = response.data || response;
            const binLocations = Array.isArray(locationsData) ? locationsData.filter((l: any) => l.type === 'BIN_LOCATION') : [];
            
            const statusesResponse = await api.getBinStatuses();
            const statuses = statusesResponse.data || [];
            const statusMap = new Map(statuses.map((s: any) => [s.locationId, s.fillStatus]));
            
            const binsData: CampusBin[] = binLocations.map((loc: any) => ({
                id: loc.id, 
                name: loc.name, 
                code: loc.code,
                x: loc.mapX ?? 50, 
                y: loc.mapY ?? 50,
                fillStatus: (statusMap.get(loc.id) as BinFillStatus) || 'empty'
            }));
            
            setBins(binsData);
            const mapResponse = await api.getCampusMap();
            if (mapResponse.data?.imageData) setMapImage(mapResponse.data.imageData);
        } catch (error: any) {
            console.error('Error loading map data:', error);
            addToast('Failed to load map data', 'error');
        } finally { setLoading(false); }
    };

    const loadBinStatuses = async () => {
        try {
            const statusesResponse = await api.getBinStatuses();
            const statuses = statusesResponse.data || [];
            const statusMap = new Map(statuses.map((s: any) => [s.locationId, s.fillStatus]));
            setBins(prev => prev.map(bin => ({ ...bin, fillStatus: (statusMap.get(bin.id) as BinFillStatus) || bin.fillStatus })));
        } catch (error) { console.error('Error loading bin statuses:', error); }
    };

    const handlePreviewMouseDown = (e: React.MouseEvent) => { previewDragActive.current = true; previewDragStart.current = { x: e.clientX, y: e.clientY, panX: previewPan.x, panY: previewPan.y }; e.preventDefault(); };
    const handlePreviewMouseMove = (e: React.MouseEvent) => { if (!previewDragActive.current) return; setPreviewPan({ x: previewDragStart.current.panX + (e.clientX - previewDragStart.current.x), y: previewDragStart.current.panY + (e.clientY - previewDragStart.current.y) }); };
    const handlePreviewMouseUp = () => { previewDragActive.current = false; };
    const handlePreviewTouchStart = (e: React.TouchEvent) => { if (e.touches.length === 1) { previewDragActive.current = true; previewDragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: previewPan.x, panY: previewPan.y }; } };
    const handlePreviewTouchMove = (e: React.TouchEvent) => { if (e.touches.length === 1 && previewDragActive.current) { e.preventDefault(); setPreviewPan({ x: previewDragStart.current.panX + (e.touches[0].clientX - previewDragStart.current.x), y: previewDragStart.current.panY + (e.touches[0].clientY - previewDragStart.current.y) }); } };
    const handlePreviewTouchEnd = () => { previewDragActive.current = false; };

    const handleMapMouseMove = async (e: React.MouseEvent) => {
        if (draggingBinId && mapRef.current) {
            didDrag.current = true;
            const rect = mapRef.current.getBoundingClientRect();
            const newX = parseFloat(Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100)).toFixed(1));
            const newY = parseFloat(Math.max(2, Math.min(98, ((e.clientY - rect.top) / rect.height) * 100)).toFixed(1));
            setBins(prev => prev.map(b => String(b.id) === String(draggingBinId) ? { ...b, x: newX, y: newY } : b));
        }
    };
    const handleMapMouseUp = async () => {
        if (draggingBinId) {
            const bin = bins.find(b => String(b.id) === String(draggingBinId));
            if (bin && didDrag.current) {
                try { await api.updateBinCoordinates(bin.id.toString(), bin.x, bin.y); addToast('Bin position saved', 'success'); }
                catch (error) { console.error('Error saving bin position:', error); addToast('Failed to save bin position', 'error'); }
            }
            setDraggingBinId(null);
        }
    };
    const handleMapClick = (e: React.MouseEvent) => {
        if (didDrag.current || !isEditMode) return;
        const rect = mapRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(1));
        const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(1));
        setAddBinPos({ x, y });
    };
    const deleteSelectedBin = async () => {
        if (!selectedBin) return;
        if (!confirm(`Are you sure you want to remove "${selectedBin.name}" from the map?`)) return;
        try { await api.deleteLocation(selectedBin.id); setBins(prev => prev.filter(b => b.id !== selectedBin.id)); addToast('Bin removed', 'success'); setSelectedBin(null); }
        catch (error) { addToast('Failed to remove bin', 'error'); }
    };
    const handleMapUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; if (!file) return; event.target.value = '';
        if (!file.type.startsWith('image/')) { addToast('Please select an image file', 'error'); return; }
        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = (e) => { const imageUrl = e.target?.result as string; const sizeKB = (file.size / 1024).toFixed(1); const sizeMB = (file.size / (1024 * 1024)).toFixed(2); setPreviewImage({ url: imageUrl, name: file.name, size: file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB` }); setIsUploading(false); };
        reader.onerror = () => { addToast('Failed to read image file', 'error'); setIsUploading(false); };
        reader.readAsDataURL(file);
    };
    const confirmMapUpload = async () => {
        if (!previewImage) return;
        try { await api.uploadCampusMap(previewImage.url, previewImage.name, previewImage.size); setMapImage(previewImage.url); addToast('Campus map uploaded successfully', 'success'); setPreviewImage(null); setPreviewZoom(1); setPreviewPan({ x: 0, y: 0 }); }
        catch (error) { console.error('Error uploading map:', error); addToast('Failed to upload map', 'error'); }
    };
    const cancelMapUpload = () => { setPreviewImage(null); };
    const filteredBins = filter === 'all' ? bins : bins.filter(b => b.fillStatus === filter);
    const updateBinStatus = async (binId: string, newStatus: BinFillStatus) => {
        try { await api.updateBinStatus(binId, newStatus); setBins(prev => prev.map(b => b.id === binId ? { ...b, fillStatus: newStatus } : b)); if (selectedBin?.id === binId) setSelectedBin(prev => prev ? { ...prev, fillStatus: newStatus } : null); addToast(`Bin marked as ${BIN_FILL_STATUS[newStatus].label}`, 'success'); }
        catch (error) { console.error('Error updating bin status:', error); addToast('Failed to update bin status', 'error'); }
    };
    const openBinModal = (bin: CampusBin) => { setSelectedBin(bin); setRenameValue(bin.name); setIsRenamingBin(false); };
    const confirmRename = async () => {
        if (!selectedBin || !renameValue.trim()) return;
        try { await api.updateLocation(selectedBin.id, { name: renameValue.trim() }); setBins(prev => prev.map(b => b.id === selectedBin.id ? { ...b, name: renameValue.trim() } : b)); setSelectedBin(prev => prev ? { ...prev, name: renameValue.trim() } : null); addToast('Bin renamed', 'success'); setIsRenamingBin(false); }
        catch (error) { addToast('Failed to rename bin', 'error'); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><MapPin className="h-5 w-5 text-emerald-500" /> Campus Bin Map</h2>
                    <p className="text-sm text-slate-500 mt-1">{bins.length} bins · {mapImage ? 'Custom map uploaded' : 'No map yet'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleMapUpload} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} disabled={isUploading}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-sm font-medium disabled:opacity-50">
                        {isUploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Reading...</> : mapImage ? <><Image className="h-4 w-4" /> Replace Map</> : <><Image className="h-4 w-4" /> Upload Map</>}
                    </button>
                    <button onClick={() => setIsEditMode(!isEditMode)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isEditMode ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                        {isEditMode ? 'Done Editing' : 'Edit Map'}
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {(['all', 'full', 'empty'] as const).map(status => (
                    <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === status ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {status === 'all' ? 'All' : BIN_FILL_STATUS[status].label}
                        <span className="ml-1.5 text-xs opacity-70">({status === 'all' ? bins.length : bins.filter(b => b.fillStatus === status).length})</span>
                    </button>
                ))}
            </div>
            {loading ? (
                <Card className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" /><p className="text-slate-500">Loading map data...</p></Card>
            ) : (
                <Card className="!p-0 overflow-hidden">
                    <div ref={mapRef}
                        className={`relative w-full h-[400px] sm:h-[500px] lg:h-[600px] select-none ${draggingBinId ? 'cursor-grabbing' : isEditMode ? 'cursor-crosshair' : ''}`}
                        style={{ backgroundImage: mapImage ? `url(${mapImage})` : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
                        onMouseMove={handleMapMouseMove} onMouseUp={handleMapMouseUp} onMouseLeave={handleMapMouseUp} onClick={handleMapClick}>
                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        {isEditMode && <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md pointer-events-none"><Zap className="h-3 w-3" /> Edit Mode — Click empty space to add bin · Drag bin to move · Click bin to edit</div>}
                        {!mapImage && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm"><Image className="h-7 w-7 text-slate-400" /></div><p className="text-sm font-medium text-slate-500">No campus map uploaded yet</p><p className="text-xs text-slate-400">Click "Upload Map" above to add a campus image</p></div>}
                        {filteredBins.map(bin => (
                            <motion.div key={bin.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className={`absolute group ${isEditMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                                style={{ left: `${bin.x}%`, top: `${bin.y}%`, transform: 'translate(-50%, -50%)', zIndex: draggingBinId === bin.id ? 20 : 10 }}
                                onMouseDown={e => { if (!isEditMode) return; e.stopPropagation(); didDrag.current = false; setDraggingBinId(bin.id); }}
                                onClick={e => { e.stopPropagation(); if (didDrag.current) return; openBinModal(bin); }}>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg ring-2 ring-white transition-transform ${draggingBinId !== bin.id ? 'group-hover:scale-110' : 'scale-125'} ${bin.fillStatus === 'full' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                                    <Trash2 className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap bg-white rounded-lg px-2 py-1 text-xs font-bold text-slate-900 shadow-md border border-slate-100 pointer-events-none">
                                    {bin.name || bin.code || 'Unnamed Bin'}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            )}
            <AnimatePresence>
                {!isEditMode && selectedBin && (
                    <motion.div key="bin-detail-panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4 px-4 pb-4 sm:px-6 sm:pb-5">
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${BIN_FILL_STATUS[selectedBin.fillStatus].bg}`}><Trash2 className={`h-5 w-5 ${BIN_FILL_STATUS[selectedBin.fillStatus].color}`} /></div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{selectedBin.name}</h4>
                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${BIN_FILL_STATUS[selectedBin.fillStatus].bg} ${BIN_FILL_STATUS[selectedBin.fillStatus].color}`}>{BIN_FILL_STATUS[selectedBin.fillStatus].label}</span>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedBin(null)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                {[{ label: 'Position X', value: `${selectedBin.x}%` }, { label: 'Position Y', value: `${selectedBin.y}%` }, { label: 'Bin ID', value: selectedBin.id }].map(d => (
                                    <div key={d.label} className="rounded-xl bg-white border border-slate-200 p-3"><p className="text-sm font-bold text-slate-900 truncate">{d.value}</p><p className="text-xs text-slate-500">{d.label}</p></div>
                                ))}
                            </div>
                            {selectedBin.fillStatus === 'full' && (
                                <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3"><AlertTriangle className="h-4 w-4 text-red-500 shrink-0" /><p className="text-xs text-red-600">This bin is full and needs immediate attention.</p></div>
                            )}
                        </div>
                    </motion.div>
                )}
                {isEditMode && selectedBin && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => { setSelectedBin(null); setIsRenamingBin(false); }}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <div className="p-6 pb-4">
                                {isRenamingBin ? (
                                    <div className="flex items-center gap-2 mb-1">
                                        <input autoFocus value={renameValue} onChange={e => setRenameValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') confirmRename(); if (e.key === 'Escape') setIsRenamingBin(false); }} className="flex-1 rounded-lg border border-emerald-400 px-3 py-1.5 text-base font-bold text-slate-900 outline-none ring-2 ring-emerald-500/20" />
                                        <button onClick={confirmRename} className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"><CheckCircle2 className="h-4 w-4" /></button>
                                        <button onClick={() => setIsRenamingBin(false)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"><X className="h-4 w-4" /></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900 flex-1">{selectedBin.name}</h3>
                                        <button onClick={() => setIsRenamingBin(true)} title="Rename bin" className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                                    </div>
                                )}
                                <p className="text-sm text-slate-500 mb-5">Update fill status or rename this bin</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['full', 'empty'] as const).map(status => (
                                        <button key={status} onClick={() => updateBinStatus(selectedBin.id, status)} className={`p-3 rounded-xl text-center transition-all ${selectedBin.fillStatus === status ? `${BIN_FILL_STATUS[status].bg} ${BIN_FILL_STATUS[status].color} ring-2 ring-offset-2 ring-current` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                            <Trash2 className="h-5 w-5 mx-auto mb-1" /><span className="text-xs font-medium">{BIN_FILL_STATUS[status].label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-slate-100 px-6 py-4 flex gap-2">
                                <button onClick={deleteSelectedBin} className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors border border-red-200">Delete Bin</button>
                                <button onClick={() => { setSelectedBin(null); setIsRenamingBin(false); }} className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">Close</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {addBinPos && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setAddBinPos(null)}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <div className="p-6 pb-4">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Bin</h3>
                                <p className="text-sm text-slate-500 mb-5">Position: {addBinPos.x.toFixed(1)}%, {addBinPos.y.toFixed(1)}%</p>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Bin Name</label>
                                        <input autoFocus placeholder="e.g. Science Bldg Entrance" value={newBinName} onChange={e => setNewBinName(e.target.value)} className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Location Code</label>
                                        <input placeholder="e.g. BIN-01" value={newBinCode} onChange={e => setNewBinCode(e.target.value)} className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-slate-100 px-6 py-4 flex gap-2">
                                <button onClick={() => setAddBinPos(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">Cancel</button>
                                <button onClick={confirmAddBin} className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"><Trash2 className="h-4 w-4" /> Add Bin</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {previewImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={cancelMapUpload}>
                        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={e => e.stopPropagation()} className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <div className="p-5 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2"><Image className="h-4 w-4 text-blue-500" /> Preview Map Image</h3>
                                    <button onClick={cancelMapUpload} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="h-4 w-4" /></button>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Review before applying to the campus map</p>
                            </div>
                            <div className="p-5 space-y-4">
                                <div ref={previewContainerRef} className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-grab active:cursor-grabbing select-none touch-none"
                                    onMouseDown={handlePreviewMouseDown} onMouseMove={handlePreviewMouseMove} onMouseUp={handlePreviewMouseUp} onMouseLeave={handlePreviewMouseUp}
                                    onTouchStart={handlePreviewTouchStart} onTouchMove={handlePreviewTouchMove} onTouchEnd={handlePreviewTouchEnd}>
                                    <img src={previewImage.url} alt="Map preview" draggable={false} className="absolute pointer-events-none"
                                        style={{ top: '50%', left: '50%', width: '100%', height: '100%', objectFit: 'cover', transform: `translate(calc(-50% + ${previewPan.x}px), calc(-50% + ${previewPan.y}px)) scale(${previewZoom})`, transformOrigin: 'center center' }} />
                                    <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded-lg px-2 py-1 pointer-events-none">Drag to pan</div>
                                    <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                                        <button onClick={() => setPreviewZoom(z => parseFloat(Math.min(4, z + 0.1).toFixed(2)))} className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white font-bold text-base hover:bg-black/70 transition-colors" title="Zoom in">+</button>
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium">{Math.round(previewZoom * 100)}%</div>
                                        <button onClick={() => setPreviewZoom(z => parseFloat(Math.max(0.25, z - 0.1).toFixed(2)))} className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white font-bold text-base hover:bg-black/70 transition-colors" title="Zoom out">−</button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100"><Image className="h-4 w-4 text-blue-500" /></div>
                                    <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-900 truncate">{previewImage.name}</p><p className="text-xs text-slate-500">{previewImage.size}</p></div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Ready</span>
                                </div>
                            </div>
                            <div className="flex gap-3 px-5 pb-5">
                                <button onClick={cancelMapUpload} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">Cancel</button>
                                <button onClick={confirmMapUpload} className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"><CheckCircle2 className="h-4 w-4" /> Apply Map</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <BinLocationManager onRefresh={loadData} />
        </motion.div>
    );
}
