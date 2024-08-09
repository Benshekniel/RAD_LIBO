// App.js
import React from 'react';
import Sidebar from './Librarian/Sidebar';
import SearchBar from './Librarian/SearchBar';
import Dashboard from './Librarian/Dashboard';
import ManageBooks from './Librarian/ManageBooks';
import './App.css'; // Import the CSS file for the main layout

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {/* <SearchBar /> */}
        {/* <Dashboard /> */}
        <ManageBooks />
        {/* Other components go here */}
      </div>
    </div>
  );
};

export default App;
