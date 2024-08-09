import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBook,
  faUserGraduate,
  faClipboardList,
  faBookOpen,
  faExclamationTriangle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css"; // Import the CSS file for styling
import Logo from "./Images/Logo.png";
import Librarian from "./Images/Librarian.jpeg";

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
          <li
            className={active === "Dashboard" ? "active" : ""}
            onClick={() => setActive("Dashboard")}
          >
            <FontAwesomeIcon className="space" icon={faTachometerAlt} />{" "}
            Dashboard
          </li>
          <li
            className={active === "Manage Books" ? "active" : ""}
            onClick={() => setActive("Manage Books")}
          >
            <FontAwesomeIcon className="space" icon={faBook} /> Manage Books
          </li>
          <li
            className={active === "Manage Students" ? "active" : ""}
            onClick={() => setActive("Manage Students")}
          >
            <FontAwesomeIcon className="space" icon={faUserGraduate} /> Manage
            Students
          </li>
          <li
            className={active === "Manage Requests" ? "active" : ""}
            onClick={() => setActive("Manage Requests")}
          >
            <FontAwesomeIcon className="space" icon={faClipboardList} /> Manage
            Requests
          </li>
          <li
            className={active === "Issued Books" ? "active" : ""}
            onClick={() => setActive("Issued Books")}
          >
            <FontAwesomeIcon className="space" icon={faBookOpen} /> Issued Books
          </li>
          <li
            className={active === "Defaulter Books" ? "active" : ""}
            onClick={() => setActive("Defaulter Books")}
          >
            <FontAwesomeIcon className="space" icon={faExclamationTriangle} />{" "}
            Defaulter Books
          </li>
        </ul>
      </div>
      <div className="sidebar-logout">
        <FontAwesomeIcon className="space" icon={faSignOutAlt} /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
