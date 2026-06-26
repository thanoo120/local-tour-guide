import { Routes, Route, Navigate } from 'react-router-dom';
import { useFavorites } from './hooks/useFavorites';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { useNotifications } from './hooks/useNotifications';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import FavoritesPage from './pages/FavoritesPage';
import AttractionDetailPage from './pages/AttractionDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function AppContent() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites, favoritesCount } = useFavorites();
  const { user, isLoggedIn, login, signup, logout, updateProfile, updateProfilePhoto } = useAuth();
  const { theme, setTheme } = useTheme();
  const notifications = useNotifications();
  const { t } = useLanguage();

  // Wrap toggleFavorite to send a notification when adding
  const handleToggleFavorite = (id, attractionName) => {
    const wasAlreadyFavorite = isFavorite(id);
    toggleFavorite(id);
    if (!wasAlreadyFavorite) {
      notifications.notify(
        `❤️ ${t('notifications.addedToFavorites')}`,
        attractionName || 'Attraction saved to your favorites.',
      );
    }
  };

  // Wrap updateProfile to send a notification on success
  const handleUpdateProfile = (data) => {
    const result = updateProfile(data);
    if (result.ok) {
      notifications.notify(
        t('notifications.profileUpdated'),
        t('notifications.profileUpdatedBody'),
      );
    }
    return result;
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} onSignup={signup} />;
  }

  return (
    <>
      <Header user={user} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <Routes>
        <Route path="/" element={<Navigate to="/explore" replace />} />
        <Route
          path="/explore"
          element={
            <ExplorePage
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onClearFavorites={clearFavorites}
            />
          }
        />
        <Route
          path="/attraction/:id"
          element={
            <AttractionDetailPage
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
              favoritesCount={favoritesCount}
              onLogout={logout}
              onUpdateProfile={handleUpdateProfile}
              onUpdateProfilePhoto={updateProfilePhoto}
              theme={theme}
              onSetTheme={setTheme}
              notifications={notifications}
            />
          }
        />
        <Route
          path="/bookings"
          element={
            <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '24px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 8px 24px rgba(6,182,212,0.3)',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', fontFamily: 'Epilogue, sans-serif' }}>{t('bookings.noBookings')}</h2>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{t('bookings.willAppear')}</p>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <BottomNav favoritesCount={favoritesCount} />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
