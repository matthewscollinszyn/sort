/* =========================================================
   Reward Certificate Component
   Printable certificate for students who reach 100+ points
   ========================================================= */

import { Download, Printer, X } from 'lucide-react';
import { useRef } from 'react';

export default function RewardCertificate({
    isOpen,
    onClose,
    studentName,
    studentId,
    points,
    rewardCode,
    date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}) {
    const certificateRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Trigger print dialog which allows "Save as PDF"
        window.print();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Action Buttons - Only visible on screen */}
                    <div className="print:hidden sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-lg font-bold text-slate-900">Eco-Reward Certificate</h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                            >
                                <Printer className="h-4 w-4" />
                                <span className="text-sm font-medium">Print</span>
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 bg-eco-green hover:bg-eco-green/90 text-white rounded-lg transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                <span className="text-sm font-medium">Save as PDF</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>
                    </div>

                    {/* Certificate Content */}
                    <div ref={certificateRef} className="p-8 md:p-12">
                        {/* Certificate Border */}
                        <div className="border-8 border-double border-eco-green rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white via-emerald-50/30 to-white">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-block px-6 py-2 bg-eco-green/10 rounded-full mb-4">
                                    <span className="text-4xl">🌱</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                    Certificate of Achievement
                                </h1>
                                <div className="h-1 w-32 bg-eco-green mx-auto rounded-full"></div>
                            </div>

                            {/* Body */}
                            <div className="text-center space-y-6 mb-8">
                                <p className="text-lg text-slate-600">
                                    This certifies that
                                </p>

                                <div className="py-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-eco-green mb-2">
                                        {studentName || 'Student Name'}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Student ID: {studentId || 'N/A'}
                                    </p>
                                </div>

                                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    has successfully earned <span className="font-bold text-eco-green text-2xl">{points}</span> eco-points
                                    through outstanding commitment to environmental sustainability
                                    and waste management initiatives.
                                </p>

                                <div className="py-6">
                                    <div className="inline-block bg-slate-900 text-white px-8 py-4 rounded-xl">
                                        <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Verification Code</p>
                                        <p className="text-xl font-mono font-bold">{rewardCode}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-500">
                                    Present this certificate to the principal or authorized staff to claim your reward.
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-200 pt-8 mt-8">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="text-center">
                                        <div className="border-t-2 border-slate-900 pt-2 px-8 mb-1">
                                            <p className="font-semibold text-slate-900">Principal's Signature</p>
                                        </div>
                                        <p className="text-xs text-slate-500">Authorized By</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex items-center justify-center h-16 w-16 bg-eco-green/10 rounded-full mb-2 mx-auto">
                                            <span className="text-2xl">✓</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Verified</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="border-t-2 border-slate-900 pt-2 px-8 mb-1">
                                            <p className="font-semibold text-slate-900">{date}</p>
                                        </div>
                                        <p className="text-xs text-slate-500">Date Issued</p>
                                    </div>
                                </div>
                            </div>

                            {/* Watermark */}
                            <div className="text-center mt-8 pt-8 border-t border-slate-100">
                                <p className="text-xs text-slate-400">
                                    SORT Eco-Ledger System • Official Certificate
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    ${certificateRef.current ? `
                        #__next, 
                        [data-certificate="true"],
                        [data-certificate="true"] * {
                            visibility: visible;
                        }
                        [data-certificate="true"] {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                    ` : ''}
                }
                
                @page {
                    size: A4 landscape;
                    margin: 0.5cm;
                }
            `}</style>
        </>
    );
}
