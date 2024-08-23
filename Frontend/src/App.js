import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageStudents from './Librarian/Pages/ManageStudents';
import ManageBooks from './Librarian/Pages/ManageBooks';
import IssuedBooks from './Librarian/Pages/IssuedBooks';
import ManageRequests from './Librarian/Pages/ManageRequests';
import AvilableBooks from './User/Pages/AvilableBooks';
import ReturnBooks from './User/Pages/ReturnBooks';
import RequestedBooks from './User/Pages/RequestedBooks';
import Login from './Auth/Pages/Login';
import SignUp from './Auth/Pages/SignUp';


const App = () => {
  return (
    <>
      <Router>
        <div className="app-container">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/manage-books" element={<ManageBooks />} />
              <Route path="/manage-students" element={<ManageStudents />} />
              <Route path="/manage-requests" element={<ManageRequests />} />
              <Route path="/manage-issued" element={<IssuedBooks />} />
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
