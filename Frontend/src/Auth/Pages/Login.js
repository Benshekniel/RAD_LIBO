import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import "./Login.css";
import Logo from '../Assets/Logo.png';
import User from '../Assets/user.png';

function Login() {
  const { handleLogin } = useContext(UserContext);
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/libo/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();

      if (response.ok) {
        const expirationTime = new Date().getTime() + 3600000; // 1 hour in ms
        handleLogin(data.token, expirationTime, role);  // Pass role here
        navigate(role === 'student' ? '/manage-avilablebooks' : '/manage-books');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="form-container-lg">
          <div className="profile-icon">
            <img src={User} alt="Libo Logo" />
          </div>
          <h2>{role}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className={`role-button ${role === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleClick('student')}
          >
            User
          </button>
          <button
            className={`role-button ${role === 'librarian' ? 'active' : ''}`}
            onClick={() => handleRoleClick('librarian')}
          >
            Librarian
          </button>
        </div>
        <img src={Logo} alt="Libo" className="logo" />
        <h1>Libo</h1>
      </div>
    </div>
  );
}

export default Login;
