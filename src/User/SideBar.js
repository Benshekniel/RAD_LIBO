import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css'; // Import the CSS file for styling
import Logo from './Images/Logo.png';
import UserImage from './Images/Librarian.jpeg';

const Sidebar = () => {
  const [active, setActive] = useState('Books');

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="Logo" />
        <h1>Libo</h1>
      </div>
      <div className="sidebar-user">
        <img src={UserImage} alt="User" className="user-avatar" />
        <div className="user-info">
          <p>akhouna labib</p>
          <p className="user-role">User</p>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className={active === 'Books' ? 'active' : ''} onClick={() => setActive('Books')}>
            <FontAwesomeIcon className="space" icon={faBook} /> Books
          </li>
          <li className={active === 'Requested Books' ? 'active' : ''} onClick={() => setActive('Requested Books')}>
            <FontAwesomeIcon className="space" icon={faBookOpen} /> Requested Books
          </li>
          <li className={active === 'Pending to return' ? 'active' : ''} onClick={() => setActive('Pending to return')}>
            <FontAwesomeIcon className="space" icon={faBookOpen} /> Pending to return
          </li>
        </ul>
      </div>
      <div className="sidebar-logout">
        <FontAwesomeIcon className="space" icon={faSignOutAlt} /> Logout
      </div>
    </div>
  );
};

export default Sidebar;