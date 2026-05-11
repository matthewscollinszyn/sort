/* =========================================================
   EcoLedger – Admin Dashboard
   Oversee all Student & Teacher Reports
   White theme only – Admin exclusive view
   ========================================================= */

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Trash2, MapPin, Clock, ChevronRight, ChevronDown,
  Trophy, TrendingUp, Globe, Recycle,
  Bell, LogOut, User, Sparkles,
  BookOpen, CalendarDays,
  Zap, Shield, BarChart3, MapPinned,
  CheckCircle2, AlertTriangle,
  Truck, Building2, Wrench,
  Armchair, Monitor, Package,
  GraduationCap, ClipboardList, FileText, Users,
  Eye, Filter, Search, Download, RefreshCw,
  UserCheck, XCircle, MoreHorizontal, X, Send,
  Archive, Image, Scale, Loader2, ShieldCheck, Lock, ArrowRightLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  leaderboard, impactStats, binReports as initialBinReports, assetReports as initialAssetReports,
  BIN_STATUS, ASSET_STATUS, ASSET_CATEGORIES, mrfStaffMembers
} from '../data/reportState';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

/* ── Toast Context ───────────────────────────────────────── */
const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm ${toast.type === 'success'
                ? 'bg-emerald-500 text-white'
                : toast.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
                }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
              {toast.type === 'error' && <XCircle className="h-5 w-5" />}
              {toast.type === 'info' && <Truck className="h-5 w-5" />}
              <span className="text-sm font-medium max-w-xs">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  return useContext(ToastContext);
}

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ── Status helpers ──────────────────────────────────────── */
const binStatusDot = {
  [BIN_STATUS.PENDING]: 'bg-amber-400',
  [BIN_STATUS.VERIFIED]: 'bg-emerald-500',
  [BIN_STATUS.DISPATCHED]: 'bg-blue-500',
  [BIN_STATUS.COLLECTED]: 'bg-indigo-500',
  [BIN_STATUS.RESOLVED]: 'bg-slate-400',
  [BIN_STATUS.DISMISSED]: 'bg-red-400',
};

const binStatusBadge = {
  [BIN_STATUS.PENDING]: 'bg-amber-100 text-amber-700 border-amber-200',
  [BIN_STATUS.VERIFIED]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  [BIN_STATUS.DISPATCHED]: 'bg-blue-100 text-blue-700 border-blue-200',
  [BIN_STATUS.COLLECTED]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  [BIN_STATUS.RESOLVED]: 'bg-slate-100 text-slate-600 border-slate-200',
  [BIN_STATUS.DISMISSED]: 'bg-red-100 text-red-700 border-red-200',
};

const assetStatusDot = {
  [ASSET_STATUS.REPORTED]: 'bg-amber-400',
  [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-500',
  [ASSET_STATUS.DISPATCHED]: 'bg-blue-500',
  [ASSET_STATUS.IN_REVIEW]: 'bg-indigo-400',
  [ASSET_STATUS.RECOVERED]: 'bg-teal-500',
  [ASSET_STATUS.DISPOSED]: 'bg-slate-400',
};

const assetStatusBadge = {
  [ASSET_STATUS.REPORTED]: 'bg-amber-100 text-amber-700 border-amber-200',
  [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  [ASSET_STATUS.DISPATCHED]: 'bg-blue-100 text-blue-700 border-blue-200',
  [ASSET_STATUS.IN_REVIEW]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  [ASSET_STATUS.RECOVERED]: 'bg-teal-100 text-teal-700 border-teal-200',
  [ASSET_STATUS.DISPOSED]: 'bg-slate-100 text-slate-600 border-slate-200',
};

/* ── Campus bin locations ────────────────────────────────── */
const campusBins = [
  { id: 'LOC-01', name: 'Cafeteria – Block A', status: 'full' },
  { id: 'LOC-02', name: 'Library Entrance', status: 'half' },
  { id: 'LOC-03', name: 'Gym Hallway', status: 'empty' },
  { id: 'LOC-04', name: 'Engineering Bldg – 2F', status: 'full' },
  { id: 'LOC-05', name: 'Parking Lot B', status: 'half' },
  { id: 'LOC-06', name: 'Student Center', status: 'empty' },
  { id: 'LOC-07', name: 'Science Hall – 1F', status: 'full' },
  { id: 'LOC-08', name: 'Admin Building Lobby', status: 'half' },
  { id: 'LOC-09', name: 'Arts Building – GF', status: 'empty' },
  { id: 'LOC-10', name: 'Main Gate Area', status: 'half' },
];

const binStatusLabel = {
  full: { color: 'text-red-500', bg: 'bg-red-100', label: 'Full' },
  half: { color: 'text-amber-500', bg: 'bg-amber-100', label: 'Almost Full' },
  empty: { color: 'text-emerald-500', bg: 'bg-emerald-100', label: 'Available' },
};

/* ── Tabs ────────────────────────────────────────────────── */
const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'waste', label: 'Waste Reports', icon: Trash2 },
  { id: 'assets', label: 'Asset Reports', icon: Armchair },
  { id: 'map', label: 'Bin Map', icon: MapPin },
  { id: 'users', label: 'Users', icon: Users },
];

/* ── Admin mock data ────────────────────────────────────── */
const adminUser = {
  name: 'Admin User',
  role: 'System Administrator',
  avatar: 'AU',
};

