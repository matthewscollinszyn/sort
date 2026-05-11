import { PrismaClient } from '../../generated/prisma/index.js';
import { publishEvent } from '../lib/realtime.js';

const prisma = new PrismaClient();

// ════════════════════════════════════════════════════════════
// ASSET CATEGORIES MANAGEMENT
// ════════════════════════════════════════════════════════════

/**
 * GET /api/settings/asset-categories
 * Get all asset categories (enabled only for users, all for admins)
 */
export async function getAssetCategories(req, res) {
    try {
        const isAdmin = req.user?.role === 'ADMIN';

        const categories = await prisma.assetCategory.findMany({
            where: isAdmin ? {} : { enabled: true },
            orderBy: { sortOrder: 'asc' }
        });

        res.json(categories);
    } catch (error) {
        console.error('Error fetching asset categories:', error);
        res.status(500).json({ error: 'Failed to fetch asset categories' });
    }
}

/**
 * POST /api/settings/asset-categories
 * Create new asset category (ADMIN only)
 */
export async function createAssetCategory(req, res) {
    try {
        const { name, label } = req.body;

        if (!name || !label) {
            return res.status(400).json({ error: 'Name and label are required' });
        }

        // Get max sortOrder and add 1
        const maxOrder = await prisma.assetCategory.findFirst({
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true }
        });

        const category = await prisma.assetCategory.create({
            data: {
                name: name.toLowerCase(),
                label,
                sortOrder: (maxOrder?.sortOrder || 0) + 1
            }
        });

        // Broadcast event
        publishEvent('reports', 'assetCategory.created', { category });

        res.status(201).json(category);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Category with this name already exists' });
        }
        console.error('Error creating asset category:', error);
        res.status(500).json({ error: 'Failed to create asset category' });
    }
}

/**
 * PUT /api/settings/asset-categories/:id
 * Update asset category (ADMIN only)
 */
export async function updateAssetCategory(req, res) {
    try {
        const { id } = req.params;
        const { name, label, enabled, sortOrder } = req.body;

        const category = await prisma.assetCategory.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(name && { name: name.toLowerCase() }),
                ...(label && { label }),
                ...(enabled !== undefined && { enabled }),
                ...(sortOrder !== undefined && { sortOrder })
            }
        });

        // Broadcast event
        publishEvent('reports', 'assetCategory.updated', { category });

        res.json(category);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Category not found' });
        }
        console.error('Error updating asset category:', error);
        res.status(500).json({ error: 'Failed to update asset category' });
    }
}

/**
 * DELETE /api/settings/asset-categories/:id
 * Delete asset category (ADMIN only)
 */
export async function deleteAssetCategory(req, res) {
    try {
        const { id } = req.params;

        const deletedCategory = await prisma.assetCategory.delete({
            where: { id: parseInt(id, 10) }
        });

        // Broadcast event
        publishEvent('reports', 'assetCategory.deleted', { categoryId: deletedCategory.id, category: deletedCategory });

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Category not found' });
        }
        console.error('Error deleting asset category:', error);
        res.status(500).json({ error: 'Failed to delete asset category' });
    }
}

// ════════════════════════════════════════════════════════════
// LOCATIONS MANAGEMENT
// ════════════════════════════════════════════════════════════

/**
 * GET /api/settings/locations?type=BIN_LOCATION|ROOM_LOCATION
 * Get all locations (enabled only for users, all for admins)
 */
export async function getLocations(req, res) {
    try {
        const { type } = req.query;
        const isAdmin = req.user?.role === 'ADMIN';

        const where = {
            ...(type && { type }),
            ...(!isAdmin && { enabled: true })
        };

        const locations = await prisma.location.findMany({
            where,
            orderBy: { sortOrder: 'asc' }
        });

        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
}

/**
 * POST /api/settings/locations
 * Create new location (ADMIN only)
 */
export async function createLocation(req, res) {
    try {
        const { code, name, type, building, mapX, mapY } = req.body;

        if (!code || !name || !type) {
            return res.status(400).json({ error: 'Code, name, and type are required' });
        }

        if (!['BIN_LOCATION', 'ROOM_LOCATION'].includes(type)) {
            return res.status(400).json({ error: 'Invalid location type' });
        }

        // Get max sortOrder for the type and add 1
        const maxOrder = await prisma.location.findFirst({
            where: { type },
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true }
        });

        const location = await prisma.location.create({
            data: {
                code: code.toUpperCase(),
                name,
                type,
                building: building || null,
                mapX: mapX || null,
                mapY: mapY || null,
                sortOrder: (maxOrder?.sortOrder || 0) + 1
            }
        });

        // Broadcast location change event
        publishEvent('reports', 'location.created', {
            location,
        });

        res.status(201).json(location);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Location with this code already exists' });
        }
        console.error('Error creating location:', error);
        res.status(500).json({ error: 'Failed to create location' });
    }
}

