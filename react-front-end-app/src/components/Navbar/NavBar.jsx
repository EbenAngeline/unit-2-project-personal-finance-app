import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "../Button/Button";

function NavBar({ isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const links = isLoggedIn
    ? [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/budget", label: "Budget" },
        { to: "/transactions", label: "Transactions" },
        { to: "/contact", label: "Contact" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/login", label: "Login" },
      ];

  const handleLogout = () => {
    if (onLogout) onLogout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <Button
        className={`navbar__toggle ${isMenuOpen ? "navbar__toggle--active" : ""}`}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </Button>

      <nav
        className={`navbar ${isMenuOpen ? "navbar--open" : ""}`}
        aria-label="Primary navigation"
      >
        <ul className="navbar__list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "navbar__link navbar__link--active"
                    : "navbar__link"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {isLoggedIn && (
            <li>
              <button
                type="button"
                className="navbar__link navbar__button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
