import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Camera, X, Send, CheckCircle2, AlertTriangle, Image, Navigation,
    MessageSquare, CircleDot, Loader2, Package, Trash2, ChevronRight,
    MapPin, MapPinned, Building2, Shield, FileText, ClipboardList, Armchair,
    Monitor, Lamp, Wrench, Navigation2, Clock
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import api from '../../../services/api';
import { Card, fadeUp, binStatusLabel } from './shared';

const CATEGORY_DEFAULTS = {
    waste: { icon: Trash2, color: 'from-red-500 to-orange-500', desc: 'Full bins, overflowing waste' },
    furniture: { icon: Armchair, color: 'from-blue-500 to-cyan-500', desc: 'Chairs, tables, desks, cabinets' },
    electronics: { icon: Monitor, color: 'from-violet-500 to-purple-500', desc: 'Computers, projectors, TVs' },
    fixtures: { icon: Lamp, color: 'from-amber-500 to-yellow-500', desc: 'Lights, fans, AC units' },
    equipment: { icon: Wrench, color: 'from-eco-green to-teal-500', desc: 'Lab equipment, tools' },
    other: { icon: Package, color: 'from-slate-500 to-slate-600', desc: 'Misc items not listed above' },
};

export const DEFAULT_REPORT_TYPES = [
    { id: 'waste', label: 'Waste/Bin', ...CATEGORY_DEFAULTS.waste },
    { id: 'furniture', label: 'Furniture', ...CATEGORY_DEFAULTS.furniture },
    { id: 'electronics', label: 'Electronics', ...CATEGORY_DEFAULTS.electronics },
    { id: 'fixtures', label: 'Fixtures', ...CATEGORY_DEFAULTS.fixtures },
    { id: 'equipment', label: 'Equipment', ...CATEGORY_DEFAULTS.equipment },
    { id: 'other', label: 'Other', ...CATEGORY_DEFAULTS.other },
];

export function buildReportTypes(apiCategories) {
    const wasteType = { id: 'waste', label: 'Waste/Bin', ...CATEGORY_DEFAULTS.waste };
    const assetTypes = apiCategories
        .filter(cat => cat.enabled)
        .map(cat => {
            const defaults = CATEGORY_DEFAULTS[cat.name] || CATEGORY_DEFAULTS.other;
            return { id: cat.name, label: cat.label, icon: defaults.icon, color: defaults.color, desc: defaults.desc };
        });
    return [wasteType, ...assetTypes];
}

