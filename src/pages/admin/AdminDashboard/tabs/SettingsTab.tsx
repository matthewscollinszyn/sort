import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Plus, Trash2, Edit2, Save, X, Check, Building, MapPin, Tag, Package, Award, Flame, AlertTriangle, Wrench } from 'lucide-react';
import { Card } from '../components';
import api from '../../../../services/api';
import LocationItem from './LocationItem';
import UrgencyLevelsSection from './UrgencyLevelsSection';
import AssetConditionsSection from './AssetConditionsSection';

interface AssetCategory {
    id: string;
    name: string;
    label: string;
    enabled: boolean;
    sortOrder: number;
}

interface ItemPreset {
    id: string;
    name: string;
    icon: string;
    categoryId: string;
    enabled: boolean;
    sortOrder: number;
    category?: {
        name: string;
        label: string;
    };
}

interface Location {
    id: string;
    code: string;
    name: string;
    type: 'BIN_LOCATION' | 'ROOM_LOCATION';
    building?: string | null;
    enabled: boolean;
    sortOrder: number;
}

interface WasteType {
    id: string;
    key: string;
    label: string;
    emoji: string;
    enabled: boolean;
    sortOrder: number;
}

interface UrgencyLevel {
    id: string;
    key: string;
    label: string;
    description: string;
    color: string;
    enabled: boolean;
    sortOrder: number;
}

interface AssetCondition {
    id: string;
    key: string;
    label: string;
    description: string;
    enabled: boolean;
    sortOrder: number;
}

interface SettingsTabProps {
    theme: 'dark' | 'light';
}

