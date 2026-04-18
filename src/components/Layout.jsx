/* =========================================================
   EcoLedger – Layout Wrapper
   FoodPanda-style: Bottom nav (mobile) + Sidebar (desktop).
   Includes the floating Role-Switcher pill.
   ========================================================= */

import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  LayoutDashboard,
  Camera,
  MapPin,
  Clock,
  Trophy,
  ChevronRight,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/student',          label: 'Home',        icon: LayoutDashboard },
  { to: '/student/report',   label: 'Report Bin',   icon: Camera },
  { to: '/student/map',      label: 'Bin Map',      icon: MapPin },
  { to: '/student/activity', label: 'Activity',     icon: Clock },
  { to: '/dashboard',        label: 'Admin Panel',  icon: Trophy },
];

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-dvh bg-eco-slate">
      {/* ════════════ Desktop Sidebar ════════════════ */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30 border-r border-eco-border bg-white">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 px-6 border-b border-eco-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-eco-green text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-eco-text">EcoLedger</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-eco-green-light text-eco-green'
                    : 'text-eco-muted hover:bg-slate-50 hover:text-eco-text'
                }`
              }>
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-eco-border px-3 py-4 space-y-2">
          <Link to="/" className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-eco-muted hover:bg-slate-50 hover:text-eco-text transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <p className="px-3 text-xs text-eco-muted">© 2026 EcoLedger · v0.1</p>
        </div>
      </aside>

      {/* ════════════ Main Content ═══════════════════ */}
      <main className="flex-1 lg:ml-64 pb-[var(--spacing-bottom-nav)] lg:pb-0">
        {/* Mobile header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-eco-border bg-white/80 px-4 backdrop-blur-md lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-green text-white">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-base font-bold text-eco-text">EcoLedger</span>
        </header>

        {/* Animated page transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ════════════ Mobile Bottom Nav ══════════════ */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[var(--spacing-bottom-nav)] items-center justify-around border-t border-eco-border bg-white/90 backdrop-blur-md lg:hidden"
        style={{ boxShadow: 'var(--shadow-nav)' }}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.to);
          return (
            <NavLink key={item.to} to={item.to}
              className="flex flex-col items-center gap-0.5 px-2 py-1">
              <motion.div
                animate={{ scale: isActive ? 1.15 : 1 }}
                className={`transition-colors ${isActive ? 'text-eco-green' : 'text-eco-muted'}`}>
                <item.icon className="h-5 w-5" />
              </motion.div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-eco-green' : 'text-eco-muted'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
