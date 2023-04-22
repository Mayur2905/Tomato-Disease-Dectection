import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.modules.css";
import { FaBars, FaTimes } from "react-icons/fa";

export const NavBar = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const signout = () => {
    if (props.name) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="nv_main">
      <nav className="navbar">
        <Link a="/" className="Logo">
          <img
            src="https://res.cloudinary.com/dkxchvnsd/image/upload/v1678982463/log_uoygaw.png"
            alt="logo"
            width="50px"
          />
        </Link>
        <ul
          className={isMobile ? "navlinkMobile" : "navlink"}
          onClick={() => setIsMobile(false)}
        >
          <Link to="/" className="Home">
            <li>Home</li>
          </Link>
          <Link to="/About" className="About">
            <li>About</li>
          </Link>
          <Link to="/Login" className="Login">
            <li>
              <button onClick={signout}>
                {props.name ? "Logout" : "Login"}
              </button>
            </li>
          </Link>
          <Link to="/Signup" className="SignUp">
            <li>SignUp</li>
          </Link>
        </ul>
        <button
          className="mobilElmentIcon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
