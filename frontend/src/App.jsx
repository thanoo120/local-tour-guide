import { Routes, Route, Navigate } from 'react-router-dom';
import { useFavorites } from './hooks/useFavorites';
import { useAuth } from './hooks/useAuth';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import FavoritesPage from './pages/FavoritesPage';
import AttractionDetailPage from './pages/AttractionDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites, favoritesCount } = useFavorites();
  const { user, isLoggedIn, login, signup, logout } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} onSignup={signup} />;
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/explore"
          element={
            <ExplorePage
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onClearFavorites={clearFavorites}
            />
          }
        />
        <Route
          path="/attraction/:id"
          element={
            <AttractionDetailPage
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
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
            />
          }
        />
        <Route
          path="/bookings"
          element={
            <div className="page-content" style={{ padding: '32px 20px', textAlign: 'center', color: '#6b7280' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#d1d5db', display: 'block', marginBottom: '16px' }}>calendar_month</span>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>No Bookings Yet</h2>
              <p style={{ fontSize: '14px' }}>Your trip bookings will appear here.</p>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <BottomNav favoritesCount={favoritesCount} />
    </>
  );
}
