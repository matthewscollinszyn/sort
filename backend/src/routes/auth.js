import express from 'express';
import { signin, register, getMe, getAllUsers, getLeaderboard } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signin', signin);
router.post('/register', register);

// Protected routes
router.get('/me', authenticate, getMe);
router.get('/users', authenticate, getAllUsers);
router.get('/leaderboard', authenticate, getLeaderboard);

export default router;
