import { motion } from 'framer-motion';
import { FileText, Search, Filter, Download, Shield, User, Clock, AlertCircle } from 'lucide-react';

const mockLogs = [
    { id: 1, user: 'Admin', action: 'Modified System Settings', target: 'Urgency Levels', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), status: 'success' },
    { id: 2, user: 'MRF Staff 01', action: 'Confirmed Collection', target: 'Report #4293', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), status: 'success' },
    { id: 3, user: 'Teacher Sarah', action: 'Reported Full Bin', target: 'Building A, 2nd Floor', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), status: 'success' },
    { id: 4, user: 'System', action: 'Daily Backup Completed', target: 'Database Root', timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), status: 'success' },
    { id: 5, user: 'Admin', action: 'Registered New User', target: 'John Doe (Student)', timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), status: 'success' },
    { id: 6, user: 'System', action: 'Automated Points Award', target: 'Weekly Leaderboard', timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), status: 'success' },
];

export default function AuditLogsTab() {
    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Audit Logs</h2>
                    <p className="text-slate-500 text-sm font-medium">Monitor all system activities and administrative changes</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search logs by user, action, or target..." 
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none font-medium appearance-none bg-white">
                        <option>All Activities</option>
                        <option>Security</option>
                        <option>Settings</option>
                        <option>Reports</option>
                        <option>Users</option>
                    </select>
                </div>
                <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none font-medium appearance-none bg-white">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Custom Range</option>
                    </select>
                </div>
            </div>

            {/* Logs List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">User</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Action</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Target</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockLogs.map((log, idx) => (
                                <motion.tr 
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(log.timestamp).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${log.user === 'System' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                                                {log.user === 'System' ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{log.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-slate-900">{log.action}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{log.target}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-wider">{log.status}</span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Notice */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Security Advisory</h4>
                    <p className="text-xs text-slate-400">Audit logs are immutable and stored securely. System-level events are logged automatically.</p>
                </div>
            </div>
        </div>
    );
}
