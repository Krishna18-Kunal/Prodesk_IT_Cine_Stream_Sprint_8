import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdb";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] = useState("");

  const observerRef = useRef(null);

  const fetchInitialMovies = useCallback(
    async (searchQuery = "") => {
      try {
        setLoading(true);
        setError("");
        setPage(1);

        const data = searchQuery
          ? await searchMovies(searchQuery, 1)
          : await getPopularMovies(1);

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load movies. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchInitialMovies("");
  }, [fetchInitialMovies]);

  const handleSearch = useCallback(
    (searchQuery) => {
      setQuery(searchQuery);
      fetchInitialMovies(searchQuery);
    },
    [fetchInitialMovies]
  );

  const loadMoreMovies = useCallback(async () => {
    if (loading || loadingMore) return;

    if (page >= totalPages) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = query
        ? await searchMovies(query, nextPage)
        : await getPopularMovies(nextPage);

      setMovies((previous) => [
        ...previous,
        ...(data.results || []),
      ]);

      setPage(nextPage);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load more movies."
      );
    } finally {
      setLoadingMore(false);
    }
  }, [
    page,
    query,
    totalPages,
    loading,
    loadingMore,
  ]);

  useEffect(() => {
    const element = observerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMovies();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreMovies]);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">
            DISCOVER • SEARCH • SAVE
          </p>

          <h1>
            Find your next
            <span> favorite movie.</span>
          </h1>

          <p className="hero-description">
            Explore popular movies, search thousands of
            titles and build your personal watchlist.
          </p>
        </div>

        <div className="hero-search">
          <SearchBar
            onSearch={handleSearch}
            disabled={loading}
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              {query ? "SEARCH RESULTS" : "TRENDING NOW"}
            </p>

            <h2>
              {query
                ? `Results for "${query}"`
                : "Popular Movies"}
            </h2>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            <MovieGrid movies={movies} />

            <div
              ref={observerRef}
              className="scroll-sentinel"
            />

            {loadingMore && (
              <Loading text="Loading more movies..." />
            )}

            {!loadingMore &&
              page >= totalPages &&
              movies.length > 0 && (
                <p className="end-message">
                  You've reached the end.
                </p>
              )}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;