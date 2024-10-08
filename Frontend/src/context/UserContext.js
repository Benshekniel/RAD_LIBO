import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [userdata, setUserdata] = useState(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const email = localStorage.getItem('email');
      if (token && role && email) {
         return { email, role };
      }
      return null;
   });

   const [studentData, setStudentData] = useState(null);

   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         const tokenExpiry = localStorage.getItem('tokenExpiry');
         const currentTime = new Date().getTime();

         if (currentTime >= tokenExpiry) {
            handleLogout();
         } else {
            const remainingTime = tokenExpiry - currentTime;
            setAutoLogout(remainingTime);
         }
      }
   }, []);

   useEffect(() => {
      if (userdata && userdata.email) {
         axios.get(`http://localhost:4000/libo/student/email/${userdata.email}`)
            .then(response => {
               setStudentData(response.data);
            })
            .catch(error => {
               console.error("Failed to fetch student data", error);
            });
      }
   }, [userdata]);

   const setAutoLogout = (expirationTime) => {
      setTimeout(() => {
         handleLogout();
      }, expirationTime);
   };

   const handleLogin = (token, expirationTime, role, email) => {
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', expirationTime);
      localStorage.setItem('role', role);
      localStorage.setItem('email', email);

      setUserdata({
         email: email,
         role: role,
         token: token,
      });
      const remainingTime = expirationTime - new Date().getTime();
      setAutoLogout(remainingTime);
   };

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      setUserdata(null);
      navigate('/');
   };

   return (
      <UserContext.Provider value={{ userdata, studentData, setUserdata, handleLogin, handleLogout }}>
         {children}
      </UserContext.Provider>
   );
};