/**
 * PUT /api/settings/locations/:id
 * Update location (ADMIN only)
 */
export async function updateLocation(req, res) {
    try {
        const { id } = req.params;
        const { code, name, type, building, enabled, sortOrder, mapX, mapY } = req.body;

        const location = await prisma.location.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(code && { code: code.toUpperCase() }),
                ...(name && { name }),
                ...(type && { type }),
                ...(building !== undefined && { building }),
                ...(enabled !== undefined && { enabled }),
                ...(sortOrder !== undefined && { sortOrder }),
                ...(mapX !== undefined && { mapX }),
                ...(mapY !== undefined && { mapY })
            }
        });

        // Broadcast location change event
        publishEvent('reports', 'location.updated', {
            location,
        });

        res.json(location);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Location not found' });
        }
        console.error('Error updating location:', error);
        res.status(500).json({ error: 'Failed to update location' });
    }
}

/**
 * DELETE /api/settings/locations/:id
 * Delete location (ADMIN only)
 */
export async function deleteLocation(req, res) {
    try {
        const { id } = req.params;

        const deletedLocation = await prisma.location.delete({
            where: { id: parseInt(id, 10) }
        });

        // Broadcast location delete event
        publishEvent('reports', 'location.deleted', {
            locationId: deletedLocation.id,
            location: deletedLocation,
        });

        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Location not found' });
        }
        console.error('Error deleting location:', error);
        res.status(500).json({ error: 'Failed to delete location' });
    }
}

// ════════════════════════════════════════════════════════════
// ITEM PRESETS MANAGEMENT
// ════════════════════════════════════════════════════════════

/**
 * GET /api/settings/item-presets?categoryId=xxx
 * Get item presets for a category (enabled only for users, all for admins)
 */
export async function getItemPresets(req, res) {
    try {
        const { categoryId } = req.query;
        const isAdmin = req.user?.role === 'ADMIN';

        const where = {
            ...(categoryId && { categoryId }),
            ...(!isAdmin && { enabled: true })
        };

        const presets = await prisma.itemPreset.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
            include: {
                category: {
                    select: { name: true, label: true }
                }
            }
        });

        res.json(presets);
    } catch (error) {
        console.error('Error fetching item presets:', error);
        res.status(500).json({ error: 'Failed to fetch item presets' });
    }
}

/**
 * POST /api/settings/item-presets
 * Create new item preset (ADMIN only)
 */
export async function createItemPreset(req, res) {
    try {
        const { name, icon, categoryId: rawCategoryId } = req.body;

        if (!name || !rawCategoryId) {
            return res.status(400).json({ error: 'Name and categoryId are required' });
        }

        // Parse categoryId to integer
        const categoryId = parseInt(rawCategoryId, 10);

        if (isNaN(categoryId)) {
            return res.status(400).json({ error: 'Invalid categoryId' });
        }

        // Verify category exists
        const category = await prisma.assetCategory.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Get max sortOrder for the category
        const maxOrder = await prisma.itemPreset.findFirst({
            where: { categoryId },
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true }
        });

        const preset = await prisma.itemPreset.create({
            data: {
                name,
                icon: icon || '📦',
                categoryId,
                sortOrder: (maxOrder?.sortOrder || 0) + 1
            },
            include: {
                category: {
                    select: { name: true, label: true }
                }
            }
        });

        // Broadcast event
        publishEvent('reports', 'itemPreset.created', { preset });

        res.status(201).json(preset);
    } catch (error) {
        console.error('Error creating item preset:', error);
        res.status(500).json({ error: 'Failed to create item preset' });
    }
}

/**
 * PUT /api/settings/item-presets/:id
 * Update item preset (ADMIN only)
 */
export async function updateItemPreset(req, res) {
    try {
        const { id } = req.params;
        const { name, icon, enabled, sortOrder } = req.body;

        const preset = await prisma.itemPreset.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(name && { name }),
                ...(icon !== undefined && { icon }),
                ...(enabled !== undefined && { enabled }),
                ...(sortOrder !== undefined && { sortOrder })
            },
            include: {
                category: {
                    select: { name: true, label: true }
                }
            }
        });

        // Broadcast event
        publishEvent('reports', 'itemPreset.updated', { preset });

        res.json(preset);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Item preset not found' });
        }
        console.error('Error updating item preset:', error);
        res.status(500).json({ error: 'Failed to update item preset' });
    }
}

/**
 * DELETE /api/settings/item-presets/:id
 * Delete item preset (ADMIN only)
 */
