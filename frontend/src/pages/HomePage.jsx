import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

const CATEGORIES = [
  { label: 'Nature',     icon: 'forest',            color: '#059669', bg: 'linear-gradient(135deg, #064e3b, #059669)' },
  { label: 'Historical', icon: 'account_balance',   color: '#b45309', bg: 'linear-gradient(135deg, #78350f, #b45309)' },
  { label: 'Beach',      icon: 'beach_access',      color: '#0284c7', bg: 'linear-gradient(135deg, #0c4a6e, #0284c7)' },
  { label: 'Religious',  icon: 'temple_hindu',      color: '#7c3aed', bg: 'linear-gradient(135deg, #4c1d95, #7c3aed)' },
  { label: 'Adventure',  icon: 'hiking',            color: '#dc2626', bg: 'linear-gradient(135deg, #7f1d1d, #dc2626)' },
];

export default function HomePage({ isFavorite, onToggleFavorite }) {
  const { getFeaturedAttractions, getAttractionsByCategory, loading } = useAttractions();
  const { position } = useGeolocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const chipScrollRef = useRef(null);

  const featured = getFeaturedAttractions();
  const displayed = activeCategory ? getAttractionsByCategory(activeCategory) : featured;
  const sectionTitle = activeCategory ? `${activeCategory} Spots` : 'Featured for You';

  return (
    <div className="page-content" style={{ paddingBottom: '120px' }}>

      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ position: 'relative' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute', top: '50%', left: '14px',
              transform: 'translateY(-50%)',
              color: '#7c3aed', fontSize: '20px', pointerEvents: 'none',
            }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Where to, traveler?"
            style={{
              width: '100%', height: '52px',
              paddingLeft: '46px', paddingRight: '16px',
              borderRadius: '16px', border: '2px solid #ede9fe',
              background: '#fff',
              fontSize: '15px', color: '#0f172a',
              outline: 'none',
              boxShadow: '0 2px 12px rgba(124,58,237,0.08)',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#7c3aed'; }}
            onBlur={e => { e.target.style.borderColor = '#ede9fe'; }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <div
          ref={chipScrollRef}
          className="hide-scrollbar"
          style={{ overflowX: 'auto', display: 'flex', gap: '10px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '4px' }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(isActive ? null : cat.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '9px 18px', borderRadius: '999px',
                  fontSize: '13px', fontWeight: '700',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  cursor: 'pointer', border: 'none',
                  transition: 'all 0.2s',
                  background: isActive ? cat.bg : '#fff',
                  color: isActive ? '#ffffff' : cat.color,
                  boxShadow: isActive
                    ? `0 4px 14px rgba(0,0,0,0.25)`
                    : '0 1px 6px rgba(0,0,0,0.08)',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Section */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{
            fontSize: '21px', fontWeight: '800', fontFamily: 'Epilogue, sans-serif',
            background: 'linear-gradient(135deg, #1a0533, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {sectionTitle}
          </h2>
          <Link
            to="/explore"
            style={{
              fontSize: '13px', fontWeight: '700', color: '#7c3aed',
              background: '#ede9fe', padding: '5px 14px', borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            See all →
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="skeleton" style={{ aspectRatio: '16/9' }} />
                <div style={{ padding: '16px' }}>
                  <div className="skeleton" style={{ height: '18px', width: '70%', borderRadius: '6px', marginBottom: '8px' }} />
                  <div className="skeleton" style={{ height: '14px', width: '40%', borderRadius: '6px' }} />
                </div>
              </div>
            ))}
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

      
      <div style={{ padding: '32px 20px 8px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 40%, #06b6d4 100%)',
          borderRadius: '24px',
          padding: '28px 24px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(124,58,237,0.35)',
        }}>
          
          <div style={{
            position: 'absolute', bottom: '-50px', right: '-50px',
            width: '180px', height: '180px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{
            position: 'absolute', top: '-30px', right: '40px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '10px', fontWeight: '800',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '4px 12px', borderRadius: '999px', marginBottom: '12px',
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              Travel Essential
            </span>
            <h2 style={{
              fontSize: '22px', fontWeight: '800', color: '#fff',
              marginBottom: '10px', lineHeight: '1.3',
              fontFamily: 'Epilogue, sans-serif',
            }}>
              Safety First in Sri Lanka
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', maxWidth: '240px' }}>
              Get the latest travel advisories, currency tips, and emergency contacts for a worry-free journey.
            </p>
            <button
              type="button"
              style={{
                background: '#fff', color: '#7c3aed',
                padding: '11px 24px', borderRadius: '999px',
                fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              Read Guide
            </button>
          </div>

          <div style={{
            position: 'absolute', bottom: '16px', right: '20px',
            color: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
          }}>
            <svg width="100px" height="100px" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
        </div>
      </div>

      
      <button
        type="button"
        onClick={() => window.open('https://www.google.com/maps/search/attractions+sri+lanka', '_blank')}
        style={{
          position: 'fixed', bottom: '90px', right: '20px', zIndex: 50,
          width: '54px', height: '54px',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          color: '#fff',
          borderRadius: '18px', border: 'none',
          boxShadow: '0 6px 20px rgba(124,58,237,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>map</span>
      </button>

    </div>
  );
}
