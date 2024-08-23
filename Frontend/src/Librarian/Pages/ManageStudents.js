import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageStudents.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showEditStudentForm, setShowEditStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    stu_ID: "",
    year: "",
    image: "",
  });
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch students from backend when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/libo/student");
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudentClick = () => {
    setShowAddStudentForm(true);
  };

  const handleEditStudentClick = (student) => {
    setEditStudent(student);
    setShowEditStudentForm(true);
  };

  const handleCloseForm = () => {
    setShowAddStudentForm(false);
    setShowEditStudentForm(false);
    setEditStudent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showAddStudentForm) {
      setNewStudent({ ...newStudent, [name]: value });
    } else if (showEditStudentForm) {
      setEditStudent({ ...editStudent, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (showAddStudentForm) {
      setNewStudent({ ...newStudent, image: file });
    } else if (showEditStudentForm) {
      setEditStudent({ ...editStudent, image: file });
    }
  };

  const handleAddStudent = async () => {
    const formData = new FormData();
    formData.append('name', newStudent.name);
    formData.append('email', newStudent.email);
    formData.append('password', newStudent.password);
    formData.append('stu_ID', newStudent.stu_ID);
    formData.append('year', newStudent.year);
    formData.append('image', newStudent.image);

    try {
      await axios.post("http://localhost:4000/libo/student/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowAddStudentForm(false);
      setNewStudent({
        name: "",
        email: "",
        stu_ID: "",
        year: "",
        image: "",
      });
      // Refresh books list
      const response = await axios.get(`http://localhost:4000/libo/student`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleSaveChanges = async () => {
    const updatedStudent = {
      name: editStudent.name,
      email: editStudent.email,
      stu_ID: editStudent.stu_ID,
      year: editStudent.year,
      image: editStudent.image,
    };

    try {
      console.log(editStudent._id);
      await axios.patch(`http://localhost:4000/libo/student/${editStudent._id}`, updatedStudent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setShowEditStudentForm(false);
      setEditStudent(null);

      // Refresh books list
      const response = await axios.get(`http://localhost:4000/libo/student`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/libo/student/${studentId}`);
        setStudents(students.filter(student => student._id !== studentId));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
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
            {loading ? (
              <p>Loading students...</p>
            ) : (
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
                  {!loading && students.map((student) => (
                    <tr key={student._id}>
                      <td className="student-image-td">
                        <img
                          src={`http://localhost:4000/image/${student.image}`}
                          alt={student.name}
                          className="student-image"
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.stu_ID}</td>
                      <td>{student.year}</td>
                      <td>
                        <button className="action-button edit-button" onClick={() => handleEditStudentClick(student)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDeleteStudent(student._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
                    name="name"
                    value={newStudent.name}
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
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={newStudent.password}
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
                    name="name"
                    value={editStudent.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email address:
                  <input
                    type="email"
                    name="email"
                    value={editStudent.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Student ID:
                  <input
                    type="text"
                    name="stu_ID"
                    value={editStudent.stu_ID}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Year:
                  <input
                    type="text"
                    name="year"
                    value={editStudent.year}
                    onChange={handleInputChange}
                    required
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