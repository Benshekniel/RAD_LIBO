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

// PrivateRoute component to protect routes and check user roles
const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get the user's role from localStorage

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    localStorage.removeItem('token');
    return <Navigate to="/" replace />; // Redirect to login if role doesn't match
  }

  return <Component {...rest} />;
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

              {/* Protected routes with role-based access */}
              <Route
                path="/manage-books"
                element={<PrivateRoute element={ManageBooks} allowedRoles={['librarian']} />}
              />
              <Route
                path="/manage-students"
                element={<PrivateRoute element={ManageStudents} allowedRoles={['librarian']} />}
              />
              <Route
                path="/manage-requests"
                element={<PrivateRoute element={ManageRequests} allowedRoles={['librarian']} />}
              />
              <Route
                path="/manage-issued"
                element={<PrivateRoute element={IssuedBooks} allowedRoles={['librarian']} />}
              />
              <Route
                path="/manage-avilablebooks"
                element={<PrivateRoute element={AvilableBooks} allowedRoles={['student']} />}
              />
              <Route
                path="/manage-returnbooks"
                element={<PrivateRoute element={ReturnBooks} allowedRoles={['student']} />}
              />
              <Route
                path="/manage-requestedbooks"
                element={<PrivateRoute element={RequestedBooks} allowedRoles={['student']} />}
              />

              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
