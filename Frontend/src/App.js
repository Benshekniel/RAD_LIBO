import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ManageStudents from './Librarian/Pages/ManageStudents';
import ManageBooks from './Librarian/Pages/ManageBooks';
import ManagePastpapers from './Librarian/Pages/ManagePastpapers';
import IssuedBooks from './Librarian/Pages/IssuedBooks';
import ManageRequests from './Librarian/Pages/ManageRequests';
import AvilableBooks from './User/Pages/AvailableBooks';
import { UserProvider } from './context/UserContext';
import ReturnBooks from './User/Pages/ReturnBooks';
import RequestedBooks from './User/Pages/RequestedBooks';
import Login from './Auth/Pages/Login';
import LandingPage from './LandingPage';
import { UserContext } from './context/UserContext';
import SignUp from './Auth/Pages/SignUp';

// PrivateRoute component to protect routes and check user roles
const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const { userdata } = useContext(UserContext);

  if (!userdata || !userdata.role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userdata.role)) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

const App = () => {
  return (
    <>
      <Router>
        <UserProvider>
          <div className="app-container">
            <div className="content-container">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                {/* Protected routes with role-based access */}
                <Route
                  path="/manage-pastpapers"
                  element={<PrivateRoute element={ManagePastpapers} allowedRoles={['librarian']} />}
                />
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

        </UserProvider>
      </Router>
    </>
  );
};

export default App;