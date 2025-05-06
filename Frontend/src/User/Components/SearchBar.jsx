import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import { UserContext } from '../../context/UserContext';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { studentData } = useContext(UserContext);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar-us">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} className="fa-icon" />
        </button>
      </form>
      {studentData && (
        <div className="user-details">
          <img src={`http://localhost:4000/image/${studentData.image}`} alt="User" className="user-avatar" />
          <div className="user-info">
            <p>{studentData.name}</p>
            <p className="user-role">Student</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
