import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { calculateDistance, formatDistance } from '../utils/distance';

const CATEGORY_GRADIENTS = {
  Historical: ['#92400e', '#b45309', '#d97706'],
  Nature:     ['#065f46', '#047857', '#10b981'],
  Hotels:     ['#1e3a5f', '#1d4ed8', '#3b82f6'],
  Beach:      ['#0c4a6e', '#0284c7', '#38bdf8'],
  Religious:  ['#4c1d95', '#7c3aed', '#a78bfa'],
  default:    ['#00513f', '#016b54', '#2d9e80'],
};

export default function AttractionCard({ attraction, userPosition, isFavorite, onToggleFavorite, index = 0 }) {
  const distance = userPosition
    ? calculateDistance(userPosition.latitude, userPosition.longitude, attraction.latitude, attraction.longitude)
    : null;

  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  const [c0, c1, c2] = CATEGORY_GRADIENTS[attraction.category] || CATEGORY_GRADIENTS.default;

  const districtLabel = attraction.address?.split(',').slice(1, 3).join(',').trim()
    || attraction.address?.split(',')[0]?.trim();

  return (
    <Link
      to={`/attraction/${attraction.id}`}
      className={`group block overflow-hidden rounded-xl shadow-lg bg-white dark:bg-surface-900
                  transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up ${staggerClass}`}
    >
      {/* Image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '3 / 2', background: `linear-gradient(135deg, ${c0} 0%, ${c1} 55%, ${c2} 100%)` }}
      >
        <img
          src={attraction.images?.[0] || ''}
          alt={attraction.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Favorite button — absolute on card */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            aria-label="Toggle favourite"
            onClick={(e) => { e.preventDefault(); onToggleFavorite(attraction.id); }}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center
                       text-red-500 transition-transform active:scale-90 shadow-sm"
          >
            {isFavorite ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            )}
          </button>
        </div>

        {/* Category label on image */}
        {attraction.category && (
          <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold uppercase tracking-wider
                           px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm">
            {attraction.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-surface-100 text-[17px] leading-snug flex-1 line-clamp-1">
            {attraction.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">{attraction.rating}</span>
          </div>
        </div>

        {districtLabel && (
          <div className="flex items-center gap-1 text-surface-400 dark:text-surface-500 text-[13px] mb-3">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {districtLabel}
          </div>
        )}

        <p className="text-surface-500 dark:text-surface-400 text-sm line-clamp-2 leading-relaxed">
          {attraction.shortDescription}
        </p>

        {distance !== null && (
          <div className="flex items-center gap-1 mt-3 text-primary-600 dark:text-primary-400 text-[12px] font-medium">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {formatDistance(distance)} away
          </div>
        )}
      </div>
    </Link>
  );
}
