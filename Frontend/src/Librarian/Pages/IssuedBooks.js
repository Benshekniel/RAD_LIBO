import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IssuedBooks.css";
import SearchBar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";

const IssuedBooks = () => {
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

  const handleChange = async (requestId) => {
    try {
      const response = await axios.patch(`http://localhost:4000/libo/borrow/issued/${requestId}`, {
        issuedStatus: 'Issued'
      });

      // Log the updated request for debugging
      console.log("Updated request:", response.data);

      // Update the request state with the new issuedStatus
      setRequests(requests.map(request =>
        request._id === requestId ? { ...request, issuedStatus: response.data.issuedStatus } : request
      ));
    } catch (error) {
      console.error("Error updating issued status:", error);
    }
  };


  const handleDelete = async (requestId, bookId, quantity) => {
    try {
      await Promise.all([
        axios.patch(`http://localhost:4000/libo/book/${bookId}`, {
          quantity: quantity + 1
        }),
        axios.delete(`http://localhost:4000/libo/borrow/${requestId}`)
      ]);

      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error("Error handling the return process:", error);
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
                    <tr key={request._id}>
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
                        {/* Issue button: Enabled only if the status is not 'Issued' */}
                        <button
                          className="action-button-issued"
                          onClick={() => handleChange(request._id)}
                          disabled={request.issuedStatus === 'Issued'}
                        >
                          {request.issuedStatus === 'Issued' ? 'Issued' : 'Not Issued'}
                        </button>

                        {/* Return button: Enabled only if the status is 'Issued' */}
                        <button
                          className="action-button-issued"
                          onClick={() => handleDelete(request._id, request.id, request.quantity)}
                          disabled={request.issuedStatus !== 'Issued'}
                        >
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

export default IssuedBooks;
