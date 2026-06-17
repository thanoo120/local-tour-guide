import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import CategoryFilter from '../components/CategoryFilter';
import AttractionCard from '../components/AttractionCard';

export default function ExplorePage({ isFavorite, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');

  const { attractions, loading, searchAttractions, getAttractionsByCategory } = useAttractions();
  const { position } = useGeolocation();

  // Sync category from URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    setSearchQuery('');
    setSearchError('');
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.length === 1) {
      setSearchError('Please enter at least 2 characters to search.');
    } else {
      setSearchError('');
    }
  };

  const trimmed = searchQuery.trim();
  const displayedAttractions = trimmed.length >= 2
    ? searchAttractions(trimmed)
    : trimmed.length === 0
      ? getAttractionsByCategory(activeCategory)
      : [];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="px-4 pb-2 pt-safe">
        <h1 className="font-heading font-bold text-surface-900 dark:text-surface-100 text-2xl mb-1">
          Explore
        </h1>
        <p className="text-surface-500 dark:text-surface-400 text-sm">
          {attractions.length} destinations in Sri Lanka
        </p>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-2">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400"
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search attractions, tags..."
            minLength={2}
            aria-describedby={searchError ? 'search-error' : undefined}
            className={`w-full bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200
                       placeholder-surface-400 rounded-2xl pl-10 pr-4 py-3 text-sm outline-none
                       focus:ring-2 transition-all ${searchError ? 'ring-2 ring-red-400 focus:ring-red-400' : 'focus:ring-primary-500'}`}
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setSearchError(''); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchError && (
          <p id="search-error" className="text-red-500 text-xs mt-1.5 pl-1">{searchError}</p>
        )}
      </div>

      {/* Category filter */}
      {!trimmed && (
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      )}

      {/* Results */}
      <div className="px-4 pt-2">
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton h-44 w-full" />
                <div className="bg-white dark:bg-surface-900 p-4 space-y-2">
                  <div className="skeleton h-4 w-24 rounded-full" />
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedAttractions.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-heading font-semibold text-surface-700 dark:text-surface-300 text-lg mb-2">
              No results found
            </h3>
            <p className="text-surface-500 dark:text-surface-400 text-sm">
              Try a different search or category
            </p>
          </div>
        ) : (
          <>
            {trimmed.length >= 2 && (
              <p className="text-surface-500 dark:text-surface-400 text-sm mb-3">
                {displayedAttractions.length} result{displayedAttractions.length !== 1 ? 's' : ''} for &ldquo;{trimmed}&rdquo;
              </p>
            )}
            <div className="grid grid-cols-1 gap-4 pb-4">
              {displayedAttractions.map((attraction, i) => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  userPosition={position}
                  isFavorite={isFavorite(attraction.id)}
                  onToggleFavorite={onToggleFavorite}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
