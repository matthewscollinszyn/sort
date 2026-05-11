import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ConfirmationModalProps {
  action: 'verify' | 'dismiss';
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({ action, onClose, onConfirm }: ConfirmationModalProps) {
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
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
              isVerify
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
