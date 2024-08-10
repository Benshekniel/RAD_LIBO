import React from "react";
import "./ManageRequests.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import Cover from "./Images/Cover.jpg"; // Replace with your image path

const ManageRequests = () => {
  // Dummy data for requests
  const requests = [
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true, // true means green, false means red
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true,
      image: Cover,
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true, 
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true,
      image: Cover,
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true, 
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true,
      image: Cover,
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true, 
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true,
      image: Cover,
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true, 
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true,
      image: Cover,
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: false,
      image: Cover,
    },
    {
      id: 4,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      isbn: "978-3-319-77535-9",
      stu_id: "37657485",
      stu_rate: true,
      image: Cover,
    },
  ];

  return (
    <div className="requests-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-requests-container">
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Stu_ID</th>
                  <th>Stu_Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <img
                        src={request.image}
                        alt={request.title}
                        className="request-image"
                      />
                    </td>
                    <td>{request.title}</td>
                    <td>{request.author}</td>
                    <td>{request.isbn}</td>
                    <td>{request.stu_id}</td>
                    <td>
                      <div
                        className={`rate-indicator ${
                          request.stu_rate ? "green" : "red"
                        }`}
                      />
                    </td>
                    <td>
                      <button className="action-button accept-button">
                        Accept
                      </button>
                      <button className="action-button reject-button">
                        Reject
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