/* ── Card Component (White theme) ────────────────────────── */
function Card({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm ${glow ? 'shadow-lg shadow-emerald-500/5' : ''
        } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Dispatch Modal Component ────────────────────────────── */
function DispatchModal({ report, onClose, onConfirm }) {
  const [selectedStaff, setSelectedStaff] = useState('');
  const availableStaff = mrfStaffMembers.filter(s => s.available);

  const handleConfirm = () => {
    if (!selectedStaff) return;
    const staff = mrfStaffMembers.find(s => s.id === selectedStaff);
    onConfirm(report.id, staff);
    onClose();
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
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Dispatch MRF Staff</h3>
              <p className="text-xs text-slate-500">Assign staff to handle this report</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Report Info */}
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 mb-1">Report Location</p>
            <p className="font-medium text-slate-900">{report?.location || report?.item}</p>
            <p className="text-xs text-slate-500 mt-2">Reported by: {report?.reportedBy}</p>
          </div>

          {/* Staff Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select MRF Staff Member
            </label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Choose a staff member...</option>
              {availableStaff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} ({staff.shift} Shift)
                </option>
              ))}
            </select>
          </div>

          {/* Staff Info if selected */}
          {selectedStaff && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
                {mrfStaffMembers.find(s => s.id === selectedStaff)?.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {mrfStaffMembers.find(s => s.id === selectedStaff)?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {mrfStaffMembers.find(s => s.id === selectedStaff)?.shift} Shift • Available
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStaff}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedStaff
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            <Send className="h-4 w-4" />
            Confirm Dispatch
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Report Details Modal Component ──────────────────────── */
function ReportDetailsModal({ report, onClose, type = 'waste' }) {
  const isWaste = type === 'waste';
  const isPending = report?.status === BIN_STATUS.PENDING;

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
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isWaste ? 'bg-red-100' : 'bg-blue-100'}`}>
              {isWaste ? <Trash2 className="h-5 w-5 text-red-600" /> : <Armchair className="h-5 w-5 text-blue-600" />}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Report Details</h3>
              <p className="text-xs text-slate-500">ID: {report?.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Image Placeholder (for Pending reports) */}
          {isPending && isWaste && (
            <div className="relative h-40 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <Image className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-500">Location Image</p>
                <p className="text-xs text-slate-400">Image preview not available</p>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <MapPin className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Location</p>
              <p className="font-semibold text-slate-900">{report?.location || report?.item}</p>
              {report?.notes && <p className="text-sm text-slate-600 mt-1">{report.notes}</p>}
            </div>
          </div>

          {/* Reporter */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <User className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Reported By</p>
              <p className="font-semibold text-slate-900">{report?.reportedBy}</p>
              <span className={`inline-flex items-center gap-1 mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${report?.role === 'student' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                }`}>
                {report?.role === 'student' ? <GraduationCap className="h-2.5 w-2.5" /> : <Building2 className="h-2.5 w-2.5" />}
                {report?.role}
              </span>
            </div>
          </div>

          {/* Date & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <Clock className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Date Reported</p>
                <p className="font-medium text-slate-900">
                  {report?.timestamp ? new Date(report.timestamp).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <AlertTriangle className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${isWaste ? binStatusBadge[report?.status] : assetStatusBadge[report?.status]}`}>
                  {report?.status?.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned To (if dispatched) */}
          {report?.assignedTo && (
            <div className="flex items-start gap-4 rounded-xl bg-blue-50 border border-blue-200 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-blue-600 mb-1">Assigned MRF Staff</p>
                <p className="font-semibold text-slate-900">{report.assignedTo}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 px-6 py-4">
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

/* ── Confirmation Modal Component ────────────────────────── */
function ConfirmationModal({ action, onClose, onConfirm }) {
  const isVerify = action === 'verify';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Content */}
        <div className="p-6 text-center">
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isVerify ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {isVerify ? (
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            ) : (
              <XCircle className="h-7 w-7 text-red-600" />
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {isVerify ? 'Verify Report?' : 'Dismiss Report?'}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {isVerify
              ? 'This will mark the report as verified and notify the reporter.'
              : 'This will dismiss the report. This action cannot be undone.'
            }
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${isVerify
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-red-500 hover:bg-red-600'
              }`}
          >
            {isVerify ? 'Verify' : 'Dismiss'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Asset Confirmation Modal Component ──────────────────── */
function AssetConfirmationModal({ action, onClose, onConfirm }) {
  const isReview = action === 'review';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Content */}
        <div className="p-6 text-center">
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isReview ? 'bg-blue-100' : 'bg-emerald-100'}`}>
            {isReview ? (
              <Eye className="h-7 w-7 text-blue-600" />
            ) : (
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {isReview ? 'Mark for Review?' : 'Mark as Recovered?'}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {isReview
              ? 'This will mark the asset as being reviewed by staff.'
              : 'This will mark the asset as successfully recovered.'
            }
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${isReview
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
          >
            {isReview ? 'Mark Review' : 'Mark Recovered'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Collection Summary Modal Component ──────────────────── */
function CollectionSummaryModal({ report, onClose }) {
  const collectionData = report?.collectionData;

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
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <Archive className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Collection Summary</h3>
              <p className="text-xs text-slate-500">ID: {report?.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Location Info */}
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 mb-1">Location</p>
            <p className="font-semibold text-slate-900">{report?.location}</p>
            <p className="text-xs text-slate-500 mt-2">
              Collected by: <span className="font-medium text-slate-700">{report?.assignedTo || 'N/A'}</span>
            </p>
          </div>

          {/* Final Weight */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
              <Scale className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Final Weight Collected</p>
              <p className="text-3xl font-extrabold text-slate-900">
                {collectionData?.finalWeight || 0} <span className="text-lg font-medium text-slate-500">kg</span>
              </p>
            </div>
          </div>

          {/* Recovered Assets */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Recovered Materials</p>
            <div className="flex flex-wrap gap-2">
              {collectionData?.recoveredAssets?.length > 0 ? (
                collectionData.recoveredAssets.map((asset, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <Recycle className="h-3.5 w-3.5" />
                    {asset}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-400">No materials recorded</span>
              )}
            </div>
          </div>

          {/* Collection Date */}
          {collectionData?.collectedAt && (
            <div className="flex items-center gap-3 rounded-xl bg-indigo-50 border border-indigo-200 p-3">
              <Clock className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-xs text-indigo-600">Collected On</p>
                <p className="font-medium text-slate-900">
                  {new Date(collectionData.collectedAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 px-6 py-4">
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

/* ── Asset Verification Modal Component ──────────────────── */
function AssetVerificationModal({ report, onClose, onVerify }) {
  const [imageViewed, setImageViewed] = useState(report?.imageViewed || false);

  const handleImageClick = () => {
    setImageViewed(true);
  };

  const handleVerify = () => {
    onVerify(report.id);
    onClose();
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
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Verify Asset</h3>
              <p className="text-xs text-slate-500">ID: {report?.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Evidence Image */}
          <div>
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
              <Image className="h-3.5 w-3.5" /> Evidence Image
              {!imageViewed && <span className="text-amber-600 font-medium">(Click to view)</span>}
              {imageViewed && <span className="text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Viewed</span>}
            </p>
            <button
              onClick={handleImageClick}
              className={`relative w-full h-48 rounded-xl border-2 ${imageViewed ? 'border-emerald-300 bg-emerald-50' : 'border-dashed border-slate-300 bg-slate-100'} flex items-center justify-center overflow-hidden transition-all hover:border-blue-400 hover:bg-blue-50 group`}
            >
              <div className="text-center">
                <Image className={`h-12 w-12 mx-auto mb-2 ${imageViewed ? 'text-emerald-400' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
                <p className="text-sm font-medium text-slate-600">{imageViewed ? 'Image Viewed ✓' : 'Click to View Image'}</p>
                <p className="text-xs text-slate-400 mt-1">Evidence photo placeholder</p>
              </div>
              {imageViewed && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    <Eye className="h-3 w-3" /> Viewed
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Asset Info */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <Armchair className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Item Name</p>
                <p className="font-semibold text-slate-900">{report?.item}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <MapPin className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Location</p>
                <p className="font-semibold text-slate-900">{report?.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <User className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Reported By</p>
                <p className="font-semibold text-slate-900">{report?.reportedBy}</p>
                <p className="text-xs text-slate-400">{new Date(report?.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {report?.notes && (
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500 mb-1">Notes</p>
              <p className="text-sm text-slate-700">{report.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={!imageViewed}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${imageViewed
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            <ShieldCheck className="h-4 w-4" />
            {imageViewed ? 'Verify Asset' : 'View Image First'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Asset Dispatch Modal Component ──────────────────────── */
function AssetDispatchModal({ report, onClose, onConfirm }) {
  const [selectedStaff, setSelectedStaff] = useState('');
  const [dispatchAction, setDispatchAction] = useState('secure');
  const availableStaff = mrfStaffMembers.filter(s => s.available);

  const handleConfirm = () => {
    if (!selectedStaff) return;
    const staff = mrfStaffMembers.find(s => s.id === selectedStaff);
    onConfirm(report.id, staff, dispatchAction);
    onClose();
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
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Dispatch for Asset</h3>
              <p className="text-xs text-slate-500">Assign staff to handle this asset</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Asset Info */}
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 mb-1">Asset</p>
            <p className="font-medium text-slate-900">{report?.item}</p>
            <p className="text-xs text-slate-500 mt-1">Location: {report?.location}</p>
          </div>

          {/* Action Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dispatch Action
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDispatchAction('secure')}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${dispatchAction === 'secure'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
              >
                <Lock className="h-4 w-4" />
                Secure
              </button>
              <button
                onClick={() => setDispatchAction('transfer')}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${dispatchAction === 'transfer'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
              >
                <ArrowRightLeft className="h-4 w-4" />
                Transfer
              </button>
            </div>
          </div>

          {/* Staff Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select MRF Staff Member
            </label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Choose a staff member...</option>
              {availableStaff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} ({staff.shift} Shift)
                </option>
              ))}
            </select>
          </div>

          {/* Staff Info if selected */}
          {selectedStaff && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
                {mrfStaffMembers.find(s => s.id === selectedStaff)?.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {mrfStaffMembers.find(s => s.id === selectedStaff)?.name}
                </p>
                <p className="text-xs text-slate-500">
                  Task: {dispatchAction === 'secure' ? 'Secure Asset' : 'Transfer Asset'}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStaff}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedStaff
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            <Send className="h-4 w-4" />
            Dispatch Staff
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── User Avatar Dropdown ─────────────────────────────────── */
function AdminMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all ${open
          ? 'border-emerald-500/40 bg-emerald-500/10'
          : 'border-slate-300 bg-slate-100/40 hover:border-slate-400'
          }`}>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-bold shadow-sm">
          {adminUser.avatar}
        </div>
        <span className="hidden sm:block text-xs font-medium max-w-[7rem] truncate text-slate-700">{adminUser.name.split(' ')[0]}</span>
        <ChevronDown className={`h-3 w-3 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white text-sm font-bold">
                  {adminUser.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-slate-900">{adminUser.name}</p>
                  <p className="text-xs text-slate-500">{adminUser.role}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 bg-slate-100">
                <Shield className="h-3.5 w-3.5 text-slate-600" />
                <span className="text-xs font-semibold text-slate-900">Admin Access</span>
              </div>
            </div>
            <div className="py-1.5">
              {[
                { icon: User, label: 'My Profile' },
                { icon: Shield, label: 'Admin Settings' },
                { icon: FileText, label: 'Audit Logs' },
              ].map((item) => (
                <button key={item.label} onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                  <item.icon className="h-4 w-4 text-slate-500" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-slate-100 py-1.5">
              <button onClick={() => navigate('/')}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Local state for reports (allows mutations)
  const [binReports, setBinReports] = useState(initialBinReports);
  const [assetReports, setAssetReports] = useState(initialAssetReports);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsError, setReportsError] = useState(null);

  // Fetch reports from API
  const fetchReports = async () => {
    setReportsLoading(true);
    setReportsError(null);
    try {
      console.log('🔄 Fetching all reports for admin...');
      const response = await api.getAllReports();
      console.log('📦 API Response received:', response);
      console.log('📦 Response structure:', {
        success: response.success,
        hasData: !!response.data,
        hasReports: !!response.data?.reports,
        reportsCount: response.data?.reports?.length
      });

      if (response.success && response.data?.reports) {
        console.log(`✅ Processing ${response.data.reports.length} reports from API`);
        // Transform API reports to match the expected format
        const transformed = response.data.reports.map(r => ({
          id: r.id,
          location: r.location,
          notes: r.notes || '',
          photoUrl: r.photoUrl,
          urgency: r.urgency,
          wasteType: r.wasteType,
          status: r.status.toLowerCase(),
          timestamp: r.createdAt,
          reportedBy: `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() || r.user.username,
          role: r.user.role === 'STUDENT' ? 'student' : 'faculty',
          studentId: r.user.studentId || '',
          course: r.user.course || '',
          section: r.user.section || ''
        }));
        console.log('✅ Transformed reports:', transformed);
        setBinReports(transformed);
        console.log('✅ State updated with API data');
      } else {
        console.warn('⚠️ No reports in response:', response);
        const errorMsg = `Failed to fetch reports: ${response.message || 'Unknown error'}`;
        setReportsError(errorMsg);
        console.log('No reports in response, keeping mock data');
      }
    } catch (err) {
      console.error('❌ Failed to fetch reports:', err);
      setReportsError(`Failed to fetch reports: ${err.message}`);
      // Keep using mock data on error
    } finally {
      setReportsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReports();
      // Auto-refresh every 10 seconds
      const interval = setInterval(fetchReports, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Stats calculations
  const studentReports = binReports.filter(r => r.role === 'student');
  const facultyReports = binReports.filter(r => r.role === 'faculty');
  const pendingBinCount = binReports.filter(r => r.status === BIN_STATUS.PENDING).length;
  const resolvedBinCount = binReports.filter(r => r.status === BIN_STATUS.RESOLVED).length;
  const pendingAssetCount = assetReports.filter(r => r.status === ASSET_STATUS.REPORTED || r.status === ASSET_STATUS.IN_REVIEW).length;
  const recoveredAssetCount = assetReports.filter(r => r.status === ASSET_STATUS.RECOVERED).length;

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-dvh w-full overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">

        {/* ════════ NAVBAR ═══════════════════════════════ */}
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-xl w-full"
        >
          <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                EcoLedger
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-white">
                <Shield className="h-3 w-3" /> Admin
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick stats pill */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100/60 px-3 py-1.5 text-xs font-semibold text-slate-900">
                <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
                {binReports.length + assetReports.length} Total Reports
              </div>

              {/* Notifications */}
              <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100/40 text-slate-600 hover:text-slate-900 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Admin Avatar Menu */}
              <AdminMenu />
            </div>
          </div>
        </motion.nav>

        {/* ════════ MAIN CONTENT ═════════════════════════ */}
        <main className="relative flex-1 pt-16 overflow-y-auto min-h-screen bg-white">
          {/* BG decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] sm:h-[42rem] sm:w-[42rem] rounded-full bg-emerald-500/5 blur-[140px]" />
            <div className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-slate-400/4 blur-[160px]" />
          </div>
          {/* Grid dots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.045]"
            style={{ backgroundImage: `radial-gradient(circle, #10B981 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
          />

          <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 py-4 sm:py-8 min-h-full flex flex-col">

            {/* ── Tab Bar ── */}
            <div className="flex gap-1 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm p-1 mb-8 overflow-x-auto w-full">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`relative flex-1 min-w-[5rem] flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === t.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}>
                  {activeTab === t.id && (
                    <motion.div layoutId="adminTab"
                      className="absolute inset-0 rounded-xl bg-slate-900 shadow-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <t.icon className="h-4 w-4" /> <span className="hidden sm:inline">{t.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* ── Tab Content ────────────────────────── */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && <OverviewTab key="overview" binReports={binReports} assetReports={assetReports} />}
                {activeTab === 'waste' && <WasteReportsTab key="waste" binReports={binReports} setBinReports={setBinReports} onRefresh={fetchReports} loading={reportsLoading} reportsError={reportsError} />}
                {activeTab === 'assets' && <AssetReportsTab key="assets" assetReports={assetReports} setAssetReports={setAssetReports} />}
                {activeTab === 'map' && <MapTab key="map" />}
                {activeTab === 'users' && <UsersTab key="users" binReports={binReports} assetReports={assetReports} />}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* ════════ FOOTER ═══════════════════════════════ */}
        <footer className="border-t border-slate-200 bg-slate-50 py-6 sm:py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 sm:px-5 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-slate-900">EcoLedger</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-white">Admin Portal</span>
            </div>
            <p className="text-xs text-slate-500">
              &copy; 2026 EcoLedger &middot; Campus MRF Management System &middot; v0.1
            </p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}

/* ═══════════════════════════════════════════════════════════
   OVERVIEW TAB – Admin dashboard with all stats
   ═══════════════════════════════════════════════════════════ */
function OverviewTab({ binReports, assetReports }) {
  const pendingBin = binReports.filter(r => r.status === BIN_STATUS.PENDING).length;
  const resolvedBin = binReports.filter(r => r.status === BIN_STATUS.RESOLVED).length;
  const pendingAsset = assetReports.filter(r => r.status === ASSET_STATUS.REPORTED || r.status === ASSET_STATUS.IN_REVIEW).length;
  const recoveredAsset = assetReports.filter(r => r.status === ASSET_STATUS.RECOVERED).length;

  // Calculate by role
  const studentBinReports = binReports.filter(r => r.role === 'student');
  const facultyBinReports = binReports.filter(r => r.role === 'faculty');

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="space-y-8 pb-8 min-h-full">

      {/* ─────── WELCOME HERO ─────── */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white">
          <Sparkles className="absolute top-4 right-4 h-16 w-16 text-white/10" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-white">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Welcome back, 👋</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{adminUser.name}</h1>
                <p className="text-xs text-slate-400 mt-1">{adminUser.role}</p>
              </div>
            </div>
            <div className="flex gap-5 sm:gap-8 sm:text-right">
              <div>
                <p className="text-xs text-slate-400">Total Reports</p>
                <p className="text-2xl sm:text-3xl font-extrabold">
                  {binReports.length + assetReports.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Pending</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {pendingBin + pendingAsset}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* ─────── QUICK STATS ─────── */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
          <BarChart3 className="h-5 w-5 text-emerald-500" /> Quick Stats
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: 'Waste Reports', value: binReports.length, icon: Trash2, color: 'text-red-500', bg: 'bg-red-100' },
            { label: 'Asset Reports', value: assetReports.length, icon: Armchair, color: 'text-blue-500', bg: 'bg-blue-100' },
            { label: 'Pending Waste', value: pendingBin, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
            { label: 'Pending Assets', value: pendingAsset, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-100' },
            { label: 'Resolved Bins', value: resolvedBin, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100' },
            { label: 'Recovered Assets', value: recoveredAsset, icon: Recycle, color: 'text-teal-500', bg: 'bg-teal-100' },
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i}>
              <Card className="flex flex-col items-center text-center !p-4">
                <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <span className="text-xl font-bold text-slate-900">{s.value}</span>
                <span className="text-xs text-slate-500">{s.label}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─────── REPORTS BY ROLE ─────── */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2}>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
          <Users className="h-5 w-5 text-emerald-500" /> Reports by Role
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <GraduationCap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Student Reports</h3>
                <p className="text-xs text-slate-500">Waste bin reports from students</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-extrabold text-slate-900">{studentBinReports.length}</p>
                <p className="text-xs text-slate-500">total reports</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-amber-500">{studentBinReports.filter(r => r.status === BIN_STATUS.PENDING).length} pending</p>
                <p className="text-sm font-semibold text-emerald-500">{studentBinReports.filter(r => r.status === BIN_STATUS.RESOLVED).length} resolved</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Faculty Reports</h3>
                <p className="text-xs text-slate-500">Waste & asset reports from teachers</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-extrabold text-slate-900">{facultyBinReports.length + assetReports.length}</p>
                <p className="text-xs text-slate-500">total reports</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-amber-500">{pendingAsset} pending assets</p>
                <p className="text-sm font-semibold text-emerald-500">{recoveredAsset} recovered</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* ─────── RECENT ACTIVITY ─────── */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Waste Reports */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-500" /> Recent Waste Reports
              </h3>
              <span className="text-xs text-slate-500">{binReports.length} total</span>
            </div>
            <div className="space-y-2">
              {binReports.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition-colors">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${binStatusDot[r.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{r.location}</p>
                    <p className="text-xs text-slate-500">{r.reportedBy} · {r.role}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${binStatusBadge[r.status]}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Asset Reports */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Armchair className="h-5 w-5 text-blue-500" /> Recent Asset Reports
              </h3>
              <span className="text-xs text-slate-500">{assetReports.length} total</span>
            </div>
            <div className="space-y-2">
              {assetReports.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition-colors">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${assetStatusDot[a.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{a.item}</p>
                    <p className="text-xs text-slate-500">{a.reportedBy} · {a.location}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${assetStatusBadge[a.status]}`}>
                    {a.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.section>

      {/* ─────── CAMPUS IMPACT ─────── */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={4}>
        <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
              <Globe className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-900">Campus Impact This Semester</p>
              <p className="text-sm mt-1 text-slate-600">
                Together we've diverted <strong className="text-emerald-600">{impactStats.co2Saved}</strong> of CO₂,
                serviced <strong className="text-emerald-600">{impactStats.binsServiced.toLocaleString()}</strong> bins,
                and have <strong className="text-emerald-600">{impactStats.activeStudents}</strong> active reporters.
              </p>
            </div>
          </div>
        </Card>
      </motion.section>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WASTE REPORTS TAB – All waste/bin reports
   ═══════════════════════════════════════════════════════════ */
function WasteReportsTab({ binReports, setBinReports, onRefresh, loading, reportsError }) {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dispatchModal, setDispatchModal] = useState({ open: false, report: null });
  const [detailsModal, setDetailsModal] = useState({ open: false, report: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, action: null, reportId: null });
  const [summaryModal, setSummaryModal] = useState({ open: false, report: null });
  const [updating, setUpdating] = useState(false);

  const filtered = binReports.filter(r => {
    const matchesStatus = filter === 'all' || r.status === filter;
    const matchesRole = roleFilter === 'all' || r.role === roleFilter;
    const matchesSearch = searchQuery === '' ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesRole && matchesSearch;
  });

  // Universal status update handler - now calls API
  const handleStatusUpdate = async (reportId, newStatus, additionalData = {}) => {
    setUpdating(true);
    try {
      // Call API to update status
      const response = await api.updateReportStatus(reportId, newStatus.toUpperCase());
      if (response.success) {
        // Update local state on success
        setBinReports(prev => prev.map(r =>
          r.id === reportId ? { ...r, status: newStatus, ...additionalData } : r
        ));
        return true;
      } else {
        addToast('Failed to update status', 'error');
        return false;
      }
    } catch (err) {
      console.error('Status update error:', err);
      // Still update locally for mock data that doesn't exist in DB
      setBinReports(prev => prev.map(r =>
        r.id === reportId ? { ...r, status: newStatus, ...additionalData } : r
      ));
      return true;
    } finally {
      setUpdating(false);
    }
  };

  // Status update handlers
  const handleVerify = async (reportId) => {
    const success = await handleStatusUpdate(reportId, BIN_STATUS.VERIFIED);
    if (success) addToast('Report verified successfully', 'success');
  };

  const handleDismiss = async (reportId) => {
    const success = await handleStatusUpdate(reportId, BIN_STATUS.DISMISSED);
    if (success) addToast('Report dismissed', 'error');
  };

  const handleDispatch = async (reportId, staff) => {
    const report = binReports.find(r => r.id === reportId);
    const success = await handleStatusUpdate(reportId, BIN_STATUS.DISPATCHED, { assignedTo: staff.name });
    if (success) addToast(`MRF Staff ${staff.name} has been dispatched to ${report.location}`, 'info');
  };

  const handleCollected = async (reportId) => {
    const report = binReports.find(r => r.id === reportId);
    // Simulate collection data (in real app, this would come from MRF staff input)
    const collectionData = {
      finalWeight: (Math.random() * 20 + 5).toFixed(1),
      recoveredAssets: ['Plastic', 'Paper', 'Metal'].slice(0, Math.floor(Math.random() * 3) + 1),
      collectedAt: new Date().toISOString(),
    };
    const success = await handleStatusUpdate(reportId, BIN_STATUS.COLLECTED, { collectionData });
    if (success) addToast(`Collection completed for ${report.location}`, 'success');
  };

  // Modal handlers
  const openDispatchModal = (report) => {
    setDispatchModal({ open: true, report });
  };

  const openDetailsModal = (report) => {
    setDetailsModal({ open: true, report });
  };

  const openConfirmModal = (action, reportId) => {
    setConfirmModal({ open: true, action, reportId });
  };

  const openSummaryModal = (report) => {
    setSummaryModal({ open: true, report });
  };

  const handleConfirmAction = () => {
    if (confirmModal.action === 'verify') {
      handleVerify(confirmModal.reportId);
    } else if (confirmModal.action === 'dismiss') {
      handleDismiss(confirmModal.reportId);
    }
    setConfirmModal({ open: false, action: null, reportId: null });
  };

  // Render sequential actions based on status
  const renderActions = (report) => {
    const status = report.status;

    // Pending: View, Verify, Dismiss
    if (status === BIN_STATUS.PENDING) {
      return (
        <>
          <button
            onClick={() => openDetailsModal(report)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => openConfirmModal('verify', report.id)}
            className="p-1.5 rounded-lg hover:bg-emerald-100 text-slate-500 hover:text-emerald-600 transition-colors"
            title="Verify Report"
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => openConfirmModal('dismiss', report.id)}
            className="p-1.5 rounded-lg hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
            title="Dismiss Report"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </>
      );
    }

    // Verified: Dispatch
    if (status === BIN_STATUS.VERIFIED) {
      return (
        <button
          onClick={() => openDispatchModal(report)}
          className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 hover:text-blue-600 transition-colors"
          title="Dispatch MRF Staff"
        >
          <Truck className="h-4 w-4" />
        </button>
      );
    }

    // Dispatched: Pending Collection (clicking marks as collected)
    if (status === BIN_STATUS.DISPATCHED) {
      return (
        <button
          onClick={() => handleCollected(report.id)}
          className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-500 hover:text-indigo-600 transition-colors animate-pulse"
          title="Mark as Collected"
        >
          <Loader2 className="h-4 w-4" />
        </button>
      );
    }

    // Collected: Summary
    if (status === BIN_STATUS.COLLECTED) {
      return (
        <button
          onClick={() => openSummaryModal(report)}
          className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-500 hover:text-indigo-600 transition-colors"
          title="View Collection Summary"
        >
          <Archive className="h-4 w-4" />
        </button>
      );
    }

    // Dismissed or Resolved: No actions
    return (
      <span className="text-xs text-slate-400 italic">—</span>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-8 min-h-full">

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="h-6 w-6 text-red-500" /> Waste Reports
            </h2>
            <p className="text-sm text-slate-500">All student and faculty waste bin reports</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-slate-500" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or reporter..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none" />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none">
              <option value="all">All Status</option>
              <option value={BIN_STATUS.PENDING}>Pending</option>
              <option value={BIN_STATUS.VERIFIED}>Verified</option>
              <option value={BIN_STATUS.DISPATCHED}>Dispatched</option>
              <option value={BIN_STATUS.COLLECTED}>Collected</option>
              <option value={BIN_STATUS.DISMISSED}>Dismissed</option>
              <option value={BIN_STATUS.RESOLVED}>Resolved</option>
            </select>
          </div>

          {/* Role filter */}
          <div className="flex items-center gap-2">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none">
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-500 mb-4">{filtered.length} reports found</p>

        {/* Error message */}
        {reportsError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-700">{reportsError}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
            <Loader2 className="h-8 w-8 text-slate-400 mx-auto mb-2 animate-spin" />
            <p className="text-sm text-slate-600">Loading reports...</p>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && !loading && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
            <Trash2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">No reports found</p>
            <p className="text-xs text-slate-500 mt-1">Students and faculty can submit reports from their dashboards</p>
          </div>
        )}

        {/* Reports table */}
        {filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</th>
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Reporter</th>
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${binStatusDot[r.status]}`} />
                        <button
                          onClick={() => openDetailsModal(r)}
                          className="text-sm font-medium text-slate-900 hover:text-emerald-600 hover:underline transition-colors text-left"
                        >
                          {r.location}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-slate-700">{r.reportedBy}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.role === 'student' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                        {r.role === 'student' ? <GraduationCap className="h-2.5 w-2.5" /> : <Building2 className="h-2.5 w-2.5" />}
                        {r.role}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-500">{new Date(r.timestamp).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${binStatusBadge[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        {renderActions(r)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </Card>

      {/* Dispatch Modal */}
      <AnimatePresence>
        {dispatchModal.open && (
          <DispatchModal
            report={dispatchModal.report}
            onClose={() => setDispatchModal({ open: false, report: null })}
            onConfirm={handleDispatch}
          />
        )}
      </AnimatePresence>

      {/* Report Details Modal */}
      <AnimatePresence>
        {detailsModal.open && detailsModal.report && (
          <ReportDetailsModal
            report={detailsModal.report}
            onClose={() => setDetailsModal({ open: false, report: null })}
            type="waste"
          />
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.open && (
          <ConfirmationModal
            action={confirmModal.action}
            onClose={() => setConfirmModal({ open: false, action: null, reportId: null })}
            onConfirm={handleConfirmAction}
          />
        )}
      </AnimatePresence>

      {/* Collection Summary Modal */}
      <AnimatePresence>
        {summaryModal.open && summaryModal.report && (
          <CollectionSummaryModal
            report={summaryModal.report}
            onClose={() => setSummaryModal({ open: false, report: null })}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ASSET REPORTS TAB – All asset/equipment reports
   ═══════════════════════════════════════════════════════════ */
function AssetReportsTab({ assetReports, setAssetReports }) {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyModal, setVerifyModal] = useState({ open: false, report: null });
  const [assetDispatchModal, setAssetDispatchModal] = useState({ open: false, report: null });
  const [detailsModal, setDetailsModal] = useState({ open: false, report: null });

  const filtered = assetReports.filter(r => {
    const matchesStatus = filter === 'all' || r.status === filter;
    const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
    const matchesSearch = searchQuery === '' ||
      r.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Universal status update handler
  const handleStatusUpdate = (reportId, newStatus, additionalData = {}) => {
    setAssetReports(prev => prev.map(r =>
      r.id === reportId ? { ...r, status: newStatus, ...additionalData } : r
    ));
  };

  // Status update handlers
  const handleVerifyAsset = (reportId) => {
    handleStatusUpdate(reportId, ASSET_STATUS.VERIFIED_ASSET, { imageViewed: true });
    addToast('Asset verified successfully', 'success');
  };

  const handleDispatchAsset = (reportId, staff, action) => {
    const report = assetReports.find(r => r.id === reportId);
    handleStatusUpdate(reportId, ASSET_STATUS.DISPATCHED, {
      assignedTo: staff.name,
      dispatchAction: action
    });
    addToast(`${staff.name} dispatched to ${action} asset at ${report.location}`, 'info');
  };

  const handleInReview = (reportId) => {
    handleStatusUpdate(reportId, ASSET_STATUS.IN_REVIEW);
    addToast('Asset now in review by staff', 'success');
  };

  const handleRecovered = (reportId) => {
    handleStatusUpdate(reportId, ASSET_STATUS.RECOVERED);
    addToast('Asset marked as recovered', 'success');
  };

  // Modal handlers
  const openVerifyModal = (report) => {
    setVerifyModal({ open: true, report });
  };

  const openAssetDispatchModal = (report) => {
    setAssetDispatchModal({ open: true, report });
  };

  const openDetailsModal = (report) => {
    setDetailsModal({ open: true, report });
  };

  const categoryIcons = {
    [ASSET_CATEGORIES.FURNITURE]: Armchair,
    [ASSET_CATEGORIES.ELECTRONICS]: Monitor,
    [ASSET_CATEGORIES.FIXTURES]: Package,
    [ASSET_CATEGORIES.EQUIPMENT]: Wrench,
    [ASSET_CATEGORIES.OTHER]: Package,
  };

  // Render sequential actions based on status
  const renderActions = (asset) => {
    const status = asset.status;

    // Reported: Eye (View & Verify)
    if (status === ASSET_STATUS.REPORTED) {
      return (
        <button
          onClick={() => openVerifyModal(asset)}
          className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-500 hover:text-amber-600 transition-colors"
          title="View & Verify Asset"
        >
          <Eye className="h-4 w-4" />
        </button>
      );
    }

    // Verified Asset: Dispatch (Secure/Transfer)
    if (status === ASSET_STATUS.VERIFIED_ASSET) {
      return (
        <button
          onClick={() => openAssetDispatchModal(asset)}
          className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 hover:text-blue-600 transition-colors"
          title="Dispatch Staff (Secure/Transfer)"
        >
          <Truck className="h-4 w-4" />
        </button>
      );
    }

    // Dispatched: Pending (click to mark In Review)
    if (status === ASSET_STATUS.DISPATCHED) {
      return (
        <button
          onClick={() => handleInReview(asset.id)}
          className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-500 hover:text-indigo-600 transition-colors animate-pulse"
          title={`Staff ${asset.assignedTo} handling - Click when in review`}
        >
          <Loader2 className="h-4 w-4" />
        </button>
      );
    }

    // In Review: Mark Recovered
    if (status === ASSET_STATUS.IN_REVIEW) {
      return (
        <button
          onClick={() => handleRecovered(asset.id)}
          className="p-1.5 rounded-lg hover:bg-teal-100 text-teal-500 hover:text-teal-600 transition-colors"
          title="Mark as Recovered"
        >
          <CheckCircle2 className="h-4 w-4" />
        </button>
      );
    }

    // Recovered or Disposed: No actions
    return (
      <span className="text-xs text-slate-400 italic">—</span>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-8 min-h-full">

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Armchair className="h-6 w-6 text-blue-500" /> Asset Reports
            </h2>
            <p className="text-sm text-slate-500">Furniture, electronics, fixtures & equipment reports</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-slate-500" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search item, location or reporter..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none" />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none">
              <option value="all">All Status</option>
              <option value={ASSET_STATUS.REPORTED}>Reported</option>
              <option value={ASSET_STATUS.VERIFIED_ASSET}>Verified Asset</option>
              <option value={ASSET_STATUS.DISPATCHED}>Dispatched</option>
              <option value={ASSET_STATUS.IN_REVIEW}>In Review</option>
              <option value={ASSET_STATUS.RECOVERED}>Recovered</option>
              <option value={ASSET_STATUS.DISPOSED}>Disposed</option>
            </select>
          </div>

          {/* Category filter */}
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none">
            <option value="all">All Categories</option>
            <option value={ASSET_CATEGORIES.FURNITURE}>Furniture</option>
            <option value={ASSET_CATEGORIES.ELECTRONICS}>Electronics</option>
            <option value={ASSET_CATEGORIES.FIXTURES}>Fixtures</option>
            <option value={ASSET_CATEGORIES.EQUIPMENT}>Equipment</option>
            <option value={ASSET_CATEGORIES.OTHER}>Other</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-500 mb-4">{filtered.length} reports found</p>

        {/* Reports grid with image thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a) => {
            const CategoryIcon = categoryIcons[a.category] || Package;
            return (
              <div key={a.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => openDetailsModal(a)}
              >
                {/* Image Thumbnail */}
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden group">
                  <Image className="h-6 w-6 text-slate-400" />
                  {a.imageViewed && (
                    <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="h-4 w-4 text-slate-600" />
                  </div>
                </div>

                {/* Category Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <CategoryIcon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailsModal(a);
                        }}
                        className="font-semibold text-slate-900 hover:text-blue-600 hover:underline transition-colors text-left"
                      >
                        {a.item}
                      </button>
                      <p className="text-xs text-slate-500 mt-0.5">{a.location}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${assetStatusBadge[a.status]}`}>
                      {a.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-1">{a.notes}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">{a.reportedBy}</span> · {new Date(a.timestamp).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {renderActions(a)}
                    </div>
                  </div>
                  {/* Assigned Staff indicator */}
                  {a.assignedTo && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-blue-600">
                      <Truck className="h-3 w-3" />
                      <span>{a.assignedTo} {a.dispatchAction && `(${a.dispatchAction})`}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            <Armchair className="h-10 w-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No asset reports match your filters</p>
          </div>
        )}
      </Card>

      {/* Asset Verification Modal */}
      <AnimatePresence>
        {verifyModal.open && verifyModal.report && (
          <AssetVerificationModal
            report={verifyModal.report}
            onClose={() => setVerifyModal({ open: false, report: null })}
            onVerify={handleVerifyAsset}
          />
        )}
      </AnimatePresence>

      {/* Asset Dispatch Modal */}
      <AnimatePresence>
        {assetDispatchModal.open && assetDispatchModal.report && (
          <AssetDispatchModal
            report={assetDispatchModal.report}
            onClose={() => setAssetDispatchModal({ open: false, report: null })}
            onConfirm={handleDispatchAsset}
          />
        )}
      </AnimatePresence>

      {/* Report Details Modal */}
      <AnimatePresence>
        {detailsModal.open && detailsModal.report && (
          <ReportDetailsModal
            report={detailsModal.report}
            onClose={() => setDetailsModal({ open: false, report: null })}
            type="asset"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAP TAB – Bin Map (Read-only with Edit toggle)
   ═══════════════════════════════════════════════════════════ */

const BIN_FILL_STATUS = {
  full: { label: 'Full', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-100' },
  half: { label: 'Almost Full', color: 'bg-amber-400', textColor: 'text-amber-700', bgLight: 'bg-amber-100' },
  empty: { label: 'Empty', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-100' },
};

const DEFAULT_BINS = [
  { id: 'BIN001', name: 'Cafeteria Bin', x: 25, y: 30, status: 'full' },
  { id: 'BIN002', name: 'Library Entrance', x: 55, y: 25, status: 'half' },
  { id: 'BIN003', name: 'Main Building Lobby', x: 45, y: 45, status: 'empty' },
  { id: 'BIN004', name: 'Gym Area', x: 70, y: 60, status: 'half' },
  { id: 'BIN005', name: 'Parking Lot', x: 15, y: 70, status: 'empty' },
];

function MapTab() {
  const { addToast } = useToast();
  const mapRef = useRef(null);
  const fileInputRef = useRef(null);
  const cropImageRef = useRef(null);

  // State
  const [bins, setBins] = useState(() => {
    const saved = localStorage.getItem('campusBins');
    return saved ? JSON.parse(saved) : DEFAULT_BINS;
  });
  const [mapImage, setMapImage] = useState(() => {
    return localStorage.getItem('campusMapImage') || null;
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAddMode, setIsAddMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', status: 'empty' });
  const [filter, setFilter] = useState('all');

  // Image upload/crop state
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cropScale, setCropScale] = useState(1);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Save bins to localStorage
  useEffect(() => {
    localStorage.setItem('campusBins', JSON.stringify(bins));
  }, [bins]);

  // Filter bins
  const filteredBins = filter === 'all' ? bins : bins.filter(b => b.status === filter);

  const binCounts = {
    all: bins.length,
    full: bins.filter(b => b.status === 'full').length,
    half: bins.filter(b => b.status === 'half').length,
    empty: bins.filter(b => b.status === 'empty').length,
  };

  // Handle map click to add new bin (only in edit mode)
  const handleMapClick = (e) => {
    if (!isEditMode || !isAddMode || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newBin = {
      id: `BIN${Date.now()}`,
      name: `New Bin ${bins.length + 1}`,
      x: Math.max(3, Math.min(97, x)),
      y: Math.max(3, Math.min(97, y)),
      status: 'empty',
    };

    setBins(prev => [...prev, newBin]);
    setIsAddMode(false);
    addToast('Bin added! Click on it to rename.', 'success');
  };

  // Handle drag start (only in edit mode)
  const handleDragStart = (e, bin) => {
    if (!isEditMode) return;
    e.stopPropagation();
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const binX = (bin.x / 100) * rect.width;
    const binY = (bin.y / 100) * rect.height;

    setDragOffset({
      x: e.clientX - rect.left - binX,
      y: e.clientY - rect.top - binY
    });
    setIsDragging(true);
    setSelectedBin(bin);
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isEditMode || !isDragging || !selectedBin || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    setBins(prev => prev.map(b =>
      b.id === selectedBin.id
        ? { ...b, x: Math.max(3, Math.min(97, x)), y: Math.max(3, Math.min(97, y)) }
        : b
    ));
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      addToast('Bin position updated', 'success');
    }
  };

  // Open edit/status modal
  const openBinModal = (bin) => {
    setSelectedBin(bin);
    setEditForm({ name: bin.name, status: bin.status });
    setShowEditModal(true);
  };

  // Update bin status (works in both modes)
  const updateBinStatus = (binId, newStatus) => {
    setBins(prev => prev.map(b =>
      b.id === binId ? { ...b, status: newStatus } : b
    ));
    addToast(`Bin marked as ${BIN_FILL_STATUS[newStatus].label}`, 'success');
  };

  // Save bin edits
  const saveBinEdit = () => {
    if (!selectedBin) return;
    setBins(prev => prev.map(b =>
      b.id === selectedBin.id ? { ...b, ...editForm } : b
    ));
    setShowEditModal(false);
    setSelectedBin(null);
    addToast('Bin updated', 'success');
  };

  // Delete bin (only in edit mode)
  const deleteBin = (binId) => {
    setBins(prev => prev.filter(b => b.id !== binId));
    setShowEditModal(false);
    setSelectedBin(null);
    addToast('Bin removed from map', 'success');
  };

  // Reset to default
  const resetMap = () => {
    if (window.confirm('Reset all bins to default? This cannot be undone.')) {
      setBins(DEFAULT_BINS);
      localStorage.removeItem('campusBins');
      addToast('Map reset to default', 'info');
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please upload an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Image size should be less than 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setShowUploadModal(true);
      setCropScale(1);
      setCropPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  // Save cropped image
  const saveCroppedImage = () => {
    if (!uploadedImage) {
      addToast('No image to save', 'error');
      return;
    }

    try {
      console.log('Starting image processing...');
      console.log('Uploaded image data length:', uploadedImage.length);

      // Create image element
      const img = new Image();
      
      img.onload = () => {
        try {
          console.log('Image loaded successfully', img.width, img.height);

          // Create canvas to render final image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: false });
          
          if (!ctx) {
            throw new Error('Failed to get canvas context');
          }
          
          // Set canvas size (responsive dimensions)
          const targetWidth = 1200;
          const targetHeight = 800;
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          console.log('Canvas created:', targetWidth, 'x', targetHeight);

          // Fill background
          ctx.fillStyle = '#e8f5e9';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Calculate centered position with scale and offset
          const scaledWidth = img.width * cropScale;
          const scaledHeight = img.height * cropScale;

          // Center the image and apply user's position offset
          const centerX = (targetWidth - scaledWidth) / 2 + cropPosition.x;
          const centerY = (targetHeight - scaledHeight) / 2 + cropPosition.y;

          console.log('Drawing image at:', centerX, centerY, 'size:', scaledWidth, scaledHeight);

          // Draw the scaled and positioned image
          ctx.drawImage(
            img,
            centerX,
            centerY,
            scaledWidth,
            scaledHeight
          );

          console.log('Image drawn, converting to data URL...');

          // Convert to base64 with error handling
          let croppedImageData;
          try {
            // Try high quality first (90%)
            croppedImageData = canvas.toDataURL('image/jpeg', 0.9);
            console.log('Data URL created with 90% quality, length:', croppedImageData.length);
            
            // If image is too large (over 2MB), reduce quality
            if (croppedImageData.length > 2 * 1024 * 1024) {
              console.log('Image too large, reducing quality to 70%');
              croppedImageData = canvas.toDataURL('image/jpeg', 0.7);
              console.log('New length:', croppedImageData.length);
            }
          } catch (canvasError) {
            console.error('Canvas toDataURL error:', canvasError);
            throw new Error('Failed to convert image to data URL');
          }
          
          // Try to save to localStorage with quota error handling
          try {
            localStorage.setItem('campusMapImage', croppedImageData);
            console.log('Saved to localStorage successfully');
          } catch (storageError) {
            console.error('localStorage error:', storageError);
            if (storageError.name === 'QuotaExceededError') {
              // Try with even lower quality
              console.log('Storage quota exceeded, trying 50% quality');
              croppedImageData = canvas.toDataURL('image/jpeg', 0.5);
              try {
                localStorage.setItem('campusMapImage', croppedImageData);
                console.log('Saved with reduced quality');
              } catch (retryError) {
                throw new Error('Image too large for storage. Please use a smaller image.');
              }
            } else {
              throw storageError;
            }
          }
          
          setMapImage(croppedImageData);
          setShowUploadModal(false);
          setUploadedImage(null);
          setCropScale(1);
          setCropPosition({ x: 0, y: 0 });
          addToast('Map image saved successfully!', 'success');
        } catch (innerError) {
          console.error('Error during canvas processing:', innerError);
          addToast(`Failed to process image: ${innerError.message}`, 'error');
        }
      };

      img.onerror = (e) => {
        console.error('Image load error:', e);
        addToast('Failed to load image for processing', 'error');
      };

      // Set the source - this triggers loading
      img.src = uploadedImage;

    } catch (error) {
      console.error('Error in saveCroppedImage:', error);
      addToast(`Failed to save image: ${error.message}`, 'error');
    }
  };

  // Handle image drag start
  const handleImageDragStart = (e) => {
    e.preventDefault();
    setIsDraggingImage(true);
    setDragStart({ x: e.clientX - cropPosition.x, y: e.clientY - cropPosition.y });
  };

  // Handle image drag move
  const handleImageDragMove = (e) => {
    if (!isDraggingImage) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setCropPosition({ x: newX, y: newY });
  };

  // Handle image drag end
  const handleImageDragEnd = () => {
    setIsDraggingImage(false);
  };

  // Remove map image
  const removeMapImage = () => {
    if (window.confirm('Remove the uploaded map image?')) {
      setMapImage(null);
      localStorage.removeItem('campusMapImage');
      addToast('Map image removed', 'info');
    }
  };

  // Exit edit mode
  const exitEditMode = () => {
    setIsEditMode(false);
    setIsAddMode(false);
    setSelectedBin(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-8"
    >
      {/* Header Card */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="h-6 w-6 text-emerald-500" /> Campus Bin Map
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {isEditMode
                ? 'Edit Mode: Click map to add bins, drag to move, click bins to edit/delete'
                : 'View Mode: Click bins to update their fill status'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <button
                  onClick={resetMap}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Reset
                </button>
                <button
                  onClick={exitEditMode}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Done Editing
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                <Wrench className="h-4 w-4" /> Edit Map
              </button>
            )}
          </div>
        </div>

        {/* Edit Mode Controls - Only show when in edit mode */}
        {isEditMode && (
          <div className="space-y-3 mb-4">
            {/* Bin controls */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">🛠️ Edit Mode:</span>
              <button
                onClick={() => setIsAddMode(!isAddMode)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${isAddMode
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-100'
                  }`}
              >
                <MapPin className="h-3.5 w-3.5" />
                {isAddMode ? 'Click map to place bin...' : 'Add New Bin'}
              </button>
              {isAddMode && (
                <button
                  onClick={() => setIsAddMode(false)}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <X className="h-3.5 w-3.5" /> Cancel
                </button>
              )}
              <span className="text-xs text-blue-600 ml-auto hidden sm:inline">Drag bins to reposition</span>
            </div>

            {/* Map image controls */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200">
              <span className="text-sm font-medium text-purple-700">🗺️ Map Image:</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-white border border-purple-200 text-purple-600 hover:bg-purple-100 transition-all"
              >
                <Image className="h-3.5 w-3.5" /> {mapImage ? 'Change Map' : 'Upload Map'}
              </button>
              {mapImage && (
                <button
                  onClick={removeMapImage}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove Map
                </button>
              )}
              <span className="text-xs text-purple-600 ml-auto hidden sm:inline">
                {mapImage ? 'Custom map uploaded' : 'Upload your campus map'}
              </span>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'All Bins', color: 'bg-slate-100 text-slate-600 border-slate-300' },
            { key: 'full', label: 'Full', color: 'bg-red-100 text-red-600 border-red-200' },
            { key: 'half', label: 'Almost Full', color: 'bg-amber-100 text-amber-600 border-amber-200' },
            { key: 'empty', label: 'Empty', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all border ${filter === f.key
                ? `${f.color} shadow-sm`
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {f.label}
              <span className="rounded-full bg-white/60 px-1.5 py-0.5 text-xs">{binCounts[f.key]}</span>
            </button>
          ))}
        </div>

        {/* Interactive Map */}
        <div
          ref={mapRef}
          onClick={handleMapClick}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={`relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl border-2 overflow-hidden select-none ${isEditMode && isAddMode
            ? 'border-emerald-400 cursor-crosshair'
            : isEditMode && isDragging
              ? 'border-blue-400 cursor-grabbing'
              : isEditMode
                ? 'border-blue-300'
                : 'border-slate-200'
            }`}
          style={{
            backgroundImage: mapImage ? `url(${mapImage})` : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#e8f5e9',
          }}
        >
          {/* Grid overlay (only in edit mode) */}
          {isEditMode && (
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            />
          )}

          {/* Map Label */}
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 border border-slate-200 shadow-sm z-10">
            <Trash2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-bold text-slate-900">Campus Bins</span>
            {isEditMode && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                Edit Mode
              </span>
            )}
            {isAddMode && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium animate-pulse">
                Click to place
              </span>
            )}
          </div>

          {/* Live indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 border border-slate-200 shadow-sm z-10">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-600">Live</span>
          </div>

          {/* Bin Markers */}
          {filteredBins.map((bin) => {
            const statusInfo = BIN_FILL_STATUS[bin.status];
            return (
              <div
                key={bin.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 ${isEditMode
                  ? isDragging && selectedBin?.id === bin.id
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-pointer'
                  }`}
                style={{ left: `${bin.x}%`, top: `${bin.y}%` }}
                onMouseDown={(e) => isEditMode && handleDragStart(e, bin)}
                onClick={(e) => {
                  if (!isEditMode && !isDragging) {
                    e.stopPropagation();
                    openBinModal(bin);
                  }
                }}
              >
                <div className="group relative">
                  {/* Bin Marker */}
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full ${statusInfo.color} border-3 border-white shadow-lg transition-transform hover:scale-110 ${selectedBin?.id === bin.id ? 'ring-4 ring-blue-300 scale-110' : ''
                      }`}
                  >
                    <Trash2 className="h-5 w-5 text-white" />
                  </div>

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-max max-w-[220px] rounded-xl bg-white shadow-xl border border-slate-200 px-3 py-2 opacity-0 transition-opacity group-hover:opacity-100 z-30">
                    <p className="font-semibold text-sm text-slate-900">{bin.name}</p>
                    <p className={`text-xs font-medium ${statusInfo.textColor}`}>
                      Status: {statusInfo.label}
                    </p>
                    {isEditMode ? (
                      <div className="flex gap-1 mt-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); openBinModal(bin); }}
                          className="pointer-events-auto px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteBin(bin.id); }}
                          className="pointer-events-auto px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 mt-1">Click to update status</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {filteredBins.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-slate-500 bg-white/80 px-4 py-2 rounded-lg">
                {filter === 'all'
                  ? 'No bins on map. Click "Edit Map" to add bins.'
                  : `No ${filter} bins found.`}
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="font-medium text-slate-700">Legend:</span>
          {Object.entries(BIN_FILL_STATUS).map(([key, { label, color }]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </Card>

      {/* Bin List */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-700">
            All Campus Bins ({bins.length})
          </h4>
          <span className="text-xs text-slate-500">
            {isEditMode ? 'Click to edit bin details' : 'Click to update bin status'}
          </span>
        </div>
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {bins.map((bin) => {
            const statusInfo = BIN_FILL_STATUS[bin.status];
            return (
              <div
                key={bin.id}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 ${selectedBin?.id === bin.id ? 'bg-emerald-50 border border-emerald-200' : ''
                  }`}
              >
                <span className={`flex items-center justify-center h-8 w-8 rounded-full ${statusInfo.color}`}>
                  <Trash2 className="h-4 w-4 text-white" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{bin.name}</p>
                  <p className={`text-xs font-medium ${statusInfo.textColor}`}>{statusInfo.label}</p>
                </div>

                {/* Quick status buttons (always visible) */}
                <div className="flex gap-1">
                  {Object.entries(BIN_FILL_STATUS).map(([status, info]) => (
                    <button
                      key={status}
                      onClick={() => updateBinStatus(bin.id, status)}
                      className={`h-6 w-6 rounded-full ${info.color} transition-all hover:scale-110 ${bin.status === status ? 'ring-2 ring-offset-1 ring-slate-400' : 'opacity-40 hover:opacity-100'
                        }`}
                      title={`Mark as ${info.label}`}
                    />
                  ))}
                </div>

                {/* Edit button (only in edit mode) */}
                {isEditMode && (
                  <button
                    onClick={() => openBinModal(bin)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <Wrench className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Edit/Status Modal */}
      <AnimatePresence>
        {showEditModal && selectedBin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    {isEditMode ? 'Edit Bin' : 'Update Bin Status'}
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Name field (only in edit mode) */}
                {isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Bin Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter bin name/location"
                    />
                  </div>
                )}

                {/* Status selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fill Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(BIN_FILL_STATUS).map(([status, { label, color, bgLight, textColor }]) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setEditForm(prev => ({ ...prev, status }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${editForm.status === status
                          ? `border-slate-400 ${bgLight}`
                          : 'border-slate-200 hover:border-slate-300'
                          }`}
                      >
                        <span className={`h-8 w-8 rounded-full ${color}`} />
                        <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                {isEditMode ? (
                  <button
                    onClick={() => deleteBin(selectedBin.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Bin
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBinEdit}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600"
                  >
                    {isEditMode ? 'Save Changes' : 'Update Status'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Upload/Crop Modal */}
      <AnimatePresence>
        {showUploadModal && uploadedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => {
              setShowUploadModal(false);
              setUploadedImage(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Crop & Resize Map Image</h3>
                    <p className="text-sm text-slate-500 mt-1">Adjust the image to fit your campus map</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadedImage(null);
                    }}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                {/* Image Preview with Controls */}
                <div className="space-y-4">
                  {/* Image Container */}
                  <div
                    className="relative w-full h-[350px] sm:h-[420px] rounded-xl border-2 border-slate-200 overflow-hidden bg-slate-50 cursor-move select-none"
                    onMouseDown={handleImageDragStart}
                    onMouseMove={handleImageDragMove}
                    onMouseUp={handleImageDragEnd}
                    onMouseLeave={handleImageDragEnd}
                  >
                    <img
                      ref={cropImageRef}
                      src={uploadedImage}
                      alt="Map preview"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-contain transition-transform pointer-events-none"
                      style={{
                        transform: `translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${cropScale})`,
                        transformOrigin: 'center center',
                      }}
                    />
                    {/* Drag hint overlay */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-medium pointer-events-none z-10">
                      🖱️ Click and drag to reposition
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-3">
                    {/* Scale/Zoom Control */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Zoom</label>
                        <span className="text-xs text-slate-500">{Math.round(cropScale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={cropScale}
                        onChange={(e) => setCropScale(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setCropScale(1);
                        setCropPosition({ x: 0, y: 0 });
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Reset Position & Zoom
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-700">
                        <p className="font-medium mb-1">Tips for best results:</p>
                        <ul className="space-y-0.5 list-disc list-inside">
                          <li>Click and drag the image to reposition it</li>
                          <li>Use the zoom slider to scale the image</li>
                          <li>The image will be saved at 1200x800px for optimal performance</li>
                          <li>Use a high-quality image of your campus map</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUploadModal(false);
                    setUploadedImage(null);
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveCroppedImage();
                  }}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" /> Save Map Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   USERS TAB – User management (students & faculty)
   ═══════════════════════════════════════════════════════════ */
function UsersTab({ binReports, assetReports }) {
  const [roleFilter, setRoleFilter] = useState('all');

  // Combine reporters from both bin and asset reports
  const allReporters = new Map();

  binReports.forEach(r => {
    if (!allReporters.has(r.reportedBy)) {
      allReporters.set(r.reportedBy, { name: r.reportedBy, role: r.role, binReports: 0, assetReports: 0 });
    }
    allReporters.get(r.reportedBy).binReports++;
  });

  assetReports.forEach(r => {
    if (!allReporters.has(r.reportedBy)) {
      allReporters.set(r.reportedBy, { name: r.reportedBy, role: r.role, binReports: 0, assetReports: 0 });
    }
    allReporters.get(r.reportedBy).assetReports++;
  });

  const users = Array.from(allReporters.values());
  const filtered = roleFilter === 'all' ? users : users.filter(u => u.role === roleFilter);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-8">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{users.length}</p>
              <p className="text-xs text-slate-500">Total Reporters</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <GraduationCap className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === 'student').length}</p>
              <p className="text-xs text-slate-500">Students</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === 'faculty').length}</p>
              <p className="text-xs text-slate-500">Faculty</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-6 w-6 text-slate-600" /> User Management
            </h2>
            <p className="text-sm text-slate-500">All students and faculty who have submitted reports</p>
          </div>
          <div className="flex items-center gap-2">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none">
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
        </div>

        {/* Users table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Waste Reports</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Asset Reports</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white text-xs font-bold ${user.role === 'student' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                        }`}>
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.role === 'student' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {user.role === 'student' ? <GraduationCap className="h-2.5 w-2.5" /> : <Building2 className="h-2.5 w-2.5" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-slate-700">{user.binReports}</td>
                  <td className="py-3 text-sm text-slate-700">{user.assetReports}</td>
                  <td className="py-3 text-sm font-semibold text-slate-900">{user.binReports + user.assetReports}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            <Users className="h-10 w-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No users found</p>
          </div>
        )}
      </Card>

      {/* Leaderboard */}
      <Card>
        <h3 className="mb-4 text-lg font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" /> Top Eco-Champions
        </h3>

        {/* Top 3 podium */}
        <div className="mb-6 flex items-end justify-center gap-4">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((u, i) => {
            const heights = ['h-20', 'h-28', 'h-16'];
            const medals = ['🥈', '🥇', '🥉'];
            return (
              <div key={u.rank} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{medals[i]}</span>
                <div className={`${heights[i]} w-16 sm:w-20 rounded-t-xl bg-gradient-to-t from-emerald-100 to-emerald-50 flex items-end justify-center pb-2`}>
                  <span className="text-xs font-bold text-emerald-600">{u.points}</span>
                </div>
                <p className="text-xs font-medium text-slate-900 text-center truncate w-20">{u.name.split(' ')[0]}</p>
              </div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="space-y-1.5">
          {leaderboard.map((u) => (
            <div key={u.rank}
              className="flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors">
              <span className="w-6 text-center font-bold text-slate-900">{u.rank}</span>
              <span className="flex-1 text-slate-700">{u.name}</span>
              <span className="text-slate-500">{u.reports} reports</span>
              <span className="font-semibold text-emerald-600">{u.points} pts</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
