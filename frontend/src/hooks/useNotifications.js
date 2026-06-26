import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'lanka_notifications';

/**
 * Hook to manage browser notifications.
 *
 * @returns {{
 *   supported: boolean,
 *   permission: NotificationPermission | 'unsupported',
 *   enabled: boolean,
 *   enable: () => Promise<boolean>,
 *   disable: () => void,
 *   notify: (title: string, body?: string) => void,
 * }}
 */
export function useNotifications() {
  const supported = typeof window !== 'undefined' && 'Notification' in window;

  const [permission, setPermission] = useState(() =>
    supported ? Notification.permission : 'unsupported',
  );

  // User preference (separate from browser permission)
  const [enabled, setEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'true';
      // Default: off until user explicitly enables
      return false;
    } catch {
      return false;
    }
  });

  // Keep permission in sync (e.g. if user changes it in browser settings)
  useEffect(() => {
    if (!supported) return;
    const check = () => setPermission(Notification.permission);
    // Some browsers fire change events on the permission
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'notifications' }).then((status) => {
        status.addEventListener('change', check);
      }).catch(() => {});
    }
  }, [supported]);

  /**
   * Request browser notification permission and enable notifications.
   * Returns true if permission was granted.
   */
  const enable = useCallback(async () => {
    if (!supported) return false;

    if (Notification.permission === 'granted') {
      setEnabled(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      setPermission('granted');
      return true;
    }

    if (Notification.permission === 'denied') {
      // Can't request again — user must change it in browser settings
      setPermission('denied');
      return false;
    }

    // Request permission
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        setEnabled(true);
        localStorage.setItem(STORAGE_KEY, 'true');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [supported]);

  const disable = useCallback(() => {
    setEnabled(false);
    localStorage.setItem(STORAGE_KEY, 'false');
  }, []);

  /**
   * Fire a browser notification (only if enabled + permission granted).
   */
  const notify = useCallback(
    (title, body = '') => {
      if (!supported || !enabled || Notification.permission !== 'granted') return;
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      } catch {
        // Silent fail (e.g. mobile browsers that don't support new Notification())
      }
    },
    [supported, enabled],
  );

  return { supported, permission, enabled, enable, disable, notify };
}
