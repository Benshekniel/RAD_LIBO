import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import "./Login.css";
import logo from '../Assets/Logo.png';
import user from '../Assets/user.png';

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
        credentials: 'include',
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        const expirationTime = new Date().getTime() + 3600000; // 1 hour in ms
        handleLogin(data.token, expirationTime, role, email);
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
      <div className="right-panel">

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="profile-icon-sp">
            <img src={user} alt="User Icon" />
          </div>

          <h2 style={{ color: "white", }}>{role}</h2>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Login</button>
          <div className="signup-link">
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </form>
      </div>

      <div className="left-panel">
        <div className="role-buttons">
          <button
            type="button"
            className={`role-button ${role === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleClick('student')}
          >
            User
          </button>
          <button
            type="button"
            className={`role-button ${role === 'librarian' ? 'active' : ''}`}
            onClick={() => handleRoleClick('librarian')}
          >
            Librarian
          </button>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Libo Logo" className="logo-image" />
          <h1 className="logo-text">Libo</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
