import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Librarian/Sidebar";
import ManageBooks from './Librarian/ManageBooks';
import ManageStudents from './Librarian/ManageStudents';
import ManageRequests from './Librarian/ManageRequests';
import IssuedBooks from './Librarian/IssuedBooks';
import DefaulterBooks from './Librarian/DefaulterBooks';
import Dashboard from './Librarian/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/manage-dashboard" element={<Dashboard />} />
            <Route path="/manage-books" element={<ManageBooks />} />
            <Route path="/manage-students" element={<ManageStudents />} />
            <Route path="/manage-requests" element={<ManageRequests />} />
            <Route path="/manage-issued" element={<IssuedBooks />} />
            <Route path="/manage-defaulter" element={<DefaulterBooks />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
