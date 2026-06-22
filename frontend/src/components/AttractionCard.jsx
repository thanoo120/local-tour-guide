import { Link } from 'react-router-dom';
import { calculateDistance, formatDistance } from '../utils/distance';

const CATEGORY_GRADIENTS = {
  Historical: ['#92400e', '#b45309', '#d97706'],
  Nature:     ['#065f46', '#047857', '#10b981'],
  Hotels:     ['#1e3a5f', '#1d4ed8', '#3b82f6'],
  Beach:      ['#0c4a6e', '#0284c7', '#38bdf8'],
  Religious:  ['#4c1d95', '#7c3aed', '#a78bfa'],
  default:    ['#00513f', '#016b54', '#2d9e80'],
};

export default function AttractionCard({ attraction, userPosition, isFavorite, onToggleFavorite, index = 0, compact = false }) {
  const distance = userPosition
    ? calculateDistance(userPosition.latitude, userPosition.longitude, attraction.latitude, attraction.longitude)
    : null;

  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  const [c0, c1, c2] = CATEGORY_GRADIENTS[attraction.category] || CATEGORY_GRADIENTS.default;

  const locationLabel = attraction.address?.split(',').slice(0, 2).join(',').trim();

  return (
    <Link
      to={`/attraction/${attraction.id}`}
      className={`group block overflow-hidden rounded-xl bg-white dark:bg-surface-900
                  shadow-sm hover:shadow-lg transition-all duration-300
                  border border-surface-100 dark:border-surface-800
                  animate-fade-in-up ${staggerClass}`}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: compact ? '4 / 3' : '16 / 9',
          background: `linear-gradient(135deg, ${c0} 0%, ${c1} 55%, ${c2} 100%)`,
        }}
      >
        <img
          src={attraction.images?.[0] || ''}
          alt={attraction.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Favourite button */}
        <button
          type="button"
          aria-label="Toggle favourite"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(attraction.id); }}
          className="absolute top-3 right-3 z-10 flex items-center justify-center
                     bg-white/90 backdrop-blur-sm rounded-full shadow-md
                     transition-transform active:scale-90"
          style={{ width: compact ? 30 : 40, height: compact ? 30 : 40 }}
        >
          <svg
            width={compact ? 14 : 18}
            height={compact ? 14 : 18}
            viewBox="0 0 24 24"
            fill={isFavorite ? '#ef4444' : 'none'}
            stroke={isFavorite ? '#ef4444' : '#9ca3af'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Distance badge */}
        {distance !== null && (
          <div
            className="absolute flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white rounded-full font-semibold shadow-sm"
            style={{ bottom: 8, left: 8, padding: compact ? '2px 8px' : '4px 10px', fontSize: compact ? 10 : 12 }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            {formatDistance(distance)} away
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: compact ? '10px' : '16px' }}>
        {/* Title + rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-heading font-bold text-surface-900 dark:text-surface-100 leading-snug flex-1 line-clamp-2"
            style={{ fontSize: compact ? 13 : 17 }}
          >
            {attraction.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
            <svg width={compact ? 12 : 15} height={compact ? 12 : 15} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-semibold text-surface-600 dark:text-surface-400" style={{ fontSize: compact ? 11 : 13 }}>
              {attraction.rating}
            </span>
          </div>
        </div>

        {/* Location */}
        {locationLabel && (
          <div className="flex items-center gap-1 mb-2" style={{ color: '#6b7280', fontSize: compact ? 11 : 13 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="line-clamp-1">{locationLabel}</span>
          </div>
        )}

        {/* Short description */}
        {!compact && (attraction.shortDescription || attraction.description) && (
          <p
            className="text-surface-500 dark:text-surface-400 line-clamp-2"
            style={{ fontSize: 13, lineHeight: '1.55' }}
          >
            {attraction.shortDescription || attraction.description?.split('\n\n')[0]}
          </p>
        )}
      </div>
    </Link>
  );
}
