import { Routes, Route } from 'react-router-dom';
import { useFavorites } from './hooks/useFavorites';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import FavoritesPage from './pages/FavoritesPage';
import AttractionDetailPage from './pages/AttractionDetailPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites, favoritesCount } = useFavorites();

  return (
    <>
      <Header />
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
            <ProfilePage favoritesCount={favoritesCount} />
          }
        />
      </Routes>

      <BottomNav favoritesCount={favoritesCount} />
    </>
  );
}
