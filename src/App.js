import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaulterBooks from './Librarian/DefaulterBooks';
import ManageStudents from './Librarian/ManageStudents';
import ManageBooks from './Librarian/ManageBooks';
import IssuedBooks from './Librarian/IssuedBooks';
import Dashboard from './Librarian/Dashboard';
import ManageRequests from './Librarian/ManageRequests';
import AvilableBooks from './User/AvilableBooks';
import ReturnBooks from './User/ReturnBooks';
import RequestedBooks from './User/RequestedBooks';
// import Login from './Auth/Login';
import Signup from './Auth/SignUp';


const App = () => {
  return (
    <>
    <Signup />
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
            <Route path="/manage-avilablebooks" element={<AvilableBooks />} />
            <Route path="/manage-returnbooks" element={<ReturnBooks />} />
            <Route path="/manage-requestedbooks" element={<RequestedBooks />} />

            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
