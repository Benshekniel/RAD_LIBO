// App.js
import React from 'react';
import Sidebar from './Librarian/Sidebar';
import SearchBar from './Librarian/SearchBar';
import './App.css'; // Import the CSS file for the main layout

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <SearchBar />
        {/* Other components go here */}
      </div>
    </div>
  );
};

export default App;
