import React from "react";
import "./ManageBooks.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import Cover from '../Images/Cover.jpg'

const ManageBooks = () => {
  const books = [
    {
      id: 1,
      title: "Basic Linear Algebra",
      author: "B.S. Blyth",
      publisher: "Springer-Verlag",
      publicationDate: "September 2018",
      isbn: "978-3-319-77535-9",
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
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
      barcode: "123456789",
      quantity: 3,
      image: Cover, // Replace with your image path
    },
    
    // Add more book data as needed
  ];

  return (
    <div>
      <SearchBar />
         <div className="manage-books-container">
            <div className="header">
                <button className="add-book-button">Add Book</button>
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
                     <th>Barcode</th>
                     <th>Quantity</th>
                     <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {books.map((book) => (
                     <tr key={book.id}>
                        <td>
                           <img src={book.image} alt={book.title} className="book-image" />
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.publicationDate}</td>
                        <td>{book.isbn}</td>
                        <td>{book.barcode}</td>
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
         </div>
      
    </div>
  );
};

export default ManageBooks;
