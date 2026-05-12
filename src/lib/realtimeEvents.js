/* =========================================================
   EcoLedger – Singleton SSE EventBus
   Shares ONE EventSource across all hooks and components,
   preventing the HTTP/1.1 max-6-connections-per-origin limit
   from blocking regular fetch() calls.
   ========================================================= */

import api from '../services/api';

class RealtimeEventBus {
    constructor() {
        /** @type {EventSource|null} */
        this._es = null;
        /** @type {Map<string, Set<Function>>} */
        this._listeners = new Map();
        /** @type {Set<string>} events already attached to the EventSource */
        this._attached = new Set();
        this._reconnectTimer = null;
    }

    // ── Private helpers ─────────────────────────────────

    _attachEvent(eventType) {
        if (!this._es || this._attached.has(eventType)) return;
        this._attached.add(eventType);
        this._es.addEventListener(eventType, (e) => {
            const handlers = this._listeners.get(eventType);
            if (!handlers || handlers.size === 0) return;
            let data;
            try { data = JSON.parse(e.data); } catch { data = e.data; }
            handlers.forEach((h) => {
                try { h(data, e); } catch (err) {
                    console.error('[RealtimeEventBus] handler error:', err);
                }
            });
        });
    }

    _createEventSource() {
        const token = api.getToken();
        if (!token) return; // Not authenticated yet

        const url = api.getReportsStreamUrl();
        this._es = new EventSource(url);

        this._es.addEventListener('open', () => {
            console.log('[RealtimeEventBus] SSE connected');
            if (this._reconnectTimer) {
                clearTimeout(this._reconnectTimer);
                this._reconnectTimer = null;
            }
        });

        this._es.addEventListener('error', () => {
            // EventSource auto-reconnects on error; we just log it
            console.warn('[RealtimeEventBus] SSE error / reconnecting...');
        });

        // Re-attach all known event types
        this._attached.clear();
        for (const eventType of this._listeners.keys()) {
            this._attachEvent(eventType);
        }
    }

    // ── Public API ──────────────────────────────────────

    /**
     * Subscribe to an SSE event type.
     * Returns an unsubscribe function.
     *
     * @param {string} eventType
     * @param {Function} handler  Called with (parsedData, rawEvent)
     * @returns {() => void}
     */
    subscribe(eventType, handler) {
        if (!this._listeners.has(eventType)) {
            this._listeners.set(eventType, new Set());
        }
        this._listeners.get(eventType).add(handler);

        // Ensure EventSource exists
        if (!this._es || this._es.readyState === EventSource.CLOSED) {
            this._createEventSource();
        }

        // Attach the event listener if not yet attached
        this._attachEvent(eventType);

        return () => {
            const set = this._listeners.get(eventType);
            if (set) set.delete(handler);
        };
    }

    /**
     * Connect or reconnect. Call this after login when a token is available.
     */
    connect() {
        if (!this._es || this._es.readyState === EventSource.CLOSED) {
            this._createEventSource();
        }
    }

    /**
     * Tear down the EventSource. Call on signout.
     */
    disconnect() {
        if (this._es) {
            this._es.close();
            this._es = null;
            this._attached.clear();
            console.log('[RealtimeEventBus] SSE disconnected (signout)');
        }
    }
}

// Export a module-level singleton
const realtimeEvents = new RealtimeEventBus();
export default realtimeEvents;
