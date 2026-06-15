import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

export default function FavoritesPage({ favorites, isFavorite, onToggleFavorite, onClearFavorites }) {
  const { getAttractionById, loading } = useAttractions();
  const { position } = useGeolocation();

  const favoriteAttractions = favorites
    .map((id) => getAttractionById(id))
    .filter(Boolean);

  return (
    <div className="page-content">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-surface-900 dark:text-surface-100 text-2xl mb-1">
            Favorites
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm">
            {favoriteAttractions.length} saved place{favoriteAttractions.length !== 1 ? 's' : ''}
          </p>
        </div>
        {favoriteAttractions.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="text-red-500 dark:text-red-400 text-sm font-medium hover:text-red-600 transition-colors"
            type="button"
          >
            Clear all
          </button>
        )}
      </div>

      {loading ? (
        <div className="px-4 grid grid-cols-1 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="skeleton h-44 w-full" />
              <div className="bg-white dark:bg-surface-900 p-4 space-y-2">
                <div className="skeleton h-4 w-24 rounded-full" />
                <div className="skeleton h-5 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : favoriteAttractions.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-5">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" className="text-surface-400">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <h3 className="font-heading font-semibold text-surface-700 dark:text-surface-300 text-xl mb-2">
            No favorites yet
          </h3>
          <p className="text-surface-500 dark:text-surface-400 text-sm mb-6 leading-relaxed">
            Tap the heart icon on any attraction to save it here for quick access.
          </p>
          <Link
            to="/explore"
            className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm
                       hover:bg-primary-700 active:scale-95 transition-all"
          >
            Explore Attractions
          </Link>
        </div>
      ) : (
        <div className="px-4 grid grid-cols-1 gap-4 pb-4">
          {favoriteAttractions.map((attraction, i) => (
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
      )}
    </div>
  );
}
