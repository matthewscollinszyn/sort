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
    getImpactMetrics,
    getPublicMetrics
} from '../controllers/reportController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { initializeSse, subscribeToEvents } from '../lib/realtime.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/reports';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'report-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit (frontend should compress it way more)
});

// All routes require authentication
router.use(authenticate);

// Student routes
router.post('/', upload.single('photo'), createReport);           // Create new report with optional photo upload
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
router.get('/public-metrics', getPublicMetrics); // Accessible to all authenticated users
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
