import express from 'express';
import {
    createReport,
    getMyReports,
    getAllReports,
    getReportById,
    updateReportStatus,
    deleteReport
} from '../controllers/reportController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Student routes
router.post('/', createReport);           // Create new report
router.get('/my-reports', getMyReports);  // Get my reports (MUST come before /:id)

// Admin/MRF routes
router.get('/', authorize('ADMIN', 'MRF'), getAllReports);  // Get all reports (admin/MRF only)

// Shared routes (after specific routes)
router.get('/:id', getReportById);                                      // Get single report
router.patch('/:id/status', authorize('ADMIN', 'MRF'), updateReportStatus); // Update status (admin/MRF only)
router.delete('/:id', authorize('ADMIN', 'MRF'), deleteReport);         // Delete report (admin/MRF only)

export default router;
