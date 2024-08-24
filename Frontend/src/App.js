import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ManageStudents from './Librarian/Pages/ManageStudents';
import ManageBooks from './Librarian/Pages/ManageBooks';
import IssuedBooks from './Librarian/Pages/IssuedBooks';
import ManageRequests from './Librarian/Pages/ManageRequests';
import AvilableBooks from './User/Pages/AvilableBooks';
import ReturnBooks from './User/Pages/ReturnBooks';
import RequestedBooks from './User/Pages/RequestedBooks';
import Login from './Auth/Pages/Login';
import SignUp from './Auth/Pages/SignUp';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

const App = () => {
  return (
    <>
      <Router>
        <div className="app-container">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route path="/manage-books" element={<PrivateRoute element={ManageBooks} />} />
              <Route path="/manage-students" element={<PrivateRoute element={ManageStudents} />} />
              <Route path="/manage-requests" element={<PrivateRoute element={ManageRequests} />} />
              <Route path="/manage-issued" element={<PrivateRoute element={IssuedBooks} />} />
              <Route path="/manage-avilablebooks" element={<PrivateRoute element={AvilableBooks} />} />
              <Route path="/manage-returnbooks" element={<PrivateRoute element={ReturnBooks} />} />
              <Route path="/manage-requestedbooks" element={<PrivateRoute element={RequestedBooks} />} />

              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
