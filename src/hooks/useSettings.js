import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import realtimeEvents from '../lib/realtimeEvents';

// Helper to extract data from API response (handles both {success, data} and raw array)
const extractData = (response) => {
    if (!response) return [];
    if (response.success && Array.isArray(response.data)) return response.data;
    if (Array.isArray(response)) return response;
    return [];
};

export function useAssetCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCategories = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.getAssetCategories();
            const data = extractData(response);
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
    }, []);

    useEffect(() => {
        loadCategories();

        const token = api.getToken?.();
        if (!token) return;

        const unsub1 = realtimeEvents.subscribe('assetCategory.created', loadCategories);
        const unsub2 = realtimeEvents.subscribe('assetCategory.updated', loadCategories);
        const unsub3 = realtimeEvents.subscribe('assetCategory.deleted', loadCategories);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [loadCategories]);

    return { categories, loading, error, refresh: loadCategories };
}

export function useItemPresets(categoryId) {
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPresets = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.getItemPresets(categoryId);
            const data = extractData(response);
            setPresets(data);
            setError(null);
        } catch (err) {
            console.error('Failed to load item presets:', err);
            setError(err.message);
            setPresets([]);
        } finally {
            setLoading(false);
        }
    }, [categoryId]);

    useEffect(() => {
        loadPresets();

        const token = api.getToken?.();
        if (!token) return;

        const unsub1 = realtimeEvents.subscribe('itemPreset.created', loadPresets);
        const unsub2 = realtimeEvents.subscribe('itemPreset.updated', loadPresets);
        const unsub3 = realtimeEvents.subscribe('itemPreset.deleted', loadPresets);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [loadPresets]);

    return { presets, loading, error, refresh: loadPresets };
}

export function useLocations(type) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLocations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.getLocations(type);
            const data = extractData(response);
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
    }, [type]);

    useEffect(() => {
        loadLocations();

        const token = api.getToken?.();
        if (!token) return;

        const unsub1 = realtimeEvents.subscribe('location.created', loadLocations);
        const unsub2 = realtimeEvents.subscribe('location.updated', loadLocations);
        const unsub3 = realtimeEvents.subscribe('location.deleted', loadLocations);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [loadLocations]);

    return { locations, loading, error, refresh: loadLocations };
}

export function useWasteTypes() {
    const [wasteTypes, setWasteTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadWasteTypes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/settings/waste-types');
            const data = extractData(response);
            setWasteTypes(data);
            setError(null);
        } catch (err) {
            console.error('Error loading waste types:', err);
            setError(err.message);
            // Fallback for safety
            setWasteTypes([
                { key: 'recyclable', label: 'Recyclable', emoji: '♻️', enabled: true },
                { key: 'biodegradable', label: 'Biodegradable', emoji: '🌿', enabled: true },
                { key: 'residual', label: 'Residual', emoji: '🗑️', enabled: true },
                { key: 'hazardous', label: 'Special/Hazardous', emoji: '☣️', enabled: true },
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWasteTypes();
    }, [loadWasteTypes]);

    useEffect(() => {
        const token = api.getToken();
        if (!token) return;

        const unsub1 = realtimeEvents.subscribe('wasteType.created', loadWasteTypes);
        const unsub2 = realtimeEvents.subscribe('wasteType.updated', loadWasteTypes);
        const unsub3 = realtimeEvents.subscribe('wasteType.deleted', loadWasteTypes);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [loadWasteTypes]);

    return { wasteTypes, loading, error, refresh: loadWasteTypes };
}

export function useUrgencyLevels() {
    const [urgencyLevels, setUrgencyLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUrgencyLevels = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/settings/urgency-levels');
            const data = extractData(response);
            setUrgencyLevels(data);
            setError(null);
        } catch (err) {
            console.error('Error loading urgency levels:', err);
            setError(err.message);
            // Fallback for safety
            setUrgencyLevels([
                { key: 'low', label: 'Low', color: 'border-slate-400 bg-slate-100 text-slate-500', enabled: true },
                { key: 'normal', label: 'Normal', color: 'border-amber-500/30 bg-amber-400/10 text-amber-400', enabled: true },
                { key: 'high', label: 'Urgent', color: 'border-red-500/30 bg-red-400/10 text-red-400', enabled: true },
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUrgencyLevels();
    }, [loadUrgencyLevels]);

    useEffect(() => {
        const token = api.getToken();
        if (!token) return;

        const unsub1 = realtimeEvents.subscribe('urgencyLevel.created', loadUrgencyLevels);
        const unsub2 = realtimeEvents.subscribe('urgencyLevel.updated', loadUrgencyLevels);
        const unsub3 = realtimeEvents.subscribe('urgencyLevel.deleted', loadUrgencyLevels);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [loadUrgencyLevels]);

    return { urgencyLevels, loading, error, refresh: loadUrgencyLevels };
}

export function useAssetConditions() {
    const [assetConditions, setAssetConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAssetConditions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/settings/asset-conditions');
            const data = extractData(response);
            setAssetConditions(data);
            setError(null);
        } catch (err) {
            console.error('Error loading asset conditions:', err);
            setError(err.message);
            // Fallback for safety
            setAssetConditions([
                { key: 'damaged', label: 'Damaged', enabled: true },
                { key: 'malfunctioning', label: 'Malfunctioning', enabled: true },
                { key: 'worn', label: 'Worn Out', enabled: true },
                { key: 'missing', label: 'Missing Parts', enabled: true },
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAssetConditions();
    }, [loadAssetConditions]);

    useEffect(() => {
        const token = api.getToken();
        if (!token) return;

        const unsub1 = realtimeEvents.subscribe('assetCondition.created', loadAssetConditions);
        const unsub2 = realtimeEvents.subscribe('assetCondition.updated', loadAssetConditions);
        const unsub3 = realtimeEvents.subscribe('assetCondition.deleted', loadAssetConditions);

        return () => { unsub1(); unsub2(); unsub3(); };
    }, [loadAssetConditions]);

    return { assetConditions, loading, error, refresh: loadAssetConditions };
}
