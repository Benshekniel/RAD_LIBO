import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageRequests.css";
import SearchBar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4000/libo/borrow/requests/pending");
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id, bookid, quantity) => {
    try {
      await axios.patch(`http://localhost:4000/libo/borrow/requests/${id}`, {
        status: "accepted",
      });

      if (quantity > 0) {
        await axios.patch(`http://localhost:4000/libo/book/${bookid}`, {
          quantity: quantity - 1,
        });
      }

      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error updating status or decreasing book quantity:", error);
    }
  };


  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/libo/borrow/requests/${id}`, {
        status: "rejected",
      });
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="requests-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-requests-container">
          <div className="table-container-mr">
            {loading ? (
              <p>Loading requests...</p>
            ) : (
              <table className="requests-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Stu_ID</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:4000/image/${request.image}`}
                          alt={request.title}
                          className="request-image"
                        />
                      </td>
                      <td>{request.title}</td>
                      <td>{request.author}</td>
                      <td>{request.isbn}</td>
                      <td>{request.stu_id}</td>
                      <td>{request.quantity}</td>
                      <td>
                        <button
                          className="action-button accept-button"
                          onClick={() => handleAccept(request._id, request.bookid, request.quantity)}
                        >
                          Accept
                        </button>
                        <button
                          className="action-button reject-button"
                          onClick={() => handleReject(request._id)}
                        >
                          Reject
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