import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark shadow-sm custom-navbar">
      <a className="navbar-brand" href="/">
        <img src="/images/logo.png" alt="CV Builder+" height="80" />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/create">
              Create CV Now
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/check">
              Check Existing CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
