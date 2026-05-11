import express from 'express';
import {
    createReport,
    getMyReports,
    getAllReports,
    getReportById,
    updateReportStatus,
    deleteReport,
    dispatchStaff,
    confirmCollection,
    markAsDone,
    getImpactMetrics
} from '../controllers/reportController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { initializeSse, subscribeToEvents } from '../lib/realtime.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Student routes
router.post('/', createReport);           // Create new report
router.get('/my-reports', getMyReports);  // Get my reports (MUST come before /:id)
router.get('/stream', (req, res) => {
    initializeSse(res);
    subscribeToEvents({
        res,
        channel: 'reports',
        initialEvent: {
            type: 'connected',
            payload: {
                role: req.user.role,
                userId: req.user.userId,
            },
        },
    });
});

// Admin/MRF routes
router.get('/impact-metrics', authorize('ADMIN', 'MRF'), getImpactMetrics);
router.get('/', authorize('ADMIN', 'MRF'), getAllReports);  // Get all reports (admin/MRF only)

// Shared routes (after specific routes)
router.get('/:id', getReportById);                                      // Get single report
router.patch('/:id/status', authorize('ADMIN', 'MRF'), updateReportStatus); // Update status (admin/MRF only)
router.delete('/:id', authorize('ADMIN', 'MRF'), deleteReport);         // Delete report (admin/MRF only)

// MRF Operations Workflow
router.post('/:id/dispatch', authorize('ADMIN'), dispatchStaff);        // Admin: Dispatch staff to report
router.post('/:id/confirm-collection', authorize('MRF'), confirmCollection); // MRF: Confirm collection with kilos
router.post('/:id/mark-done', authorize('MRF'), markAsDone);            // MRF: Mark as completed

export default router;
