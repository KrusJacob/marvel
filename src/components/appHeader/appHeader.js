import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

import { URLS } from "../app/App";

const AppHeader = () => {
  return (
    <div className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              end
              style={({ isActive }) => ({ color: isActive ? "#9f0013" : "inherit" })}
              to={`${URLS.main}`}
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink style={({ isActive }) => ({ color: isActive ? "#9f0013" : "inherit" })} to={`${URLS.comics}`}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
