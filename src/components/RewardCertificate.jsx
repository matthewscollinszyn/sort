/* =========================================================
   Reward Certificate Component
   Printable certificate for students who reach 100+ points
   ========================================================= */

import { Download, X, Award, MapPin, Calendar, ShieldCheck, Share2, Printer, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { jsPDF } from 'jspdf';

export default function RewardCertificate({
    isOpen,
    onClose,
    studentName = 'Eco-Warrior',
    studentId = 'N/A',
    points = 0,
    impact = 0,
    rewardCode = 'SORT-XXXX-XXXX',
    date = new Date().toLocaleDateString(),
    type = 'MONTHLY' // 'MONTHLY' or 'QUARTERLY'
}) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();

        // Background
        doc.setFillColor(248, 250, 252); // slate-50
        doc.rect(0, 0, width, height, 'F');

        // Border
        doc.setDrawColor(16, 185, 129); // eco-green
        doc.setLineWidth(5);
        doc.rect(10, 10, width - 20, height - 20, 'D');
        
        doc.setLineWidth(1);
        doc.rect(12, 12, width - 24, height - 24, 'D');

        // Content
        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(40);
        doc.text('CERTIFICATE', width / 2, 45, { align: 'center' });
        
        doc.setFontSize(24);
        doc.text(type === 'QUARTERLY' ? 'OF RECOGNITION' : 'OF ACHIEVEMENT', width / 2, 60, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.text('This certificate is proudly presented to', width / 2, 85, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.setTextColor(16, 185, 129);
        doc.text(studentName.toUpperCase(), width / 2, 105, { align: 'center' });

        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(0.5);
        doc.line(60, 110, width - 60, 110);

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        
        const description = type === 'QUARTERLY' 
            ? `For exceptional environmental impact during the quarter, successfully diverting ${impact} kg of waste from landfills and earning ${points} points.`
            : `For outstanding participation in the S.O.R.T. Campus Waste Management Program, reaching the milestone of ${points} Eco-Points this month.`;
            
        const splitDesc = doc.splitTextToSize(description, width - 80);
        doc.text(splitDesc, width / 2, 125, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Student ID: ${studentId}`, 40, 165);
        doc.text(`Date: ${date}`, 40, 175);
        doc.text(`Reward Code: ${rewardCode}`, 40, 185);

        doc.setFont('helvetica', 'bold');
        doc.text('ECO-LEDGER SYSTEM', width - 40, 165, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.text('Authorized Digital Certificate', width - 40, 175, { align: 'right' });

        // Footer brand
        doc.setTextColor(16, 185, 129);
        doc.setFontSize(10);
        doc.text('ECOLEDGER | CAMPUS SUSTAINABILITY INITIATIVE', width / 2, height - 15, { align: 'center' });

        doc.save(`${type.toLowerCase()}_certificate_${studentName.replace(/\s+/g, '_')}.pdf`);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" 
                />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={`relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-200'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-eco-green/20 flex items-center justify-center">
                                <Award className="h-6 w-6 text-eco-green" />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {type === 'QUARTERLY' ? 'Impact Tier Reward' : 'Eco-Point Reward'}
                                </h3>
                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Verified Academic Recognition</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            <X className="h-5 w-5 text-slate-400" />
                        </button>
                    </div>

                    {/* Certificate Preview */}
                    <div className="p-8 sm:p-12 overflow-x-auto">
                        <div id="certificate-print-area" className="min-w-[800px] aspect-[1.414/1] bg-slate-50 rounded-lg p-10 border-8 border-eco-green relative shadow-inner">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-eco-green -m-2 rounded-tl-xl" />
                            
                            <div className="h-full w-full border-2 border-eco-green/30 flex flex-col items-center justify-between py-12 px-16 text-slate-900 text-center">
                                <div>
                                    <h1 className="text-5xl font-black tracking-tighter mb-2">CERTIFICATE</h1>
                                    <h2 className="text-2xl font-bold text-slate-600 tracking-widest uppercase">
                                        {type === 'QUARTERLY' ? 'of Recognition' : 'of Achievement'}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg italic font-serif">This certificate is proudly presented to</p>
                                    <h3 className="text-4xl font-bold text-eco-green underline underline-offset-8 decoration-2 uppercase px-4 py-2">
                                        {studentName}
                                    </h3>
                                    <div className="max-w-xl mx-auto pt-4">
                                        <p className="text-base leading-relaxed text-slate-700">
                                            {type === 'QUARTERLY' 
                                                ? `For exceptional environmental impact during the current academic quarter, successfully diverting ${impact} kg of waste from landfills and earning ${points} points.`
                                                : `For outstanding participation in the S.O.R.T. Campus Waste Management Program, reaching the milestone of ${points} Eco-Points this month.`
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full flex items-end justify-between pt-8 border-t border-slate-200">
                                    <div className="text-left space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase">Verification Details</p>
                                        <p className="text-sm font-medium">ID: <span className="text-slate-600">{studentId}</span></p>
                                        <p className="text-sm font-medium">Date: <span className="text-slate-600">{date}</span></p>
                                        <p className="text-sm font-mono text-eco-green font-bold tracking-tight">{rewardCode}</p>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="h-16 w-16 bg-eco-green/10 rounded-full flex items-center justify-center mb-2">
                                            <Leaf className="h-8 w-8 text-eco-green" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-800">ECO-LEDGER</p>
                                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Digital Auth</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={`p-6 border-t flex flex-col sm:flex-row gap-4 items-center justify-between ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-eco-green" />
                            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tamper-proof digital reward</span>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button 
                                onClick={() => window.print()}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm border transition-all ${isDark ? 'border-white/10 hover:bg-slate-800 text-white' : 'border-slate-200 hover:bg-white text-slate-700 shadow-sm'}`}
                            >
                                <Printer className="h-4 w-4" /> Print
                            </button>
                            <button 
                                onClick={handleDownloadPDF}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl font-bold text-sm bg-eco-green text-white hover:bg-emerald-600 shadow-lg shadow-eco-green/20 transition-all"
                            >
                                <Download className="h-4 w-4" /> Save PDF
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Print Styles */}
                <style>{`
                    @media print {
                        body * { visibility: hidden; }
                        #certificate-print-area, #certificate-print-area * { visibility: visible; }
                        #certificate-print-area {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            margin: 0;
                            padding: 2cm;
                            border: 8px solid #10B981 !important;
                            -webkit-print-color-adjust: exact;
                        }
                    }
                    @page {
                        size: A4 landscape;
                        margin: 0.5cm;
                    }
                `}</style>
            </div>
        </AnimatePresence>
    );
}
