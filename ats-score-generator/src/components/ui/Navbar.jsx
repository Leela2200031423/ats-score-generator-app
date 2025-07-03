import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="hamburger"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="logo">
          <span className="logo-gradient"></span>
          <span className="logo-text">ATS Score Generator</span>
        </div>
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={handleClose}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            className={location.pathname === "/upload" ? "active" : ""}
            onClick={handleClose}
          >
            Upload Resume
          </Link>
        </li>
        <li>
          <Link
            to="/analysis"
            className={location.pathname === "/analysis" ? "active" : ""}
            onClick={handleClose}
          >
            Analysis
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={handleClose}
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <Link to="/upload">
          <button className="get-started-btn" onClick={handleClose}>
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;