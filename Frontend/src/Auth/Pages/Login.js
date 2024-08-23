import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import Logo from '../Assets/Logo.png';
import User from '../Assets/user.png';

function Login() {
  const [role, setRole] = useState("User");

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="form-container-lg">
          <div className="profile-icon">
            <img src={User} alt="Libo Logo" />
          </div>
          <h2>{role}</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email@ensia.edu.dz"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="enter password"
            />

            <div className="form-footer">
            <NavLink to="/signup" className="signup-link">
              Sign Up
            </NavLink>

              <button type="submit" className="login-button">Login</button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-right">
      <div className="role-buttons">
          <button
            className={`role-button ${role === "User" ? "active" : ""}`}
            onClick={() => handleRoleClick("User")}
          >
            User
          </button>
          <button
            className={`role-button ${role === "Librarian" ? "active" : ""}`}
            onClick={() => handleRoleClick("Librarian")}
          >
            Librarian
          </button>
        </div>
        <img src={Logo} alt="Libo" className="logo"/>
        <h1>Libo</h1>
      </div>
    </div>
  );
}

export default Login;
