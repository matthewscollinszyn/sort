import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Shield, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const adminUser = {
  name: 'Admin User',
  role: 'System Administrator',
  avatar: 'AU',
};

export function AdminMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all ${
          open
            ? 'border-emerald-500/40 bg-emerald-500/10'
            : 'border-slate-300 bg-slate-100/40 hover:border-slate-400'
        }`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-bold shadow-sm">
          {adminUser.avatar}
        </div>
        <span className="hidden sm:block text-xs font-medium max-w-[7rem] truncate text-slate-700">
          {adminUser.name.split(' ')[0]}
        </span>
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
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <item.icon className="h-4 w-4 text-slate-500" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-slate-100 py-1.5">
              <button
                onClick={() => navigate('/')}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
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
