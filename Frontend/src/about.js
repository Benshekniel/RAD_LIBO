import React from 'react';
import './about.css';
import Logo from './User/Assets/Logo.png';

function AboutPage() {
   return (
      <div>
         <div className="container">
            <div className="navbar">
               <div className="nav-logo">
                  <img src={Logo} alt="Logo" />
                  <h1>Libo</h1>
               </div>
            </div>
         </div>

         <section className="about-section">
            <div className="container">
               <h2>About LIBO</h2>
               <p>
                  LIBO is a powerful and intuitive library management system designed to help libraries
                  efficiently manage their resources, patrons, and day-to-day operations. From cataloging
                  books to tracking borrowing and returns, LIBO simplifies library management with a
                  user-friendly interface and robust features.
               </p>

               <h3>Our Mission</h3>
               <p>
                  At LIBO, our mission is to provide libraries of all sizes with a seamless and modern tool
                  to manage their collections and offer the best experience for both library staff and patrons.
                  We aim to promote learning, knowledge sharing, and community engagement.
               </p>

               <h3>Key Features</h3>
               <ul className="features">
                  <li>Book cataloging and categorization</li>
                  <li>User management and tracking</li>
                  <li>Automated borrow and return tracking</li>
                  <li>Advanced search and filtering for books</li>
                  <li>Reporting and analytics on library usage</li>
                  <li>Notifications for overdue books and reservation requests</li>
               </ul>
            </div>
         </section>

         <footer className="footer">
            <div className="container">
               <p>&copy; 2024 LIBO Library Management System. All Rights Reserved.</p>
            </div>
         </footer>
      </div>
   );
}

export default AboutPage;