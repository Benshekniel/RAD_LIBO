// SearchBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} className="fa-icon" />
      </button>
    </div>
  );
};

export default SearchBar;