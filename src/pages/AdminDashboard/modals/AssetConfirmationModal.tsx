import { motion } from 'framer-motion';
import { Eye, CheckCircle2, Recycle, XCircle, Trash2 } from 'lucide-react';

interface AssetConfirmationModalProps {
  action: 'verify' | 'recovery' | 'review' | 'recovered' | 'dismiss' | 'dispose';
  onClose: () => void;
  onConfirm: () => void;
}

export function AssetConfirmationModal({ action, onClose, onConfirm }: AssetConfirmationModalProps) {
  const isVerify = action === 'verify';
  const isRecovery = action === 'recovery';
  const isReview = action === 'review';

  const config = {
    verify: {
      title: 'Verify Asset?',
      description: 'This will mark the asset report as verified and ready for recovery.',
      icon: CheckCircle2,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      btnColor: 'bg-emerald-500 hover:bg-emerald-600',
      btnText: 'Verify Asset'
    },
    recovery: {
      title: 'Verify Recovery?',
      description: 'This will mark the asset as successfully recovered.',
      icon: Recycle,
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
      btnColor: 'bg-teal-500 hover:bg-teal-600',
      btnText: 'Verify Recovery'
    },
    review: {
      title: 'Mark for Review?',
      description: 'This will mark the asset as being reviewed by staff.',
      icon: Eye,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      btnColor: 'bg-blue-500 hover:bg-blue-600',
      btnText: 'Mark Review'
    },
    recovered: {
      title: 'Mark as Recovered?',
      description: 'This will mark the asset as successfully recovered.',
      icon: CheckCircle2,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      btnColor: 'bg-emerald-500 hover:bg-emerald-600',
      btnText: 'Mark Recovered'
    },
    dismiss: {
      title: 'Dismiss Asset Report?',
      description: 'This will dismiss the asset report. This action cannot be undone.',
      icon: XCircle,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      btnColor: 'bg-red-500 hover:bg-red-600',
      btnText: 'Dismiss'
    },
    dispose: {
      title: 'Dispose Asset?',
      description: 'This will mark the asset as disposed. This action cannot be undone.',
      icon: Trash2,
      bgColor: 'bg-slate-100',
      iconColor: 'text-slate-600',
      btnColor: 'bg-slate-700 hover:bg-slate-800',
      btnText: 'Mark as Disposed'
    }
  };

  const currentConfig = config[action];
  const Icon = currentConfig.icon;

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
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${currentConfig.bgColor}`}>
            <Icon className={`h-7 w-7 ${currentConfig.iconColor}`} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {currentConfig.title}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {currentConfig.description}
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
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${currentConfig.btnColor}`}
          >
            {currentConfig.btnText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
