/* =========================================================
   AdminDashboard TypeScript Types
   ========================================================= */

// -- Enums / Constants --
export const BIN_STATUS = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    DISMISSED: 'dismissed',
    DISPATCHED: 'dispatched',
    COLLECTED: 'collected',
    RESOLVED: 'resolved',
} as const;

export const ASSET_STATUS = {
    REPORTED: 'reported',
    VERIFIED_ASSET: 'verified-asset',
    DISPATCHED: 'dispatched',
    IN_REVIEW: 'in-review',
    RECOVERED: 'recovered',
    DISPOSED: 'disposed',
} as const;

export const ASSET_CATEGORIES = {
    FURNITURE: 'furniture',
    ELECTRONICS: 'electronics',
    FIXTURES: 'fixtures',
    EQUIPMENT: 'equipment',
    OTHER: 'other',
} as const;

export type BinStatusType = typeof BIN_STATUS[keyof typeof BIN_STATUS];
export type AssetStatusType = typeof ASSET_STATUS[keyof typeof ASSET_STATUS];
export type AssetCategoryType = typeof ASSET_CATEGORIES[keyof typeof ASSET_CATEGORIES];

// -- Toast Types --
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
}

// -- User Types --
export interface MRFStaffMember {
    id: string;
    name: string;
    role: string;
    available: boolean;
    phone?: string;
}

export interface AdminUser {
    name: string;
    role: string;
    avatar: string;
}

// -- Report Types --
export interface BinReport {
    id: string;
    location: string;
    reportedBy: string;
    reporterRole: 'student' | 'teacher';
    studentId?: string;
    course?: string;
    section?: string;
    date: string;
    time: string;
    status: BinStatusType;
    image?: string;
    description?: string;
    notes?: string;
    urgency?: string;
    wasteType?: string;
    photoUrl?: string;
    kilosCollected?: number | null;
    collectionDate?: string | null;
    assignedStaff?: MRFStaffMember;
    dispatchedAt?: string;
    collectionSummary?: CollectionSummary;
}

export interface AssetReport {
    id: string;
    item: string;
    category: AssetCategoryType;
    location: string;
    reportedBy: string;
    reporterRole: 'student' | 'teacher';
    studentId?: string;
    course?: string;
    section?: string;
    date: string;
    time: string;
    status: AssetStatusType;
    image?: string;
    description?: string;
    notes?: string;
    condition?: string;
    estimatedValue?: string;
    verificationNotes?: string;
    assignedStaff?: MRFStaffMember;
    dispatchedAt?: string;
}

export interface CollectionSummary {
    collectedAt: string;
    staffName: string;
    weight: number;
    categories: string[];
    notes?: string;
}

// -- Map / Bin Types --
export type BinFillStatus = 'full' | 'empty';

export interface CampusBin {
    id: string | number;
    name: string;
    code?: string;
    location?: string;
    x: number;
    y: number;
    fillStatus: BinFillStatus;
}

export interface BinStatusStyle {
    color: string;
    bg: string;
    label: string;
}

