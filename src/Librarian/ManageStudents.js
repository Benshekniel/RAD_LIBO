import React, { useState } from "react";
import "./ManageStudents.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import Librarian from "./Images/Librarian.jpeg";

const ManageStudents = () => {
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showEditStudentForm, setShowEditStudentForm] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    email: "",
    stu_ID: "",
    year: "",
    image: "",
  });

  const students = [
    // Your existing Students array
    {
      id: 1,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    {
      id: 2,
      fullName: "Ema sakudi",
      email: "email.ensia.edu.dz",
      stu_ID: "123512342",
      year: " 1 st",
      image: Librarian, // Replace with your image path
    },
    // Add more student data as needed
  ];

  const handleAddStudentClick = () => {
    setShowAddStudentForm(true);
    setNewStudent({
      fullName: "",
      email: "",
      stu_ID: "",
      year: "",
      image: "",
    });
  };

  const handleEditStudentClick = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    if (studentToEdit) {
      setCurrentStudentId(studentId);
      setNewStudent({
        fullName: studentToEdit.fullName,
        email: studentToEdit.email,
        stu_ID: studentToEdit.stu_ID,
        year: studentToEdit.year,
        image: studentToEdit.image,
      });
      setShowEditStudentForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowAddStudentForm(false);
    setShowEditStudentForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewStudent({ ...newStudent, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleAddStudent = () => {
    // Logic to add the new student to your students array or send to your backend
    setShowAddStudentForm(false);
    setNewStudent({
      fullName: "",
      email: "",
      stu_ID: "",
      year: "",
      image: "",
    });
  };

  const handleSaveChanges = () => {
    // Logic to update the student in your students array or send updated data to your backend
    setShowEditStudentForm(false);
    setNewStudent({
      fullName: "",
      email: "",
      stu_ID: "",
      year: "",
      image: "",
    });
  };

  return (
    <div className="students-container">
      <Sidebar />
      <div>
        <SearchBar />
        <div className="manage-students-container">
          <div className="header">
            <button className="add-student-button" onClick={handleAddStudentClick}>
              Add Student
            </button>
          </div>

          <div className="table-container-ms">
            <table className="students-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Full name</th>
                  <th>Email</th>
                  <th>Stu_ID</th>
                  <th>Year</th>                
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="student-image-td">
                      <img
                        src={student.image}
                        alt={student.fullName}
                        className="student-image"
                      />
                    </td>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.stu_ID}</td>
                    <td>{student.year}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => handleEditStudentClick(student.id)}>
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

          {showAddStudentForm && (
            <div className="add-student-modal">
              <div className="add-student-form">
                <button className="close-button" onClick={handleCloseForm}>
                  &times;
                </button>
                <h2>Add New Student</h2>
                <label>
                  Full name:
                  <input
                    type="text"
                    name="fullName"
                    value={newStudent.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email address:
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Student ID:
                  <input
                    type="text"
                    name="stu_ID"
                    value={newStudent.stu_ID}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Year:
                  <input
                    type="text"
                    name="year"
                    value={newStudent.year}
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
                <button className="add-new-student-button" onClick={handleAddStudent}>
                  Add New Student
                </button>
              </div>
            </div>
          )}

          {showEditStudentForm && (
            <div className="add-student-modal">
              <div className="add-student-form">
                <button className="close-button" onClick={handleCloseForm}>
                  &times;
                </button>
                <h2>Edit Student</h2>
                <label>
                  Full name:
                  <input
                    type="text"
                    name="fullName"
                    value={newStudent.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email address:
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Student ID:
                  <input
                    type="text"
                    name="stu_ID"
                    value={newStudent.stu_ID}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Year:
                  <input
                    type="text"
                    name="year"
                    value={newStudent.year}
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
                <button className="add-new-student-button" onClick={handleSaveChanges}>
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

export default ManageStudents;
