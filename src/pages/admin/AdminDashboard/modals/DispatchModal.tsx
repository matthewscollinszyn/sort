import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, X, Send } from 'lucide-react';
import { BinReport, AssetReport, MRFStaffMember } from '../types';

interface DispatchModalProps {
  report: BinReport | AssetReport;
  onClose: () => void;
  onConfirm: (reportId: string, staff: MRFStaffMember) => void;
  mrfStaff: MRFStaffMember[];
}

export function DispatchModal({ report, onClose, onConfirm, mrfStaff }: DispatchModalProps) {
  const [selectedStaff, setSelectedStaff] = useState('');
  const availableStaff = mrfStaff.filter((s: MRFStaffMember) => s.available);

  const handleConfirm = () => {
    if (!selectedStaff) return;
    const staff = mrfStaff.find((s: MRFStaffMember) => s.id === selectedStaff);
    if (staff) {
      onConfirm(report.id, staff);
      onClose();
    }
  };

  const selectedStaffMember = mrfStaff.find((s: MRFStaffMember) => s.id === selectedStaff);

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
            <p className="font-medium text-slate-900">{'location' in report ? report.location : (report as AssetReport).item || report.location}</p>
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
              {availableStaff.map((staff: MRFStaffMember) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} - {staff.role}
                </option>
              ))}
            </select>
          </div>

          {/* Staff Info if selected */}
          {selectedStaff && selectedStaffMember && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
                {selectedStaffMember.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-slate-900">{selectedStaffMember.name}</p>
                <p className="text-xs text-slate-500">{selectedStaffMember.role} • Available</p>
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
