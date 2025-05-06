import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./ReturnBooks.css";
import Sidebar from "../Components/SideBar";
import SearchBar from "../Components/NavBar";
import { UserContext } from "../../context/UserContext";


const ReturnBooks = () => {
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

  const handleSearch = async (query) => {

  };

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (stuID) {
        try {
          const response = await axios.get(`http://localhost:4000/libo/borrow/accepted/${stuID}`);
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching borrowed books:', error);
        }
      }
    };

    fetchBorrowedBooks();
  }, [stuID]);

  return (
    <div>
      <div className="dashboard-container-re">
        <Sidebar />
        <div>
          <SearchBar />
          <div className="table-container-re">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Publication Date</th>
                  <th>ISBN</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={`http://localhost:4000/image/${book.image}`}
                        alt={book.title}
                        className="book-image-re"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.isbn}</td>
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

export default ReturnBooks;
