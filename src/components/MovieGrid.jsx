import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <h3>No movies found</h3>
        <p>Try another search.</p>
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