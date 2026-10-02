import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="content-section favorites-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>

          <h1>My Favorites</h1>

          <p className="page-description">
            {favorites.length} movie
            {favorites.length !== 1 ? "s" : ""} saved.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>

          <h2>No favorites yet</h2>

          <p>
            Click the heart icon on any movie to save it
            here.
          </p>

          <Link to="/" className="primary-button">
            Discover Movies
          </Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </main>
  );
}

export default Favorites;