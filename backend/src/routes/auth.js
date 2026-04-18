import express from 'express';
import { signin, getMe, getAllUsers } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signin', signin);

// Protected routes
router.get('/me', authenticate, getMe);
router.get('/users', authenticate, getAllUsers);

export default router;
