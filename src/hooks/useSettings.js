import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export function useAssetCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await api.getAssetCategories();
            setCategories(data);
            setError(null);
        } catch (err) {
            console.error('Failed to load asset categories:', err);
            setError(err.message);
            // Fallback to default categories if API fails
            setCategories([
                { id: '1', name: 'furniture', label: 'Furniture', enabled: true },
                { id: '2', name: 'electronics', label: 'Electronics', enabled: true },
                { id: '3', name: 'fixtures', label: 'Fixtures', enabled: true },
                { id: '4', name: 'equipment', label: 'Equipment', enabled: true },
                { id: '5', name: 'other', label: 'Other', enabled: true },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();

        // Set up SSE listener for category changes
        const token = api.getToken?.();
        if (token) {
            const eventSource = new EventSource(`/api/reports/stream?token=${encodeURIComponent(token)}`);

            const handleCategoryChange = () => {
                loadCategories();
            };

            eventSource.addEventListener('assetCategory.created', handleCategoryChange);
            eventSource.addEventListener('assetCategory.updated', handleCategoryChange);
            eventSource.addEventListener('assetCategory.deleted', handleCategoryChange);

            return () => {
                eventSource.removeEventListener('assetCategory.created', handleCategoryChange);
                eventSource.removeEventListener('assetCategory.updated', handleCategoryChange);
                eventSource.removeEventListener('assetCategory.deleted', handleCategoryChange);
                eventSource.close();
            };
        }
    }, []);

    return { categories, loading, error, refresh: loadCategories };
}

export function useItemPresets() {
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPresets = async () => {
        try {
            setLoading(true);
            const data = await api.getItemPresets();
            setPresets(data);
            setError(null);
        } catch (err) {
            console.error('Failed to load item presets:', err);
            setError(err.message);
            setPresets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPresets();

        // Set up SSE listener for preset changes
        const token = api.getToken?.();
        if (token) {
            const eventSource = new EventSource(`/api/reports/stream?token=${encodeURIComponent(token)}`);

            const handlePresetChange = () => {
                loadPresets();
            };

            eventSource.addEventListener('itemPreset.created', handlePresetChange);
            eventSource.addEventListener('itemPreset.updated', handlePresetChange);
            eventSource.addEventListener('itemPreset.deleted', handlePresetChange);

            return () => {
                eventSource.removeEventListener('itemPreset.created', handlePresetChange);
                eventSource.removeEventListener('itemPreset.updated', handlePresetChange);
                eventSource.removeEventListener('itemPreset.deleted', handlePresetChange);
                eventSource.close();
            };
        }
    }, []);

    return { presets, loading, error, refresh: loadPresets };
}

export function useLocations(type) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLocations = async () => {
        try {
            setLoading(true);
            const data = await api.getLocations(type);
            setLocations(data);
            setError(null);
        } catch (err) {
            console.error('Failed to load locations:', err);
            setError(err.message);
            // Fallback to default locations if API fails
            if (type === 'BIN_LOCATION') {
                setLocations([
                    { id: '1', code: 'LOC-01', name: 'Cafeteria – Block A', type: 'BIN_LOCATION', enabled: true },
                    { id: '2', code: 'LOC-02', name: 'Library Entrance', type: 'BIN_LOCATION', enabled: true },
                    { id: '3', code: 'LOC-03', name: 'Gym Hallway', type: 'BIN_LOCATION', enabled: true },
                    { id: '4', code: 'LOC-04', name: 'Engineering Bldg – 2F', type: 'BIN_LOCATION', enabled: true },
                    { id: '5', code: 'LOC-05', name: 'Parking Lot B', type: 'BIN_LOCATION', enabled: true },
                    { id: '6', code: 'LOC-06', name: 'Student Center', type: 'BIN_LOCATION', enabled: true },
                    { id: '7', code: 'LOC-07', name: 'Science Hall – 1F', type: 'BIN_LOCATION', enabled: true },
                    { id: '8', code: 'LOC-08', name: 'Admin Building Lobby', type: 'BIN_LOCATION', enabled: true },
                    { id: '9', code: 'LOC-09', name: 'Arts Building – GF', type: 'BIN_LOCATION', enabled: true },
                    { id: '10', code: 'LOC-10', name: 'Main Gate Area', type: 'BIN_LOCATION', enabled: true },
                ]);
            } else if (type === 'ROOM_LOCATION') {
                setLocations([
                    { id: '11', code: 'ROOM-01', name: 'Room 101 – Science Hall', type: 'ROOM_LOCATION', building: 'Science Hall', enabled: true },
                    { id: '12', code: 'ROOM-02', name: 'Room 102 – Admin Building', type: 'ROOM_LOCATION', building: 'Admin Building', enabled: true },
                    { id: '13', code: 'ROOM-03', name: 'Room 201 – Science Hall', type: 'ROOM_LOCATION', building: 'Science Hall', enabled: true },
                    { id: '14', code: 'ROOM-04', name: 'Room 204 – Arts Building', type: 'ROOM_LOCATION', building: 'Arts Building', enabled: true },
                    { id: '15', code: 'ROOM-05', name: 'Room 305 – Engineering', type: 'ROOM_LOCATION', building: 'Engineering Building', enabled: true },
                    { id: '16', code: 'ROOM-06', name: 'Computer Lab 1 – IT Building', type: 'ROOM_LOCATION', building: 'IT Building', enabled: true },
                    { id: '17', code: 'ROOM-07', name: 'Computer Lab 2 – IT Building', type: 'ROOM_LOCATION', building: 'IT Building', enabled: true },
                    { id: '18', code: 'ROOM-08', name: 'Computer Lab 3 – IT Building', type: 'ROOM_LOCATION', building: 'IT Building', enabled: true },
                    { id: '19', code: 'ROOM-09', name: 'Faculty Office – Admin Building', type: 'ROOM_LOCATION', building: 'Admin Building', enabled: true },
                    { id: '20', code: 'ROOM-10', name: 'Conference Room – Admin Building', type: 'ROOM_LOCATION', building: 'Admin Building', enabled: true },
                    { id: '21', code: 'ROOM-11', name: 'Library – 2nd Floor', type: 'ROOM_LOCATION', building: 'Library', enabled: true },
                    { id: '22', code: 'ROOM-12', name: 'Gym – Sports Complex', type: 'ROOM_LOCATION', building: 'Sports Complex', enabled: true },
                ]);
            } else {
                setLocations([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLocations();

        // Set up SSE listener for location changes
        const token = api.getToken?.();
        if (token) {
            const eventSource = new EventSource(`/api/reports/stream?token=${encodeURIComponent(token)}`);

            const handleLocationChange = () => {
                loadLocations();
            };

            eventSource.addEventListener('location.created', handleLocationChange);
            eventSource.addEventListener('location.updated', handleLocationChange);
            eventSource.addEventListener('location.deleted', handleLocationChange);

            return () => {
                eventSource.removeEventListener('location.created', handleLocationChange);
                eventSource.removeEventListener('location.updated', handleLocationChange);
                eventSource.removeEventListener('location.deleted', handleLocationChange);
                eventSource.close();
            };
        }
    }, [type]);

    return { locations, loading, error, refresh: loadLocations };
}

// ════════════════════════════════════════════════════════════
// WASTE TYPES HOOK
// ════════════════════════════════════════════════════════════

export function useWasteTypes() {
    const [wasteTypes, setWasteTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadWasteTypes = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.get('/settings/waste-types');
            setWasteTypes(data);
            setError(null);
        } catch (err) {
            console.error('Error loading waste types:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWasteTypes();
    }, [loadWasteTypes]);

    // Real-time synchronization
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const eventSource = new EventSource(`${api.baseUrl}/reports/stream?token=${token}`);

        const handleWasteTypeChange = () => {
            loadWasteTypes();
        };

        eventSource.addEventListener('wasteType.created', handleWasteTypeChange);
        eventSource.addEventListener('wasteType.updated', handleWasteTypeChange);
        eventSource.addEventListener('wasteType.deleted', handleWasteTypeChange);

        return () => {
            eventSource.removeEventListener('wasteType.created', handleWasteTypeChange);
            eventSource.removeEventListener('wasteType.updated', handleWasteTypeChange);
            eventSource.removeEventListener('wasteType.deleted', handleWasteTypeChange);
            eventSource.close();
        };
    }, [loadWasteTypes]);

    return { wasteTypes, loading, error, refresh: loadWasteTypes };
}

