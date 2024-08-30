import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import logo from "../Assets/Logo.png";
import user from "../Assets/user.png";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    stu_ID: "",
    year: "",
    image: null,
  });

  const [error, setError] = useState(""); // State to hold error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors before validation
    setError("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("stu_ID", form.stu_ID);
    formData.append("year", form.year);
    formData.append("image", form.image);

    try {
      // Make the POST request to the backend
      const response = await axios.post(
        "http://localhost:4000/libo/student/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // If successful, log a success message
      console.log("Student added successfully!");

      // Reset form fields after successful sign-up
      setForm({
        name: "",
        email: "",
        password: "",
        stu_ID: "",
        year: "",
        image: null,
      });

      // Clear any previous errors
      setError("");
    } catch (err) {
      // Handle validation errors from the backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.data && err.response.data.errors) {
        // If the error response contains specific field errors, display them
        const errorMessages = Object.values(err.response.data.errors)
          .map((error) => error.message)
          .join(" ");
        setError(errorMessages);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      // Prevent sign-up if there are errors
      return;
    }
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

          {error && <div className="error-message">{error}</div>} {/* Display error message */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
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
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="stu_ID"
            placeholder="Student ID"
            value={form.stu_ID}
            onChange={handleChange}
            required
          />
          <select name="year" value={form.year} onChange={handleChange}>
            <option value="" disabled>Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
          <input type="file" name="image" onChange={handleFileChange} required />
          <button type="submit" className="signup-button">Sign Up</button>
          <div className="login-link">
            <NavLink to="/">Login In</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
