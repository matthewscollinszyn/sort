/* =========================================================
   EcoLedger – Unified Dashboard (Student & Faculty)
   Combined view: Rank Card, Stats, Live Map, Leaderboard,
   Asset Recovery — all in one tabbed interface.
   ========================================================= */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, MapPin, Flame, TrendingUp, Armchair,
  ClipboardList, CheckCircle2, Plus, ChevronRight,
  Trash2, Recycle, AlertTriangle,
} from 'lucide-react';
import {
  leaderboard, binReports, assetReports,
  BIN_STATUS, ASSET_STATUS,
} from '../data/reportState';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

const statusColor = {
  [BIN_STATUS.PENDING]:   'bg-amber-400',
  [BIN_STATUS.VERIFIED]:  'bg-eco-green',
  [BIN_STATUS.RESOLVED]:  'bg-slate-400',
  [BIN_STATUS.DISMISSED]: 'bg-red-400',
};

const statusDot = {
  [BIN_STATUS.PENDING]:   'bg-amber-400',
  [BIN_STATUS.VERIFIED]:  'bg-emerald-500',
  [BIN_STATUS.RESOLVED]:  'bg-slate-400',
  [BIN_STATUS.DISMISSED]: 'bg-red-400',
};

const assetBadge = {
  [ASSET_STATUS.REPORTED]:  'bg-amber-100 text-amber-700',
  [ASSET_STATUS.IN_REVIEW]: 'bg-blue-100 text-blue-700',
  [ASSET_STATUS.RECOVERED]: 'bg-green-100 text-green-700',
};

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'map',      label: 'Bin Map' },
  { id: 'assets',   label: 'Asset Recovery' },
  { id: 'board',    label: 'Leaderboard' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const me = leaderboard[0]; // simulated logged-in user

  const pendingCount  = binReports.filter(r => r.status === BIN_STATUS.PENDING).length;
  const resolvedCount = binReports.filter(r => r.status === BIN_STATUS.RESOLVED).length;
  const recoveredCount = assetReports.filter(a => a.status === ASSET_STATUS.RECOVERED).length;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 lg:px-0">
      {/* ── Rank / Welcome Card ────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
        className="eco-card flex flex-col gap-4 bg-gradient-to-r from-eco-green to-teal-500 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Trophy className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-100">Welcome back, {me.name}</p>
            <p className="text-2xl font-extrabold leading-tight sm:text-3xl">Rank #{me.rank}</p>
          </div>
        </div>
        <div className="flex gap-6 sm:text-right">
          <div>
            <p className="text-xs text-emerald-200">Eco-Points</p>
            <p className="flex items-center gap-1 text-2xl font-bold">
              <Flame className="h-5 w-5" /> {me.points}
            </p>
          </div>
          <div>
            <p className="text-xs text-emerald-200">Reports</p>
            <p className="text-2xl font-bold">{me.reports}</p>
          </div>
        </div>
      </motion.div>

      {/* ── Quick Stats Row ────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Bin Reports',    value: binReports.length,   icon: Trash2,       color: 'text-eco-green' },
          { label: 'Pending',        value: pendingCount,        icon: AlertTriangle, color: 'text-amber-500' },
          { label: 'Resolved',       value: resolvedCount,       icon: CheckCircle2,  color: 'text-slate-500' },
          { label: 'Assets Recovered', value: recoveredCount,    icon: Recycle,        color: 'text-teal-500' },
        ].map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} initial="hidden" animate="visible" custom={i + 1}
            className="eco-card flex flex-col items-center text-center">
            <s.icon className={`mb-2 h-5 w-5 ${s.color}`} />
            <span className="text-xl font-bold">{s.value}</span>
            <span className="text-xs text-eco-muted">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Tab Bar ────────────────────────────────── */}
      <div className="flex gap-1 rounded-2xl bg-white p-1 shadow-card overflow-x-auto">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 min-w-[5rem] rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-eco-muted hover:text-eco-text'
            }`}>
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-eco-green"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && <OverviewTab key="overview" me={me} />}
        {activeTab === 'map'      && <MapTab key="map" />}
        {activeTab === 'assets'   && <AssetsTab key="assets" />}
        {activeTab === 'board'    && <LeaderboardTab key="board" myRank={me.rank} />}
      </AnimatePresence>
    </div>
  );
}

/* ── Overview Tab ──────────────────────────────────────── */
function OverviewTab({ me }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="flex flex-col gap-6">

      {/* Recent reports */}
      <div className="eco-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Bin Reports</h3>
          <button className="eco-btn-primary text-xs"><Plus className="h-3.5 w-3.5" /> New Report</button>
        </div>
        <div className="space-y-2">
          {binReports.slice(0, 4).map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDot[r.status]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{r.location}</p>
                <p className="text-xs text-eco-muted">{r.reportedBy} · {new Date(r.timestamp).toLocaleDateString()}</p>
              </div>
              <span className="text-xs capitalize text-eco-muted">{r.status}</span>
              <ChevronRight className="h-4 w-4 text-eco-border" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent assets */}
      <div className="eco-card">
        <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-eco-green" /> Asset Recovery
        </h3>
        <div className="space-y-2">
          {assetReports.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-center gap-4 rounded-xl border border-eco-border px-4 py-3 hover:bg-slate-50 transition-colors">
              <Armchair className="h-7 w-7 text-eco-muted shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.item}</p>
                <p className="text-xs text-eco-muted truncate">{a.location}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${assetBadge[a.status]}`}>
                {a.status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini leaderboard */}
      <div className="eco-card">
        <h3 className="mb-3 text-lg font-semibold">Top Eco-Champions</h3>
        <div className="space-y-1.5">
          {leaderboard.slice(0, 3).map((u) => (
            <div key={u.rank}
              className={`flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm ${
                u.rank === me.rank ? 'bg-eco-green-light font-semibold text-eco-green' : 'hover:bg-slate-50'
              }`}>
              <span className="w-6 text-center font-bold">{u.rank}</span>
              <span className="flex-1">{u.name}</span>
              <span className="text-eco-muted">{u.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Map Tab ───────────────────────────────────────────── */
function MapTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="eco-card relative min-h-[380px] overflow-hidden">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Bin Map</h3>
        <button className="eco-btn-primary text-xs"><Plus className="h-3.5 w-3.5" /> Report Full Bin</button>
      </div>

      <div className="relative h-72 sm:h-80 rounded-2xl bg-slate-100">
        {binReports.map((r, i) => (
          <div key={r.id} className="group absolute"
            style={{ top: `${15 + i * 14}%`, left: `${8 + i * 18}%` }}>
            <div className={`pulse-pin relative h-5 w-5 rounded-full ${statusColor[r.status]} cursor-pointer border-2 border-white shadow-md`} />
            <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-max max-w-[200px] rounded-xl bg-eco-text px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              <p className="font-semibold">{r.location}</p>
              <p className="text-emerald-300 capitalize">{r.status}</p>
            </div>
          </div>
        ))}
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-eco-muted">
          Hover pins for details · Full map integration coming soon
        </p>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-eco-muted">
        {Object.entries(statusColor).map(([status, color]) => (
          <span key={status} className="flex items-center gap-1.5 capitalize">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} /> {status}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Assets Tab ────────────────────────────────────────── */
function AssetsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="eco-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-eco-green" /> Asset Recovery
        </h3>
        <button className="eco-btn-primary text-xs"><Plus className="h-3.5 w-3.5" /> New Report</button>
      </div>

      {assetReports.length === 0 ? (
        <p className="py-10 text-center text-sm text-eco-muted">No asset reports yet.</p>
      ) : (
        <div className="space-y-3">
          {assetReports.map((a) => (
            <div key={a.id}
              className="flex items-start gap-4 rounded-2xl border border-eco-border p-4 hover:bg-slate-50 transition-colors">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-eco-muted">
                <Armchair className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{a.item}</p>
                <p className="text-xs text-eco-muted mt-0.5">{a.location}</p>
                <p className="text-sm text-eco-muted mt-1">{a.notes}</p>
                <p className="text-xs text-eco-muted mt-1.5">Reported by {a.reportedBy} · {new Date(a.timestamp).toLocaleDateString()}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${assetBadge[a.status]}`}>
                {a.status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── Leaderboard Tab ───────────────────────────────────── */
function LeaderboardTab({ myRank }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      className="eco-card">
      <h3 className="mb-4 text-lg font-semibold">Eco-Champions Leaderboard</h3>

      {/* Top 3 podium */}
      <div className="mb-6 flex items-end justify-center gap-4">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((u, i) => {
          const heights = ['h-20', 'h-28', 'h-16'];
          const medals  = ['🥈', '🥇', '🥉'];
          return (
            <div key={u.rank} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{medals[i]}</span>
              <div className={`${heights[i]} w-16 sm:w-20 rounded-t-xl bg-gradient-to-t from-eco-green/20 to-eco-green/5 flex items-end justify-center pb-2`}>
                <span className="text-xs font-bold text-eco-green">{u.points}</span>
              </div>
              <p className="text-xs font-medium text-eco-text text-center truncate w-20">{u.name.split(' ')[0]}</p>
            </div>
          );
        })}
      </div>

      {/* Full list */}
      <div className="space-y-1.5">
        {leaderboard.map((u) => (
          <div key={u.rank}
            className={`flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm transition-colors ${
              u.rank === myRank ? 'bg-eco-green-light font-semibold text-eco-green' : 'hover:bg-slate-50'
            }`}>
            <span className="w-6 text-center font-bold">{u.rank}</span>
            <span className="flex-1">{u.name}</span>
            <span className="text-eco-muted">{u.reports} reports</span>
            <span className="font-semibold">{u.points} pts</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
