import { useParams, useNavigate } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance, formatDistance } from '../utils/distance';
import FavoriteButton from '../components/FavoriteButton';
import { CATEGORY_COLORS } from '../data/attractions';

export default function AttractionDetailPage({ isFavorite, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAttractionById, loading } = useAttractions();
  const { position } = useGeolocation();

  const attraction = getAttractionById(id);

  if (loading) {
    return (
      <div className="page-content">
        <div className="skeleton h-72 w-full" />
        <div className="p-5 space-y-3">
          <div className="skeleton h-6 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
        </div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="page-content flex flex-col items-center justify-center py-20 px-8 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="font-heading font-semibold text-xl mb-2">Attraction not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-primary-600 dark:text-primary-400 font-medium mt-4"
          type="button"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const distance = position
    ? calculateDistance(position.latitude, position.longitude, attraction.latitude, attraction.longitude)
    : null;

  const categoryColors = CATEGORY_COLORS[attraction.category] || {
    bg: 'bg-surface-100 dark:bg-surface-800',
    text: 'text-surface-600 dark:text-surface-300',
    dot: 'bg-surface-400',
  };

  return (
    <div className="page-content">
      {/* Hero image */}
      <div className="relative h-72 bg-surface-200 dark:bg-surface-800">
        <img
          src={attraction.images?.[0] || '/images/placeholder.jpg'}
          alt={attraction.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center
                     text-white active:scale-90 transition-transform"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Favorite button */}
        <div className="absolute top-4 right-4">
          <FavoriteButton
            isFavorite={isFavorite(attraction.id)}
            onToggle={() => onToggleFavorite(attraction.id)}
            size="md"
          />
        </div>

        {/* Featured badge */}
        {attraction.featured && (
          <span className="absolute top-16 left-4 bg-accent-500 text-white text-[10px] font-bold
                           uppercase tracking-wide px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide
                            px-2.5 py-1 rounded-full mb-2 ${categoryColors.bg} ${categoryColors.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${categoryColors.dot}`} />
            {attraction.category}
          </span>
          <h1 className="text-white font-heading font-bold text-2xl leading-tight">
            {attraction.name}
          </h1>
        </div>
      </div>

      {/* Quick info row */}
      <div className="flex divide-x divide-surface-200 dark:divide-surface-700 bg-white dark:bg-surface-900">
        {[
          {
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ),
            value: `${attraction.rating}`,
            label: `${attraction.reviewCount?.toLocaleString()} reviews`,
          },
          {
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            ),
            value: distance !== null ? formatDistance(distance) : '—',
            label: 'from you',
          },
          {
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            ),
            value: attraction.entryFee === 'Free' ? 'Free' : attraction.entryFee?.split(' ')[0],
            label: 'entry fee',
          },
        ].map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center py-3 px-2 gap-1">
            {item.icon}
            <span className="font-heading font-bold text-surface-800 dark:text-surface-200 text-sm">
              {item.value}
            </span>
            <span className="text-surface-400 text-[10px]">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* Description */}
        <div>
          <h2 className="font-heading font-semibold text-surface-900 dark:text-surface-100 text-lg mb-2">About</h2>
          <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
            {attraction.description}
          </p>
        </div>

        {/* Tags */}
        {attraction.tags?.length > 0 && (
          <div>
            <h2 className="font-heading font-semibold text-surface-900 dark:text-surface-100 text-lg mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {attraction.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300
                             text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Practical info */}
        <div>
          <h2 className="font-heading font-semibold text-surface-900 dark:text-surface-100 text-lg mb-3">
            Visitor Info
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: '📍',
                label: 'Address',
                value: attraction.address,
              },
              {
                icon: '🕐',
                label: 'Hours',
                value: attraction.openHours,
              },
              {
                icon: '🎫',
                label: 'Entry Fee',
                value: attraction.entryFee,
              },
              ...(attraction.phone ? [{
                icon: '📞',
                label: 'Phone',
                value: attraction.phone,
              }] : []),
            ].map((item) => (
              <div key={item.label} className="flex gap-3 bg-surface-50 dark:bg-surface-800 rounded-2xl p-3.5">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs text-surface-400 dark:text-surface-500 font-medium mb-0.5">{item.label}</div>
                  <div className="text-sm text-surface-700 dark:text-surface-300 font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