// ════════════════════════════════════════════════════════════
// URGENCY LEVELS HOOK
// ════════════════════════════════════════════════════════════

export function useUrgencyLevels() {
    const [urgencyLevels, setUrgencyLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUrgencyLevels = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.get('/settings/urgency-levels');
            setUrgencyLevels(data);
            setError(null);
        } catch (err) {
            console.error('Error loading urgency levels:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUrgencyLevels();
    }, [loadUrgencyLevels]);

    // Real-time synchronization
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const eventSource = new EventSource(`${api.baseUrl}/reports/stream?token=${token}`);

        const handleUrgencyLevelChange = () => {
            loadUrgencyLevels();
        };

        eventSource.addEventListener('urgencyLevel.created', handleUrgencyLevelChange);
        eventSource.addEventListener('urgencyLevel.updated', handleUrgencyLevelChange);
        eventSource.addEventListener('urgencyLevel.deleted', handleUrgencyLevelChange);

        return () => {
            eventSource.removeEventListener('urgencyLevel.created', handleUrgencyLevelChange);
            eventSource.removeEventListener('urgencyLevel.updated', handleUrgencyLevelChange);
            eventSource.removeEventListener('urgencyLevel.deleted', handleUrgencyLevelChange);
            eventSource.close();
        };
    }, [loadUrgencyLevels]);

    return { urgencyLevels, loading, error, refresh: loadUrgencyLevels };
}

// ════════════════════════════════════════════════════════════
// ASSET CONDITIONS HOOK
// ════════════════════════════════════════════════════════════

export function useAssetConditions() {
    const [assetConditions, setAssetConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAssetConditions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.get('/settings/asset-conditions');
            setAssetConditions(data);
            setError(null);
        } catch (err) {
            console.error('Error loading asset conditions:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAssetConditions();
    }, [loadAssetConditions]);

    // Real-time synchronization
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const eventSource = new EventSource(`${api.baseUrl}/reports/stream?token=${token}`);

        const handleAssetConditionChange = () => {
            loadAssetConditions();
        };

        eventSource.addEventListener('assetCondition.created', handleAssetConditionChange);
        eventSource.addEventListener('assetCondition.updated', handleAssetConditionChange);
        eventSource.addEventListener('assetCondition.deleted', handleAssetConditionChange);

        return () => {
            eventSource.removeEventListener('assetCondition.created', handleAssetConditionChange);
            eventSource.removeEventListener('assetCondition.updated', handleAssetConditionChange);
            eventSource.removeEventListener('assetCondition.deleted', handleAssetConditionChange);
            eventSource.close();
        };
    }, [loadAssetConditions]);

    return { assetConditions, loading, error, refresh: loadAssetConditions };
}
