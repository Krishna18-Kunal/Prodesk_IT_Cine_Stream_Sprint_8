import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 Cine-Stream
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/favorites">
          ❤️ Favorites
          <span className="favorite-count">
            {favorites.length}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;