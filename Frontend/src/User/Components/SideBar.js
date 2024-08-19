import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faBook, faBookOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css'; // Import the CSS file for styling
import Logo from '../Assets/Logo.png';
import UserImage from '../Assets/Librarian.jpeg';

const SidebarUs = () => {
  const [active, setActive] = useState('Books');

  return (
    <div className="sidebar-us">
      <div className="sidebar-us-logo">
        <img src={Logo} alt="Logo" />
        <h1>Libo</h1>
      </div>
      <div className="sidebar-us-user">
        <img src={UserImage} alt="User" className="user-avatar" />
        <div className="user-info">
          <p>akhouna labib</p>
          <p className="user-role">User</p>
        </div>
      </div>
      <div className="sidebar-us-menu">
        <ul>
          <li>
            <NavLink to="/manage-avilablebooks" className={active === 'Books' ? 'active-NavLink' : ''} onClick={() => setActive('Books')}>
              <FontAwesomeIcon className="space" icon={faBook} /> Avilable Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-requestedbooks" className={active === 'Requested Books' ? 'active-NavLink' : ''} onClick={() => setActive('Requested Books')}>
              <FontAwesomeIcon className="space" icon={faClipboardList} /> Requested Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-returnbooks" className={active === 'Pending to return' ? 'active-NavLink' : ''} onClick={() => setActive('Pending to return')}>
              <FontAwesomeIcon className="space" icon={faBookOpen} /> Pending to return
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-us-logout">
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

export default SidebarUs;