import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Camera, MapPin, Trash2, AlertTriangle, Image, Navigation,
    X, Send, CheckCircle2, MessageSquare, CircleDot, Loader2, MapPinned, Clock,
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { Card, binStatusLabel } from './shared';
import { compressImage } from '../../../lib/imageUtils';

export default function ReportTab({ binLocations = [], roomLocations = [], wasteTypes = [], urgencyLevels = [] }) {
    // Failsafe defaults if props are empty
    const displayWasteTypes = (wasteTypes && wasteTypes.length > 0) 
        ? wasteTypes.filter(w => w.enabled !== false) 
        : [
            { key: 'recyclable', label: 'Recyclable', emoji: '♻️', enabled: true },
            { key: 'biodegradable', label: 'Biodegradable', emoji: '🌿', enabled: true },
            { key: 'residual', label: 'Residual', emoji: '🗑️', enabled: true },
            { key: 'hazardous', label: 'Hazardous', emoji: '☣️', enabled: true },
        ];

    const displayUrgencyLevels = (urgencyLevels && urgencyLevels.length > 0) 
        ? urgencyLevels.filter(u => u.enabled !== false) 
        : [
            { key: 'low', label: 'Low', description: 'Non-critical issue', color: 'border-slate-400 bg-slate-100 text-slate-500', enabled: true },
            { key: 'normal', label: 'Normal', description: 'Standard response', color: 'border-amber-500/30 bg-amber-400/10 text-amber-400', enabled: true },
            { key: 'high', label: 'Urgent', description: 'Immediate attention', color: 'border-red-500/30 bg-red-400/10 text-red-400', enabled: true },
        ];

    const displayBinLocations = (binLocations && binLocations.length > 0) 
        ? binLocations.filter(b => b.enabled !== false) 
        : [
            { id: 'f1', name: 'Cafeteria – Block A', status: 'empty' },
            { id: 'f2', name: 'Library Entrance', status: 'empty' },
            { id: 'f3', name: 'Student Center', status: 'empty' },
        ];

    const { theme } = useTheme();
    const { user, refreshUser } = useAuth();
    const [photo, setPhoto] = useState(null);
    const [cameraMode, setCameraMode] = useState(false);
    const [location, setLocation] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [notes, setNotes] = useState('');
    const [urgency, setUrgency] = useState('normal');
    const [wasteType, setWasteType] = useState('recyclable');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const [error, setError] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const preview = photo ? URL.createObjectURL(photo) : null;
    const filteredLocations = displayBinLocations.filter(b =>
        b.name.toLowerCase().includes(locationSearch.toLowerCase())
    );

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

    const capturePhoto = async () => {
        if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);
            
            canvasRef.current.toBlob(async (blob) => {
                const rawFile = new File([blob], `bin-report-${Date.now()}.jpg`, { type: 'image/jpeg' });
                try {
                    // Compress image before setting it - Target ~50KB
                    const compressed = await compressImage(rawFile, { maxWidth: 800, maxHeight: 800, quality: 0.6 });
                    setPhoto(compressed);
                } catch (err) {
                    console.error('Compression failed:', err);
                    setPhoto(rawFile); // Fallback to raw if compression fails
                }
                stopCamera();
            }, 'image/jpeg', 0.8);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        setCameraMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location) { setError('Please select a location'); return; }
        if (!photo) { setError('Please take a photo as evidence'); return; }
        
        setSubmitting(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('location', location);
            formData.append('notes', notes);
            formData.append('urgency', urgency);
            formData.append('wasteType', wasteType);
            formData.append('photo', photo);

            const response = await api.createReport(formData);
            if (response.success) {
                await refreshUser();
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
        setPhoto(null); setLocation(''); setLocationSearch('');
        setNotes(''); setUrgency('normal'); setWasteType('recyclable');
        setSubmitted(false); setError('');
    };

    if (submitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="pb-20 lg:pb-0">
                <Card theme={theme} className="flex flex-col items-center gap-5 py-12 text-center" glow>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-eco-green/15">
                        <CheckCircle2 className="h-10 w-10 text-eco-green" />
                    </motion.div>
                    <div>
                        <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report Submitted!</h3>
                        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-sm`}>
                            Your report has been sent to MRF staff for verification. <strong className="text-eco-green">Points will be awarded</strong> once an admin verifies your report.
                        </p>
                    </div>
                    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${theme === 'dark' ? 'border-amber-400/20 bg-amber-400/10' : 'border-amber-400/30 bg-amber-50'}`}>
                        <Clock className="h-5 w-5 text-amber-400" />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>Status: Pending Verification</span>
                    </div>
                    <button onClick={resetForm}
                        className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-eco-green px-6 py-3 text-sm font-bold text-white shadow-lg shadow-eco-green/25 hover:bg-eco-green-dark hover:shadow-eco-green/40 transition-all">
                        <Camera className="h-4 w-4" /> Report Another Bin
                    </button>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 pb-20 lg:pb-0">

            {/* Header */}
            <Card theme={theme} className="bg-gradient-to-r from-red-400/10 to-orange-400/10 border-red-400/15">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-red-400/15">
                        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
                    </div>
                    <div>
                        <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Report a Full Trashbin</h3>
                        <p className="text-xs text-slate-500">Take a photo, select location, and submit. MRF staff will handle the rest.</p>
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
                        className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed ${theme === 'dark' ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-slate-100/60'} px-4 py-10 sm:py-12 cursor-pointer transition-all hover:border-eco-green/30 hover:bg-eco-green/5 active:bg-eco-green/10`}>
                        <Camera className="h-10 w-10 text-slate-500" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Take a Photo</span>
                        <span className="text-xs text-slate-600">Open camera to capture evidence</span>
                    </button>
                )}
                {cameraMode && (
                    <div className="space-y-3">
                        <video ref={videoRef} autoPlay playsInline
                            className={`w-full rounded-2xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-slate-100'} aspect-video object-cover`} />
                        <div className="flex gap-2">
                            <button type="button" onClick={capturePhoto}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-eco-green px-4 py-2.5 text-sm font-bold text-white hover:bg-eco-green-dark transition-all">
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
                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 border border-eco-green/30">
                            <CheckCircle2 className="h-3.5 w-3.5 text-eco-green" />
                            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Photo ready</span>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </Card>

            {/* Location */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MapPin className="h-4 w-4 text-slate-500" /> Bin Location <span className="text-red-400">*</span>
                </h4>
                {!location ? (
                    <div>
                        <div className={`flex items-center gap-2 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-50'} px-4 py-3 transition-all ${focusedField === 'loc' ? 'border-eco-green/50 ring-2 ring-eco-green/20' : theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
                            <Navigation className="h-4 w-4 text-slate-500 shrink-0" />
                            <input type="text" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)}
                                onFocus={() => setFocusedField('loc')} onBlur={() => setTimeout(() => setFocusedField(''), 150)}
                                placeholder="Search campus location..."
                                className={`flex-1 bg-transparent text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none`} />
                        </div>
                        <div className={`mt-2 max-h-48 overflow-y-auto space-y-0.5 rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                            {filteredLocations.map((b) => {
                                const fillStatus = b.binStatus?.fillStatus || b.status || 'empty';
                                const isFull = fillStatus === 'full';
                                
                                return (
                                    <button key={b.id} type="button" 
                                        onClick={() => { 
                                            if (!isFull) {
                                                setLocation(b.name); 
                                                setLocationSearch(''); 
                                            }
                                        }}
                                        disabled={isFull}
                                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                            isFull 
                                                ? 'opacity-60 cursor-not-allowed bg-red-400/5' 
                                                : theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-100'
                                        }`}>
                                        <span className={`h-2 w-2 rounded-full ${isFull ? 'bg-red-400' : 'bg-eco-green'}`} />
                                        <span className={`flex-1 text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{b.name}</span>
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${(binStatusLabel[fillStatus] || binStatusLabel.empty).bg} ${(binStatusLabel[fillStatus] || binStatusLabel.empty).color}`}>
                                            {(binStatusLabel[fillStatus] || binStatusLabel.empty).label}
                                        </span>
                                    </button>
                                );
                            })}
                            {filteredLocations.length === 0 && (
                                <p className="px-4 py-3 text-sm text-slate-600 text-center">No matching locations</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-eco-green/30 bg-eco-green/5 px-4 py-3">
                        <MapPinned className="h-5 w-5 text-eco-green shrink-0" />
                        <span className={`flex-1 text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{location}</span>
                        <button type="button" onClick={() => setLocation('')} className="text-slate-500 hover:text-red-400 transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </Card>

            {/* Waste Type & Urgency */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                <Card theme={theme}>
                    <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Trash2 className="h-4 w-4 text-slate-500" /> Waste Type
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {displayWasteTypes.filter(w => w.enabled).map((w) => (
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
                        {displayUrgencyLevels.filter(u => u.enabled).map((u) => {
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
            </div>

            {/* Notes */}
            <Card theme={theme}>
                <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MessageSquare className="h-4 w-4 text-slate-500" /> Additional Notes
                    <span className="text-xs font-normal text-slate-600">(optional)</span>
                </h4>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe what you see... e.g. 'Bin overflowing with plastic cups since morning'"
                    rows={3}
                    className={`w-full rounded-xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-800/80' : 'border-slate-300 bg-slate-50'} px-4 py-3 text-sm ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'} outline-none focus:border-eco-green/50 focus:ring-2 focus:ring-eco-green/20 transition-all resize-none`} />
                <p className="mt-1.5 text-xs text-slate-600">{notes.length}/300 characters</p>
            </Card>

            {/* Submit */}
            <button type="submit" disabled={!photo || !location || submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-eco-green py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-eco-green/25 transition-all hover:bg-eco-green-dark hover:shadow-eco-green/40 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                ) : (
                    <><Send className="h-5 w-5" /> Submit Report</>
                )}
            </button>
            <p className="text-center text-xs text-slate-600 pb-2">
                Reports are reviewed by MRF staff within 30 minutes during office hours.
            </p>
        </motion.form>
    );
}
