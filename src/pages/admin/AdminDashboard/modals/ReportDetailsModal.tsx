import { motion } from 'framer-motion';
import { Trash2, Armchair, MapPin, User, Clock, AlertTriangle, Truck, GraduationCap, Building2, Image, X, CalendarCheck, Phone, Recycle, BookOpen, Hash, Camera } from 'lucide-react';
import { BinReport, AssetReport, binStatusBadge, assetStatusBadge, BIN_STATUS } from '../types';
import api from '../../../../services/api';

interface ReportDetailsModalProps {
    report: BinReport | AssetReport;
    onClose: () => void;
    type?: 'waste' | 'asset';
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
            </div>
        </div>
    );
}

export function ReportDetailsModal({ report, onClose, type = 'waste' }: ReportDetailsModalProps) {
    const isWaste = type === 'waste';
    const isDispatched = ['dispatched', 'in_progress', 'in-progress', 'completed', 'collected', 'resolved'].includes(
        (report?.status as string)?.toLowerCase()
    );
    const binReport = report as BinReport;

    const formatDispatchTime = (iso?: string) => {
        if (!iso) return null;
        try {
            const d = new Date(iso);
            return `${d.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })} at ${d.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
        } catch {
            return iso;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isWaste ? 'bg-red-100' : 'bg-blue-100'}`}>
                            {isWaste ? <Trash2 className="h-5 w-5 text-red-600" /> : <Armchair className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Report Details</h3>
                            <p className="text-xs text-slate-500">ID: {report?.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${isWaste ? binStatusBadge[report?.status as keyof typeof binStatusBadge] : assetStatusBadge[report?.status as keyof typeof assetStatusBadge]}`}>
                            {report?.status?.replace(/-|_/g, ' ')}
                        </span>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <X className="h-5 w-5 text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-6 space-y-5">

                    {/* Dispatch Details Banner — shown when dispatched */}
                    {isDispatched && binReport.assignedStaff && (
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Truck className="h-4 w-4 text-blue-600" />
                                <p className="text-sm font-bold text-blue-700 uppercase tracking-wide">Dispatch Details</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
                                        {binReport.assignedStaff.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-600 mb-0.5">Assigned Staff</p>
                                        <p className="text-sm font-bold text-slate-900">{binReport.assignedStaff.name}</p>
                                        <p className="text-xs text-slate-500">{binReport.assignedStaff.role}</p>
                                    </div>
                                </div>
                                {binReport.assignedStaff.phone && (
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <span>{binReport.assignedStaff.phone}</span>
                                    </div>
                                )}
                                {binReport.dispatchedAt && (
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <CalendarCheck className="h-4 w-4 text-slate-400" />
                                        <span>Dispatched on <span className="font-semibold">{formatDispatchTime(binReport.dispatchedAt)}</span></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Photo */}
                    {(binReport.photoUrl || report.image) ? (
                        <div className="relative rounded-xl overflow-hidden h-44 bg-slate-100">
                            <img
                                src={api.getImageUrl(binReport.photoUrl || report.image) || ''}
                                alt="Report photo"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                    ) : (
                        <div className="relative h-40 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                                <Camera className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-500">No Photo</p>
                                <p className="text-xs text-slate-400">No image was attached</p>
                            </div>
                        </div>
                    )}

                    {/* Report Info */}
                    <div className="space-y-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Report Information</p>

                        <InfoRow
                            icon={<MapPin className="h-4 w-4 text-slate-600" />}
                            label="Location"
                            value={'location' in report ? report.location : (report as AssetReport).item}
                        />

                        {isWaste && (
                            <>
                                <InfoRow
                                    icon={<Recycle className="h-4 w-4 text-slate-600" />}
                                    label="Waste Type"
                                    value={binReport.wasteType}
                                />
                                <InfoRow
                                    icon={<AlertTriangle className="h-4 w-4 text-slate-600" />}
                                    label="Urgency"
                                    value={binReport.urgency}
                                />
                            </>
                        )}

                        {report.notes && (
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                    <BookOpen className="h-4 w-4 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-0.5">Notes</p>
                                    <p className="text-sm text-slate-700">{report.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* Reporter Info */}
                    <div className="space-y-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reporter Information</p>

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                <User className="h-4 w-4 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Reported By</p>
                                <p className="text-sm font-semibold text-slate-900">{report.reportedBy}</p>
                                <span className={`inline-flex items-center gap-1 mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${report.reporterRole === 'student' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {report.reporterRole === 'student' ? <GraduationCap className="h-2.5 w-2.5" /> : <Building2 className="h-2.5 w-2.5" />}
                                    {report.reporterRole}
                                </span>
                            </div>
                        </div>

                        {binReport.studentId && (
                            <InfoRow
                                icon={<Hash className="h-4 w-4 text-slate-600" />}
                                label="Student ID"
                                value={binReport.studentId}
                            />
                        )}

                        {(binReport.course || binReport.section) && (
                            <InfoRow
                                icon={<BookOpen className="h-4 w-4 text-slate-600" />}
                                label="Course / Section"
                                value={[binReport.course, binReport.section].filter(Boolean).join(' — ')}
                            />
                        )}
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* Timestamp */}
                    <div className="grid grid-cols-2 gap-4">
                        <InfoRow
                            icon={<Clock className="h-4 w-4 text-slate-600" />}
                            label="Date Reported"
                            value={report.date || 'N/A'}
                        />
                        <InfoRow
                            icon={<Clock className="h-4 w-4 text-slate-600" />}
                            label="Time Reported"
                            value={report.time || 'N/A'}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end border-t border-slate-200 px-6 py-4 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

