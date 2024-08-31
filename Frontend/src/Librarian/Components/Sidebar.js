import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUserGraduate,
  faClipboardList,
  faBookOpen,
  faSignOutAlt,
  faBarcode
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import Logo from "../Assets/Logo.png";
import Librarian from "../Assets/Librarian.jpeg";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="Logo" />
        <h1>Libo</h1>
      </div>
      <div className="sidebar-user">
        <img src={Librarian} alt="User" className="user-avatar" />
        <div className="user-info">
          <p>akhouna labib</p>
          <p className="user-role">Librarian</p>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink
              to="/manage-books"
              className={({ isActive }) => (isActive ? "active-NavLink" : "")}
              onClick={() => setActive("Manage Books")}
            >
              <FontAwesomeIcon className="space" icon={faBook} /> Manage Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-pastpapers"
              className={({ isActive }) => (isActive ? "active-NavLink" : "")}
              onClick={() => setActive("Manage Pastpapers")}
            >
              <FontAwesomeIcon className="space" icon={faBarcode} /> Manage Pastpaper
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-students"
              className={({ isActive }) => (isActive ? "active-NavLink" : "")}
              onClick={() => setActive("Manage Students")}
            >
              <FontAwesomeIcon className="space" icon={faUserGraduate} /> Manage Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-requests"
              className={({ isActive }) => (isActive ? "active-NavLink" : "")}
              onClick={() => setActive("Manage Requests")}
            >
              <FontAwesomeIcon className="space" icon={faClipboardList} /> Manage Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-issued"
              className={({ isActive }) => (isActive ? "active-NavLink" : "")}
              onClick={() => setActive("Issued Books")}
            >
              <FontAwesomeIcon className="space" icon={faBookOpen} /> Issued Books
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-logout">
        <a
          className={active === 'Logout' ? 'active' : ''}
          onClick={handleLogout}
        >
          <FontAwesomeIcon className="space" icon={faSignOutAlt} /> Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;