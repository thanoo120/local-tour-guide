import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:3001';

export function useAttractions() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttractions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/attractions`);

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      setAttractions(data);
    } catch (err) {
      console.warn('API fetch failed, loading fallback data:', err.message);
      setError(err.message);

      try {
        const { fallbackAttractions } = await import('../data/attractions.js');
        setAttractions(fallbackAttractions);
      } catch (importErr) {
        console.error('Failed to load fallback data:', importErr);
        setAttractions([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttractions();
  }, [fetchAttractions]);

  const getAttractionById = useCallback(
    (id) => attractions.find((a) => a.id === Number(id)),
    [attractions]
  );

  const getAttractionsByCategory = useCallback(
    (category) => {
      if (!category || category === 'All') return attractions;
      return attractions.filter((a) => a.category === category);
    },
    [attractions]
  );

  const getFeaturedAttractions = useCallback(
    () => attractions.filter((a) => a.featured),
    [attractions]
  );

  const searchAttractions = useCallback(
    (query) => {
      if (!query.trim()) return attractions;
      const lowerQuery = query.toLowerCase();
      return attractions.filter(
        (a) =>
          a.name.toLowerCase().includes(lowerQuery) ||
          a.shortDescription.toLowerCase().includes(lowerQuery) ||
          a.category.toLowerCase().includes(lowerQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(lowerQuery))
      );
    },
    [attractions]
  );

  return {
    attractions,
    loading,
    error,
    refetch: fetchAttractions,
    getAttractionById,
    getAttractionsByCategory,
    getFeaturedAttractions,
    searchAttractions,
  };
}
