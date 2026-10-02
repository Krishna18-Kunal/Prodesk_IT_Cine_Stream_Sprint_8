import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext();

const STORAGE_KEY = "cine-stream-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return previous;
      }

      return [...previous, movie];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((previous) =>
      previous.filter((movie) => movie.id !== movieId)
    );
  };

  const toggleFavorite = (movie) => {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...previous, movie];
    });
  };

  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}