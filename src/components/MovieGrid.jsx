import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  if (!movies.length) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          🎬
        </div>

        <h3>
          No movies found
        </h3>

        <p>
          Try another movie title or search term.
        </p>

      </div>
    );
  }

  return (
    <div className="movie-grid">

      {movies.map((movie) => (
        <MovieCard
          key={`${movie.id}-${movie.title}`}
          movie={movie}
        />
      ))}

    </div>
  );
}

export default MovieGrid;
