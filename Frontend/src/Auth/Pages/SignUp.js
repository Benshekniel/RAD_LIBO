import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import logo from "../Assets/Logo.png";
import user from "../Assets/user.png";

const SignUp = () => {
  const [role, setRole] = useState("User");
  const [/* students */, setStudents] = useState([]);
  const [/* showAddStudentForm */, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    stu_ID: "",
    year: "",
    image: "",
  });
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    student_id: "",
    position: "Librarian",
    year: "",
  });

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);

    if(role === "User") {
      const handleAddStudent = async () => {
        const formData = new FormData();
        formData.append('name', newStudent.name);
        formData.append('email', newStudent.email);
        formData.append('stu_ID', newStudent.stu_ID);
        formData.append('year', newStudent.year);
        formData.append('image', newStudent.image);
    
        try {
          await axios.post("http://localhost:4000/libo/student/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setShowAddStudentForm(false);
          setNewStudent({
            name: "",
            email: "",
            stu_ID: "",
            year: "",
            image: "",
          });
          // Refresh books list
          const response = await axios.get(`http://localhost:4000/libo/student`);
          setStudents(response.data);
        } catch (error) {
          console.error("Error adding student:", error);
        }
      };
    } /* else if(role==="Librarian"){
      const handleAddStudent = async () => {
        const formData = new FormData();
        formData.append('name', newStudent.name);
        formData.append('email', newStudent.email);
        formData.append('stu_ID', newStudent.stu_ID);
        formData.append('year', newStudent.year);
        formData.append('image', newStudent.image);
    
        try {
          await axios.post("http://localhost:4000/libo/student/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setShowAddStudentForm(false);
          setNewStudent({
            name: "",
            email: "",
            stu_ID: "",
            year: "",
            image: "",
          });
          // Refresh books list
          const response = await axios.get(`http://localhost:4000/libo/student`);
          setStudents(response.data);
        } catch (error) {
          console.error("Error adding student:", error);
        }
      };
    } */
    
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
            type="student_id"
            name="student_id"
            placeholder="student_id"
            value={form.student_id}
            onChange={handleChange}
            required
          />
        )}
          {form.position === "User" && (
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          )}
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
          >
            <option onClick={() => handleRoleClick("Librarian")} value="Librarian">Librarian</option>
            <option  onClick={() => handleRoleClick("User")} value="User">User</option>
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
