import React, { useState } from "react";
import "./RequestedBooks.css";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Cover from "../Assets/Cover.jpg";

const ManageBooks = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      status: "Accepted",
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      status: "Pending",
      image: Cover,
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      status: "Rejected",
      image: Cover,
    },
  ]);

  const handleDelete = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  return (
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
                  <th width ="15px">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img
                        src={book.image}
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
                          book.status === "Accepted"
                            ? "status-accepted"
                            : book.status === "Pending"
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
                        className={`delete-icon-rb ${
                          book.status === "Pending"
                            ? "icon-active"
                            : "icon-disabled"
                        }`}
                        onClick={
                          book.status === "Pending"
                            ? () => handleDelete(book.id)
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
  );
};

export default ManageBooks;