export async function deleteItemPreset(req, res) {
    try {
        const { id } = req.params;

        const deletedPreset = await prisma.itemPreset.delete({
            where: { id: parseInt(id, 10) }
        });

        // Broadcast event
        publishEvent('reports', 'itemPreset.deleted', { presetId: deletedPreset.id, preset: deletedPreset });

        res.json({ message: 'Item preset deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Item preset not found' });
        }
        console.error('Error deleting item preset:', error);
        res.status(500).json({ error: 'Failed to delete item preset' });
    }
}

// ════════════════════════════════════════════════════════════
// SYSTEM SETTINGS (Points, etc.)
// ════════════════════════════════════════════════════════════

const DEFAULT_POINTS = [
    { key: 'points_1st', value: '15', label: '1st Reporter Points' },
    { key: 'points_2nd', value: '10', label: '2nd Reporter Points' },
    { key: 'points_3rd', value: '5', label: '3rd Reporter Points' },
];

export async function getSystemSettings(req, res) {
    try {
        const settings = await prisma.systemSettings.findMany();
        // Merge with defaults so keys always exist
        const map = Object.fromEntries(settings.map(s => [s.key, s]));
        const result = DEFAULT_POINTS.map(d => map[d.key] ?? d);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching system settings:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch system settings' });
    }
}

export async function updateSystemSettings(req, res) {
    try {
        const { settings } = req.body; // Array of { key, value }
        const userId = req.user?.userId;

        if (!Array.isArray(settings)) {
            return res.status(400).json({ success: false, message: 'settings must be an array' });
        }

        const allowedKeys = DEFAULT_POINTS.map(d => d.key);
        const updates = await Promise.all(
            settings
                .filter(s => allowedKeys.includes(s.key))
                .map(s =>
                    prisma.systemSettings.upsert({
                        where: { key: s.key },
                        update: { value: String(s.value), updatedById: userId },
                        create: { key: s.key, value: String(s.value), label: DEFAULT_POINTS.find(d => d.key === s.key)?.label, updatedById: userId },
                    })
                )
        );

        // Broadcast event
        publishEvent('reports', 'systemSettings.updated', { settings: updates });

        res.json({ success: true, data: updates });
    } catch (error) {
        console.error('Error updating system settings:', error);
        res.status(500).json({ success: false, message: 'Failed to update system settings' });
    }
}

// ════════════════════════════════════════════════════════════
// WASTE TYPES MANAGEMENT
// ════════════════════════════════════════════════════════════

export async function getWasteTypes(req, res) {
    try {
        const isAdmin = req.user?.role === 'ADMIN';

        const wasteTypes = await prisma.wasteType.findMany({
            where: isAdmin ? {} : { enabled: true },
            orderBy: { sortOrder: 'asc' }
        });

        res.json(wasteTypes);
    } catch (error) {
        console.error('Error fetching waste types:', error);
        res.status(500).json({ error: 'Failed to fetch waste types' });
    }
}

export async function createWasteType(req, res) {
    try {
        const { key, label, emoji } = req.body;

        if (!key || !label) {
            return res.status(400).json({ error: 'Key and label are required' });
        }

        const maxOrder = await prisma.wasteType.findFirst({
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true }
        });

        const wasteType = await prisma.wasteType.create({
            data: {
                key,
                label,
                emoji: emoji || '♻️',
                sortOrder: (maxOrder?.sortOrder || 0) + 1
            }
        });

        publishEvent('reports', 'wasteType.created', { wasteType });

        res.status(201).json(wasteType);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Waste type with this key already exists' });
        }
        console.error('Error creating waste type:', error);
        res.status(500).json({ error: 'Failed to create waste type' });
    }
}

export async function updateWasteType(req, res) {
    try {
        const { id } = req.params;
        const { key, label, emoji, enabled, sortOrder } = req.body;

        const wasteType = await prisma.wasteType.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(key && { key }),
                ...(label && { label }),
                ...(emoji !== undefined && { emoji }),
                ...(enabled !== undefined && { enabled }),
                ...(sortOrder !== undefined && { sortOrder })
            }
        });

        publishEvent('reports', 'wasteType.updated', { wasteType });

        res.json(wasteType);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Waste type not found' });
        }
        console.error('Error updating waste type:', error);
        res.status(500).json({ error: 'Failed to update waste type' });
    }
}

export async function deleteWasteType(req, res) {
    try {
        const { id } = req.params;

        await prisma.wasteType.delete({
            where: { id: parseInt(id, 10) }
        });

        publishEvent('reports', 'wasteType.deleted', { id });

        res.json({ success: true, message: 'Waste type deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Waste type not found' });
        }
        console.error('Error deleting waste type:', error);
        res.status(500).json({ error: 'Failed to delete waste type' });
    }
}

// ════════════════════════════════════════════════════════════
// URGENCY LEVELS MANAGEMENT
// ════════════════════════════════════════════════════════════

