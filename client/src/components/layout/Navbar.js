import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Context } from "../../index.js";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleNavbar = () => {
    setShow(!show);
  };

  const location = useLocation();
  const { isAuthenticated, user, setIsAuthenticated, mode, setMode } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://back-blog-app.vercel.app///user/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header
      className={
        location.pathname === "/dashboard" ? "hideNavbar" : mode === "light" ? "header light-navbar" : "header dark-navbar"
      }
    >
      <nav className="navbar">
        <div className="logo">
          <button to="/" onClick={handleNavbar}>
            Vaghela<span>Blog</span>
          </button>
        </div>

        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to="/" onClick={handleNavbar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleNavbar}>
                About
              </Link>
            </li>
            <li>
              <Link to="/blogs" onClick={handleNavbar}>
                Blogs
              </Link>
            </li>
          </ul>

          <div className="btns">
          <button
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              className={
                mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              {mode === "light" ? (
                <CiLight className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              )}
            </button>
            {isAuthenticated && user?.role === "Admin" && (
              <Link
                to="/dashboard"
                onClick={handleNavbar}
                className="dashboard-btn"
              >
                DASHBOARD
              </Link>
            )}
            {!isAuthenticated ? (
              <Link to="/login" onClick={handleNavbar} className="login-btn">
                LOGIN
              </Link>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                LOGOUT
              </button>
            )}
          </div>
        </div>

        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </header>
  );
};

export default Navbar;
