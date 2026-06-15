import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { calculateDistance, formatDistance } from '../utils/distance';
import { CATEGORY_COLORS } from '../data/attractions';

export default function AttractionCard({ attraction, userPosition, isFavorite, onToggleFavorite, index = 0 }) {
  const distance = userPosition
    ? calculateDistance(userPosition.latitude, userPosition.longitude, attraction.latitude, attraction.longitude)
    : null;

  const categoryColors = CATEGORY_COLORS[attraction.category] || {
    bg: 'bg-surface-100 dark:bg-surface-800',
    text: 'text-surface-600 dark:text-surface-300',
    dot: 'bg-surface-400',
  };

  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;

  return (
    <Link
      to={`/attraction/${attraction.id}`}
      className={`block bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-sm
                  hover:shadow-md active:scale-[0.98] transition-all duration-300
                  animate-fade-in-up ${staggerClass}`}
    >
      {/* Image */}
      <div className="relative h-44 bg-surface-200 dark:bg-surface-800 overflow-hidden">
        <img
          src={attraction.images?.[0] || '/images/placeholder.jpg'}
          alt={attraction.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(attraction.id)}
            size="sm"
          />
        </div>

        {/* Featured badge */}
        {attraction.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-[10px] font-bold
                           uppercase tracking-wide px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}

        {/* Distance badge */}
        {distance !== null && (
          <span className="absolute bottom-3 left-3 glass text-surface-700 dark:text-surface-200
                           text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {formatDistance(distance)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category chip */}
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide
                          px-2.5 py-1 rounded-full mb-2 ${categoryColors.bg} ${categoryColors.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${categoryColors.dot}`} />
          {attraction.category}
        </span>

        <h3 className="font-heading font-semibold text-surface-900 dark:text-surface-100 text-base leading-tight mb-1 line-clamp-1">
          {attraction.name}
        </h3>

        <p className="text-surface-500 dark:text-surface-400 text-sm line-clamp-2 mb-3 leading-snug">
          {attraction.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">
              {attraction.rating}
            </span>
            <span className="text-xs text-surface-400">
              ({attraction.reviewCount?.toLocaleString()})
            </span>
          </div>

          {/* Entry fee */}
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
            {attraction.entryFee === 'Free' ? '🆓 Free' : attraction.entryFee?.split(' ')[0]}
          </span>
        </div>
      </div>
    </Link>
  );
}
