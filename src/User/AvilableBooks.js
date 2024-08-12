import React, { useState } from "react";
import "./AvilableBooks.css";
import SearchBar from "./SearchBar";
import Sidebar from "./SideBar";
import Cover from "./Images/Cover.jpg";

const ManageBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const books = [
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover,
    },
    {
      id: 2,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 4,
      image: Cover,
    },
    {
      id: 3,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 1,
      image: Cover,
    },
  ];

  const handleRowClick = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="books-container-ab">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-abooks-container">
          <div className="table-container-ab">
            <table className="books-table-ab">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Publication date</th>
                  <th>ISBN</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} onClick={() => handleRowClick(book)}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="book-image-ab"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isPopupOpen && selectedBook && (
            <div className="popup-overlay" onClick={closePopup}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closePopup}>
                  &times;
                </button>
                <div className="popup-body">
                  <img
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    className="popup-book-image"
                  />
                  <div className="popup-details">
                    <strong>Title:</strong> {selectedBook.title}<br />
                    <strong>Author:</strong> {selectedBook.author}<br />
                    <strong>Publisher:</strong> {selectedBook.publisher}<br />
                    <strong>ISBN:</strong> {selectedBook.isbn}<br />
                    <strong>Edition:</strong> {selectedBook.edition || "N/A"}<br />
                    <strong>Publication date:</strong> {selectedBook.publicationDate}<br />
                  </div>
                  <div className="button"><button className="borrow-button">Borrow</button></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
