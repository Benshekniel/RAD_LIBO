import React, { useState, useEffect } from "react";
import "./Dashboard.css"; // Import CSS for Dashboard styling
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  // Placeholder data for statistics
  const [stats, setStats] = useState({
    numberOfBooks: 45,
    numberOfStudents: 105,
    issuedBooks: 10,
    defaulterBooks: 6,
  });

  // Placeholder data for overdue books
  const overdueBooks = [
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      Overdue: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
  ];

  return (
    <div>
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Dashboard</h1>
          <div className="dashboard-stats">
            <div className="stat-box">
              <p>Number of Books</p>
              <h2>{stats.numberOfBooks}</h2>
            </div>
            <div className="stat-box">
              <p>Number of Students</p>
              <h2>{stats.numberOfStudents}</h2>
            </div>
            <div className="stat-box">
              <p>Issued Books</p>
              <h2>{stats.issuedBooks}</h2>
            </div>
            <div className="stat-box">
              <p>Defaulter Books</p>
              <h2>{stats.defaulterBooks}</h2>
            </div>
          </div>
          <div className="overdue-section">
            <div className="table-container">
              <h2>Overdue book loans</h2>
              <table>
                <thead>
                  <tr>
                    <th>Stu_ID</th>
                    <th>Member</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Overdue</th>
                    <th>Return date</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueBooks.map((book, index) => (
                    <tr key={index}>
                      <td>{book.Stu_ID}</td>
                      <td>{book.Member}</td>
                      <td>{book.Title}</td>
                      <td>{book.Author}</td>
                      <td>{book.Overdue}</td>
                      <td>{book.ReturnDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
