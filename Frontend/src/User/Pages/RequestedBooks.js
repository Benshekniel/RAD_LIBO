import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import "./RequestedBooks.css";
import Sidebar from "../Components/SideBar";
import SearchBar from "../Components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";

// Create a new context
export const BooksContext = createContext();

const RequestedBooks = () => {
  const { userdata } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [stuID, setStuID] = useState(null);

  useEffect(() => {
    const fetchStudentID = async () => {
      if (userdata?.email) {
        try {
          const response = await axios.get(`http://localhost:4000/libo/student/email/${userdata.email}`);
          setStuID(response.data.stu_ID);
        } catch (error) {
          console.error('Error fetching student ID:', error);
        }
      }
    };

    fetchStudentID();
  }, [userdata]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (stuID) {
        try {
          const response = await axios.get(`http://localhost:4000/libo/borrow/requests/${stuID}`);
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching borrowed books:', error);
        }
      }
    };

    fetchBorrowedBooks();
  }, [stuID]);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4000/libo/borrow/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting the borrow request:', error);
    }
  };

  return (
    <BooksContext.Provider value={books}>
      <div className="books-container-rb">
        <Sidebar />
        <div>
          <SearchBar />
          <div className="manage-books-container-rb">
            <div className="table-container-rb">
              <table className="books-table-rb">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Publication date</th>
                    <th>ISBN</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <img
                          src={`http://localhost:4000/image/${book.image}`}
                          alt={book.title}
                          className="book-image-rb"
                        />
                      </td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.publicationDate}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <span
                          className={
                            book.status === "accepted"
                              ? "status-accepted"
                              : book.status === "pending"
                              ? "status-pending"
                              : "status-rejected"
                          }
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="action-column">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={`delete-icon-rb ${book.status === "accepted"
                            ? "icon-disabled"
                            : "icon-active"
                            }`}
                          onClick={
                            book.status !== "accepted"
                              ? () => handleDelete(book._id)
                              : null
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </BooksContext.Provider>
  );
};

export default RequestedBooks;
