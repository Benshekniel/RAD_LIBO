import React, { useState, useContext } from 'react';
import './NavBar.css';
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
      <div className="bar">
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