export default function SettingsTab({ theme }: SettingsTabProps) {
    const [activeSection, setActiveSection] = useState<'categories' | 'items' | 'locations' | 'points' | 'wasteTypes' | 'urgencyLevels' | 'assetConditions'>('categories');
    const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([]);
    const [itemPresets, setItemPresets] = useState<ItemPreset[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
    const [urgencyLevels, setUrgencyLevels] = useState<UrgencyLevel[]>([]);
    const [assetConditions, setAssetConditions] = useState<AssetCondition[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Points system state
    const [pointsSettings, setPointsSettings] = useState([
        { key: 'points_1st', value: '15', label: '1st Reporter Points' },
        { key: 'points_2nd', value: '10', label: '2nd Reporter Points' },
        { key: 'points_3rd', value: '5', label: '3rd Reporter Points' },
    ]);
    const [editingPoints, setEditingPoints] = useState(false);
    const [pointsDraft, setPointsDraft] = useState<Record<string, string>>({});

    // Form states
    const [categoryForm, setCategoryForm] = useState({ name: '', label: '' });
    const [itemForm, setItemForm] = useState({ name: '', icon: '📦', categoryId: '' });
    const [locationForm, setLocationForm] = useState({
        code: '',
        name: '',
        type: 'ROOM_LOCATION' as 'BIN_LOCATION' | 'ROOM_LOCATION',
        building: '',
    });
    const [wasteTypeForm, setWasteTypeForm] = useState({ key: '', label: '', emoji: '♻️' });
    const [urgencyLevelForm, setUrgencyLevelForm] = useState({
        key: '',
        label: '',
        description: '',
        color: 'border-slate-400 bg-slate-100 text-slate-500'
    });
    const [assetConditionForm, setAssetConditionForm] = useState({ key: '', label: '', description: '' });

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        type: 'category' | 'item' | 'location' | 'wasteType' | 'urgencyLevel' | 'assetCondition' | null;
        id: string | null;
        name: string;
    }>({ isOpen: false, type: null, id: null, name: '' });

    useEffect(() => {
        loadData();

        // Set up SSE listener for real-time settings changes
        const token = api.getToken?.();
        if (token) {
            const eventSource = new EventSource(`/api/reports/stream?token=${encodeURIComponent(token)}`);

            const handleSettingsChange = () => {
                // Refetch all settings when there's a change
                loadData();
            };

            eventSource.addEventListener('assetCategory.created', handleSettingsChange);
            eventSource.addEventListener('assetCategory.updated', handleSettingsChange);
            eventSource.addEventListener('assetCategory.deleted', handleSettingsChange);
            eventSource.addEventListener('itemPreset.created', handleSettingsChange);
            eventSource.addEventListener('itemPreset.updated', handleSettingsChange);
            eventSource.addEventListener('itemPreset.deleted', handleSettingsChange);
            eventSource.addEventListener('location.created', handleSettingsChange);
            eventSource.addEventListener('location.updated', handleSettingsChange);
            eventSource.addEventListener('location.deleted', handleSettingsChange);
            eventSource.addEventListener('systemSettings.updated', handleSettingsChange);
            eventSource.addEventListener('wasteType.created', handleSettingsChange);
            eventSource.addEventListener('wasteType.updated', handleSettingsChange);
            eventSource.addEventListener('wasteType.deleted', handleSettingsChange);
            eventSource.addEventListener('urgencyLevel.created', handleSettingsChange);
            eventSource.addEventListener('urgencyLevel.updated', handleSettingsChange);
            eventSource.addEventListener('urgencyLevel.deleted', handleSettingsChange);
            eventSource.addEventListener('assetCondition.created', handleSettingsChange);
            eventSource.addEventListener('assetCondition.updated', handleSettingsChange);
            eventSource.addEventListener('assetCondition.deleted', handleSettingsChange);

            return () => {
                eventSource.removeEventListener('assetCategory.created', handleSettingsChange);
                eventSource.removeEventListener('assetCategory.updated', handleSettingsChange);
                eventSource.removeEventListener('assetCategory.deleted', handleSettingsChange);
                eventSource.removeEventListener('itemPreset.created', handleSettingsChange);
                eventSource.removeEventListener('itemPreset.updated', handleSettingsChange);
                eventSource.removeEventListener('itemPreset.deleted', handleSettingsChange);
                eventSource.removeEventListener('location.created', handleSettingsChange);
                eventSource.removeEventListener('location.updated', handleSettingsChange);
                eventSource.removeEventListener('location.deleted', handleSettingsChange);
                eventSource.removeEventListener('systemSettings.updated', handleSettingsChange);
                eventSource.removeEventListener('wasteType.created', handleSettingsChange);
                eventSource.removeEventListener('wasteType.updated', handleSettingsChange);
                eventSource.removeEventListener('wasteType.deleted', handleSettingsChange);
                eventSource.removeEventListener('urgencyLevel.created', handleSettingsChange);
                eventSource.removeEventListener('urgencyLevel.updated', handleSettingsChange);
                eventSource.removeEventListener('urgencyLevel.deleted', handleSettingsChange);
                eventSource.removeEventListener('assetCondition.created', handleSettingsChange);
                eventSource.removeEventListener('assetCondition.updated', handleSettingsChange);
                eventSource.removeEventListener('assetCondition.deleted', handleSettingsChange);
                eventSource.close();
            };
        }
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [categoriesData, locationsData, itemsData, settingsData, wasteTypesData, urgencyLevelsData, assetConditionsData] = await Promise.all([
                api.getAssetCategories(),
                api.getLocations(),
                api.getItemPresets(),
                api.getSystemSettings(),
                api.get('/settings/waste-types'),
                api.get('/settings/urgency-levels'),
                api.get('/settings/asset-conditions'),
            ]);
            setAssetCategories(categoriesData);
            setLocations(locationsData);
            setItemPresets(itemsData);
            setWasteTypes(wasteTypesData);
            setUrgencyLevels(urgencyLevelsData);
            setAssetConditions(assetConditionsData);
            if (settingsData?.data) {
                setPointsSettings(settingsData.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (msg: string, type: 'success' | 'error') => {
        if (type === 'success') {
            setSuccess(msg);
            setTimeout(() => setSuccess(null), 3000);
        } else {
            setError(msg);
            setTimeout(() => setError(null), 3000);
        }
    };

    // ═══════════════════════════════════════════════════════════
    // ASSET CATEGORIES HANDLERS
    // ═══════════════════════════════════════════════════════════

    const handleAddCategory = async () => {
        if (!categoryForm.name.trim() || !categoryForm.label.trim()) {
            showNotification('Name and label are required', 'error');
            return;
        }

        try {
            const newCategory = await api.createAssetCategory(categoryForm);
            setAssetCategories([...assetCategories, newCategory]);
            setCategoryForm({ name: '', label: '' });
            setAdding(false);
            showNotification('Category added successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to add category', 'error');
        }
    };

    const handleUpdateCategory = async (id: string, updates: Partial<AssetCategory>) => {
        try {
            const updated = await api.updateAssetCategory(id, updates);
            setAssetCategories(assetCategories.map((c) => (c.id === id ? updated : c)));
            setEditingId(null);
            showNotification('Category updated successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to update category', 'error');
        }
    };

    const handleDeleteCategory = async (id: string, name: string) => {
        setDeleteModal({ isOpen: true, type: 'category', id, name });
    };

    const confirmDeleteCategory = async () => {
        if (!deleteModal.id) return;

        try {
            await api.deleteAssetCategory(deleteModal.id);
            setAssetCategories(assetCategories.filter((c) => c.id !== deleteModal.id));
            showNotification('Category deleted successfully', 'success');
            setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
        } catch (err: any) {
            showNotification(err.message || 'Failed to delete category', 'error');
        }
    };

    // ═══════════════════════════════════════════════════════════
    // ITEM PRESETS HANDLERS
    // ═══════════════════════════════════════════════════════════

    const handleAddItem = async () => {
        if (!itemForm.name.trim() || !itemForm.categoryId) {
            showNotification('Name and category are required', 'error');
            return;
        }

        try {
            const newItem = await api.createItemPreset(itemForm);
            setItemPresets([...itemPresets, newItem]);
            setItemForm({ name: '', icon: '📦', categoryId: '' });
            setAdding(false);
            showNotification('Item preset added successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to add item', 'error');
        }
    };

    const handleUpdateItem = async (id: string, updates: Partial<ItemPreset>) => {
        try {
            const updated = await api.updateItemPreset(id, updates);
            setItemPresets(itemPresets.map((i) => (i.id === id ? updated : i)));
            setEditingId(null);
            showNotification('Item preset updated successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to update item', 'error');
        }
    };

    const handleDeleteItem = async (id: string, name: string) => {
        setDeleteModal({ isOpen: true, type: 'item', id, name });
    };

    const confirmDeleteItem = async () => {
        if (!deleteModal.id) return;

        try {
            await api.deleteItemPreset(deleteModal.id);
            setItemPresets(itemPresets.filter((i) => i.id !== deleteModal.id));
            showNotification('Item preset deleted successfully', 'success');
            setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
        } catch (err: any) {
            showNotification(err.message || 'Failed to delete item', 'error');
        }
    };

    // ═══════════════════════════════════════════════════════════
    // LOCATIONS HANDLERS
    // ═══════════════════════════════════════════════════════════

    const handleAddLocation = async () => {
        if (!locationForm.code.trim() || !locationForm.name.trim()) {
            showNotification('Code and name are required', 'error');
            return;
        }

        try {
            const newLocation = await api.createLocation(locationForm);
            setLocations([...locations, newLocation]);
            setLocationForm({ code: '', name: '', type: 'BIN_LOCATION', building: '' });
            setAdding(false);
            showNotification('Location added successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to add location', 'error');
        }
    };

    const handleUpdateLocation = async (id: string, updates: Partial<Location>) => {
        try {
            const updated = await api.updateLocation(id, updates);
            setLocations(locations.map((l) => (l.id === id ? updated : l)));
            setEditingId(null);
            showNotification('Location updated successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to update location', 'error');
        }
    };

    const handleDeleteLocation = async (id: string, name: string) => {
        setDeleteModal({ isOpen: true, type: 'location', id, name });
    };

    const confirmDeleteLocation = async () => {
        if (!deleteModal.id) return;

        try {
            await api.deleteLocation(deleteModal.id);
            setLocations(locations.filter((l) => l.id !== deleteModal.id));
            showNotification('Location deleted successfully', 'success');
            setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
        } catch (err: any) {
            showNotification(err.message || 'Failed to delete location', 'error');
        }
    };

    // ════════════════════════════════════════════════════════════
    // WASTE TYPES CRUD
    // ════════════════════════════════════════════════════════════

    const handleCreateWasteType = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wasteTypeForm.key.trim() || !wasteTypeForm.label.trim()) {
            showNotification('Key and label are required', 'error');
            return;
        }
        try {
            const created = await api.post('/settings/waste-types', wasteTypeForm);
            setWasteTypes([...wasteTypes, created]);
            setWasteTypeForm({ key: '', label: '', emoji: '♻️' });
            setAdding(false);
            showNotification('Waste type created successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to create waste type', 'error');
        }
    };

    const handleUpdateWasteType = async (id: string, updates: Partial<WasteType>) => {
        try {
            const updated = await api.put(`/settings/waste-types/${id}`, updates);
            setWasteTypes(wasteTypes.map((w) => (w.id === id ? updated : w)));
            setEditingId(null);
            showNotification('Waste type updated successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to update waste type', 'error');
        }
    };

    const handleDeleteWasteType = async (id: string, label: string) => {
        setDeleteModal({ isOpen: true, type: 'wasteType', id, name: label });
    };

    const confirmDeleteWasteType = async () => {
        if (!deleteModal.id) return;
        try {
            await api.delete(`/settings/waste-types/${deleteModal.id}`);
            setWasteTypes(wasteTypes.filter((w) => w.id !== deleteModal.id));
            showNotification('Waste type deleted successfully', 'success');
            setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
        } catch (err: any) {
            showNotification(err.message || 'Failed to delete waste type', 'error');
        }
    };

    // ════════════════════════════════════════════════════════════
    // URGENCY LEVELS CRUD
    // ════════════════════════════════════════════════════════════

    const handleCreateUrgencyLevel = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!urgencyLevelForm.key.trim() || !urgencyLevelForm.label.trim()) {
            showNotification('Key and label are required', 'error');
            return;
        }
        try {
            const created = await api.post('/settings/urgency-levels', urgencyLevelForm);
            setUrgencyLevels([...urgencyLevels, created]);
            setUrgencyLevelForm({ key: '', label: '', description: '', color: 'border-slate-400 bg-slate-100 text-slate-500' });
            setAdding(false);
            showNotification('Urgency level created successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to create urgency level', 'error');
        }
    };

    const handleUpdateUrgencyLevel = async (id: string, updates: Partial<UrgencyLevel>) => {
        try {
            const updated = await api.put(`/settings/urgency-levels/${id}`, updates);
            setUrgencyLevels(urgencyLevels.map((u) => (u.id === id ? updated : u)));
            setEditingId(null);
            showNotification('Urgency level updated successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to update urgency level', 'error');
        }
    };

    const handleDeleteUrgencyLevel = async (id: string, label: string) => {
        setDeleteModal({ isOpen: true, type: 'urgencyLevel', id, name: label });
    };

    const confirmDeleteUrgencyLevel = async () => {
        if (!deleteModal.id) return;
        try {
            await api.delete(`/settings/urgency-levels/${deleteModal.id}`);
            setUrgencyLevels(urgencyLevels.filter((u) => u.id !== deleteModal.id));
            showNotification('Urgency level deleted successfully', 'success');
            setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
        } catch (err: any) {
            showNotification(err.message || 'Failed to delete urgency level', 'error');
        }
    };

    // ════════════════════════════════════════════════════════════
    // ASSET CONDITIONS CRUD
    // ════════════════════════════════════════════════════════════

    const handleCreateAssetCondition = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!assetConditionForm.key.trim() || !assetConditionForm.label.trim()) {
            showNotification('Key and label are required', 'error');
            return;
        }
        try {
            const created = await api.post('/settings/asset-conditions', assetConditionForm);
            setAssetConditions([...assetConditions, created]);
            setAssetConditionForm({ key: '', label: '', description: '' });
            setAdding(false);
            showNotification('Asset condition created successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to create asset condition', 'error');
        }
    };

    const handleUpdateAssetCondition = async (id: string, updates: Partial<AssetCondition>) => {
        try {
            const updated = await api.put(`/settings/asset-conditions/${id}`, updates);
            setAssetConditions(assetConditions.map((a) => (a.id === id ? updated : a)));
            setEditingId(null);
            showNotification('Asset condition updated successfully', 'success');
        } catch (err: any) {
            showNotification(err.message || 'Failed to update asset condition', 'error');
        }
    };

    const handleDeleteAssetCondition = async (id: string, label: string) => {
        setDeleteModal({ isOpen: true, type: 'assetCondition', id, name: label });
    };

    const confirmDeleteAssetCondition = async () => {
        if (!deleteModal.id) return;
        try {
            await api.delete(`/settings/asset-conditions/${deleteModal.id}`);
            setAssetConditions(assetConditions.filter((a) => a.id !== deleteModal.id));
            showNotification('Asset condition deleted successfully', 'success');
            setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
        } catch (err: any) {
            showNotification(err.message || 'Failed to delete asset condition', 'error');
        }
    };

    const handleConfirmDelete = () => {
        switch (deleteModal.type) {
            case 'category':
                confirmDeleteCategory();
                break;
            case 'item':
                confirmDeleteItem();
                break;
            case 'location':
                confirmDeleteLocation();
                break;
            case 'wasteType':
                confirmDeleteWasteType();
                break;
            case 'urgencyLevel':
                confirmDeleteUrgencyLevel();
                break;
            case 'assetCondition':
                confirmDeleteAssetCondition();
                break;
        }
    };

    const roomLocations = locations.filter((l) => l.type === 'ROOM_LOCATION');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-blue-500" />
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    System Settings
                </h2>
            </div>

            {/* Notifications */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2"
                >
                    <Check className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-green-500">{success}</p>
                </motion.div>
            )}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2"
                >
                    <X className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{error}</p>
                </motion.div>
            )}

            {/* Section Tabs */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setActiveSection('categories')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'categories'
                        ? 'bg-blue-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <Tag className="inline-block h-4 w-4 mr-2" />
                    Asset Categories
                </button>
                <button
                    onClick={() => setActiveSection('items')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'items'
                        ? 'bg-blue-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <Package className="inline-block h-4 w-4 mr-2" />
                    Item Presets
                </button>
                <button
                    onClick={() => setActiveSection('locations')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'locations'
                        ? 'bg-blue-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <MapPin className="inline-block h-4 w-4 mr-2" />
                    Locations
                </button>
                <button
                    onClick={() => setActiveSection('points')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'points'
                        ? 'bg-amber-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <Award className="inline-block h-4 w-4 mr-2" />
                    Points System
                </button>
                <button
                    onClick={() => setActiveSection('wasteTypes')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'wasteTypes'
                        ? 'bg-green-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <Trash2 className="inline-block h-4 w-4 mr-2" />
                    Waste Types
                </button>
                <button
                    onClick={() => setActiveSection('urgencyLevels')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'urgencyLevels'
                        ? 'bg-orange-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <AlertTriangle className="inline-block h-4 w-4 mr-2" />
                    Urgency Levels
                </button>
                <button
                    onClick={() => setActiveSection('assetConditions')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === 'assetConditions'
                        ? 'bg-purple-500 text-white'
                        : theme === 'dark'
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <Wrench className="inline-block h-4 w-4 mr-2" />
                    Asset Conditions
                </button>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ASSET CATEGORIES SECTION */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {activeSection === 'categories' && (
                <Card theme={theme}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Asset Categories
                        </h3>
                        <button
                            onClick={() => setAdding(!adding)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                            <Plus className="h-4 w-4" />
                            Add Category
                        </button>
                    </div>

                    {/* Add Form */}
                    {adding && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-3"
                        >
                            <input
                                type="text"
                                placeholder="Category name (lowercase, e.g., furniture)"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="Display label (e.g., Furniture)"
                                value={categoryForm.label}
                                onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddCategory}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                                >
                                    <Save className="h-4 w-4" />
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setAdding(false);
                                        setCategoryForm({ name: '', label: '' });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Categories List */}
                    <div className="space-y-2">
                        {assetCategories.length === 0 ? (
                            <p className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
                                No categories yet
                            </p>
                        ) : (
                            assetCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                                        }`}
                                >
                                    {editingId === category.id ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={category.label}
                                                onChange={(e) =>
                                                    setAssetCategories(
                                                        assetCategories.map((c) => (c.id === category.id ? { ...c, label: e.target.value } : c))
                                                    )
                                                }
                                                className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark'
                                                    ? 'bg-slate-900 border-slate-600 text-white'
                                                    : 'bg-white border-slate-300 text-slate-900'
                                                    }`}
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateCategory(category.id, { label: category.label })}
                                                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                                                >
                                                    <Save className="h-3 w-3" />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-slate-500 text-white rounded-lg hover:bg-slate-600 text-xs"
                                                >
                                                    <X className="h-3 w-3" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                    {category.label}
                                                </p>
                                                <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                                                    {category.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleUpdateCategory(category.id, { enabled: !category.enabled })
                                                    }
                                                    className={`px-3 py-1 rounded-lg text-xs font-medium ${category.enabled
                                                        ? 'bg-green-500/10 text-green-500'
                                                        : 'bg-slate-500/10 text-slate-500'
                                                        }`}
                                                >
                                                    {category.enabled ? 'Enabled' : 'Disabled'}
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(category.id)}
                                                    className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                                                        }`}
                                                >
                                                    <Edit2 className="h-4 w-4 text-blue-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category.id, category.label)}
                                                    className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                                                        }`}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            )}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ITEM PRESETS SECTION */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {activeSection === 'items' && (
                <Card theme={theme}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Item Presets
                        </h3>
                        <button
                            onClick={() => setAdding(!adding)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                            <Plus className="h-4 w-4" />
                            Add Item
                        </button>
                    </div>

                    {/* Add Form */}
                    {adding && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-3"
                        >
                            <select
                                value={itemForm.categoryId}
                                onChange={(e) => setItemForm({ ...itemForm, categoryId: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            >
                                <option value="">Select Category</option>
                                {assetCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Item name (e.g., Chair, Desk, Computer)"
                                value={itemForm.name}
                                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="Icon emoji (e.g., 🪑, 🖥️, 💡)"
                                value={itemForm.icon}
                                onChange={(e) => setItemForm({ ...itemForm, icon: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddItem}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                                >
                                    <Save className="h-4 w-4" />
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setAdding(false);
                                        setItemForm({ name: '', icon: '📦', categoryId: '' });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Group items by category */}
                    {assetCategories.length === 0 ? (
                        <p className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
                            No categories available. Create categories first.
                        </p>
                    ) : (
                        assetCategories.map((category) => {
                            const categoryItems = itemPresets.filter((item) => item.categoryId === category.id);
                            return (
                                <div key={category.id} className="mb-6">
                                    <h4 className={`text-sm font-bold mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {category.label}
                                    </h4>
                                    <div className="space-y-2">
                                        {categoryItems.length === 0 ? (
                                            <p className={`text-xs py-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
                                                No items in this category yet
                                            </p>
                                        ) : (
                                            categoryItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                                                        }`}
                                                >
                                                    {editingId === item.id ? (
                                                        <div className="space-y-2">
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={item.name}
                                                                    onChange={(e) =>
                                                                        setItemPresets(
                                                                            itemPresets.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i))
                                                                        )
                                                                    }
                                                                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${theme === 'dark'
                                                                        ? 'bg-slate-900 border-slate-600 text-white'
                                                                        : 'bg-white border-slate-300 text-slate-900'
                                                                        }`}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={item.icon}
                                                                    onChange={(e) =>
                                                                        setItemPresets(
                                                                            itemPresets.map((i) => (i.id === item.id ? { ...i, icon: e.target.value } : i))
                                                                        )
                                                                    }
                                                                    className={`w-16 px-3 py-2 rounded-lg border text-sm text-center ${theme === 'dark'
                                                                        ? 'bg-slate-900 border-slate-600 text-white'
                                                                        : 'bg-white border-slate-300 text-slate-900'
                                                                        }`}
                                                                />
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleUpdateItem(item.id, { name: item.name, icon: item.icon })}
                                                                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                                                                >
                                                                    <Save className="h-3 w-3" />
                                                                    Save
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditingId(null)}
                                                                    className="flex items-center gap-1 px-3 py-1 bg-slate-500 text-white rounded-lg hover:bg-slate-600 text-xs"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xl">{item.icon}</span>
                                                                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                                    {item.name}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleUpdateItem(item.id, { enabled: !item.enabled })}
                                                                    className={`px-3 py-1 rounded-lg text-xs font-medium ${item.enabled
                                                                        ? 'bg-green-500/10 text-green-500'
                                                                        : 'bg-slate-500/10 text-slate-500'
                                                                        }`}
                                                                >
                                                                    {item.enabled ? 'Enabled' : 'Disabled'}
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditingId(item.id)}
                                                                    className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                                                                        }`}
                                                                >
                                                                    <Edit2 className="h-4 w-4 text-blue-500" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteItem(item.id, item.name)}
                                                                    className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                                                                        }`}
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </Card>
            )}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* LOCATIONS SECTION - ROOM LOCATIONS ONLY */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {activeSection === 'locations' && (
                <div className="space-y-6">
                    {/* Add Location Form */}
                    <Card theme={theme}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                Add New Building/Room Location
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Location code (e.g., ROOM-13)"
                                value={locationForm.code}
                                onChange={(e) => setLocationForm({ ...locationForm, code: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="Location name"
                                value={locationForm.name}
                                onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="Building name"
                                value={locationForm.building}
                                onChange={(e) => setLocationForm({ ...locationForm, building: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <button
                                onClick={handleAddLocation}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                            >
                                <Plus className="h-4 w-4" />
                                Add Location
                            </button>
                        </div>
                    </Card>

                    {/* Room Locations */}
                    <Card theme={theme}>
                        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Building/Room Locations (Asset Reports)
                        </h3>
                        <div className="space-y-2">
                            {roomLocations.length === 0 ? (
                                <p className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
                                    No room locations yet
                                </p>
                            ) : (
                                roomLocations.map((location) => (
                                    <LocationItem
                                        key={location.id}
                                        location={location}
                                        theme={theme}
                                        onUpdate={handleUpdateLocation}
                                        onDelete={handleDeleteLocation}
                                    />
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* POINTS SYSTEM SECTION */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {activeSection === 'points' && (
                <Card theme={theme} className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-amber-500" />
                            <h3 className="text-lg font-bold text-slate-900">Points System</h3>
                        </div>
                        {!editingPoints ? (
                            <button
                                onClick={() => {
                                    const draft: Record<string, string> = {};
                                    pointsSettings.forEach(p => { draft[p.key] = p.value; });
                                    setPointsDraft(draft);
                                    setEditingPoints(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-medium transition-colors"
                            >
                                <Edit2 className="h-4 w-4" /> Edit Points
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={async () => {
                                        try {
                                            const updates = Object.entries(pointsDraft).map(([key, value]) => ({ key, value }));
                                            await api.updateSystemSettings(updates);
                                            setPointsSettings(prev => prev.map(p => ({ ...p, value: pointsDraft[p.key] ?? p.value })));
                                            setEditingPoints(false);
                                            showNotification('Points updated successfully', 'success');
                                        } catch (err: any) {
                                            showNotification(err.message || 'Failed to update points', 'error');
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium transition-colors"
                                >
                                    <Save className="h-4 w-4" /> Save
                                </button>
                                <button
                                    onClick={() => setEditingPoints(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 text-sm font-medium transition-colors"
                                >
                                    <X className="h-4 w-4" /> Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-slate-600 mb-5">
                        When the same bin is reported by multiple users, only the first 3 reporters earn points after admin verification.
                    </p>

                    <div className="space-y-3">
                        {[
                            { key: 'points_1st', rank: '1st', emoji: '🥇', color: 'border-amber-300 bg-amber-50' },
                            { key: 'points_2nd', rank: '2nd', emoji: '🥈', color: 'border-slate-300 bg-slate-50' },
                            { key: 'points_3rd', rank: '3rd', emoji: '🥉', color: 'border-orange-300 bg-orange-50' },
                        ].map(({ key, rank, emoji, color }) => {
                            const setting = pointsSettings.find(p => p.key === key);
                            const pts = setting?.value ?? '0';
                            return (
                                <div key={key} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${color}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{emoji}</span>
                                        <div>
                                            <p className="font-semibold text-slate-900">{rank} Reporter</p>
                                            {!editingPoints && (
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    <Flame className="h-3 w-3 text-amber-500" /> {pts} points awarded
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {editingPoints ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="1000"
                                                value={pointsDraft[key] ?? pts}
                                                onChange={e => setPointsDraft(prev => ({ ...prev, [key]: e.target.value }))}
                                                className="w-24 px-3 py-2 rounded-lg border border-amber-300 bg-white text-slate-900 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                                            />
                                            <span className="text-sm text-slate-500 font-medium">pts</span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl font-bold text-amber-600">{pts} pts</span>
                                    )}
                                </div>
                            );
                        })}
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🚫</span>
                                <div>
                                    <p className="font-semibold text-slate-500">4th+ Reporter</p>
                                    <p className="text-sm text-slate-400">No points awarded</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-slate-400">0 pts</span>
                        </div>
                    </div>
                </Card>
            )}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* WASTE TYPES SECTION */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {activeSection === 'wasteTypes' && (
                <Card theme={theme}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Waste Types
                        </h3>
                        <button
                            onClick={() => setAdding(!adding)}
                            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                            <Plus className="h-4 w-4" />
                            Add Waste Type
                        </button>
                    </div>

                    {adding && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-4 p-4 bg-green-500/5 border border-green-500/20 rounded-xl space-y-3"
                        >
                            <input
                                type="text"
                                placeholder="Key (e.g., recyclable, biodegradable)"
                                value={wasteTypeForm.key}
                                onChange={(e) => setWasteTypeForm({ ...wasteTypeForm, key: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="Label (e.g., Recyclable, Biodegradable)"
                                value={wasteTypeForm.label}
                                onChange={(e) => setWasteTypeForm({ ...wasteTypeForm, label: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="Emoji (e.g., ♻️, 🌿)"
                                value={wasteTypeForm.emoji}
                                onChange={(e) => setWasteTypeForm({ ...wasteTypeForm, emoji: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700 text-white'
                                    : 'bg-white border-slate-300 text-slate-900'
                                    }`}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCreateWasteType}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                                >
                                    <Save className="h-4 w-4" />
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setAdding(false);
                                        setWasteTypeForm({ key: '', label: '', emoji: '♻️' });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        {wasteTypes.map((waste) => (
                            <div
                                key={waste.id}
                                className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark'
                                    ? 'bg-slate-800 border-slate-700'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-2xl">{waste.emoji}</span>
                                    {editingId === waste.id ? (
                                        <div className="flex gap-2 flex-1">
                                            <input
                                                type="text"
                                                defaultValue={waste.label}
                                                onBlur={(e) => handleUpdateWasteType(waste.id, { label: e.target.value })}
                                                className={`px-3 py-1 rounded border ${theme === 'dark'
                                                    ? 'bg-slate-700 border-slate-600 text-white'
                                                    : 'bg-white border-slate-300 text-slate-900'
                                                    }`}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                {waste.label}
                                            </p>
                                            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                                {waste.key}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleUpdateWasteType(waste.id, { enabled: !waste.enabled })}
                                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${waste.enabled
                                            ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                                            : 'bg-slate-500/20 text-slate-600 hover:bg-slate-500/30'
                                            }`}
                                    >
                                        {waste.enabled ? 'Enabled' : 'Disabled'}
                                    </button>
                                    <button
                                        onClick={() => setEditingId(editingId === waste.id ? null : waste.id)}
                                        className="p-2 rounded hover:bg-blue-500/10 text-blue-500 transition-colors"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteWasteType(waste.id, waste.label)}
                                        className="p-2 rounded hover:bg-red-500/10 text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {activeSection === 'urgencyLevels' && (
                <UrgencyLevelsSection
                    theme={theme}
                    urgencyLevels={urgencyLevels}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    adding={adding}
                    setAdding={setAdding}
                    urgencyLevelForm={urgencyLevelForm}
                    setUrgencyLevelForm={setUrgencyLevelForm}
                    onAdd={handleCreateUrgencyLevel}
                    onUpdate={handleUpdateUrgencyLevel}
                    onDelete={handleDeleteUrgencyLevel}
                />
            )}

            {activeSection === 'assetConditions' && (
                <AssetConditionsSection
                    theme={theme}
                    assetConditions={assetConditions}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    adding={adding}
                    setAdding={setAdding}
                    assetConditionForm={assetConditionForm}
                    setAssetConditionForm={setAssetConditionForm}
                    onAdd={handleCreateAssetCondition}
                    onUpdate={handleUpdateAssetCondition}
                    onDelete={handleDeleteAssetCondition}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`max-w-md w-full rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
                            }`}
                    >
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                                    <Trash2 className="h-6 w-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        Delete {deleteModal.type === 'category' ? 'Category' : deleteModal.type === 'item' ? 'Item Preset' : 'Location'}?
                                    </h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                        }`}>
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>
                            <div className={`rounded-xl p-4 mb-6 ${theme === 'dark' ? 'bg-red-500/5 border border-red-500/20' : 'bg-red-50 border border-red-200'
                                }`}>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                                    Are you sure you want to delete <span className="font-semibold">{deleteModal.name}</span>?
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModal({ isOpen: false, type: null, id: null, name: '' })}
                                    className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${theme === 'dark'
                                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
