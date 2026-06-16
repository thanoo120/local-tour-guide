import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

export default function HomePage({ isFavorite, onToggleFavorite }) {
  const { getFeaturedAttractions, loading } = useAttractions();
  const { position, permissionStatus, requestPosition, isUsingDefault } = useGeolocation();

  const featured = getFeaturedAttractions();

  return (
    <div className="page-content">
      {/* Hero Header */}
      <div className="relative bg-linear-to-br from-primary-800 via-primary-700 to-primary-500 px-5 pb-8 overflow-hidden pt-safe-hero">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-6 right-6 w-36 h-36 rounded-full border-4 border-white" />
          <div className="absolute top-16 right-20 w-16 h-16 rounded-full border-2 border-white" />
          <div className="absolute bottom-0 left-6 w-24 h-24 rounded-full border-2 border-white" />
        </div>

        <div className="relative">
          <p className="text-primary-200 text-xs font-semibold tracking-widest uppercase mb-2">
            🌏 Welcome to
          </p>
          <h1 className="text-white font-heading text-4xl font-bold mb-2 leading-tight">
            Ceylon Wanderer
          </h1>
          <p className="text-primary-100 text-sm leading-relaxed max-w-xs">
            Discover the beauty of Sri Lanka — from ancient fortresses to pristine beaches.
          </p>

          {/* Location status */}
          <div className="mt-5">
            {isUsingDefault ? (
              <button
                onClick={requestPosition}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 active:scale-95
                           text-white text-sm font-medium px-4 py-2.5 rounded-full transition-all border border-white/20"
                type="button"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Enable location for distances
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 bg-white/15 text-primary-100 text-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Location active — distances shown
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex divide-x divide-surface-100 dark:divide-surface-800 bg-white dark:bg-surface-900 shadow-sm">
        {[
          {
            value: '15',
            label: 'Attractions',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            ),
          },
          {
            value: '4',
            label: 'Categories',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            ),
          },
          {
            value: '3',
            label: 'UNESCO Sites',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ),
          },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 flex flex-col items-center py-3.5 gap-1">
            {stat.icon}
            <div className="font-heading font-bold text-primary-600 dark:text-primary-400 text-lg leading-none">{stat.value}</div>
            <div className="text-surface-500 dark:text-surface-400 text-[11px] font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured section */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-surface-900 dark:text-surface-100 text-xl">
            Featured Places
          </h2>
          <Link
            to="/explore"
            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline"
          >
            See all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-surface-100 dark:border-surface-800">
                <div className="skeleton h-44 w-full" />
                <div className="bg-white dark:bg-surface-900 p-4 space-y-2">
                  <div className="skeleton h-4 w-24 rounded-full" />
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {featured.map((attraction, i) => (
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

      {/* Quick categories */}
      <div className="px-4 pt-6 pb-4">
        <h2 className="font-heading font-bold text-surface-900 dark:text-surface-100 text-xl mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Hotels', emoji: '🏨', color: 'from-blue-500 to-blue-700', path: '/explore?category=Hotels' },
            { name: 'Nature', emoji: '🌿', color: 'from-emerald-500 to-emerald-700', path: '/explore?category=Nature' },
            { name: 'Historical', emoji: '🏛️', color: 'from-amber-500 to-amber-700', path: '/explore?category=Historical' },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className={`bg-linear-to-br ${cat.color} rounded-2xl p-4 flex flex-col items-center
                          justify-center gap-2 active:scale-95 transition-transform shadow-md aspect-square`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-white text-xs font-bold tracking-wide">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
