import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { calculateDistance, formatDistance } from '../utils/distance';

const CATEGORY_GRADIENTS = {
  Historical: ['#92400e', '#b45309', '#f59e0b'],
  Nature:     ['#064e3b', '#059669', '#34d399'],
  Hotels:     ['#1e1b4b', '#4338ca', '#818cf8'],
  Beach:      ['#0c4a6e', '#0284c7', '#38bdf8'],
  Religious:  ['#3b0764', '#7c3aed', '#c4b5fd'],
  Adventure:  ['#7f1d1d', '#dc2626', '#fca5a5'],
  default:    ['#0f172a', '#1e40af', '#60a5fa'],
};

const CATEGORY_BADGE = {
  Historical: { bg: '#fef3c7', color: '#92400e' },
  Nature:     { bg: '#d1fae5', color: '#065f46' },
  Hotels:     { bg: '#e0e7ff', color: '#3730a3' },
  Beach:      { bg: '#e0f2fe', color: '#075985' },
  Religious:  { bg: '#f5f3ff', color: '#5b21b6' },
  Adventure:  { bg: '#fee2e2', color: '#991b1b' },
  default:    { bg: '#f1f5f9', color: '#334155' },
};

export default function AttractionCard({ attraction, userPosition, isFavorite, onToggleFavorite, index = 0, compact = false }) {
  const distance = userPosition
    ? calculateDistance(userPosition.latitude, userPosition.longitude, attraction.latitude, attraction.longitude)
    : null;

  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  const [c0, c1, c2] = CATEGORY_GRADIENTS[attraction.category] || CATEGORY_GRADIENTS.default;
  const badge = CATEGORY_BADGE[attraction.category] || CATEGORY_BADGE.default;

  const locationLabel = attraction.address?.split(',').slice(0, 2).join(',').trim();

  return (
    <Link
      to={`/attraction/${attraction.id}`}
      className={`group block overflow-hidden animate-fade-in-up ${staggerClass} card-lift`}
      style={{
        borderRadius: '20px',
        background: '#fff',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        border: '1px solid rgba(124,58,237,0.06)',
      }}
    >
     
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: compact ? '4/3' : '16/9',
          background: `linear-gradient(135deg, ${c0} 0%, ${c1} 55%, ${c2} 100%)`,
        }}
      >
        <img
          src={attraction.images?.[0] || ''}
          alt={attraction.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

       
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
        }} />

       
        {!compact && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: badge.bg,
            color: badge.color,
            fontSize: 10, fontWeight: 700,
            padding: '3px 10px', borderRadius: '999px',
            letterSpacing: '0.04em', textTransform: 'uppercase',
            backdropFilter: 'blur(4px)',
          }}>
            {attraction.category}
          </div>
        )}

       
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(attraction.id, attraction.name)}
          size={compact ? 'sm' : 'md'}
          className="absolute top-2.5 right-2.5 z-10"
        />

       
        {distance !== null && (
          <div
            className="absolute flex items-center gap-1 text-white rounded-full font-semibold"
            style={{
              bottom: 10, left: 10,
              padding: compact ? '2px 8px' : '4px 10px',
              fontSize: compact ? 10 : 11,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            {formatDistance(distance)}
          </div>
        )}
      </div>

     
      <div style={{ padding: compact ? '10px 12px' : '14px 16px' }}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-heading font-bold leading-snug flex-1 line-clamp-2"
            style={{ fontSize: compact ? 13 : 16, color: '#0f172a' }}
          >
            {attraction.name}
          </h3>
          <div
            className="flex items-center gap-0.5 shrink-0 mt-0.5 rounded-lg px-1.5 py-0.5"
            style={{ background: '#fef9c3', minWidth: 42 }}
          >
            <svg width={compact ? 11 : 13} height={compact ? 11 : 13} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ fontSize: compact ? 11 : 12, fontWeight: 700, color: '#b45309' }}>
              {attraction.rating}
            </span>
          </div>
        </div>

        {locationLabel && (
          <div className="flex items-center gap-1 mb-2" style={{ color: '#64748b', fontSize: compact ? 11 : 12 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" className="shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="line-clamp-1">{locationLabel}</span>
          </div>
        )}

        {!compact && (attraction.shortDescription || attraction.description) && (
          <p
            className="line-clamp-2"
            style={{ fontSize: 12, lineHeight: '1.55', color: '#64748b' }}
          >
            {attraction.shortDescription || attraction.description?.split('\n\n')[0]}
          </p>
        )}
      </div>
    </Link>
  );
}
