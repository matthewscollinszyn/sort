import express from 'express';
import { signin, signout, register, getMe, getAllUsers, getLeaderboard, getQuarterlyImpact, getSessions, revokeSession, revokeAllOtherSessions } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signin', signin);
router.post('/register', register);

// Protected routes
router.post('/signout', authenticate, signout);
router.get('/me', authenticate, getMe);
router.get('/users', authenticate, getAllUsers);
router.get('/leaderboard', authenticate, getLeaderboard);
router.get('/quarterly-impact', authenticate, getQuarterlyImpact);

// Session management routes
router.get('/sessions', authenticate, getSessions);
router.delete('/sessions/:id', authenticate, revokeSession);
router.delete('/sessions', authenticate, revokeAllOtherSessions);

export default router;
