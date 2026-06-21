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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <BottomNav favoritesCount={favoritesCount} />
    </>
  );
}
