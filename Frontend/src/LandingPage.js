import React from 'react';
import './LandingPage.css';
import { NavLink } from 'react-router-dom';
import Logo from './User/Assets/Logo.png';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="navBar">
        <div className="nav-logo">
          <img src={Logo} alt="Logo" />
          <h1>Libo</h1>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
        </ul>
      </div>

      <div className="overlay">
        <div className="content">
          <h1>Welcome to Libo</h1>
          <p>A Library Management System for Libraries</p>
          <NavLink to="/login">
            <button className="get-started-btn">Get started</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
