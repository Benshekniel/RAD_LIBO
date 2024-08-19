import React, { useState, useEffect } from "react";
import "./ReturnBooks.css"; // Import CSS for Dashboard styling
import Sidebar from "../Components/SideBar";
import SearchBar from "../Components/SearchBar";
import Cover from "../Assets/Cover.jpg";

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
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
      image: Cover
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
      image: Cover
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
      image: Cover
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
      image: Cover
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      due: "2 days",
      ReturnDate: "Mar 18th, 2022",
      image: Cover
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
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>due</th>
                  <th>Return date</th>
                </tr>
              </thead>
              <tbody>
                {overdueBooks.map((book, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="book-image-re"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
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
