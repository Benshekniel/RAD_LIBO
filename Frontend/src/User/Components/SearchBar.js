import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Trigger search on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the query to the parent component on form submission
  };

  return (
    <div className="search-bar">
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
    </div>
  );
};

export default SearchBar;
