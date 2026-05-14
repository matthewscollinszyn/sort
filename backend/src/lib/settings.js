import prisma from './prisma.js';

// ─── Fallback defaults ───────────────────────────────────────────────────────
// These prevent the app from crashing when a key is missing from the database.
// Admins can override any of these via the /api/settings/system endpoint.
const SETTING_DEFAULTS = {
    points_gold_threshold: '300',   // Quarterly points needed for certificate
    points_1st: '15',    // Points for 1st reporter
    points_2nd: '10',    // Points for 2nd reporter
    points_3rd: '5',     // Points for 3rd reporter
    current_quarter_end: null,    // ISO date string e.g. "2026-05-31" — no hard fallback
};

/**
 * Fetch a single system setting value from the database.
 * Falls back to the provided `fallback` argument, then to SETTING_DEFAULTS,
 * then to null if nothing is found.
 *
 * @param {string} key     - The setting key to look up
 * @param {string|null} [fallback] - Optional per-call fallback value
 * @returns {Promise<string|null>}
 */
export const getSystemSetting = async (key, fallback = undefined) => {
    try {
        const setting = await prisma.systemSettings.findUnique({
            where: { key },
            select: { value: true },
        });

        if (setting?.value !== undefined && setting.value !== null) {
            return setting.value;
        }

        // Caller-provided fallback takes priority over built-in default
        if (fallback !== undefined) return fallback;
        if (key in SETTING_DEFAULTS) return SETTING_DEFAULTS[key];

        return null;
    } catch (error) {
        console.error(`[settings] Failed to read key "${key}":`, error.message);
        // Never crash — return the safest available value
        if (fallback !== undefined) return fallback;
        if (key in SETTING_DEFAULTS) return SETTING_DEFAULTS[key];
        return null;
    }
};

/**
 * Fetch multiple setting values in one round-trip.
 * Returns an object keyed by setting key, with fallbacks applied.
 *
 * @param {Array<{key: string, fallback?: string}>} requests
 * @returns {Promise<Record<string, string|null>>}
 */
export const getSystemSettings = async (requests) => {
    try {
        const keys = requests.map(r => r.key);
        const rows = await prisma.systemSettings.findMany({
            where: { key: { in: keys } },
            select: { key: true, value: true },
        });

        const map = Object.fromEntries(rows.map(r => [r.key, r.value]));

        return Object.fromEntries(
            requests.map(({ key, fallback }) => {
                const value = map[key] ?? fallback ?? SETTING_DEFAULTS[key] ?? null;
                return [key, value];
            })
        );
    } catch (error) {
        console.error('[settings] Failed to bulk-read settings:', error.message);
        // Graceful degradation — return all fallbacks
        return Object.fromEntries(
            requests.map(({ key, fallback }) => [
                key,
                fallback ?? SETTING_DEFAULTS[key] ?? null,
            ])
        );
    }
};

export { SETTING_DEFAULTS };
