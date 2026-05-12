import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, CheckCircle2, XCircle, Truck, RefreshCw, Search, Loader2 } from 'lucide-react';
import api from '../../../../services/api';
import { BIN_STATUS, binStatusDot, binStatusBadge, type BinReport, type MRFStaffMember, type BinStatusType } from '../types';
import { useToast } from '../components/Toast';
import { Card } from '../components/Card';
import { DispatchModal, ConfirmationModal, ReportDetailsModal } from '../modals';

interface WasteReportsTabProps {
    binReports: BinReport[];
    setBinReports: React.Dispatch<React.SetStateAction<BinReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
    mrfStaff: MRFStaffMember[];
    addNotification: (notif: any) => void;
}

export function WasteReportsTab({ binReports, setBinReports, onRefresh, loading, reportsError, mrfStaff, addNotification }: WasteReportsTabProps) {
    const { addToast } = useToast();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<BinReport | null>(null);
    const [showDispatch, setShowDispatch] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showConfirm, setShowConfirm] = useState<{ type: 'verify' | 'dismiss'; report: BinReport } | null>(null);

    const filteredReports = binReports
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => search === '' || r.location?.toLowerCase().includes(search.toLowerCase()) || r.reportedBy?.toLowerCase().includes(search.toLowerCase()));

    const handleViewDetails = (report: BinReport) => { setSelectedReport(report); setShowDetails(true); };
    const handleVerify = (report: BinReport) => setShowConfirm({ type: 'verify', report });
    const handleDismiss = (report: BinReport) => setShowConfirm({ type: 'dismiss', report });
    const handleDispatch = (report: BinReport) => { setSelectedReport(report); setShowDispatch(true); };

    const confirmAction = async () => {
        if (!showConfirm) return;
        const { type, report } = showConfirm;
        const newStatus = type === 'verify' ? 'VERIFIED' : 'DISMISSED';
        try {
            const response = await api.updateReportStatus(report.id, newStatus);
            if (response.success) {
                setBinReports(prev => prev.map(r =>
                    r.id === report.id ? { ...r, status: newStatus.toLowerCase() as BinStatusType } : r
                ));
                addToast(`Report ${type === 'verify' ? 'verified' : 'dismissed'}`, 'success');
            } else {
                addToast(response.message || 'Failed to update report', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowConfirm(null);
    };

    const confirmDispatch = async (reportId: string, staff: MRFStaffMember) => {
        try {
            const response = await api.dispatchStaff(reportId, staff.id, staff.name);
            if (response.success) {
                const report = binReports.find(r => r.id === reportId);
                const dispatchedAt = new Date().toISOString();
                setBinReports(prev => prev.map(r =>
                    r.id === reportId ? { ...r, status: BIN_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r
                ));
                addToast(`Dispatched to ${staff.name}`, 'info');
                addNotification({
                    type: 'dispatch', title: 'Dispatch Complete',
                    message: `${staff.name} dispatched to "${report?.location || reportId}".`, reportId,
                });
            } else {
                addToast(response.message || 'Failed to dispatch report', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'An error occurred', 'error');
        }
        setShowDispatch(false);
        setSelectedReport(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-red-500" /> Waste Reports
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">{binReports.length} total reports</p>
                </div>
                <button onClick={onRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50">
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
            </div>
            {reportsError && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{reportsError}</div>}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:border-emerald-500">
                    <option value="all" className="text-slate-900">All Status</option>
                    <option value={BIN_STATUS.PENDING} className="text-slate-900">Pending</option>
                    <option value={BIN_STATUS.VERIFIED} className="text-slate-900">Verified</option>
                    <option value={BIN_STATUS.DISPATCHED} className="text-slate-900">Dispatched</option>
                    <option value={BIN_STATUS.COLLECTED} className="text-slate-900">Collected</option>
                    <option value={BIN_STATUS.RESOLVED} className="text-slate-900">Resolved</option>
                </select>
            </div>
            <div className="space-y-3">
                {loading && binReports.length === 0 ? (
                    <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" /><p className="text-slate-500">Loading reports...</p></div>
                ) : filteredReports.length === 0 ? (
                    <Card className="text-center py-12"><Trash2 className="h-12 w-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No reports found</p></Card>
                ) : filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex items-start gap-4">
                                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${binStatusDot[report.status]}`} />
                                <div>
                                    <p className="font-semibold text-slate-900">{report.location}</p>
                                    <p className="text-sm text-slate-500">{report.reportedBy} · {report.reporterRole}</p>
                                    <p className="text-xs text-slate-400 mt-1">{report.date || 'N/A'} · {report.time || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${binStatusBadge[report.status]}`}>
                                    {report.status?.replace(/_/g, ' ')}
                                </span>
                                <button onClick={() => handleViewDetails(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="View Details"><Eye className="h-4 w-4" /></button>
                                {report.status === BIN_STATUS.PENDING && (<>
                                    <button onClick={() => handleVerify(report)} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600" title="Verify"><CheckCircle2 className="h-4 w-4" /></button>
                                    <button onClick={() => handleDismiss(report)} className="p-2 rounded-lg hover:bg-red-100 text-red-600" title="Dismiss"><XCircle className="h-4 w-4" /></button>
                                </>)}
                                {report.status === BIN_STATUS.VERIFIED && (
                                    <button onClick={() => handleDispatch(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Dispatch"><Truck className="h-4 w-4" /></button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <AnimatePresence>
                {showConfirm && <ConfirmationModal action={showConfirm.type} onClose={() => setShowConfirm(null)} onConfirm={confirmAction} />}
                {showDispatch && selectedReport && <DispatchModal report={selectedReport} onClose={() => { setShowDispatch(false); setSelectedReport(null); }} onConfirm={confirmDispatch} mrfStaff={mrfStaff} />}
                {showDetails && selectedReport && <ReportDetailsModal report={selectedReport} onClose={() => { setShowDetails(false); setSelectedReport(null); }} />}
            </AnimatePresence>
        </motion.div>
    );
}
