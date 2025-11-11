import { useState, useCallback, useEffect, useRef } from 'react';

export interface AppNotification {
  title: string;
  description: string;
  type: string;
  data?: any;
}

export function useBrowserNotification() {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const initialized = useRef(false);

  /**
   * Initialize the browser notification service
   */
  const initialize = useCallback(async (): Promise<boolean> => {
    if (initialized.current) return isSupported;

    try {
      if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        setIsSupported(false);
        return false;
      }

      setIsSupported(true);
      setPermission(Notification.permission);

      if (Notification.permission === 'default') {
        const result = await Notification.requestPermission();
        setPermission(result);
      }

      initialized.current = true;
      console.log('Browser notification service initialized with permission:', Notification.permission);
      return Notification.permission === 'granted';
    } catch (error) {
      console.error('Failed to initialize browser notification service:', error);
      setIsSupported(false);
      return false;
    }
  }, [isSupported]);

  /**
   * Request notification permission manually
   */
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) return 'denied';
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      console.log('Notification permission requested:', result);
      return result;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      setPermission('denied');
      return 'denied';
    }
  }, [isSupported]);

  /**
   * Check if notifications are allowed
   */
  const canNotify = useCallback(() => {
    return isSupported && permission === 'granted';
  }, [isSupported, permission]);

  /**
   * Focus the app window/tab
   */
  const focusApp = useCallback(() => {
    try {
      window.focus();
      if (document.hidden) window.focus();
      console.log('App focused via notification click');
    } catch (error) {
      console.error('Failed to focus app:', error);
    }
  }, []);

  /**
   * Show a native browser notification
   */
  const showNotification = useCallback(
    async (title: string, options: NotificationOptions = {}): Promise<Notification | null> => {
      if (!canNotify()) {
        console.log('Cannot show notification - permission not granted or not supported');
        return null;
      }

      try {
        const defaultOptions: NotificationOptions = {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          requireInteraction: false,
          silent: false,
          ...options
        };

        const notification = new Notification(title, defaultOptions);
        notification.onclick = () => {
          focusApp();
          notification.close();
        };

        setTimeout(() => notification.close(), 5000);

        console.log('Browser notification shown:', title);
        return notification;
      } catch (error) {
        console.error('Failed to show browser notification:', error);
        return null;
      }
    },
    [canNotify, focusApp]
  );

  /**
   * Show an app-level notification with type + emoji
   */
  const showAppNotification = useCallback(
    async (notification: AppNotification): Promise<Notification | null> => {
      const emoji = getNotificationEmoji(notification.type);
      const title = emoji ? `${emoji} ${notification.title}` : notification.title;
      const body = notification.description;

      return showNotification(title, {
        body,
        tag: `notification-${notification.type}`,
        data: {
          type: 'app-notification',
          notificationData: notification.data,
          notificationType: notification.type
        }
      });
    },
    [showNotification]
  );

  /**
   * Emoji mapping by type
   */
  const getNotificationEmoji = useCallback((type: string): string => {
    const emojiMap: Record<string, string> = {
      shop_created: '🏪',
      vendor_application_submitted: '📝',
      user_registration: '👤',
      complaint_created: '⚠️',
      system: '⚙️',
      alert: '🚨',
      customer: '🛒',
      vendor: '🏢',
      staff: '👥',
      shop: '🏪'
    };
    return emojiMap[type] || '🔔';
  }, []);

  /**
   * Should show notification (when tab inactive)
   */
  const shouldShowNotification = useCallback(() => {
    return !document.hasFocus() || document.hidden;
  }, []);

  /**
   * Clear all notifications
   */
  const clearAllNotifications = useCallback(() => {
    if ('serviceWorker' in navigator && 'getRegistrations' in navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.getNotifications().then((notifications) => {
            notifications.forEach((n) => n.close());
          });
        });
      });
    }
  }, []);

  /**
   * Auto initialize once (optional)
   */
  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    isSupported,
    permission,
    canNotify,
    initialize,
    showNotification,
    showAppNotification,
    requestPermission,
    shouldShowNotification,
    clearAllNotifications,
    focusApp
  };
}
