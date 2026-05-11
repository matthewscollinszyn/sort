/* =========================================================
   EcoLedger – Shared Report State
   Single source of truth consumed by every dashboard.
   Fresh system - no dummy data
   ========================================================= */

// -- Bin Report Status -----------------------------------
export const BIN_STATUS = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    DISMISSED: 'dismissed',
    DISPATCHED: 'dispatched',
    COLLECTED: 'collected',
    RESOLVED: 'resolved',
} as const;

export type BinStatusType = typeof BIN_STATUS[keyof typeof BIN_STATUS];

// -- Asset Report Status ---------------------------------
export const ASSET_STATUS = {
    REPORTED: 'reported',
    VERIFIED_ASSET: 'verified-asset',
    DISPATCHED: 'dispatched',
    IN_REVIEW: 'in-review',
    RECOVERED: 'recovered',
    DISPOSED: 'disposed'
} as const;

export type AssetStatusType = typeof ASSET_STATUS[keyof typeof ASSET_STATUS];

// -- Asset Categories ------------------------------------
export const ASSET_CATEGORIES = {
    FURNITURE: 'furniture',
    ELECTRONICS: 'electronics',
    FIXTURES: 'fixtures',
    EQUIPMENT: 'equipment',
    OTHER: 'other',
} as const;

export type AssetCategoryType = typeof ASSET_CATEGORIES[keyof typeof ASSET_CATEGORIES];

// -- Waste Categories (MRF Staff) ------------------------
export const WASTE_CATEGORIES = {
    BIODEGRADABLE: 'biodegradable',
    RECYCLABLE: 'recyclable',
    RESIDUAL: 'residual',
    HAZARDOUS: 'hazardous',
    PLASTIC: 'plastic',
    PAPER: 'paper',
    GLASS: 'glass',
    METAL: 'metal',
    EWASTE: 'e-waste',
    ORGANIC: 'organic',
} as const;

export type WasteCategoryType = typeof WASTE_CATEGORIES[keyof typeof WASTE_CATEGORIES];

// -- Type Definitions ------------------------------------
export interface MRFStaffMember {
    id: string;
    name: string;
    role: string;
    available: boolean;
    phone?: string;
}

export interface CollectionLocation {
    id: string;
    name: string;
    type: string;
}

export interface WasteCollection {
    id: string;
    date: string;
    staffId: string;
    locationId: string;
    category: WasteCategoryType;
    weight: number;
}

export interface BinReport {
    id: string;
    location: string;
    notes?: string;
    photoUrl?: string;
    urgency?: string;
    wasteType?: string;
    status: BinStatusType;
    timestamp: string;
    date?: string;
    reportedBy: string;
    reporterRole: 'student' | 'teacher';
    studentId?: string;
    course?: string;
    section?: string;
    assignedStaff?: MRFStaffMember;
}

export interface AssetReport {
    id: string;
    item: string;
    location: string;
    category: AssetCategoryType;
    status: AssetStatusType;
    reportedBy: string;
    reporterRole: 'student' | 'teacher';
    timestamp: string;
    photoUrl?: string;
    notes?: string;
}

export interface CampusAssetLocation {
    id: string;
    name: string;
    building: string;
}

export interface LeaderboardEntry {
    rank: number;
    name: string;
    points: number;
    reports: number;
}

export interface AuditLogEntry {
    id: string;
    action: string;
    userId: string;
    timestamp: string;
    details?: string;
}

export interface WeeklyChartData {
    day: string;
    reports: number;
    resolved: number;
}

// -- Empty Data Arrays (Fresh System) --------------------
export const mrfStaffMembers: MRFStaffMember[] = [
    {
        id: 'mrf-rico-mendoza',
        name: 'Rico Mendoza',
        role: 'Collection Specialist',
        available: true,
        phone: '+63 912 345 6789'
    }
];
export const collectionLocations: CollectionLocation[] = [];
export const wasteCollections: WasteCollection[] = [];
export const binReports: BinReport[] = [];
export const assetReports: AssetReport[] = [];
export const campusAssetLocations: CampusAssetLocation[] = [];
export const leaderboard: LeaderboardEntry[] = [];
export const auditLog: AuditLogEntry[] = [];

// -- MRF Stats Summary -----------------------------------
export interface MRFStats {
    totalCollectedToday: number;
    totalCollectedWeek: number;
    totalCollectedMonth: number;
    topCategory: string;
    recyclingRate: number;
    co2Saved: number;
}

export const mrfStats: MRFStats = {
    totalCollectedToday: 0,
    totalCollectedWeek: 0,
    totalCollectedMonth: 0,
    topCategory: 'N/A',
    recyclingRate: 0,
    co2Saved: 0,
};

// -- Impact Statistics (Landing page) --------------------
export interface ImpactStats {
    totalReports: number;
    binsServiced: number;
    assetsRecovered: number;
    activeStudents: number;
    co2Saved: string;
}

export const impactStats: ImpactStats = {
    totalReports: 0,
    binsServiced: 0,
    assetsRecovered: 0,
    activeStudents: 0,
    co2Saved: '0 tons',
};

// -- Weekly chart data (IT Admin) ------------------------
export const weeklyChartData: WeeklyChartData[] = [
    { day: 'Mon', reports: 0, resolved: 0 },
    { day: 'Tue', reports: 0, resolved: 0 },
    { day: 'Wed', reports: 0, resolved: 0 },
    { day: 'Thu', reports: 0, resolved: 0 },
    { day: 'Fri', reports: 0, resolved: 0 },
    { day: 'Sat', reports: 0, resolved: 0 },
    { day: 'Sun', reports: 0, resolved: 0 },
];
