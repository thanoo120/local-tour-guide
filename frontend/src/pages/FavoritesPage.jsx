import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { useGeolocation } from '../hooks/useGeolocation';
import AttractionCard from '../components/AttractionCard';

export default function FavoritesPage({ favorites, isFavorite, onToggleFavorite, onClearFavorites }) {
  const { getAttractionById, loading } = useAttractions();
  const { position } = useGeolocation();

  const favoriteAttractions = favorites
    .map((id) => getAttractionById(id))
    .filter(Boolean);

  return (
    <div className="page-content">
      {/* Header banner */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #be185d 0%, #f43f5e 45%, #f97316 100%)',
          borderRadius: '24px',
          padding: '20px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 28px rgba(244,63,94,0.3)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* BG decoration */}
          <div style={{
            position: 'absolute', bottom: '-30px', right: '-30px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <div>
              <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '22px', lineHeight: 1.2, margin: 0, fontFamily: 'Epilogue, sans-serif' }}>
                My Favourites
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: '2px 0 0' }}>
                {favoriteAttractions.length} saved place{favoriteAttractions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {favoriteAttractions.length > 0 && (
            <button
              onClick={onClearFavorites}
              type="button"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1.5px solid rgba(255,255,255,0.35)',
                borderRadius: '20px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                padding: '7px 14px',
                cursor: 'pointer',
                position: 'relative', zIndex: 1,
              }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="skeleton" style={{ aspectRatio: '16/9' }} />
              <div style={{ padding: '16px' }}>
                <div className="skeleton" style={{ height: '18px', width: '70%', borderRadius: '6px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ height: '14px', width: '40%', borderRadius: '6px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : favoriteAttractions.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', textAlign: 'center' }}>
          <div style={{
            width: '88px', height: '88px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #fce7f3, #ffe4e6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(244,63,94,0.15)',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', fontFamily: 'Epilogue, sans-serif' }}>
            No favorites yet
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '28px', lineHeight: '1.6', maxWidth: '260px' }}>
            Tap the heart icon on any attraction to save it here for quick access.
          </p>
          <Link
            to="/explore"
            style={{
              background: 'linear-gradient(135deg, #f43f5e, #f97316)',
              color: '#fff', padding: '13px 28px', borderRadius: '999px',
              fontWeight: '700', fontSize: '14px', textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(244,63,94,0.35)',
            }}
          >
            Explore Attractions →
          </Link>
        </div>
      ) : (
        <div style={{ padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {favoriteAttractions.map((attraction, i) => (
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
  );
}
