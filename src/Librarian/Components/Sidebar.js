import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faBook, faUserGraduate, faClipboardList, faBookOpen, faExclamationTriangle, faSignOutAlt, } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import Logo from "../Assets/Logo.png";
import Librarian from "../Assets/Librarian.jpeg";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

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
            <NavLink to="/manage-dashboard" className={({ isActive }) => isActive ? "active-NavLink" : ""} onClick={() => setActive("Dashboard")}>
              <FontAwesomeIcon className="space" icon={faTachometerAlt} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-books" className={({ isActive }) => isActive ? "active-NavLink" : ""} onClick={() => setActive("Manage Books")}>
              <FontAwesomeIcon className="space" icon={faBook} /> Manage Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-students" className={({ isActive }) => isActive ? 'active-NavLink' : ""} onClick={() => setActive("Manage Students")}>
              <FontAwesomeIcon className="space" icon={faUserGraduate} /> Manage Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-requests" className={({ isActive }) => isActive ? 'active-NavLink' : ""} onClick={() => setActive("Manage Requests")}>
              <FontAwesomeIcon className="space" icon={faClipboardList} /> Manage Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-issued" className={({ isActive }) => isActive ? 'active-NavLink' : ""} onClick={() => setActive("Issued Books")}>
              <FontAwesomeIcon className="space" icon={faBookOpen} /> Issued Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-defaulter" className={({ isActive }) => isActive ? 'active-NavLink' : ""} onClick={() => setActive("Defaulter Books")}>
              <FontAwesomeIcon className="space" icon={faExclamationTriangle} /> Defaulter Books
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-logout">
        <NavLink 
          to="/" 
          className={active === 'Logout' ? 'active' : ''} 
          onClick={() => setActive('Logout')}
        >
          <FontAwesomeIcon className="space" icon={faSignOutAlt} /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
