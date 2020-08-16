import React from "react";
import { Link, withRouter } from "react-router-dom";

import { signout } from "../Auth/Signout";
import { isAuthenticated } from "../Auth/isAuthenticated";

const isActive = (history, path) => {
  if (history.location.pathname === path) return "nav-item active";
  return "nav-item";
};

const Navbar = ({ history }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Chit-Chat
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!isAuthenticated() && (
            <>
              <li className={isActive(history, "/signup")}>
                <Link className="nav-link" to="/signup">
                  Register
                </Link>
              </li>
              <li className={isActive(history, "/signin")}>
                <Link className="nav-link" to="/signin">
                  Login
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <span className="nav-link">{isAuthenticated().user.username}</span>
              </li>
              <li className={isActive(history, "/signout")}>
                <a
                  className="nav-link"
                  onClick={() => signout(() => history.push("/"))}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default withRouter(Navbar);
