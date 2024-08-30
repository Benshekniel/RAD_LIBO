import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./AvailableBooks.css";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/SideBar";
import { UserContext } from "../../context/UserContext";

const AvailableBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { userdata } = useContext(UserContext);

  useEffect(() => {
    if (!userdata.email) {
      console.error("User data is not available");
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/libo/book");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [userdata]);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchItems([]); // Reset to empty array when search input is cleared
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/libo/book/title/${query}`);
      setSearchItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleRowClick = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBook(null);
  };

  const handleBorrow = async () => {
    if (!userdata || !userdata.email) {
      console.error("User data is not available");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/libo/student/email/${userdata.email}`
      );
      const { stu_ID } = response.data;

      const status = selectedBook.quantity > 0;

      if (status) {
        await axios.post("http://localhost:4000/libo/borrow/add", {
          stu_ID,
          isbn: selectedBook.isbn,
          status: false,
        });

        alert("Book borrowed successfully!");
      } else {
        alert("Sorry, this book is currently not available.");
      }

      closePopup();
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  const displayBooks = searchItems.length > 0 ? searchItems : books;

  return (
    <div className="books-container-ab">
      <Sidebar />
      <div>
        <SearchBar onSearch={handleSearch} />
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
                {displayBooks.map((book) => (
                  <tr key={book._id} onClick={() => handleRowClick(book)}>
                    <td>
                      <img
                        src={`http://localhost:4000/images/${book.image}`}
                        alt={book.title}
                        className="book-image-ab"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.publication_date}</td>
                    <td>{book.isbn}</td>
                    <td>
                      <span
                        className={
                          book.availability
                            ? "available-text-ab"
                            : "not-available-text-ab"
                        }
                      >
                        {book.availability ? "Available" : "Not Available"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isPopupOpen && selectedBook && (
            <div className="popup-overlay" onClick={closePopup}>
              <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-button" onClick={closePopup}>
                  &times;
                </button>
                <div className="popup-body">
                  <img
                    src={`http://localhost:4000/images/${selectedBook.image}`}
                    alt={selectedBook.title}
                    className="popup-book-image"
                  />
                  <div className="popup-details">
                    <strong>Title:</strong> {selectedBook.title}
                    <br />
                    <strong>Author:</strong> {selectedBook.author}
                    <br />
                    <strong>Publisher:</strong> {selectedBook.publisher}
                    <br />
                    <strong>ISBN:</strong> {selectedBook.isbn}
                    <br />
                    <strong>Publication date:</strong>{" "}
                    {selectedBook.publication_date}
                    <br />
                  </div>
                  <div className="button">
                    <button
                      className={
                        selectedBook.availability
                          ? "borrow-button"
                          : "borrow-button-dd"
                      }
                      onClick={handleBorrow}
                      disabled={!selectedBook.availability}
                    >
                      {selectedBook.availability ? "Borrow" : "Not Available"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableBooks;
