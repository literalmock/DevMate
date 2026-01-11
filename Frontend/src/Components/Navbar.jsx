import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="navbar-wrapper">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="nav-left">
          <span className="logo-text">Devmate</span>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <input
            className="nav-search"
            placeholder="Search"
          />

          {/* THEME TOGGLE */}
          <button
            className={`theme-toggle ${dark ? "dark" : ""}`}
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            <span className="icon">{dark ? "☀️" : "🌙"}</span>
          </button>

          {/* PROFILE */}
          <div className="profile">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="avatar"
            />

            <div className="profile-menu">
              <span>Profile</span>
              <span>Settings</span>
              <span className="danger">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
