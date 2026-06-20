import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

const CATEGORIES = [
  { label: 'Nature', icon: '🌿' },
  { label: 'Historical', icon: '🏛️' },
  { label: 'Beach', icon: '🏖️' },
  { label: 'Religious', icon: '🕌' },
  { label: 'Hotels', icon: '🏨' },
];

const PAD = '20px';

export default function HomePage({ isFavorite, onToggleFavorite }) {
  const { getFeaturedAttractions, getAttractionsByCategory, loading } = useAttractions();
  const { position } = useGeolocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const chipScrollRef = useRef(null);

  const featured = getFeaturedAttractions();
  const displayed = activeCategory
    ? getAttractionsByCategory(activeCategory)
    : featured;
  const sectionTitle = activeCategory ? `${activeCategory} Spots` : 'Featured for You';

  return (
    <div className="page-content">

      {/* Search */}
      <div style={{ padding: `16px ${PAD} 20px` }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '16px',
            display: 'flex', alignItems: 'center', pointerEvents: 'none',
            color: '#94a3b8',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Where to, traveler?"
            className="bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100
                       placeholder:text-surface-400 rounded-xl border-none outline-none
                       shadow-sm focus:ring-2 focus:ring-primary-500/30 transition-shadow text-sm"
            style={{ width: '100%', height: '56px', paddingLeft: '48px', paddingRight: '16px' }}
          />
        </div>
      </div>

      {/* Category Chips */}
      <div style={{ marginBottom: '24px' }}>
        <div
          ref={chipScrollRef}
          className="hide-scrollbar"
          style={{
            overflowX: 'auto',
            display: 'flex',
            gap: '10px',
            paddingLeft: PAD,
            paddingRight: PAD,
            paddingBottom: '4px',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(isActive ? null : cat.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '999px',
                  fontSize: '14px', fontWeight: '600',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  cursor: 'pointer', border: 'none',
                  transition: 'all 0.2s',
                  background: isActive ? '#00513f' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569',
                  boxShadow: isActive ? '0 2px 8px rgba(0,81,63,0.35)' : 'none',
                }}
              >
                <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured for You */}
      <div style={{ padding: `0 ${PAD}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <h2 className="font-heading font-bold text-surface-900 dark:text-surface-100"
              style={{ fontSize: '24px', lineHeight: '1.2' }}>
            {sectionTitle}
          </h2>
          <Link
            to="/explore"
            className="text-primary-600 dark:text-primary-400 hover:underline"
            style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md">
                <div className="skeleton" style={{ aspectRatio: '3/2' }} />
                <div className="bg-white dark:bg-surface-900 p-4 space-y-2">
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-1/3 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

      {/* Travel Essential Banner */}
      <div style={{ padding: `32px ${PAD} 16px` }}>
        <div style={{
          background: '#fd9d1a', borderRadius: '16px',
          padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', bottom: '-32px', right: '-32px',
            width: '160px', height: '160px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)',
          }} />
          <div style={{
            position: 'absolute', bottom: '32px', right: '32px',
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.22)',
              color: '#451a03', fontSize: '11px', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '4px 12px', borderRadius: '999px', marginBottom: '12px',
            }}>
              Travel Essential
            </span>
            <h2 className="font-heading" style={{
              fontSize: '22px', fontWeight: '700', color: '#1c0a00',
              marginBottom: '8px', lineHeight: '1.3',
            }}>
              Safety First in Sri Lanka
            </h2>
            <p style={{ color: '#78350f', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', maxWidth: '280px' }}>
              Get the latest travel advisories, currency tips, and emergency contact information for your worry-free journey.
            </p>
            <button
              type="button"
              style={{
                background: '#00513f', color: '#fff',
                padding: '10px 24px', borderRadius: '999px',
                fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer',
              }}
            >
              Read Guide
            </button>
          </div>

          {/* Shield icon */}
          <div style={{
            position: 'absolute', bottom: '16px', right: '24px',
            color: 'rgba(28,10,0,0.12)', pointerEvents: 'none',
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
