import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"; 
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post(import.meta.env.VITE_BASE_URL + '/auth/logout', {}, { withCredentials: true })
      .then(response => {
        console.log('Logout successful:', response.data);
      })
      .catch(error => {
        console.error('Logout error:', error);
      }); 
      dispatch(removeUser());
      navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      
      {/* LEFT SIDE */}
      <div className="flex-1" onClick={()=> user ? navigate("/feed") : navigate("/login")}>
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
              <Link to="/profile">
                Profile
                <span className="badge badge-primary">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li>
              <a className="text-error" onClick={handleLogout} >Logout</a>
            </li>
          </ul>
        </div>}

      </div>
    </div>
  );
};

export default Navbar;