const clients = new Map();

function writeSse(res, event, data) {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
}

export function subscribeToEvents({ res, channel = 'global', initialEvent = null }) {
    const clientId = `${channel}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    const heartbeat = setInterval(() => {
        writeSse(res, 'heartbeat', { ok: true, ts: new Date().toISOString() });
    }, 25000);

    clients.set(clientId, { res, channel, heartbeat });

    if (initialEvent) {
        writeSse(res, initialEvent.type, initialEvent.payload);
    }

    res.on('close', () => {
        clearInterval(heartbeat);
        clients.delete(clientId);
    });

    return () => {
        clearInterval(heartbeat);
        clients.delete(clientId);
    };
}

export function publishEvent(channel, event, payload) {
    for (const client of clients.values()) {
        if (client.channel !== channel && client.channel !== 'global') {
            continue;
        }

        writeSse(client.res, event, {
            ...payload,
            emittedAt: new Date().toISOString(),
        });
    }
}

export function initializeSse(res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();
}