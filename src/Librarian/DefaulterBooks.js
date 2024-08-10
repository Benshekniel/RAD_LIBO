import React from "react";
import "./DefaulterBooks.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import Cover from "./Images/Cover.jpg"; // Replace with your image path

const ManageRequests = () => {
  // Dummy data for defaulters
  const defaulters = [
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 2,
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 2,
      image: Cover,
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 2,
      image: Cover,
    },
    {
      id: 4,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 4,
      image: Cover,
    },
    {
      id: 5,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 3,
      image: Cover,
    },
    {
      id: 6,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 2,
      image: Cover,
    },
    {
      id: 7,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      overdue: 1,
      image: Cover,
    },

  ];

  return (
    <div className="defaulters-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-defaulters-container">
          <div className="table-container">
            <table className="defaulters-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Stu_ID</th>
                  <th>Overdue</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((defaulter) => (
                  <tr key={defaulter.id}>
                    <td>
                      <img
                        src={defaulter.image}
                        alt={defaulter.title}
                        className="defaulter-image"
                      />
                    </td>
                    <td>{defaulter.title}</td>
                    <td>{defaulter.author}</td>
                    <td>{defaulter.isbn}</td>
                    <td>{defaulter.stu_id}</td>
                    <td className="overdue-books">{defaulter.overdue} days</td>
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
