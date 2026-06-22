import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

const CATEGORIES = ['All', 'Nature', 'Historical', 'Hotels', 'Beach', 'Religious', 'Adventure'];

const LANDMARK_OPTIONS = [
  { label: 'Sigiriya Rock Fortress (Central Province)', lat: 7.957, lng: 80.7603 },
  { label: 'Temple of the Sacred Tooth (Kandy)', lat: 7.2936, lng: 80.6413 },
  { label: 'Galle Fort (Southern Province)', lat: 6.0296, lng: 80.2168 },
  { label: 'Yala National Park (Uva Province)', lat: 6.3728, lng: 81.5197 },
  { label: 'Colombo City Center', lat: 6.9271, lng: 79.8612 },
];

export default function ExplorePage({ isFavorite, onToggleFavorite }) {
  const { getFeaturedAttractions, getAttractionsByCategory, searchAttractions, loading } = useAttractions();
  const { position, requestPosition, loading: gpsLoading } = useGeolocation();

  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'map'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLandmark, setSelectedLandmark] = useState(0);
  const chipScrollRef = useRef(null);

  const trimmed = searchQuery.trim();
  const featured = getFeaturedAttractions();
  const displayed = trimmed.length >= 2
    ? searchAttractions(trimmed)
    : activeCategory !== 'All'
      ? getAttractionsByCategory(activeCategory)
      : featured;

  const sectionTitle = trimmed.length >= 2
    ? `Results for "${trimmed}"`
    : activeCategory !== 'All'
      ? `${activeCategory} Spots`
      : 'Featured for You';

  const currentLandmark = LANDMARK_OPTIONS[selectedLandmark];

  return (
    <div className="page-content" style={{ paddingBottom: '120px' }}>

      {/* Location Section */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '14px 16px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          marginBottom: '14px',
        }}>
          {/* Row 1: label + GPS button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Current Walking Location</span>
            </div>
            <button
              type="button"
              onClick={requestPosition}
              disabled={gpsLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: '#f97316', color: '#fff',
                border: 'none', borderRadius: '999px',
                padding: '5px 12px', fontSize: '12px', fontWeight: '600',
                cursor: gpsLoading ? 'not-allowed' : 'pointer',
                opacity: gpsLoading ? 0.7 : 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
              </svg>
              {gpsLoading ? 'Locating…' : 'Use Device GPS'}
            </button>
          </div>

          {/* Row 2: landmark selector */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#f9fafb', border: '1px solid #e5e7eb',
              borderRadius: '10px', padding: '9px 12px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" fill="white" />
              </svg>
              <select
                value={selectedLandmark}
                onChange={(e) => setSelectedLandmark(Number(e.target.value))}
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontSize: '13px', fontWeight: '500', color: '#1f2937',
                  outline: 'none', cursor: 'pointer', appearance: 'none',
                }}
              >
                {LANDMARK_OPTIONS.map((opt, i) => (
                  <option key={i} value={i}>{opt.label}</option>
                ))}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Row 3: coordinates */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '8px', paddingLeft: '2px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <span style={{ fontWeight: '600', color: '#374151' }}>Lat: </span>
              {currentLandmark.lat.toFixed(4)}
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              <span style={{ fontWeight: '600', color: '#374151' }}>Lng: </span>
              {currentLandmark.lng.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex', gap: '4px',
          background: '#f3f4f6', borderRadius: '12px', padding: '4px',
          marginBottom: '16px',
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('grid')}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '9px 12px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              fontWeight: '600', fontSize: '13px', transition: 'all 0.2s',
              background: activeTab === 'grid' ? '#f97316' : 'transparent',
              color: activeTab === 'grid' ? '#fff' : '#6b7280',
              boxShadow: activeTab === 'grid' ? '0 2px 8px rgba(249,115,22,0.35)' : 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
            </svg>
            Exploration Grid
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '9px 12px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              fontWeight: '600', fontSize: '13px', transition: 'all 0.2s',
              background: activeTab === 'map' ? '#f97316' : 'transparent',
              color: activeTab === 'map' ? '#fff' : '#6b7280',
              boxShadow: activeTab === 'map' ? '0 2px 8px rgba(249,115,22,0.35)' : 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            Offline Map
          </button>
        </div>
      </div>

      {/* Map Tab View */}
      {activeTab === 'map' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{
            background: '#e5e7eb', borderRadius: '16px', overflow: 'hidden',
            height: '340px', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '12px',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 30%, #6ee7b7 60%, #34d399 100%)',
              opacity: 0.4,
            }} />
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00513f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <p style={{ position: 'relative', zIndex: 1, fontSize: '15px', fontWeight: '600', color: '#065f46' }}>Offline Map</p>
            <p style={{ position: 'relative', zIndex: 1, fontSize: '12px', color: '#6b7280', textAlign: 'center', maxWidth: '200px' }}>
              Download map tiles to use navigation without internet
            </p>
            <button
              type="button"
              onClick={() => window.open(`https://www.google.com/maps/@${currentLandmark.lat},${currentLandmark.lng},13z`, '_blank')}
              style={{
                position: 'relative', zIndex: 1,
                background: '#00513f', color: '#fff', border: 'none',
                borderRadius: '999px', padding: '10px 24px',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Open in Google Maps
            </button>
          </div>
        </div>
      )}

      {/* Grid Tab View */}
      {activeTab === 'grid' && (
        <>
          {/* Search + Favorites */}
          <div style={{ padding: '0 20px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"
                style={{ position: 'absolute', top: '50%', left: '13px', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landmarks, tags, beach..."
                style={{
                  width: '100%', height: '48px',
                  paddingLeft: '42px', paddingRight: searchQuery ? '40px' : '14px',
                  borderRadius: '12px', border: '1px solid #e5e7eb',
                  background: '#fff', fontSize: '14px', color: '#374151',
                  outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            <Link
              to="/favorites"
              style={{
                width: '48px', height: '48px', borderRadius: '12px',
                border: '1px solid #e5e7eb', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>
          </div>

          {/* Category Filter */}
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Group Filter Category
              </span>
            </div>
            <div
              ref={chipScrollRef}
              className="hide-scrollbar"
              style={{ overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '4px' }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '7px 16px', borderRadius: '999px',
                      fontSize: '13px', fontWeight: '600',
                      whiteSpace: 'nowrap', flexShrink: 0,
                      cursor: 'pointer', border: '1px solid',
                      transition: 'all 0.15s',
                      background: isActive ? '#1f2937' : '#fff',
                      color: isActive ? '#fff' : '#374151',
                      borderColor: isActive ? '#1f2937' : '#e5e7eb',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards */}
          <div style={{ padding: '0 20px' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
                    <div className="skeleton" style={{ height: '200px' }} />
                    <div style={{ padding: '14px' }}>
                      <div className="skeleton" style={{ height: '18px', width: '70%', borderRadius: '6px', marginBottom: '8px' }} />
                      <div className="skeleton" style={{ height: '14px', width: '40%', borderRadius: '6px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>No results found</h3>
                <p style={{ fontSize: '13px', color: '#9ca3af' }}>Try a different search or category</p>
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
        </>
      )}
    </div>
  );
}
