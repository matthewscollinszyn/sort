import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2 } from 'lucide-react';
import { type BinReport, type AssetReport } from '../types';
import { Card } from '../components/Card';

interface UsersTabProps {
    binReports: BinReport[];
    assetReports: AssetReport[];
}

export function UsersTab({ binReports, assetReports }: UsersTabProps) {
    const reporters = [...new Set([
        ...binReports.map(r => ({ name: r.reportedBy, role: r.reporterRole })),
        ...assetReports.map(r => ({ name: r.reportedBy, role: r.reporterRole })),
    ].map(r => JSON.stringify(r)))].map(s => JSON.parse(s));

    const students = reporters.filter(r => r.role === 'student');
    const faculty = reporters.filter(r => r.role === 'teacher');

    const ReporterList = ({ items, icon: Icon, color, emptyMsg }: { items: any[]; icon: any; color: string; emptyMsg: string }) => (
        <div className="space-y-2 max-h-60 overflow-y-auto">
            {items.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">{emptyMsg}</p>
            ) : items.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color} font-bold text-xs`}>{s.name.charAt(0)}</div>
                    <span className="text-sm font-medium text-slate-700">{s.name}</span>
                </div>
            ))}
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Users className="h-5 w-5 text-emerald-500" /> User Management</h2>
                <p className="text-sm text-slate-500 mt-1">{reporters.length} active reporters</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100"><GraduationCap className="h-5 w-5 text-emerald-600" /></div>
                        <div><h3 className="font-bold text-slate-900">Students</h3><p className="text-xs text-slate-500">{students.length} active</p></div>
                    </div>
                    <ReporterList items={students} icon={GraduationCap} color="bg-emerald-100 text-emerald-700" emptyMsg="No student reporters yet" />
                </Card>
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100"><Building2 className="h-5 w-5 text-blue-600" /></div>
                        <div><h3 className="font-bold text-slate-900">Faculty</h3><p className="text-xs text-slate-500">{faculty.length} active</p></div>
                    </div>
                    <ReporterList items={faculty} icon={Building2} color="bg-blue-100 text-blue-700" emptyMsg="No faculty reporters yet" />
                </Card>
            </div>
        </motion.div>
    );
}
