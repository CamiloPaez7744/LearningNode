import type { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

interface WssOptions {
    server: Server;
    path?: string;
}

// Singleton
export class WssService {

    private static _instance: WssService;
    private wss: WebSocketServer

    private constructor(
        options: WssOptions
    ) {
        const { server, path = '/ws' } = options;
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static get instance() {
        if (!WssService._instance) {
            throw new Error('WssService not initialized');
        }
        return WssService._instance;
    }

    static initWss(options: WssOptions) {
        WssService._instance = new WssService(options);
    }

    public sendMessage(type: string, payload: Object) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type, payload }));
            }
        });
    }

    public start() {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');

            ws.on('close', () => console.log('Client disconnected'));
        });
    }
}