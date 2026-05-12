import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trash2, Armchair, CheckCircle2, XCircle, Truck, Eye, RefreshCw, Search, Loader2 } from 'lucide-react';
import api from '../../../../services/api';
import {
    BIN_STATUS, ASSET_STATUS, binStatusDot, binStatusBadge, assetStatusDot, assetStatusBadge,
    type BinReport, type AssetReport, type MRFStaffMember, type BinStatusType, type AssetStatusType
} from '../types';
import { useToast } from '../components/Toast';
import { Card } from '../components/Card';
import { DispatchModal, ConfirmationModal, ReportDetailsModal } from '../modals';

interface ReportsTabProps {
    binReports: BinReport[];
    setBinReports: React.Dispatch<React.SetStateAction<BinReport[]>>;
    assetReports: AssetReport[];
    setAssetReports: React.Dispatch<React.SetStateAction<AssetReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
    mrfStaff: MRFStaffMember[];
    addNotification: (notif: any) => void;
}

export function ReportsTab({ binReports, setBinReports, assetReports, setAssetReports, onRefresh, loading, reportsError, mrfStaff, addNotification }: ReportsTabProps) {
    const { addToast } = useToast();
    const [reportType, setReportType] = useState<'all' | 'waste' | 'asset'>('all');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<BinReport | AssetReport | null>(null);
    const [showDispatch, setShowDispatch] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState<{ type: 'verify' | 'dismiss' | 'recovery' | 'dispose' | 'bulk-delete'; report?: BinReport | AssetReport; reportType?: 'waste' | 'asset' } | null>(null);

    const allReports = [
        ...binReports.map(r => ({ ...r, reportType: 'waste' as const })),
        ...assetReports.map(r => ({ ...r, reportType: 'asset' as const }))
    ].sort((a, b) => {
        const timeA = a.timestamp ? new Date(a.timestamp).getTime() : new Date(`${a.date} ${a.time}`).getTime();
        const timeB = b.timestamp ? new Date(b.timestamp).getTime() : new Date(`${b.date} ${b.time}`).getTime();
        return timeB - timeA;
    });

    const filteredReports = allReports
        .filter(r => reportType === 'all' || r.reportType === reportType)
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => {
            if (search === '') return true;
            const s = search.toLowerCase();
            return (r.location?.toLowerCase() || '').includes(s)
                || (r.reportedBy?.toLowerCase() || '').includes(s)
                || ('item' in r ? r.item?.toLowerCase() || '' : '').includes(s);
        });

    const totalReports = reportType === 'all' ? binReports.length + assetReports.length
        : reportType === 'waste' ? binReports.length : assetReports.length;

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredReports.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredReports.map(r => r.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const handleBulkDelete = async () => {
        setIsDeleting(true);
        try {
            const ids = Array.from(selectedIds);
            // We'll process them in sequence for now, or you could add a bulk endpoint
            const promises = ids.map(id => api.deleteReport(id));
            await Promise.all(promises);
            
            setBinReports(prev => prev.filter(r => !selectedIds.has(r.id)));
            setAssetReports(prev => prev.filter(r => !selectedIds.has(r.id)));
            setSelectedIds(new Set());
            addToast(`Successfully deleted ${ids.length} reports`, 'success');
        } catch (error: any) {
            addToast(error.message || 'Failed to delete some reports', 'error');
        } finally {
            setIsDeleting(false);
            setShowConfirm(null);
        }
    };

    const confirmAction = async () => {
        if (!showConfirm) return;
        if (showConfirm.type === 'bulk-delete') {
            await handleBulkDelete();
            return;
        }
        const { type, report, reportType: rType } = showConfirm;
        if (!report) return;
        const statusMap: Record<string, string> = { verify: 'VERIFIED', dismiss: 'DISMISSED', recovery: 'RESOLVED', dispose: 'COLLECTED' };
        try {
            const response = await api.updateReportStatus(report.id, statusMap[type]);
            if (response.success) {
                if (rType === 'waste') {
                    setBinReports(prev => prev.map(r => r.id === report.id ? {
                        ...r, status: (type === 'verify' ? BIN_STATUS.VERIFIED : 'dismissed') as BinStatusType
                    } : r));
                } else {
                    const localMap: Record<string, AssetStatusType> = {
                        verify: ASSET_STATUS.VERIFIED_ASSET, dismiss: 'dismissed' as AssetStatusType,
                        recovery: ASSET_STATUS.RECOVERED, dispose: ASSET_STATUS.DISPOSED
                    };
                    setAssetReports(prev => prev.map(r => r.id === report.id ? { ...r, status: localMap[type] } : r));
                }
                addToast(`Report ${type}d`, 'success');
            } else { addToast(response.message || 'Failed', 'error'); }
        } catch (error: any) { addToast(error.message || 'An error occurred', 'error'); }
        setShowConfirm(null);
    };

    const confirmDispatch = async (reportId: string, staff: MRFStaffMember) => {
        try {
            const response = await api.dispatchStaff(reportId, staff.id, staff.name);
            if (response.success) {
                const dispatchedAt = new Date().toISOString();
                const isWaste = binReports.some(r => r.id === reportId);
                if (isWaste) {
                    setBinReports(prev => prev.map(r => r.id === reportId ? { ...r, status: BIN_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r));
                } else {
                    setAssetReports(prev => prev.map(r => r.id === reportId ? { ...r, status: ASSET_STATUS.DISPATCHED, assignedStaff: staff, dispatchedAt } : r));
                }
                addToast(`Dispatched to ${staff.name}`, 'info');
                addNotification({ type: 'dispatch', title: 'Dispatch Complete', message: `${staff.name} dispatched to handle report.`, reportId });
            } else { addToast(response.message || 'Failed to dispatch', 'error'); }
        } catch (error: any) { addToast(error.message || 'An error occurred', 'error'); }
        setShowDispatch(false);
        setSelectedReport(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><FileText className="h-5 w-5 text-emerald-500" /> All Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">{totalReports} total reports</p>
                </div>
                <button onClick={onRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50">
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
            </div>
            {reportsError && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{reportsError}</div>}
            <div className="flex gap-2">
                {[
                    { key: 'all', label: 'All Reports', icon: <FileText className="h-4 w-4" />, color: 'bg-emerald-500' },
                    { key: 'waste', label: 'Waste', icon: <Trash2 className="h-4 w-4" />, color: 'bg-red-500' },
                    { key: 'asset', label: 'Assets', icon: <Armchair className="h-4 w-4" />, color: 'bg-blue-500' },
                ].map(({ key, label, icon, color }) => (
                    <button key={key} onClick={() => setReportType(key as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${reportType === key ? `${color} text-white` : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                        {icon} {label}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:border-emerald-500">
                    <option value="all" className="text-slate-900">All Status</option>
                    <option value="pending" className="text-slate-900">Pending</option>
                    <option value="reported" className="text-slate-900">Reported</option>
                    <option value="verified" className="text-slate-900">Verified</option>
                    <option value="verified-asset" className="text-slate-900">Verified Asset</option>
                    <option value="dispatched" className="text-slate-900">Dispatched</option>
                    <option value="collected" className="text-slate-900">Collected</option>
                    <option value="recovered" className="text-slate-900">Recovered</option>
                    <option value="disposed" className="text-slate-900">Disposed</option>
                    <option value="resolved" className="text-slate-900">Resolved</option>
                    <option value="dismissed" className="text-slate-900">Dismissed</option>
                </select>
                
                {selectedIds.size > 0 && (
                    <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onClick={() => setShowConfirm({ type: 'bulk-delete' })}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 font-medium text-sm">
                        <Trash2 className="h-4 w-4" /> Delete ({selectedIds.size})
                    </motion.button>
                )}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                <input type="checkbox" checked={selectedIds.size === filteredReports.length && filteredReports.length > 0} onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer" />
                <span className="text-sm font-medium text-slate-600">Select All {filteredReports.length > 0 && `(${filteredReports.length})`}</span>
            </div>

            <div className="space-y-3">
                {loading && allReports.length === 0 ? (
                    <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-3" /><p className="text-slate-500">Loading reports...</p></div>
                ) : filteredReports.length === 0 ? (
                    <Card className="text-center py-12"><FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No reports found</p></Card>
                ) : filteredReports.map((report) => {
                    const isWaste = report.reportType === 'waste';
                    const sdot = isWaste ? binStatusDot[report.status] : (assetStatusDot[report.status] || 'bg-slate-300');
                    const sbadge = isWaste ? binStatusBadge[report.status] : (assetStatusBadge[report.status] || 'border-slate-200 bg-slate-50 text-slate-600');
                    const reportTitle = isWaste ? report.location : `${'item' in report ? report.item : 'Asset'} at ${report.location}`;
                    const isSelected = selectedIds.has(report.id);
                    
                    return (
                        <Card key={report.id} className={`hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50/30' : ''}`}>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="pt-1.5">
                                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(report.id)}
                                            className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer" />
                                    </div>
                                    <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${sdot}`} />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isWaste ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{isWaste ? 'WASTE' : 'ASSET'}</span>
                                            <p className="font-semibold text-slate-900">{reportTitle}</p>
                                        </div>
                                        <p className="text-sm text-slate-500">{report.reportedBy} · {report.reporterRole}</p>
                                        <p className="text-xs text-slate-400 mt-1">{report.date || 'N/A'} · {report.time || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${sbadge}`}>{report.status?.replace(/-|_/g, ' ')}</span>
                                    <button onClick={() => { setSelectedReport(report); setShowDetails(true); }} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"><Eye className="h-4 w-4" /></button>
                                    {(report.status === BIN_STATUS.PENDING || report.status === ASSET_STATUS.REPORTED) && (<>
                                        <button onClick={() => setShowConfirm({ type: 'verify', report, reportType: report.reportType })} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-4 w-4" /></button>
                                        <button onClick={() => setShowConfirm({ type: 'dismiss', report, reportType: report.reportType })} className="p-2 rounded-lg hover:bg-red-100 text-red-600"><XCircle className="h-4 w-4" /></button>
                                    </>)}
                                    {(report.status === BIN_STATUS.VERIFIED || report.status === ASSET_STATUS.VERIFIED_ASSET) && (
                                        <button onClick={() => { setSelectedReport(report); setShowDispatch(true); }} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"><Truck className="h-4 w-4" /></button>
                                    )}
                                    {!isWaste && report.status === ASSET_STATUS.DISPATCHED && (<>
                                        <button onClick={() => setShowConfirm({ type: 'recovery', report, reportType: 'asset' })} className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-4 w-4" /></button>
                                        <button onClick={() => setShowConfirm({ type: 'dispose', report, reportType: 'asset' })} className="p-2 rounded-lg hover:bg-amber-100 text-amber-600"><Trash2 className="h-4 w-4" /></button>
                                    </>)}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
            <AnimatePresence>
                {showConfirm && <ConfirmationModal action={showConfirm.type} onClose={() => setShowConfirm(null)} onConfirm={confirmAction} />}
                {showDispatch && selectedReport && <DispatchModal report={selectedReport} onClose={() => { setShowDispatch(false); setSelectedReport(null); }} onConfirm={confirmDispatch} mrfStaff={mrfStaff} />}
                {showDetails && selectedReport && <ReportDetailsModal report={selectedReport} onClose={() => { setShowDetails(false); setSelectedReport(null); }} type={'reportType' in selectedReport ? selectedReport.reportType : 'waste'} />}
            </AnimatePresence>
        </motion.div>
    );
}
