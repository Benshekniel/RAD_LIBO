import React from 'react';
import './LandingPage.css';
import { NavLink} from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="overlay">
        <div className="content">
          <h1>Welcome to Libo</h1>
          <p>An Library management system for the Libraries</p>
          
          <NavLink to="/login"><button className="get-started-btn">Get started</button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
