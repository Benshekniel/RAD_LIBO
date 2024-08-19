import React from "react";
import "./IssuedBooks.css";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";
import Cover from "../Assets/Cover.jpg"; // Replace with your image path

const ManageRequests = () => {
  // Dummy data for issues
  const issues = [
    
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      book_Status: false,
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      book_Status: false,
      image: Cover,
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      book_Status: false,
      image: Cover,
    },
    {
      id: 4,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      book_Status: false,
      image: Cover,
    },
    {
      id: 5,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      book_Status: false,
      image: Cover,
    },
    {
      id: 6,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      book_Status: false,
      image: Cover,
    },
  ];

  return (
    <div className="issues-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-issues-container">
          <div className="table-container-ib">
            <table className="issues-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Stu_ID</th>
                  <th>Book Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="issue-image"
                      />
                    </td>
                    <td>{issue.title}</td>
                    <td>{issue.author}</td>
                    <td>{issue.isbn}</td>
                    <td>{issue.stu_id}</td>
                    <td>
                      <button className="action-button-issued">
                        Returned
                      </button>
                    </td>
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

export default ManageRequests;
