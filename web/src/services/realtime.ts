import { logger } from '@/utils/functions';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

(window as any).Pusher = Pusher;

const key =  (import.meta as any).env.VITE_REVERB_APP_KEY || 'local-key';
const host = (import.meta as any).env.VITE_REVERB_HOST || '192.168.1.172'
const port = (import.meta as any).env.VITE_REVERB_PORT || 8080
const useTLS = (import.meta as any).env.VITE_REVERB_SCHEME === "wss" || false
const cluster = (import.meta as any).env.VITE_PUSHER_APP_CLUSTER || 'mt1';

export const echo = new Echo({
  broadcaster: 'pusher',
  key,
  cluster,
  wsHost: host,
  wsPort: port,
  wssPort: port,
  forceTLS: useTLS,
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  enableLogging: true,
});

const isPusherConnector = (connector: any): connector is { pusher: any } => {
  return connector && typeof connector.pusher !== 'undefined';
};
if (isPusherConnector(echo.connector)) {
  echo.connector.pusher.connection.bind('connected', () => {
    logger.log('✅ Reverb WebSocket connected');
  });

  echo.connector.pusher.connection.bind('disconnected', () => {
    logger.log('❌ Reverb WebSocket disconnected');
  });

  echo.connector.pusher.connection.bind('error', (error: any) => {
    logger.error('🔥 Reverb WebSocket error:', error);
  });
} else {
  logger.warn('⚠️ Echo connector does not support Pusher connection events');
}

export default echo;
