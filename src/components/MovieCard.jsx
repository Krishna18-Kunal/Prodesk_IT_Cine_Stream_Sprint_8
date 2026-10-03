import { useFavorites } from "../context/FavoritesContext";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <article className="movie-card">

      <div className="poster-container">

        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            <span>🎬</span>
            <p>No Poster Available</p>
          </div>
        )}

        <div className="poster-overlay" />

        <button
          type="button"
          className={`favorite-button ${
            favorite ? "active" : ""
          }`}
          onClick={() => toggleFavorite(movie)}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "♥" : "♡"}
        </button>

        <div className="movie-overlay-info">

          <div className="overlay-rating">
            ⭐ {rating}
          </div>

          <span className="overlay-year">
            {releaseYear}
          </span>

        </div>

      </div>

      <div className="movie-info">

        <h3 title={movie.title}>
          {movie.title}
        </h3>

        <div className="movie-meta">

          <span>
            {releaseYear}
          </span>

          <span className="movie-rating">
            ⭐ {rating}
          </span>

        </div>

      </div>

    </article>
  );
}

export default MovieCard;