export default function ReportTab({
    onReportSubmitted,
    reportTypes = DEFAULT_REPORT_TYPES,
    binLocations = [],
    roomLocations = [],
    wasteTypes = [],
    itemPresets = [],
    urgencyLevels = [],
    assetConditions = []
}) {
    const { theme } = useTheme();
    const [reportType, setReportType] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [error, setError] = useState('');
    const [photo, setPhoto] = useState(null);
    const [cameraMode, setCameraMode] = useState(false);
    const [location, setLocation] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [notes, setNotes] = useState('');
    const [urgency, setUrgency] = useState('normal');
    const [wasteType, setWasteType] = useState('recyclable');
    const [condition, setCondition] = useState('damaged');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const preview = photo ? URL.createObjectURL(photo) : null;
    const isWaste = reportType === 'waste';
    const locations = isWaste ? binLocations : roomLocations;
    const filteredLocations = locations.filter(l => l.name.toLowerCase().includes(locationSearch.toLowerCase()));

    // Filter item presets for the current category
    const currentCategory = reportTypes.find(t => t.id === reportType);
    const filteredItems = itemPresets.filter(item => {
        if (!reportType || isWaste) return false;
        
        // Match by category ID, name, or label
        const catId = String(item.categoryId);
        const catName = item.category?.name?.toLowerCase();
        const catLabel = item.category?.label?.toLowerCase();
        const target = reportType.toLowerCase();
        
        // Also check if reportType matches the currentCategory's id or label
        const targetLabel = currentCategory?.label?.toLowerCase();
        
        return catName === target || 
               catLabel === target || 
               catName === targetLabel ||
               catId === reportType;
    });

    // Fallback: if no items found but it's an asset category, provide a generic option
    const displayItems = filteredItems.length > 0 
        ? filteredItems 
        : (!isWaste ? [{ id: 'custom-asset', name: `Other ${currentCategory?.label || 'Item'}`, icon: '📦' }] : []);

    const selectedItem = displayItems.find(i => i.id === selectedItemId);

    // Define theme colors based on report type
    const primaryColor = isWaste ? 'eco-green' : 'blue-500';
    const primaryText = isWaste ? 'text-eco-green' : 'text-blue-500';
    const primaryBg = isWaste ? 'bg-eco-green' : 'bg-blue-500';
    const primaryBorder = isWaste ? 'border-eco-green' : 'border-blue-500';
    const primaryRing = isWaste ? 'ring-eco-green' : 'ring-blue-500';
    const primaryHover = isWaste ? 'hover:bg-eco-green-dark' : 'hover:bg-blue-600';
    const primaryShadow = isWaste ? 'shadow-eco-green/25' : 'shadow-blue-500/25';

    const startCamera = async () => {
        setCameraMode(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch {
            alert('Unable to access camera. Please check permissions.');
            setCameraMode(false);
        }
    };

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);
            canvasRef.current.toBlob(blob => {
                setPhoto(new File([blob], `report-${Date.now()}.jpg`, { type: 'image/jpeg' }));
                stopCamera();
            });
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        setCameraMode(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!location) { setError('Please select a location'); return; }
        if (!isWaste && !selectedItemId) { setError(`Please select a ${currentCategory?.label || 'item'}`); return; }
        
        setSubmitting(true);
        setError('');
        try {
            const itemName = selectedItem?.name || reportType;
            const fullNotes = isWaste
                ? notes
                : `[${reportType.toUpperCase()}] ${itemName} - ${condition.toUpperCase()}${notes ? `: ${notes}` : ''}`;
            
            const reportData = {
                location,
                notes: fullNotes,
                urgency,
                wasteType: isWaste ? wasteType : itemName,
                category: reportType, // Send the category (e.g. 'furniture', 'electronics')
                photoUrl: photo ? 'photo-captured' : null,
            };
            const response = await api.createReport(reportData);
            if (response.success) {
                if (onReportSubmitted) await onReportSubmitted();
                setSubmitted(true);
            } else {
                setError(response.message || 'Failed to submit report');
            }
        } catch (err) {
            setError(err.message || 'Failed to submit report');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setReportType(null); setSelectedItemId(null); setPhoto(null); setLocation(''); setLocationSearch('');
        setNotes(''); setUrgency('normal'); setWasteType('recyclable'); setCondition('damaged');
        setSubmitted(false); setError('');
    };

    /* Success */
    if (submitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="pb-20 lg:pb-0">
                <Card theme={theme} className="flex flex-col items-center gap-5 py-12 text-center" glow>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                        className={`flex h-20 w-20 items-center justify-center rounded-full ${isWaste ? 'bg-eco-green/15' : 'bg-blue-500/15'}`}>
                        <CheckCircle2 className={`h-10 w-10 ${isWaste ? 'text-eco-green' : 'text-blue-500'}`} />
                    </motion.div>
                    <div>
                        <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report Submitted!</h3>
                        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-sm`}>
                            {isWaste
                                ? <>Your report has been sent to MRF staff for verification. <strong className="text-eco-green">MRF staff</strong> will handle the rest.</>
                                : 'Your report has been sent to the appropriate department for review and processing.'}
                        </p>
                    </div>

                    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${isWaste
                        ? (theme === 'dark' ? 'border-amber-400/20 bg-amber-400/10' : 'border-amber-400/30 bg-amber-50')
                        : (theme === 'dark' ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-300 bg-blue-50')
                        }`}>
                        {isWaste ? <Clock className="h-5 w-5 text-amber-400" /> : <FileText className="h-5 w-5 text-blue-400" />}
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {isWaste ? 'Status: Pending Verification' : `Report ID: RPT-${Date.now().toString().slice(-6)}`}
                        </span>
                    </div>

                    <button onClick={resetForm}
                        className={`mt-2 inline-flex items-center gap-2 rounded-2xl ${primaryBg} px-6 py-3 text-sm font-bold text-white shadow-lg ${primaryShadow} transition-all hover:opacity-90`}>
                        {isWaste ? <Camera className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
                        {isWaste ? 'Report Another Bin' : 'Submit Another Report'}
                    </button>
                </Card>
            </motion.div>
        );
    }

    /* Category selection */
    if (!reportType) {
        return (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="pb-20 lg:pb-0">
                <Card theme={theme} className="mb-6 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 border-blue-400/15">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                            <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>What would you like to report?</h3>
                            <p className="text-xs text-slate-500">Select a category to proceed with your report.</p>
                        </div>
                    </div>
                </Card>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {reportTypes.map((type, i) => (
                        <motion.button key={type.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
                            onClick={() => setReportType(type.id)}
                            className={`group relative rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-sm transition-all cursor-pointer hover:shadow-xl active:scale-[0.97] ${theme === 'dark'
                                ? 'border-white/5 bg-slate-900/60 hover:border-blue-500/30 hover:bg-slate-900/90'
                                : 'border-slate-200 bg-white/60 shadow-sm hover:border-blue-500/30 hover:bg-white/90'}`}>
                            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                                <type.icon className="h-6 w-6" />
                            </div>
                            <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{type.label}</p>
                            <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                            <ChevronRight className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'} group-hover:text-blue-500 transition-colors`} />
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        );
    }

    const currentType = reportTypes.find(t => t.id === reportType);

    return (
        <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 pb-20 lg:pb-0">

            {/* Back header */}
            <Card theme={theme} className={`bg-gradient-to-r ${isWaste ? 'from-red-400/10 to-orange-400/10' : `${currentType.color}/10`} ${isWaste ? 'border-red-400/15' : 'border-blue-400/15'}`}>
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setReportType(null)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100'} transition-colors`}>
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ${isWaste ? 'bg-red-400/15' : `bg-gradient-to-br ${currentType.color}`}`}>
                        {isWaste ? <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" /> : <currentType.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                    </div>
                    <div>
                        <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{isWaste ? 'Report a Full Trashbin' : `Report ${currentType.label}`}</h3>
                        <p className="text-xs text-slate-500">{isWaste ? 'Take a photo, select location, and submit. MRF staff will handle the rest.' : currentType.desc}</p>
                    </div>
                </div>
            </Card>

            {/* Error */}
            {error && (
                <Card theme={theme} className="bg-red-400/10 border-red-400/20">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                </Card>
            )}

            {/* Photo */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Image className="h-4 w-4 text-slate-500" /> Photo Evidence <span className="text-red-400">*</span>
                </h4>
                {!photo && !cameraMode && (
                    <button type="button" onClick={startCamera}
                        className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed ${theme === 'dark' ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-slate-100/60'} px-4 py-10 sm:py-12 cursor-pointer transition-all hover:border-${primaryColor}/30 hover:bg-${primaryColor}/5 active:bg-${primaryColor}/10`}>
                        <Camera className="h-10 w-10 text-slate-500" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Take a Photo</span>
                        <span className="text-xs text-slate-600">Open camera to capture evidence</span>
                    </button>
                )}
                {cameraMode && (
                    <div className="space-y-3">
                        <video ref={videoRef} autoPlay playsInline className={`w-full rounded-2xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-slate-100'} aspect-video object-cover`} />
                        <div className="flex gap-2">
                            <button type="button" onClick={capturePhoto}
                                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl ${primaryBg} px-4 py-2.5 text-sm font-bold text-white ${primaryHover} transition-all`}>
                                <Camera className="h-4 w-4" /> Capture
                            </button>
                            <button type="button" onClick={stopCamera}
                                className={`rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} px-4 py-2.5 text-sm font-medium ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:border-slate-600' : 'text-slate-600 hover:text-slate-900 hover:border-slate-400'} transition-all`}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {photo && (
                    <div className="relative">
                        <img src={preview} alt="Preview" className={`w-full rounded-2xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} object-cover max-h-64`} />
                        <button type="button" onClick={() => setPhoto(null)}
                            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                        <div className={`absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 border border-${primaryColor}/30`}>
                            <CheckCircle2 className={`h-3.5 w-3.5 ${primaryText}`} />
                            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Photo ready</span>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </Card>

            {/* Location */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MapPin className="h-4 w-4 text-slate-500" /> {isWaste ? 'Bin Location' : 'Location'} <span className="text-red-400">*</span>
                </h4>
                {!location ? (
                    <div>
                        <div className={`flex items-center gap-2 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50'} px-4 py-3 transition-all ${focusedField === 'loc' ? `border-${primaryColor}/50 ring-2 ring-${primaryColor}/20` : theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
                            <Navigation className="h-4 w-4 text-slate-500 shrink-0" />
                            <input type="text" value={locationSearch} onChange={e => setLocationSearch(e.target.value)}
                                onFocus={() => setFocusedField('loc')} onBlur={() => setTimeout(() => setFocusedField(''), 150)}
                                placeholder={isWaste ? 'Search bin location...' : 'Search room or building...'}
                                className={`flex-1 bg-transparent text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none`} />
                        </div>
                        <div className={`mt-2 max-h-48 overflow-y-auto space-y-0.5 rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                            {filteredLocations.map(loc => (
                                <button key={loc.id} type="button" onClick={() => { setLocation(loc.name); setLocationSearch(''); }}
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-100'} transition-colors`}>
                                    {isWaste
                                        ? <span className={`h-2 w-2 rounded-full ${loc.status === 'full' ? 'bg-red-400' : 'bg-eco-green'}`} />
                                        : <Building2 className="h-4 w-4 text-slate-500" />}
                                    <span className={`flex-1 text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{loc.name}</span>
                                    {isWaste && (
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${(binStatusLabel[loc.status] || binStatusLabel.empty).bg} ${(binStatusLabel[loc.status] || binStatusLabel.empty).color}`}>
                                            {(binStatusLabel[loc.status] || binStatusLabel.empty).label}
                                        </span>
                                    )}
                                </button>
                            ))}
                            {filteredLocations.length === 0 && <p className="px-4 py-3 text-sm text-slate-600 text-center">No matching locations</p>}
                        </div>
                    </div>
                ) : (
                    <div className={`flex items-center gap-3 rounded-xl border border-${primaryColor}/30 bg-${primaryColor}/5 px-4 py-3`}>
                        <MapPinned className={`h-5 w-5 ${primaryText} shrink-0`} />
                        <span className={`flex-1 text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{location}</span>
                        <button type="button" onClick={() => setLocation('')} className="text-slate-500 hover:text-red-400 transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </Card>

            {/* Item List (for assets) */}
            {!isWaste && displayItems.length > 0 && (
                <Card theme={theme}>
                    <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Package className="h-4 w-4 text-slate-500" /> Select {currentCategory?.label || 'Item'} <span className="text-red-400">*</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {displayItems.map(item => (
                            <button key={item.id} type="button" onClick={() => setSelectedItemId(item.id)}
                                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${selectedItemId === item.id
                                    ? 'border-blue-500/40 bg-blue-500/10 text-blue-500 ring-2 ring-blue-500/20'
                                    : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300' : 'border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                                    }`}>
                                <span className="text-lg">{item.icon || '📦'}</span>
                                <span className="text-xs font-semibold truncate">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </Card>
            )}

            {/* Waste Type & Urgency (for waste) or Condition & Urgency (for assets) */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                {isWaste ? (
                    <>
                        <Card theme={theme}>
                            <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                <Trash2 className="h-4 w-4 text-slate-500" /> Waste Type
                            </h4>
                            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                {(wasteTypes || []).filter(w => w.enabled).map((w) => (
                                    <button key={w.key} type="button" onClick={() => setWasteType(w.key)}
                                        className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${wasteType === w.key
                                            ? 'border-eco-green/40 bg-eco-green/10 text-eco-green'
                                            : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300' : 'border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                                            }`}>
                                        <span>{w.emoji}</span> {w.label}
                                    </button>
                                ))}
                            </div>
                        </Card>
                        <Card theme={theme}>
                            <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                <AlertTriangle className="h-4 w-4 text-slate-500" /> Urgency Level
                            </h4>
                            <div className="space-y-1.5 sm:space-y-2">
                                {(urgencyLevels || []).filter(u => u.enabled).map((u) => {
                                    const themeColor = theme === 'dark' ? 'border-slate-600 bg-slate-800/60 text-slate-400' : u.color || 'border-slate-400 bg-slate-100 text-slate-500';
                                    return (
                                        <button key={u.key} type="button" onClick={() => setUrgency(u.key)}
                                            className={`flex w-full items-center gap-2 sm:gap-3 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 text-left transition-all ${urgency === u.key
                                                ? `${themeColor} ring-2 ring-offset-1 ${theme === 'dark' ? 'ring-offset-slate-950' : 'ring-offset-white'} ring-eco-green/30`
                                                : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600' : 'border-slate-300 text-slate-500 hover:border-slate-400'
                                                }`}>
                                            <CircleDot className={`h-4 w-4 shrink-0 ${urgency === u.key ? '' : 'opacity-40'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium">{u.label}</p>
                                                <p className="text-[10px] sm:text-xs opacity-70 truncate">{u.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>
                    </>
                ) : (
                    <>
                        <Card theme={theme}>
                            <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                <Shield className="h-4 w-4 text-slate-500" /> Condition
                            </h4>
                            <div className="space-y-1.5">
                                {(assetConditions || []).filter(c => c.enabled).map(c => (
                                    <button key={c.key} type="button" onClick={() => setCondition(c.key)}
                                        className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all ${condition === c.key
                                            ? 'border-blue-500/40 bg-blue-500/10 text-blue-500'
                                            : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600' : 'border-slate-300 text-slate-500 hover:border-slate-400'}`}>
                                        <CircleDot className={`h-3.5 w-3.5 shrink-0 ${condition === c.key ? '' : 'opacity-40'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium">{c.label}</p>
                                            <p className="text-[10px] opacity-70 truncate">{c.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Card>
                        <Card theme={theme}>
                            <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                <AlertTriangle className="h-4 w-4 text-slate-500" /> Urgency Level
                            </h4>
                            <div className="space-y-1.5">
                                {(urgencyLevels || []).filter(u => u.enabled).map(u => {
                                    const themeColor = theme === 'dark' ? 'border-slate-600 bg-slate-800/60 text-slate-400' : u.color || 'border-slate-400 bg-slate-100 text-slate-500';
                                    
                                    // Customize description for assets based on selected category
                                    let description = u.description;
                                    const cat = reportType?.toLowerCase() || '';
                                    const isFixture = cat === 'fixtures';
                                    const isElectronics = cat === 'electronics';
                                    const isEquipment = cat === 'equipment';
                                    const isFurniture = cat === 'furniture';

                                    if (u.key === 'low') {
                                        description = 'Minor issue, no immediate impact';
                                    } else if (u.key === 'normal') {
                                        description = 'Needs repair or attention soon';
                                    } else if (u.key === 'high') {
                                        if (isFixture || isElectronics) {
                                            description = 'Safety hazard (e.g. sparking lights, electrical smell)';
                                        } else if (isFurniture) {
                                            description = 'Dangerous condition (e.g. broken glass, unstable)';
                                        } else if (isEquipment) {
                                            description = 'Critical failure / Safety hazard';
                                        } else {
                                            description = 'Urgent attention required / Safety hazard';
                                        }
                                    }

                                    return (
                                        <button key={u.key} type="button" onClick={() => setUrgency(u.key)}
                                            className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all ${urgency === u.key
                                                ? `${themeColor} ring-2 ring-offset-1 ${theme === 'dark' ? 'ring-offset-slate-950' : 'ring-offset-white'} ring-blue-500/30`
                                                : theme === 'dark' ? 'border-slate-700 text-slate-500 hover:border-slate-600' : 'border-slate-300 text-slate-500 hover:border-slate-400'}`}>
                                            <CircleDot className={`h-3.5 w-3.5 shrink-0 ${urgency === u.key ? '' : 'opacity-40'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium">{u.label}</p>
                                                <p className="text-[10px] opacity-70 truncate">{description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>
                    </>
                )}
            </div>

            {/* Notes */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MessageSquare className="h-4 w-4 text-slate-500" /> Additional Notes
                    <span className="text-xs font-normal text-slate-600">(optional)</span>
                </h4>
                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder={isWaste ? 'Describe what you see... e.g. \'Bin overflowing with plastic cups since morning\'' : 'Describe the issue...'}
                    rows={3}
                    className={`w-full rounded-xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-800/80' : 'border-slate-300 bg-slate-50'} px-4 py-3 text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none focus:border-${primaryColor}/50 focus:ring-2 focus:ring-${primaryColor}/20 transition-all resize-none`} />
                <p className="mt-1.5 text-xs text-slate-600">{notes.length}/300 characters</p>
            </Card>

            {/* Submit */}
            <button type="submit" disabled={!photo || !location || submitting}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl ${primaryBg} py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl ${primaryShadow} transition-all ${primaryHover} active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed`}>
                {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                ) : (
                    <><Send className="h-5 w-5" /> Submit Report</>
                )}
            </button>
            <p className="text-center text-xs text-slate-600 pb-2">
                {isWaste ? 'Reports are reviewed by MRF staff within 30 minutes during office hours.' : 'Reports are reviewed by the appropriate department within 24 hours.'}
            </p>
        </motion.form>
    );
}
