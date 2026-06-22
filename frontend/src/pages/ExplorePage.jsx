import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

const CATEGORIES = [
  { label: 'Nature',     icon: 'forest' },
  { label: 'Historical', icon: 'account_balance' },
  { label: 'Beach',      icon: 'beach_access' },
  { label: 'Religious',  icon: 'temple_hindu' },
  { label: 'Adventure',  icon: 'hiking' },
];

export default function ExplorePage({ isFavorite, onToggleFavorite }) {
  const { getFeaturedAttractions, getAttractionsByCategory, searchAttractions, loading } = useAttractions();
  const { position } = useGeolocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const chipScrollRef = useRef(null);

  const trimmed = searchQuery.trim();
  const featured = getFeaturedAttractions();
  const displayed = trimmed.length >= 2
    ? searchAttractions(trimmed)
    : activeCategory
      ? getAttractionsByCategory(activeCategory)
      : featured;
  const sectionTitle = trimmed.length >= 2
    ? `Results for "${trimmed}"`
    : activeCategory
      ? `${activeCategory} Spots`
      : 'Featured for You';

  return (
    <div className="page-content" style={{ paddingBottom: '120px' }}>

      {/* Search */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ position: 'relative' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute', top: '50%', left: '14px',
              transform: 'translateY(-50%)',
              color: '#9ca3af', fontSize: '20px', pointerEvents: 'none',
            }}
          >
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where to, traveler?"
            style={{
              width: '100%', height: '52px',
              paddingLeft: '44px', paddingRight: searchQuery ? '44px' : '16px',
              borderRadius: '14px', border: 'none',
              background: '#f3f4f6',
              fontSize: '15px', color: '#374151',
              outline: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute', top: '50%', right: '14px',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#9ca3af', display: 'flex', alignItems: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Chips */}
      {!trimmed && (
        <div style={{ marginBottom: '24px' }}>
          <div
            ref={chipScrollRef}
            className="hide-scrollbar"
            style={{
              overflowX: 'auto', display: 'flex',
              gap: '10px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '4px',
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
                    padding: '8px 18px', borderRadius: '999px',
                    fontSize: '14px', fontWeight: '600',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    cursor: 'pointer', border: 'none',
                    transition: 'all 0.2s',
                    background: isActive ? '#00513f' : '#ffffff',
                    color: isActive ? '#ffffff' : '#374151',
                    boxShadow: isActive
                      ? '0 2px 8px rgba(0,81,63,0.30)'
                      : '0 1px 4px rgba(0,0,0,0.10)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Featured Section */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', fontFamily: 'Epilogue, sans-serif' }}>
            {sectionTitle}
          </h2>
          {!trimmed && (
            <button
              type="button"
              onClick={() => {}}
              style={{ fontSize: '14px', fontWeight: '600', color: '#00513f', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              See all
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-surface-100">
                <div className="skeleton" style={{ aspectRatio: '16/9' }} />
                <div style={{ padding: '16px' }} className="space-y-2">
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-1/3 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No results found
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {displayed.map((attraction, i) => (
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
      <div style={{ padding: '32px 20px 8px' }}>
        <div style={{
          background: '#fd9d1a', borderRadius: '20px',
          padding: '28px 24px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: '-40px', right: '-40px',
            width: '160px', height: '160px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)',
          }} />
          <div style={{
            position: 'absolute', bottom: '30px', right: '30px',
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.25)',
              color: '#451a03', fontSize: '11px', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '4px 12px', borderRadius: '999px', marginBottom: '12px',
            }}>
              Travel Essential
            </span>
            <h2 style={{
              fontSize: '22px', fontWeight: '700', color: '#1c0a00',
              marginBottom: '10px', lineHeight: '1.3',
              fontFamily: 'Epilogue, sans-serif',
            }}>
              Safety First in Sri Lanka
            </h2>
            <p style={{ color: '#78350f', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', maxWidth: '260px' }}>
              Get the latest travel advisories, currency tips, and emergency contact information for your worry-free journey.
            </p>
            <button
              type="button"
              style={{
                background: '#00513f', color: '#fff',
                padding: '12px 28px', borderRadius: '999px',
                fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer',
              }}
            >
              Read Guide
            </button>
          </div>

          <div style={{
            position: 'absolute', bottom: '20px', right: '24px',
            color: 'rgba(28,10,0,0.12)', pointerEvents: 'none',
          }}>
            <svg width="90" height="90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Map FAB */}
      <button
        type="button"
        onClick={() => window.open('https://www.google.com/maps/search/attractions+sri+lanka', '_blank')}
        style={{
          position: 'fixed', bottom: '88px', right: '20px', zIndex: 50,
          width: '56px', height: '56px',
          background: '#00513f', color: '#fff',
          borderRadius: '16px', border: 'none',
          boxShadow: '0 4px 16px rgba(0,81,63,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'transform 0.2s',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>map</span>
      </button>
    </div>
  );
}
