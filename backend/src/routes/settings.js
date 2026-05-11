import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    getAssetCategories,
    createAssetCategory,
    updateAssetCategory,
    deleteAssetCategory,
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    getItemPresets,
    createItemPreset,
    updateItemPreset,
    deleteItemPreset,
    getSystemSettings,
    updateSystemSettings,
    getWasteTypes,
    createWasteType,
    updateWasteType,
    deleteWasteType,
    getUrgencyLevels,
    createUrgencyLevel,
    updateUrgencyLevel,
    deleteUrgencyLevel,
    getAssetConditions,
    createAssetCondition,
    updateAssetCondition,
    deleteAssetCondition
} from '../controllers/settingsController.js';

const router = express.Router();

// ════════════════════════════════════════════════════════════
// ASSET CATEGORIES ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/asset-categories - Get all categories
router.get('/asset-categories', authenticate, getAssetCategories);

// POST /api/settings/asset-categories - Create category (ADMIN only)
router.post('/asset-categories', authenticate, authorize('ADMIN'), createAssetCategory);

// PUT /api/settings/asset-categories/:id - Update category (ADMIN only)
router.put('/asset-categories/:id', authenticate, authorize('ADMIN'), updateAssetCategory);

// DELETE /api/settings/asset-categories/:id - Delete category (ADMIN only)
router.delete('/asset-categories/:id', authenticate, authorize('ADMIN'), deleteAssetCategory);

// ════════════════════════════════════════════════════════════
// LOCATIONS ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/locations?type=BIN_LOCATION|ROOM_LOCATION - Get all locations
router.get('/locations', authenticate, getLocations);

// POST /api/settings/locations - Create location (ADMIN only)
router.post('/locations', authenticate, authorize('ADMIN'), createLocation);

// PUT /api/settings/locations/:id - Update location (ADMIN only)
router.put('/locations/:id', authenticate, authorize('ADMIN'), updateLocation);

// DELETE /api/settings/locations/:id - Delete location (ADMIN only)
router.delete('/locations/:id', authenticate, authorize('ADMIN'), deleteLocation);

// ════════════════════════════════════════════════════════════
// ITEM PRESETS ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/item-presets?categoryId=xxx - Get item presets
router.get('/item-presets', authenticate, getItemPresets);

// POST /api/settings/item-presets - Create preset (ADMIN only)
router.post('/item-presets', authenticate, authorize('ADMIN'), createItemPreset);

// PUT /api/settings/item-presets/:id - Update preset (ADMIN only)
router.put('/item-presets/:id', authenticate, authorize('ADMIN'), updateItemPreset);

// DELETE /api/settings/item-presets/:id - Delete preset (ADMIN only)
router.delete('/item-presets/:id', authenticate, authorize('ADMIN'), deleteItemPreset);

// ════════════════════════════════════════════════════════════
// SYSTEM SETTINGS ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/system - Get all system settings (all authenticated)
router.get('/system', authenticate, getSystemSettings);

// PUT /api/settings/system - Update system settings (ADMIN only)
router.put('/system', authenticate, authorize('ADMIN'), updateSystemSettings);

// ════════════════════════════════════════════════════════════
// WASTE TYPES ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/waste-types - Get all waste types
router.get('/waste-types', authenticate, getWasteTypes);

// POST /api/settings/waste-types - Create waste type (ADMIN only)
router.post('/waste-types', authenticate, authorize('ADMIN'), createWasteType);

// PUT /api/settings/waste-types/:id - Update waste type (ADMIN only)
router.put('/waste-types/:id', authenticate, authorize('ADMIN'), updateWasteType);

// DELETE /api/settings/waste-types/:id - Delete waste type (ADMIN only)
router.delete('/waste-types/:id', authenticate, authorize('ADMIN'), deleteWasteType);

// ════════════════════════════════════════════════════════════
// URGENCY LEVELS ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/urgency-levels - Get all urgency levels
router.get('/urgency-levels', authenticate, getUrgencyLevels);

// POST /api/settings/urgency-levels - Create urgency level (ADMIN only)
router.post('/urgency-levels', authenticate, authorize('ADMIN'), createUrgencyLevel);

// PUT /api/settings/urgency-levels/:id - Update urgency level (ADMIN only)
router.put('/urgency-levels/:id', authenticate, authorize('ADMIN'), updateUrgencyLevel);

// DELETE /api/settings/urgency-levels/:id - Delete urgency level (ADMIN only)
router.delete('/urgency-levels/:id', authenticate, authorize('ADMIN'), deleteUrgencyLevel);

// ════════════════════════════════════════════════════════════
// ASSET CONDITIONS ROUTES
// ════════════════════════════════════════════════════════════

// GET /api/settings/asset-conditions - Get all asset conditions
router.get('/asset-conditions', authenticate, getAssetConditions);

// POST /api/settings/asset-conditions - Create asset condition (ADMIN only)
router.post('/asset-conditions', authenticate, authorize('ADMIN'), createAssetCondition);

// PUT /api/settings/asset-conditions/:id - Update asset condition (ADMIN only)
router.put('/asset-conditions/:id', authenticate, authorize('ADMIN'), updateAssetCondition);

// DELETE /api/settings/asset-conditions/:id - Delete asset condition (ADMIN only)
router.delete('/asset-conditions/:id', authenticate, authorize('ADMIN'), deleteAssetCondition);

export default router;
