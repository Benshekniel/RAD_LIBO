import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faBook, faBookOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';
import Logo from '../Assets/Logo.png';
import { UserContext } from '../../context/UserContext';

const SidebarUs = () => {
  const { handleLogout } = useContext(UserContext);
  const [active, setActive] = useState('Books');
  const navigate = useNavigate();

  return (
    <div className="sidebar-us">
      <div className="sidebar-us-logo">
        <img src={Logo} alt="Logo" />
        <h1>Libo</h1>
      </div>
      <div className="sidebar-us-menu">
        <ul>
          <li>
            <NavLink
              to="/manage-avilablebooks"
              className={active === 'Books' ? 'active-NavLink' : ''}
              onClick={() => setActive('Books')}
            >
              <FontAwesomeIcon className="space" icon={faBook} /> Available Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-avilablepastpapers"
              className={active === 'Pastpapers' ? 'active-NavLink' : ''}
              onClick={() => setActive('Pastpapers')}
            >
              <FontAwesomeIcon className="space" icon={faBook} /> Avilable Pastpapers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-requestedbooks"
              className={active === 'Requested Books' ? 'active-NavLink' : ''}
              onClick={() => setActive('Requested Books')}
            >
              <FontAwesomeIcon className="space" icon={faClipboardList} /> Requested Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-returnbooks"
              className={active === 'Pending to return' ? 'active-NavLink' : ''}
              onClick={() => setActive('Pending to return')}
            >
              <FontAwesomeIcon className="space" icon={faBookOpen} /> Pending to return
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-us-logout">
        <a
          className={active === 'Logout' ? 'active' : ''}
          onClick={() => {
            setActive('Logout');
            handleLogout();
          }}
        >
          <FontAwesomeIcon className="space" icon={faSignOutAlt} /> Logout
        </a>
      </div>
    </div>
  );
};

export default SidebarUs;
