import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ceylon_wanderer_favorites';

/**
 * Custom hook for managing attraction favorites with LocalStorage persistence.
 * @returns {{ favorites, isFavorite, toggleFavorite, clearFavorites, favoritesCount }}
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites:', e);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  );

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fid) => fid !== id);
      }
      return [...prev, id];
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
}
