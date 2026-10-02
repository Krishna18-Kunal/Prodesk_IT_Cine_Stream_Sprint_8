const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

export async function getPopularMovies(page = 1) {
  if (!API_KEY) {
    throw new Error("TMDB API Key is missing. Check your .env file.");
  }

  const url = new URL(`${API_BASE_URL}/movie/popular`);

  url.searchParams.set("api_key", API_KEY.trim());
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", page);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(query, page = 1) {
  if (!API_KEY) {
    throw new Error("TMDB API Key is missing. Check your .env file.");
  }

  const url = new URL(`${API_BASE_URL}/search/movie`);

  url.searchParams.set("api_key", API_KEY.trim());
  url.searchParams.set("query", query);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", page);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB search failed: ${response.status}`);
  }

  return response.json();
}