// -- Tab Types --
export interface Tab {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

// -- Leaderboard Types --
export interface LeaderboardEntry {
    rank: number;
    name: string;
    points: number;
    reports: number;
}

// -- Impact Stats --
export interface ImpactStats {
    totalReports: number;
    binsServiced: number;
    assetsRecovered: number;
    activeStudents: number;
    co2Saved: string;
}

// -- Component Props --
export interface CardProps {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
}

export interface DispatchModalProps {
    report: BinReport;
    onClose: () => void;
    onConfirm: (reportId: string, staff: MRFStaffMember) => void;
}

export interface ReportDetailsModalProps {
    report: BinReport | AssetReport;
    onClose: () => void;
    type?: 'waste' | 'asset';
}

export interface ConfirmationModalProps {
    action: {
        type: string;
        report: BinReport;
    };
    onClose: () => void;
    onConfirm: () => void;
}

export interface AssetConfirmationModalProps {
    action: {
        type: string;
        report: AssetReport;
    };
    onClose: () => void;
    onConfirm: () => void;
}

export interface CollectionSummaryModalProps {
    report: BinReport;
    onClose: () => void;
}

export interface AssetVerificationModalProps {
    report: AssetReport;
    onClose: () => void;
    onVerify: (reportId: string, data: AssetVerificationData) => void;
}

export interface AssetVerificationData {
    condition: string;
    estimatedValue: string;
    notes: string;
}

export interface AssetDispatchModalProps {
    report: AssetReport;
    onClose: () => void;
    onConfirm: (reportId: string, staff: MRFStaffMember) => void;
}

// -- Tab Props --
export interface OverviewTabProps {
    binReports: BinReport[];
    assetReports: AssetReport[];
}

export interface WasteReportsTabProps {
    binReports: BinReport[];
    setBinReports: React.Dispatch<React.SetStateAction<BinReport[]>>;
    onRefresh: () => void;
    loading: boolean;
    reportsError: string | null;
}

export interface AssetReportsTabProps {
    assetReports: AssetReport[];
    setAssetReports: React.Dispatch<React.SetStateAction<AssetReport[]>>;
}

export interface UsersTabProps {
    binReports: BinReport[];
    assetReports: AssetReport[];
}

// -- Animation Variants --
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

export const stagger = {
    visible: { transition: { staggerChildren: 0.07 } },
};

// -- Status Style Maps --
export const binStatusDot: Record<BinStatusType, string> = {
    [BIN_STATUS.PENDING]: 'bg-amber-400',
    [BIN_STATUS.VERIFIED]: 'bg-emerald-500',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-500',
    [BIN_STATUS.COLLECTED]: 'bg-indigo-500',
    [BIN_STATUS.RESOLVED]: 'bg-slate-400',
    [BIN_STATUS.DISMISSED]: 'bg-red-400',
};

export const binStatusBadge: Record<BinStatusType, string> = {
    [BIN_STATUS.PENDING]: 'bg-amber-100 text-amber-700 border-amber-200',
    [BIN_STATUS.VERIFIED]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [BIN_STATUS.DISPATCHED]: 'bg-blue-100 text-blue-700 border-blue-200',
    [BIN_STATUS.COLLECTED]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [BIN_STATUS.RESOLVED]: 'bg-slate-100 text-slate-600 border-slate-200',
    [BIN_STATUS.DISMISSED]: 'bg-red-100 text-red-700 border-red-200',
};

export const assetStatusDot: Record<AssetStatusType, string> = {
    [ASSET_STATUS.REPORTED]: 'bg-amber-400',
    [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-500',
    [ASSET_STATUS.DISPATCHED]: 'bg-blue-500',
    [ASSET_STATUS.IN_REVIEW]: 'bg-indigo-400',
    [ASSET_STATUS.RECOVERED]: 'bg-teal-500',
    [ASSET_STATUS.DISPOSED]: 'bg-slate-400',
};

export const assetStatusBadge: Record<AssetStatusType, string> = {
    [ASSET_STATUS.REPORTED]: 'bg-amber-100 text-amber-700 border-amber-200',
    [ASSET_STATUS.VERIFIED_ASSET]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [ASSET_STATUS.DISPATCHED]: 'bg-blue-100 text-blue-700 border-blue-200',
    [ASSET_STATUS.IN_REVIEW]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [ASSET_STATUS.RECOVERED]: 'bg-teal-100 text-teal-700 border-teal-200',
    [ASSET_STATUS.DISPOSED]: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const BIN_FILL_STATUS: Record<BinFillStatus, BinStatusStyle> = {
    full: { color: 'text-red-500', bg: 'bg-red-100', label: 'Full' },
    empty: { color: 'text-emerald-500', bg: 'bg-emerald-100', label: 'Available' },
};

// -- Default Data --
export const DEFAULT_BINS: CampusBin[] = [
    { id: 'bin-1', name: 'Main Entrance', x: 25, y: 15, fillStatus: 'empty' },
    { id: 'bin-2', name: 'Cafeteria', x: 60, y: 30, fillStatus: 'full' },
    { id: 'bin-3', name: 'Library', x: 40, y: 55, fillStatus: 'empty' },
    { id: 'bin-4', name: 'Gym Area', x: 75, y: 70, fillStatus: 'empty' },
    { id: 'bin-5', name: 'Parking Lot', x: 15, y: 80, fillStatus: 'empty' },
];

// -- Tab Configuration --
export const TABS: Tab[] = [
    { id: 'overview', label: 'Overview', icon: () => null },
    { id: 'waste', label: 'Waste Reports', icon: () => null },
    { id: 'assets', label: 'Asset Reports', icon: () => null },
    { id: 'map', label: 'Bin Map', icon: () => null },
    { id: 'users', label: 'Users', icon: () => null },
];
