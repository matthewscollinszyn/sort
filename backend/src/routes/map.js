import express from 'express';
import {
    uploadCampusMap,
    getCampusMap,
    updateBinCoordinates,
    getBinStatuses,
    updateBinStatus,
    getAnalytics
} from '../controllers/mapController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Campus map routes
router.post('/upload', authenticate, authorize('ADMIN'), uploadCampusMap);
router.get('/current', authenticate, getCampusMap);

// Bin coordinates
router.put('/bins/:locationId/coordinates', authenticate, authorize('ADMIN'), updateBinCoordinates);

// Bin statuses
router.get('/bins/statuses', authenticate, getBinStatuses);
router.put('/bins/:locationId/status', authenticate, authorize('ADMIN', 'MRF'), updateBinStatus);

// Analytics
router.get('/analytics', authenticate, getAnalytics);

export default router;
