import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

const CATEGORIES = ['All', 'Nature', 'Historical', 'Hotels', 'Beach', 'Religious', 'Adventure'];

const CATEGORY_COLORS = {
  All:        { color: '#fff',    bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',  inactive: '#7c3aed' },
  Nature:     { color: '#fff',    bg: 'linear-gradient(135deg, #059669, #047857)',  inactive: '#059669' },
  Historical: { color: '#fff',    bg: 'linear-gradient(135deg, #b45309, #92400e)',  inactive: '#b45309' },
  Hotels:     { color: '#fff',    bg: 'linear-gradient(135deg, #4338ca, #3730a3)',  inactive: '#4338ca' },
  Beach:      { color: '#fff',    bg: 'linear-gradient(135deg, #0284c7, #0369a1)',  inactive: '#0284c7' },
  Religious:  { color: '#fff',    bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',  inactive: '#7c3aed' },
  Adventure:  { color: '#fff',    bg: 'linear-gradient(135deg, #dc2626, #b91c1c)',  inactive: '#dc2626' },
};

const LANDMARK_OPTIONS = [
  { label: 'Sigiriya Rock Fortress (Central Province)', lat: 7.957,  lng: 80.7603 },
  { label: 'Temple of the Sacred Tooth (Kandy)',        lat: 7.2936, lng: 80.6413 },
  { label: 'Galle Fort (Southern Province)',            lat: 6.0296, lng: 80.2168 },
  { label: 'Yala National Park (Uva Province)',         lat: 6.3728, lng: 81.5197 },
  { label: 'Colombo City Center',                       lat: 6.9271, lng: 79.8612 },
];

export default function ExplorePage({ isFavorite, onToggleFavorite }) {
  const { getFeaturedAttractions, getAttractionsByCategory, searchAttractions, loading } = useAttractions();
  const { position, requestPosition, loading: gpsLoading, error: gpsError, permissionStatus, isUsingDefault } = useGeolocation();

  const [activeTab, setActiveTab] = useState('grid');
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

      
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 2px 16px rgba(124,58,237,0.08)',
          marginBottom: '14px',
          border: '1px solid rgba(124,58,237,0.08)',
        }}>
        
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            {/* Left: icon + label + status pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: permissionStatus === 'granted'
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : permissionStatus === 'denied'
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.3s',
              }}>
                {gpsLoading ? (
                
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                       style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="9" strokeDasharray="28 56" strokeLinecap="round"/>
                  </svg>
                ) : permissionStatus === 'granted' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : permissionStatus === 'denied' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
                  </svg>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', lineHeight: 1.2 }}>
                  {gpsLoading ? 'Getting your location…' : 'Current Location'}
                </div>
                <div style={{ fontSize: '11px', marginTop: '2px', fontWeight: '500',
                  color: permissionStatus === 'granted' ? '#059669'
                       : permissionStatus === 'denied'  ? '#dc2626'
                       : '#94a3b8',
                }}>
                  {gpsLoading
                    ? 'Please wait…'
                    : permissionStatus === 'granted' && !isUsingDefault
                    ? `GPS active · ${position.latitude?.toFixed(4)}, ${position.longitude?.toFixed(4)}`
                    : permissionStatus === 'denied'
                    ? 'Permission denied — using fallback'
                    : isUsingDefault
                    ? 'Using default (Colombo)'
                    : 'Tap to enable GPS'}
                </div>
              </div>
            </div>

          
            <button
              type="button"
              onClick={requestPosition}
              disabled={gpsLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: gpsLoading
                  ? '#e2e8f0'
                  : permissionStatus === 'granted'
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : permissionStatus === 'denied'
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #f97316, #ef4444)',
                color: gpsLoading ? '#94a3b8' : '#fff',
                border: 'none', borderRadius: '999px',
                padding: '7px 14px', fontSize: '12px', fontWeight: '700',
                cursor: gpsLoading ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                boxShadow: gpsLoading ? 'none'
                  : permissionStatus === 'granted' ? '0 3px 10px rgba(16,185,129,0.35)'
                  : '0 3px 10px rgba(249,115,22,0.35)',
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
            >
              {gpsLoading ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                       style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="9" strokeDasharray="28 56" strokeLinecap="round"/>
                  </svg>
                  Locating…
                </>
              ) : permissionStatus === 'granted' ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
                  </svg>
                  Refresh
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
                  </svg>
                  Use GPS
                </>
              )}
            </button>
          </div>

        
          {gpsError && permissionStatus === 'denied' && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '8px',
              background: '#fef2f2', border: '1.5px solid #fecaca',
              borderRadius: '12px', padding: '10px 12px', marginBottom: '12px',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#dc2626', marginBottom: '2px' }}>
                  GPS access blocked
                </p>
                <p style={{ fontSize: '11px', color: '#ef4444', lineHeight: '1.5' }}>
                  {gpsError.toLowerCase().includes('denied')
                    ? 'Allow location access in your browser settings, then tap Refresh.'
                    : gpsError.toLowerCase().includes('timeout')
                    ? 'Location timed out. Move to an open area and try again.'
                    : gpsError.toLowerCase().includes('unavailable')
                    ? 'Location unavailable. Check device GPS settings.'
                    : gpsError}
                </p>
              </div>
            </div>
          )}

          {permissionStatus === 'granted' && !isUsingDefault && position?.latitude && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#f0fdf4', border: '1.5px solid #bbf7d0',
              borderRadius: '12px', padding: '9px 12px', marginBottom: '12px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
              </svg>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#065f46' }}>
                GPS · {position.latitude.toFixed(5)}, {position.longitude.toFixed(5)}
              </span>
              {position.accuracy && (
                <span style={{ fontSize: '11px', color: '#16a34a', marginLeft: 'auto', fontWeight: '500' }}>
                  ±{Math.round(position.accuracy)}m
                </span>
              )}
            </div>
          )}

          {(isUsingDefault || permissionStatus !== 'granted') && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#f8f7ff', border: '1.5px solid #ede9fe',
              borderRadius: '12px', padding: '10px 12px',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e', flexShrink: 0 }} />
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          )}

       
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', paddingLeft: '2px' }}>
            {permissionStatus === 'granted' && !isUsingDefault ? (
              <>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                  <span style={{ color: '#059669', fontWeight: '700' }}>Lat </span>
                  {position.latitude?.toFixed(4)}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                  <span style={{ color: '#059669', fontWeight: '700' }}>Lng </span>
                  {position.longitude?.toFixed(4)}
                </span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                  <span style={{ color: '#7c3aed', fontWeight: '700' }}>Lat </span>
                  {currentLandmark.lat.toFixed(4)}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                  <span style={{ color: '#7c3aed', fontWeight: '700' }}>Lng </span>
                  {currentLandmark.lng.toFixed(4)}
                </span>
              </>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex', gap: '4px',
          background: '#ede9fe', borderRadius: '14px', padding: '4px',
          marginBottom: '16px',
        }}>
          {[
            { id: 'grid', label: 'Exploration Grid', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/></svg> },
            { id: 'map',  label: 'Offline Map',      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontWeight: '700', fontSize: '13px', transition: 'all 0.2s',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#7c3aed',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

     
      {activeTab === 'map' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{
            borderRadius: '20px', overflow: 'hidden',
            height: '340px', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '12px',
            background: 'linear-gradient(135deg, #ede9fe 0%, #e0f2fe 50%, #d1fae5 100%)',
            border: '2px dashed rgba(124,58,237,0.2)',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#4c1d95' }}>Offline Map</p>
            <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', maxWidth: '220px', lineHeight: '1.5' }}>
              Download map tiles to use navigation without internet
            </p>
            <button
              type="button"
              onClick={() => window.open(`https://www.google.com/maps/@${currentLandmark.lat},${currentLandmark.lng},13z`, '_blank')}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff', border: 'none',
                borderRadius: '999px', padding: '11px 28px',
                fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
              }}
            >
              Open in Google Maps
            </button>
          </div>
        </div>
      )}

      {activeTab === 'grid' && (
        <>
          {/* Search + Favorites */}
          <div style={{ padding: '0 20px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <svg
                width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"
                style={{ position: 'absolute', top: '50%', left: '13px', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landmarks, beach, temples…"
                style={{
                  width: '100%', height: '50px',
                  paddingLeft: '42px', paddingRight: searchQuery ? '40px' : '14px',
                  borderRadius: '14px', border: '2px solid #ede9fe',
                  background: '#fff', fontSize: '14px', color: '#0f172a',
                  outline: 'none', boxShadow: '0 2px 8px rgba(124,58,237,0.06)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#7c3aed'; }}
                onBlur={e => { e.target.style.borderColor = '#ede9fe'; }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            <Link
              to="/favorites"
              style={{
                width: '50px', height: '50px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 3px 10px rgba(244,63,94,0.3)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>
          </div>

         
          <div style={{ padding: '0 20px 20px' }}>
            <div
              ref={chipScrollRef}
              className="hide-scrollbar"
              style={{ overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '4px' }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const cfg = CATEGORY_COLORS[cat] || CATEGORY_COLORS['All'];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '7px 16px', borderRadius: '999px',
                      fontSize: '13px', fontWeight: '700',
                      whiteSpace: 'nowrap', flexShrink: 0,
                      cursor: 'pointer', border: 'none',
                      transition: 'all 0.2s',
                      background: isActive ? cfg.bg : '#fff',
                      color: isActive ? '#fff' : cfg.inactive,
                      boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.08)',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: '0 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{
              fontSize: '18px', fontWeight: '800', fontFamily: 'Epilogue, sans-serif',
              background: 'linear-gradient(135deg, #1a0533, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {sectionTitle}
            </h2>
            {displayed.length > 0 && (
              <span style={{
                fontSize: '12px', fontWeight: '700', color: '#7c3aed',
                background: '#ede9fe', padding: '3px 10px', borderRadius: '999px',
              }}>
                {displayed.length} places
              </span>
            )}
          </div>
          <div style={{ padding: '0 20px' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
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
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>No results found</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Try a different search or category</p>
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
