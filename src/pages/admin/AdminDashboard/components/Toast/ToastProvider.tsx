import { useState, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Truck } from 'lucide-react';
import { Toast, ToastType, ToastContextType } from '../types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'success') => {
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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm ${
                toast.type === 'success'
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

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastContext };
