import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageBooks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [showEditBookForm, setShowEditBookForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationDate: "",
    isbn: "",
    quantity: "",
    total_quantity: "",
    image: "",
  });
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch books from backend when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/libo/book", {
          withCredentials: true,  // Ensure cookies are sent
        });
        setBooks(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchItems([]); // Reset to empty array when search input is cleared
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/libo/book/title/${query}`, {
        withCredentials: true, // Ensure cookies are sent
      });
      setSearchItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
  };

  const handleEditBookClick = (book) => {
    setEditBook(book);
    setShowEditBookForm(true);
  };

  const handleCloseForm = () => {
    setShowAddBookForm(false);
    setShowEditBookForm(false);
    setEditBook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showAddBookForm) {
      setNewBook({ ...newBook, [name]: value });
    } else if (showEditBookForm) {
      setEditBook({ ...editBook, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (showAddBookForm) {
      setNewBook({ ...newBook, image: file });
    } else if (showEditBookForm) {
      setEditBook({ ...editBook, image: file });
    }
  };

  const handleAddBook = async () => {
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('publisher', newBook.publisher);
    formData.append('publication_date', newBook.publicationDate);
    formData.append('isbn', newBook.isbn);
    formData.append('quantity', newBook.quantity);
    formData.append('total_quantity', newBook.total_quantity);
    formData.append('image', newBook.image);

    try {
      await axios.post("http://localhost:4000/libo/book/add", formData, {
        withCredentials: true,  // Ensure cookies are sent
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowAddBookForm(false);
      setNewBook({
        title: "",
        author: "",
        publisher: "",
        publicationDate: "",
        isbn: "",
        quantity: "",
        total_quantity: "",
        image: "",
      });
      // Refresh books list
      const response = await axios.get("http://localhost:4000/libo/book", {
        withCredentials: true,  // Ensure cookies are sent
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleSaveChanges = async () => {
    const updatedBook = {
      title: editBook.title,
      author: editBook.author,
      publisher: editBook.publisher,
      publication_date: editBook.publicationDate,
      isbn: editBook.isbn,
      quantity: editBook.quantity,
      total_quantity: editBook.total_quantity,
      // Convert the image file to a base64 string if necessary
      image: editBook.image,
    };

    try {
      await axios.patch(`http://localhost:4000/libo/book/${editBook._id}`, updatedBook, {
        withCredentials: true,  // Ensure cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      setShowEditBookForm(false);
      setEditBook(null);

      // Refresh books list
      const response = await axios.get("http://localhost:4000/libo/book", {
        withCredentials: true,  // Ensure cookies are sent
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };
  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/libo/book/${id}`, {
          withCredentials: true,  // Ensure cookies are sent
        });
        // Refresh books list
        setBooks(books.filter(book => book._id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const displayBooks = searchItems.length > 0 ? searchItems : books;

  return (
    <div className="books-container">
      <Sidebar />
      <div>
        <SearchBar onSearch={handleSearch} />
        <div className="manage-books-container-mb">
          <div className="header">
            <button className="add-book-button" onClick={handleAddBookClick}>
              Add Book
            </button>
          </div>

          <div className="table-container-mb">
            {loading ? (
              <p>Loading books...</p>
            ) : (
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
                  {displayBooks.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <img
                          src={`http://localhost:4000/images/${book.image}`}
                          alt={book.title}
                          className="book-image"
                        />
                      </td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.publication_date}</td>
                      <td>{book.isbn}</td>
                      <td>{book.quantity}/{book.total_quantity}</td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => handleEditBookClick(book)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDeleteBook(book._id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
                    Total_Quantity:
                    <input
                      type="number"
                      name="total_quantity"
                      value={newBook.total_quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
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
                    required
                  />
                </label>
                <button className="add-new-book-button" onClick={handleAddBook}>
                  Add New Book
                </button>
              </div>
            </div>
          )}

          {showEditBookForm && editBook && (
            <div className="add-book-modal">
              <div className="add-book-form">
                <button className="close-button" onClick={handleCloseForm}>
                  &times;
                </button>
                <h2>Edit Book</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={editBook.title}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Author:
                  <input
                    type="text"
                    name="author"
                    value={editBook.author}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Publisher:
                  <input
                    type="text"
                    name="publisher"
                    value={editBook.publisher}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Publication Date:
                  <input
                    type="date"
                    name="publicationDate"
                    value={editBook.publicationDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={editBook.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Total_Quantity:
                  <input
                    type="number"
                    name="total_quantity"
                    value={editBook.total_quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  ISBN:
                  <input
                    type="text"
                    name="isbn"
                    value={editBook.isbn}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button className="add-new-book-button" onClick={handleSaveChanges}>
                  Save Changes
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
