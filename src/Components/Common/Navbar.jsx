import React from "react";
import { Link } from "react-router-dom";

// import { signout } from "../Auth/Signout";
import {logoutuser} from '../../redux/store'
import { connect } from "react-redux";

const isActive = (history, path) => {
  // if (history.location.pathname === path) return "nav-item active";
  return "nav-item";
};

const Navbar = ({ history, user, logoutuser }) => (
  
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
          {!user && (
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
          {user && (
            <>
              <li className="nav-item">
                <Link to="/createpost" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link text-primary">
                  {user.user.username}
                </span>
              </li>
              <li className={isActive(history, "/signout")}>
                <a
                  className="nav-link text-danger"
                  onClick={()=>logoutuser()}
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



const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {logoutuser})(Navbar);
