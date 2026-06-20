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
        <div className="skeleton h-64 w-full" />
        <div className="p-5 space-y-3">
          <div className="skeleton h-5 w-1/2 rounded-full" />
          <div className="skeleton h-7 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
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

  const paragraphs = attraction.description?.split('\n\n').filter(Boolean) || [];

  return (
    <div className="page-content pb-8">
      {/* Hero image */}
      <div className="relative h-64 bg-surface-200 dark:bg-surface-800">
        <img
          src={attraction.images?.[0] || '/images/placeholder.jpg'}
          alt={attraction.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center
                     text-white active:scale-90 transition-transform shadow-md"
          style={{ top: 'max(1rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))' }}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Favorite button */}
        <div className="absolute right-4" style={{ top: 'max(1rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))' }}>
          <FavoriteButton
            isFavorite={isFavorite(attraction.id)}
            onToggle={() => onToggleFavorite(attraction.id)}
            size="md"
          />
        </div>
      </div>

      {/* Content card */}
      <div className="bg-white dark:bg-surface-900 rounded-t-3xl -mt-5 relative z-10 px-5 pt-5">

        {/* Tag badges */}
        {attraction.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attraction.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300
                           text-xs font-semibold px-3 py-1 rounded-full border border-primary-100 dark:border-primary-800"
              >
                {tag}
              </span>
            ))}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text}`}>
              {attraction.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-heading font-bold text-2xl text-surface-900 dark:text-surface-50 leading-tight mb-1.5">
          {attraction.name}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-surface-500 dark:text-surface-400 text-sm mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>{attraction.location || attraction.address}</span>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-5">
          {/* Distance */}
          <div className="flex-1 bg-surface-50 dark:bg-surface-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wide mb-0.5">Distance</div>
              <div className="font-heading font-bold text-surface-800 dark:text-surface-200 text-base leading-tight">
                {distance !== null ? formatDistance(distance) : '—'}
              </div>
              <div className="text-[10px] text-surface-400 dark:text-surface-500 mt-0.5">
                {distance !== null ? 'from you' : '(Est.)'}
              </div>
            </div>
          </div>

          {/* Best Visit */}
          <div className="flex-1 bg-surface-50 dark:bg-surface-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wide mb-0.5">Best Visit</div>
              <div className="font-heading font-bold text-surface-800 dark:text-surface-200 text-base leading-tight">
                {attraction.bestVisitTime || '—'}
              </div>
              <div className="text-[10px] text-surface-400 dark:text-surface-500 mt-0.5">recommended</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-primary-700 active:bg-primary-800
                       text-white font-semibold text-sm rounded-2xl py-3.5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            Open in Maps
          </a>

          {attraction.bookingUrl ? (
            <a
              href={attraction.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-amber-500 active:bg-amber-600
                         text-white font-semibold text-sm rounded-2xl py-3.5 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 9V6a2 2 0 012-2h16a2 2 0 012 2v3" strokeLinecap="round" />
                <rect x="2" y="9" width="20" height="13" rx="2" />
                <path d="M16 2v4M8 2v4M2 13h20" strokeLinecap="round" />
              </svg>
              Book Entry Ticket
            </a>
          ) : (
            <a
              href={`tel:${attraction.phone}`}
              className={`flex items-center justify-center gap-2.5 w-full border-2 border-primary-600
                          text-primary-700 dark:text-primary-400 font-semibold text-sm rounded-2xl py-3.5 transition-colors
                          ${!attraction.phone ? 'opacity-40 pointer-events-none' : 'active:bg-primary-50'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              {attraction.phone ? 'Call for Info' : 'No Phone Available'}
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-100 dark:bg-surface-800 mb-6" />

        {/* Headline + Description */}
        {attraction.headline && (
          <h2 className="font-heading font-bold text-xl text-surface-900 dark:text-surface-100 mb-3">
            {attraction.headline}
          </h2>
        )}

        <div className="space-y-3 mb-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Quote block */}
        {attraction.quote && (
          <div className="bg-surface-50 dark:bg-surface-800 border-l-4 border-primary-500 rounded-r-2xl px-4 py-4 mb-6">
            <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed italic">
              {attraction.quote}
            </p>
          </div>
        )}

        {/* Vibrant Perspectives — photo gallery */}
        {attraction.images?.length > 1 && (
          <div className="mb-6">
            <h2 className="font-heading font-bold text-xl text-surface-900 dark:text-surface-100 mb-3">
              Vibrant Perspectives
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {attraction.images.slice(0, 4).map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-surface-200 dark:bg-surface-700">
                  <img
                    src={img}
                    alt={`${attraction.name} photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pro Tip */}
        {attraction.proTip && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6 flex gap-3">
            <div className="shrink-0 mt-0.5">
              <div className="w-7 h-7 rounded-full border-2 border-blue-400 dark:border-blue-500 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide mb-1">Pro Tip</div>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                {attraction.proTip}
              </p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-surface-100 dark:bg-surface-800 mb-6" />

        {/* Visitor Info */}
        <div className="mb-6">
          <h2 className="font-heading font-bold text-xl text-surface-900 dark:text-surface-100 mb-3">
            Visitor Info
          </h2>
          <div className="space-y-2.5">
            {[
              { icon: '📍', label: 'Address', value: attraction.address },
              { icon: '🕐', label: 'Hours', value: attraction.openHours },
              { icon: '🎫', label: 'Entry Fee', value: attraction.entryFee },
              ...(attraction.phone ? [{ icon: '📞', label: 'Phone', value: attraction.phone }] : []),
            ].map((item) => (
              <div key={item.label} className="flex gap-3 bg-surface-50 dark:bg-surface-800 rounded-2xl p-3.5">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[10px] text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wide mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-sm text-surface-700 dark:text-surface-300 font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights / Tags */}
        {attraction.highlights?.length > 0 && (
          <div>
            <h2 className="font-heading font-bold text-xl text-surface-900 dark:text-surface-100 mb-3">
              Highlights
            </h2>
            <div className="flex flex-wrap gap-2">
              {attraction.highlights.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300
                             text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
