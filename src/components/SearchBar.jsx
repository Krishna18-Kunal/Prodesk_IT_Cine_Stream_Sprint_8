import { useEffect, useState } from "react";

function SearchBar({ onSearch, disabled = false }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      onSearch("");
      return;
    }

    const timer = setTimeout(() => {
      onSearch(trimmedQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query, onSearch]);

  return (
    <div className="search-wrapper">
      <span className="search-icon">🔎</span>

      <input
        type="search"
        value={query}
        disabled={disabled}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search movies..."
      />

      {query && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setQuery("")}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;