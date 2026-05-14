import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import reportRoutes from './routes/reports.js';
import settingsRoutes from './routes/settings.js';
import mapRoutes from './routes/map.js';
import { startCleanupTask } from './lib/cleanup.js';
import { startRewardTasks } from './lib/rewards.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS origin validator – allows localhost on any port and the local network subnet
const allowedOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})(:\d+)?$/;

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOriginPattern.test(origin)) return callback(null, true);
        callback(new Error(`CORS: origin "${origin}" not allowed`));
    }
}));
app.use(express.json({ limit: '10mb' })); // Increase limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/map', mapRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SORT API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    // Start automatic report cleanup task
    startCleanupTask();
    // Start rewards tasks (monthly reset)
    startRewardTasks();
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use by another process.`);
        console.error(`   Run: netstat -ano | findstr :${PORT}`);
        console.error(`   Then kill the conflicting process and restart.\n`);
        process.exit(1);
    } else {
        throw err;
    }
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
