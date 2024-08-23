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
    stu_ID: "",
    year: "",
    image: null, // For storing the image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("stu_ID", form.stu_ID);
    formData.append("year", form.year);
    formData.append("image", form.image); // Append image file

    try {
      await axios.post("http://localhost:4000/libo/student/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Student added successfully!");
    } catch (err) {
      console.error("Error adding student:", err);
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
            type="text"
            name="stu_ID"
            placeholder="Student ID"
            value={form.stu_ID}
            onChange={handleChange}
            required
          />
          <select name="year" value={form.year} onChange={handleChange}>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
          <input type="file" name="image" onChange={handleFileChange} required /> {/* Image upload input */}
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
