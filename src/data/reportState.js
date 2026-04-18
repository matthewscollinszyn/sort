/* =========================================================
   EcoLedger – Shared Report State
   Single source of truth consumed by every dashboard.
   Fresh system - no dummy data
   ========================================================= */

// -- Bin Report Status -----------------------------------
const BIN_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  DISMISSED: 'dismissed',
  DISPATCHED: 'dispatched',
  COLLECTED: 'collected',
  RESOLVED: 'resolved',
};

// -- Asset Report Status ---------------------------------
const ASSET_STATUS = {
  REPORTED: 'reported',
  VERIFIED_ASSET: 'verified-asset',
  DISPATCHED: 'dispatched',
  IN_REVIEW: 'in-review',
  RECOVERED: 'recovered',
  DISPOSED: 'disposed'
};

// -- Asset Categories ------------------------------------
const ASSET_CATEGORIES = {
  FURNITURE: 'furniture',
  ELECTRONICS: 'electronics',
  FIXTURES: 'fixtures',
  EQUIPMENT: 'equipment',
  OTHER: 'other',
};

// -- Waste Categories (MRF Staff) ------------------------
const WASTE_CATEGORIES = {
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
};

// -- Empty Data Arrays (Fresh System) --------------------
const mrfStaffMembers = [];
const collectionLocations = [];
const wasteCollections = [];
const binReports = [];
const assetReports = [];
const campusAssetLocations = [];
const leaderboard = [];
const auditLog = [];

// -- MRF Stats Summary -----------------------------------
const mrfStats = {
  totalCollectedToday: 0,
  totalCollectedWeek: 0,
  totalCollectedMonth: 0,
  topCategory: 'N/A',
  recyclingRate: 0,
  co2Saved: 0,
};

// -- Impact Statistics (Landing page) --------------------
const impactStats = {
  totalReports: 0,
  binsServiced: 0,
  assetsRecovered: 0,
  activeStudents: 0,
  co2Saved: '0 tons',
};

// -- Weekly chart data (IT Admin) ------------------------
const weeklyChartData = [
  { day: 'Mon', reports: 0, resolved: 0 },
  { day: 'Tue', reports: 0, resolved: 0 },
  { day: 'Wed', reports: 0, resolved: 0 },
  { day: 'Thu', reports: 0, resolved: 0 },
  { day: 'Fri', reports: 0, resolved: 0 },
  { day: 'Sat', reports: 0, resolved: 0 },
  { day: 'Sun', reports: 0, resolved: 0 },
];

export {
  BIN_STATUS,
  ASSET_STATUS,
  ASSET_CATEGORIES,
  WASTE_CATEGORIES,
  binReports,
  assetReports,
  campusAssetLocations,
  leaderboard,
  impactStats,
  auditLog,
  weeklyChartData,
  wasteCollections,
  collectionLocations,
  mrfStats,
  mrfStaffMembers,
};
