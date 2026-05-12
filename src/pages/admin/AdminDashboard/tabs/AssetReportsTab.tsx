import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Armchair, Eye, CheckCircle2, XCircle, Truck, Recycle, RefreshCw, Search, Loader2, Trash2 } from 'lucide-react';
import api from '../../../../services/api';
import { ASSET_STATUS, assetStatusDot, assetStatusBadge, type AssetReport, type MRFStaffMember, type AssetStatusType } from '../types';
import { useToast } from '../components/Toast';
import { Card } from '../components/Card';
import { DispatchModal, AssetConfirmationModal, ReportDetailsModal } from '../modals';

interface AssetReportsTabProps {
    assetReports: AssetReport[];
    setAssetReports: React.Dispatch<React.SetStateAction<AssetReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
    mrfStaff: MRFStaffMember[];
    addNotification: (notif: any) => void;
}

export function AssetReportsTab({ assetReports, setAssetReports, onRefresh, loading, reportsError, mrfStaff, addNotification }: AssetReportsTabProps) {
    const { addToast } = useToast();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<AssetReport | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showDispatch, setShowDispatch] = useState(false);
    const [showConfirm, setShowConfirm] = useState<{ type: 'verify' | 'recovery' | 'dismiss' | 'dispose'; report: AssetReport } | null>(null);

    const filteredReports = assetReports
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => search === '' || (r.item || r.location)?.toLowerCase().includes(search.toLowerCase()) || r.reportedBy?.toLowerCase().includes(search.toLowerCase()));

    const handleViewDetails = (report: AssetReport) => { setSelectedReport(report); setShowDetails(true); };
    const handleVerifyAsset = (report: AssetReport) => setShowConfirm({ type: 'verify', report });
    const handleVerifyRecovery = (report: AssetReport) => setShowConfirm({ type: 'recovery', report });
    const handleDismiss = (report: AssetReport) => setShowConfirm({ type: 'dismiss', report });
    const handleDispose = (report: AssetReport) => setShowConfirm({ type: 'dispose', report });
    const handleDispatch = (report: AssetReport) => { setSelectedReport(report); setShowDispatch(true); };

    const confirmDispatch = async (reportId: string, staff: MRFStaffMember) => {
        try {
            const response = await api.dispatchStaff(reportId, staff.id, staff.name);
            if (response.success) {
                const report = assetReports.find(r => r.id === reportId);
                const dispatchedAt = new Date().toISOString();
                setAssetReports(prev => prev.map(r =>
                    r.id === reportId ? { ...r, status: ASSET_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r
                ));
                addToast(`Dispatched to ${staff.name}`, 'info');
                addNotification({ type: 'dispatch', title: 'Asset Dispatch Complete', message: `${staff.name} dispatched to handle "${report?.item || report?.location || reportId}".`, reportId });
            } else {
                addToast(response.message || 'Failed to dispatch', 'error');
            }
        } catch (error: any) { addToast(error.message || 'An error occurred', 'error'); }
        setShowDispatch(false);
        setSelectedReport(null);
    };

    const confirmAction = async () => {
        if (!showConfirm) return;
        const { type, report } = showConfirm;
        const statusMap: Record<string, string> = { verify: 'VERIFIED', recovery: 'RESOLVED', dismiss: 'DISMISSED', dispose: 'COLLECTED' };
        const localStatusMap: Record<string, AssetStatusType> = {
            verify: ASSET_STATUS.VERIFIED_ASSET, recovery: ASSET_STATUS.RECOVERED,
            dismiss: 'dismissed' as AssetStatusType, dispose: ASSET_STATUS.DISPOSED
        };
        const toastMap: Record<string, string> = {
            verify: 'Asset verified successfully', recovery: 'Asset recovery verified',
            dismiss: 'Asset report dismissed', dispose: 'Asset marked as disposed'
        };
        try {
            const response = await api.updateReportStatus(report.id, statusMap[type]);
            if (response.success) {
                setAssetReports(prev => prev.map(r => r.id === report.id ? { ...r, status: localStatusMap[type] } : r));
                addToast(toastMap[type], type === 'dismiss' ? 'info' : 'success');
            } else {
                addToast(response.message || 'Failed to update', 'error');
            }
        } catch (error: any) { addToast(error.message || 'An error occurred', 'error'); }
        setShowConfirm(null);
    };

    const canDispatch = (status: string) => [ASSET_STATUS.VERIFIED_ASSET].includes(status as any);
    const canRecover = (status: string) => [ASSET_STATUS.VERIFIED_ASSET, ASSET_STATUS.IN_REVIEW, ASSET_STATUS.DISPATCHED].includes(status as any);
    const canDispose = (status: string) => [ASSET_STATUS.VERIFIED_ASSET, ASSET_STATUS.IN_REVIEW, ASSET_STATUS.DISPATCHED, ASSET_STATUS.RECOVERED].includes(status as any);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Armchair className="h-5 w-5 text-blue-500" /> Asset Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">{assetReports.length} total reports</p>
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
                    <option value={ASSET_STATUS.REPORTED} className="text-slate-900">Reported</option>
                    <option value={ASSET_STATUS.VERIFIED_ASSET} className="text-slate-900">Verified</option>
                    <option value={ASSET_STATUS.IN_REVIEW} className="text-slate-900">In Review</option>
                    <option value={ASSET_STATUS.RECOVERED} className="text-slate-900">Recovered</option>
                    <option value={ASSET_STATUS.DISPOSED} className="text-slate-900">Disposed</option>
                </select>
            </div>
            <div className="space-y-3">
                {loading && assetReports.length === 0 ? (
                    <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" /><p className="text-slate-500">Loading reports...</p></div>
                ) : filteredReports.length === 0 ? (
                    <Card className="text-center py-12"><Armchair className="h-12 w-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No asset reports found</p></Card>
                ) : filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex items-start gap-4">
                                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${assetStatusDot[report.status] || 'bg-slate-300'}`} />
                                <div>
                                    <p className="font-semibold text-slate-900">{report.item || report.location}</p>
                                    <p className="text-sm text-slate-500">{report.reportedBy} · {report.reporterRole}</p>
                                    <p className="text-xs text-slate-400 mt-1">{report.date || 'N/A'} · {report.time || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${assetStatusBadge[report.status] || 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                                    {report.status?.replace(/-|_/g, ' ')}
                                </span>
                                <button onClick={() => handleViewDetails(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="View Details"><Eye className="h-4 w-4" /></button>
                                {report.status === ASSET_STATUS.REPORTED && (<>
                                    <button onClick={() => handleVerifyAsset(report)} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600" title="Verify"><CheckCircle2 className="h-4 w-4" /></button>
                                    <button onClick={() => handleDismiss(report)} className="p-2 rounded-lg hover:bg-red-100 text-red-600" title="Dismiss"><XCircle className="h-4 w-4" /></button>
                                </>)}
                                {canDispatch(report.status) && <button onClick={() => handleDispatch(report)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Dispatch Staff"><Truck className="h-4 w-4" /></button>}
                                {canRecover(report.status) && <button onClick={() => handleVerifyRecovery(report)} className="p-2 rounded-lg hover:bg-teal-100 text-teal-600" title="Verify Recovery"><Recycle className="h-4 w-4" /></button>}
                                {canDispose(report.status) && <button onClick={() => handleDispose(report)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600" title="Dispose"><Trash2 className="h-4 w-4" /></button>}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <AnimatePresence>
                {showConfirm && <AssetConfirmationModal action={showConfirm.type} onClose={() => setShowConfirm(null)} onConfirm={confirmAction} />}
                {showDispatch && selectedReport && <DispatchModal report={selectedReport} onClose={() => { setShowDispatch(false); setSelectedReport(null); }} onConfirm={confirmDispatch} mrfStaff={mrfStaff} />}
                {showDetails && selectedReport && <ReportDetailsModal report={selectedReport} onClose={() => { setShowDetails(false); setSelectedReport(null); }} type="asset" />}
            </AnimatePresence>
        </motion.div>
    );
}
