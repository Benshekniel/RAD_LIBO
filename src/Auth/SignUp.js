import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SignUp.css";
import logo from "./Images/Logo.png";
import user from "./Images/user.png";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    position: "Librarian",
    year: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Libo Logo" className="logo-image" />
          <h1 className="logo-text">Libo</h1>
        </div>
      </div>
      <div className="right-panel">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="profile-icon-sp">
            <img src={user} alt="User Icon" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email@ensia.edu.dz"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {form.position === "User" && (
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />
          )}
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
          >
            <option value="Librarian">Librarian</option>
            <option value="User">User</option>
          </select>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <div className="login-link">
            <NavLink to="/">
            <a href="#">Login In</a>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
