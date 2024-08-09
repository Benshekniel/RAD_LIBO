import React, { useState } from "react";
import "./ManageBooks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import Cover from "./Images/Cover.jpg";

const ManageBooks = () => {
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationDate: "",
    isbn: "",
    quantity: "",
    image: "",
  });

  const books = [
    // your existing books array
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
  ];

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
  };

  const handleCloseForm = () => {
    setShowAddBookForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewBook({ ...newBook, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleAddBook = () => {
    // Logic to add the new book to your books array or send to your backend
    setShowAddBookForm(false);
    // Clear form fields
    setNewBook({
      title: "",
      author: "",
      publisher: "",
      publicationDate: "",
      isbn: "",
      quantity: "",
      image: "",
    });
  };

  return (
    <div className="books-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-books-container">
          <div className="header">
            <button className="add-book-button" onClick={handleAddBookClick}>
              Add Book
            </button>
          </div>

          <div className="table-container">
            <table className="books-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Publication date</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="book-image"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <button className="action-button edit-button">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="action-button delete-button">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showAddBookForm && (
            <div className="add-book-modal">
              <div className="add-book-form">
                <button className="close-button" onClick={handleCloseForm}>
                  &times;
                </button>
                <h2>Add New Book</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Author:
                  <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Publisher:
                  <input
                    type="text"
                    name="publisher"
                    value={newBook.publisher}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Publication Date:
                  <input
                    type="date"
                    name="publicationDate"
                    value={newBook.publicationDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={newBook.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  ISBN:
                  <input
                    type="text"
                    name="isbn"
                    value={newBook.isbn}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <button className="add-new-book-button" onClick={handleAddBook}>
                  Add New Book
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