export async function getUrgencyLevels(req, res) {
    try {
        const isAdmin = req.user?.role === 'ADMIN';

        const urgencyLevels = await prisma.urgencyLevel.findMany({
            where: isAdmin ? {} : { enabled: true },
            orderBy: { sortOrder: 'asc' }
        });

        res.json(urgencyLevels);
    } catch (error) {
        console.error('Error fetching urgency levels:', error);
        res.status(500).json({ error: 'Failed to fetch urgency levels' });
    }
}

export async function createUrgencyLevel(req, res) {
    try {
        const { key, label, description, color } = req.body;

        if (!key || !label) {
            return res.status(400).json({ error: 'Key and label are required' });
        }

        const maxOrder = await prisma.urgencyLevel.findFirst({
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true }
        });

        const urgencyLevel = await prisma.urgencyLevel.create({
            data: {
                key,
                label,
                description,
                color,
                sortOrder: (maxOrder?.sortOrder || 0) + 1
            }
        });

        publishEvent('reports', 'urgencyLevel.created', { urgencyLevel });

        res.status(201).json(urgencyLevel);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Urgency level with this key already exists' });
        }
        console.error('Error creating urgency level:', error);
        res.status(500).json({ error: 'Failed to create urgency level' });
    }
}

export async function updateUrgencyLevel(req, res) {
    try {
        const { id } = req.params;
        const { key, label, description, color, enabled, sortOrder } = req.body;

        const urgencyLevel = await prisma.urgencyLevel.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(key && { key }),
                ...(label && { label }),
                ...(description !== undefined && { description }),
                ...(color !== undefined && { color }),
                ...(enabled !== undefined && { enabled }),
                ...(sortOrder !== undefined && { sortOrder })
            }
        });

        publishEvent('reports', 'urgencyLevel.updated', { urgencyLevel });

        res.json(urgencyLevel);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Urgency level not found' });
        }
        console.error('Error updating urgency level:', error);
        res.status(500).json({ error: 'Failed to update urgency level' });
    }
}

export async function deleteUrgencyLevel(req, res) {
    try {
        const { id } = req.params;

        await prisma.urgencyLevel.delete({
            where: { id: parseInt(id, 10) }
        });

        publishEvent('reports', 'urgencyLevel.deleted', { id });

        res.json({ success: true, message: 'Urgency level deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Urgency level not found' });
        }
        console.error('Error deleting urgency level:', error);
        res.status(500).json({ error: 'Failed to delete urgency level' });
    }
}

// ════════════════════════════════════════════════════════════
// ASSET CONDITIONS MANAGEMENT
// ════════════════════════════════════════════════════════════

export async function getAssetConditions(req, res) {
    try {
        const isAdmin = req.user?.role === 'ADMIN';

        const assetConditions = await prisma.assetCondition.findMany({
            where: isAdmin ? {} : { enabled: true },
            orderBy: { sortOrder: 'asc' }
        });

        res.json(assetConditions);
    } catch (error) {
        console.error('Error fetching asset conditions:', error);
        res.status(500).json({ error: 'Failed to fetch asset conditions' });
    }
}

export async function createAssetCondition(req, res) {
    try {
        const { key, label, description } = req.body;

        if (!key || !label) {
            return res.status(400).json({ error: 'Key and label are required' });
        }

        const maxOrder = await prisma.assetCondition.findFirst({
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true }
        });

        const assetCondition = await prisma.assetCondition.create({
            data: {
                key,
                label,
                description,
                sortOrder: (maxOrder?.sortOrder || 0) + 1
            }
        });

        publishEvent('reports', 'assetCondition.created', { assetCondition });

        res.status(201).json(assetCondition);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Asset condition with this key already exists' });
        }
        console.error('Error creating asset condition:', error);
        res.status(500).json({ error: 'Failed to create asset condition' });
    }
}

export async function updateAssetCondition(req, res) {
    try {
        const { id } = req.params;
        const { key, label, description, enabled, sortOrder } = req.body;

        const assetCondition = await prisma.assetCondition.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(key && { key }),
                ...(label && { label }),
                ...(description !== undefined && { description }),
                ...(enabled !== undefined && { enabled }),
                ...(sortOrder !== undefined && { sortOrder })
            }
        });

        publishEvent('reports', 'assetCondition.updated', { assetCondition });

        res.json(assetCondition);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Asset condition not found' });
        }
        console.error('Error updating asset condition:', error);
        res.status(500).json({ error: 'Failed to update asset condition' });
    }
}

export async function deleteAssetCondition(req, res) {
    try {
        const { id } = req.params;

        await prisma.assetCondition.delete({
            where: { id: parseInt(id, 10) }
        });

        publishEvent('reports', 'assetCondition.deleted', { id });

        res.json({ success: true, message: 'Asset condition deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Asset condition not found' });
        }
        console.error('Error deleting asset condition:', error);
        res.status(500).json({ error: 'Failed to delete asset condition' });
    }
}

