import { PrismaClient } from '../../generated/prisma/index.js';
import { publishEvent, initializeSse, subscribeToEvents } from '../lib/realtime.js';

const prisma = new PrismaClient();

const DEFAULT_NEWS = [
    {
        id: '1',
        tag: 'MRF Update',
        date: 'Feb 24, 2026',
        title: 'Extended Collection Hours Campus-Wide',
        desc: 'Starting March 1, MRF collection trucks will operate from 6 AM to 8 PM on weekdays — two extra hours to keep campus clean.',
        createdAt: new Date('2026-02-24').toISOString(),
    },
    {
        id: '2',
        tag: 'New Facility',
        date: 'Feb 20, 2026',
        title: '5 New Segregation Stations Installed',
        desc: 'Color-coded recycling stations are now live near Science Hall, the Gym, and Admin Building. Look for the green, blue, and yellow bins.',
        createdAt: new Date('2026-02-20').toISOString(),
    },
    {
        id: '3',
        tag: 'Achievement',
        date: 'Feb 18, 2026',
        title: 'Campus Hits 2,000+ Reports This Semester',
        desc: 'Thanks to student participation, our campus filed over 2,000 waste reports — a 68% increase from last semester.',
        createdAt: new Date('2026-02-18').toISOString(),
    },
    {
        id: '4',
        tag: 'Event',
        date: 'Feb 15, 2026',
        title: 'Eco-Points Double Weekend This March',
        desc: 'Report bins on March 8–9 and earn 2× eco-points. Top reporters will receive exclusive campus sustainability badges.',
        createdAt: new Date('2026-02-15').toISOString(),
    },
    {
        id: '5',
        tag: 'Program',
        date: 'Feb 12, 2026',
        title: 'Zero-Waste Cafeteria Pilot Launches',
        desc: 'Block A cafeteria is going zero-waste for 30 days. Biodegradable containers replace all single-use plastics starting Feb 28.',
        createdAt: new Date('2026-02-12').toISOString(),
    },
    {
        id: '6',
        tag: 'Research',
        date: 'Feb 10, 2026',
        title: 'Waste Audit Reveals 42% Recyclable Content',
        desc: 'A campus-wide waste audit by the Environmental Science Dept. found that 42% of waste is recyclable - the team is working to capture more.',
        createdAt: new Date('2026-02-10').toISOString(),
    },
];

async function ensureDefaultNews() {
    const count = await prisma.campusNews.count();
    if (count > 0) return;

    await prisma.campusNews.createMany({
        data: DEFAULT_NEWS,
        skipDuplicates: true,
    });
}

async function listNewsItems() {
    await ensureDefaultNews();
    return prisma.campusNews.findMany({
        orderBy: [
            { createdAt: 'desc' },
            { id: 'desc' },
        ],
    });
}

function validateNewsPayload(body) {
    const { tag, date, title, desc } = body;
    if (!tag || !date || !title || !desc) {
        return 'Tag, date, title, and description are required';
    }

    return null;
}

export async function getNews(req, res) {
    try {
        const news = await listNewsItems();
        res.json({ success: true, data: { news } });
    } catch (error) {
        console.error('GetNews error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch campus news' });
    }
}

export async function streamNews(req, res) {
    try {
        const news = await listNewsItems();
        initializeSse(res);
        subscribeToEvents({
            res,
            channel: 'news',
            initialEvent: {
                type: 'news.snapshot',
                payload: { news },
            },
        });
    } catch (error) {
        console.error('StreamNews error:', error);
        res.status(500).json({ success: false, message: 'Failed to open news stream' });
    }
}

export async function createNews(req, res) {
    console.log('[createNews] Called by user:', req.user, 'Body:', req.body);
    try {
        const validationError = validateNewsPayload(req.body);
        if (validationError) {
            console.log('[createNews] Validation error:', validationError);
            return res.status(400).json({ success: false, message: validationError });
        }

        await prisma.campusNews.create({
            data: {
                ...req.body,
                publishedById: req.user.userId,
            }
        });
        const news = await listNewsItems();
        publishEvent('news', 'news.snapshot', { news });
        console.log('[createNews] Success, returning', news.length, 'items');
        res.status(201).json({ success: true, message: 'News item published', data: { news } });
    } catch (error) {
        console.error('CreateNews error:', error);
        res.status(500).json({ success: false, message: 'Failed to create news item' });
    }
}

export async function editNews(req, res) {
    try {
        const validationError = validateNewsPayload(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        await prisma.campusNews.update({
            where: { id: parseInt(req.params.id, 10) },
            data: req.body,
        });
        const news = await listNewsItems();
        publishEvent('news', 'news.snapshot', { news });
        res.json({ success: true, message: 'News item updated', data: { news } });
    } catch (error) {
        console.error('EditNews error:', error);
        res.status(500).json({ success: false, message: 'Failed to update news item' });
    }
}

export async function removeNews(req, res) {
    try {
        await prisma.campusNews.delete({ where: { id: parseInt(req.params.id, 10) } });
        const news = await listNewsItems();
        publishEvent('news', 'news.snapshot', { news });
        res.json({ success: true, message: 'News item deleted', data: { news } });
    } catch (error) {
        console.error('RemoveNews error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete news item' });
    }
}