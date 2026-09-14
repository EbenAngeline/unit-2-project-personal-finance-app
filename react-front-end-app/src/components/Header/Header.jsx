import "./Header.css";
import NavBar from "../Navbar/NavBar";

function Header({ isLoggedIn, onLogout }) {
  return (
    <div className="nav-header">
      <header className="header">
        <div className="header__intro">
          <h1 className="header__title">TRACK YOUR PERSONAL FINANCE APP</h1>
        </div>

        <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </header>
    </div>
  );
}

export default Header;
