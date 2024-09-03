import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IssuedBooks.css";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4000/libo/borrow/requests/accepted");
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleDelete = async (Id) => {
    try {
      await axios.delete(`http://localhost:4000/libo/borrow/${Id}`);
      setRequests(requests.filter((request) => request._id !== Id));
    } catch (error) {
      console.error('Error deleting the borrow request:', error);
    }
  };


  return (
    <div className="issues-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-issues-container">
          <div className="table-container-ib">
            {loading ? (
              <p>Loading requests...</p>
            ) : (
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
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <img
                          src={`http://localhost:4000/image/${request.image}`}
                          alt={request.title}
                          className="issue-image"
                        />
                      </td>
                      <td>{request.title}</td>
                      <td>{request.author}</td>
                      <td>{request.isbn}</td>
                      <td>{request.stu_id}</td>
                      <td>
                        <button className="action-button-issued" onClick={() => handleDelete(request._id)}>
                          Returned
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;
