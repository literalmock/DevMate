import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const user = useSelector(store => store.user);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      
      {/* LEFT SIDE */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Devmate</a>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* SEARCH
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        /> */}

        {/* THEME TOGGLE */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* PROFILE DROPDOWN */}

        {user && <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={user.photoURL}
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-[1]"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li>
              <a className="text-error">Logout</a>
            </li>
          </ul>
        </div>}

      </div>
    </div>
  );
};

export default Navbar;