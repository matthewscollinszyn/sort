import express from 'express';
import { createNews, editNews, getNews, removeNews, streamNews } from '../controllers/newsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNews);
router.get('/stream', streamNews);

router.post('/', authenticate, authorize('ADMIN'), createNews);
router.patch('/:id', authenticate, authorize('ADMIN'), editNews);
router.delete('/:id', authenticate, authorize('ADMIN'), removeNews);

export default router;