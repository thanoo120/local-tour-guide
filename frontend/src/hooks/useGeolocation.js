import { useState, useEffect, useCallback } from 'react';


export function useGeolocation() {
  const STORAGE_KEY = 'ceylon_wanderer_geolocation';
  const DEFAULT_POSITION = { latitude: 6.9271, longitude: 79.8612 }; // Colombo

  const getCachedPosition = () => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (e) {
     
    }
    return null;
  };

  const [position, setPosition] = useState(getCachedPosition() || DEFAULT_POSITION);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'granted' | 'denied' | 'prompt'

  const updatePosition = useCallback((coords) => {
    const pos = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp: Date.now(),
    };
    setPosition(pos);
    setError(null);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
    } catch (e) {
      
    }
  }, []);

  const requestPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setPermissionStatus('denied');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updatePosition(pos.coords);
        setPermissionStatus('granted');
        setLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setError(err.message);
        setPermissionStatus('denied');
        setLoading(false);
        
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, 
      }
    );
  }, [updatePosition]);

  
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state);
        if (result.state === 'granted') {
          requestPosition();
        }
        result.onchange = () => {
          setPermissionStatus(result.state);
        };
      }).catch(() => {
       
      });
    }
  }, [requestPosition]);

  return {
    position,
    error,
    loading,
    permissionStatus,
    requestPosition,
    isUsingDefault: !getCachedPosition() && permissionStatus !== 'granted',
  };
}
