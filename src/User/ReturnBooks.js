import React, { useState, useEffect } from "react";
import "./ReturnBooks.css"; // Import CSS for Dashboard styling
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar"; 

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
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },
    {
      Stu_ID: "21544123",
      Member: "ZOUAK Omar",
      Title: "QUANTUM COMPUTING",
      Author: "Chris BERNHARDT",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
    },

  ];

  return (
    <div>
      <div className="dashboard-container-re">
        <Sidebar />
        <div>
         <SearchBar />
            <div className="table-container-re">
              <table>
                <thead>
                  <tr>
                    <th>Stu_ID</th>
                    <th>Member</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>due</th>
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
                      <td>{book.due}</td>
                      <td>{book.ReturnDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
