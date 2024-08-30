import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManagePastpapers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const ManagePastpapers = () => {
   const [pastpapers, setPastpapers] = useState([]);
   const [showAddPastpaperForm, setShowAddPastpaperForm] = useState(false);
   const [showEditPastpaperForm, setShowEditPastpaperForm] = useState(false);
   const [newPastpaper, setNewPastpaper] = useState({
      cs_is: "",
      year: "",
      semister: "",
      subject: "",
      subject_code: "",
      examination_year: "",
      image: "",
   });
   const [editPastpaper, setEditPastpaper] = useState(null);
   const [loading, setLoading] = useState(true);

   // Fetch pastpapers from backend when component mounts
   useEffect(() => {
      const fetchPastpapers = async () => {
         try {
            const response = await axios.get("http://localhost:4000/libo/pastpaper");
            setPastpapers(response.data);
            console.log(response.data);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching Pastpapers:", error);
         }
      };

      fetchPastpapers();
   }, []);

   const handleAddPastpaperClick = () => {
      setShowAddPastpaperForm(true);
   };

   const handleEditPastpaperClick = (pastpaper) => {
      setEditPastpaper(pastpaper);
      setShowEditPastpaperForm(true);
   };

   const handleCloseForm = () => {
      setShowAddPastpaperForm(false);
      setShowEditPastpaperForm(false);
      setEditPastpaper(null);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (showAddPastpaperForm) {
         setNewPastpaper({ ...newPastpaper, [name]: value });
      } else if (showEditPastpaperForm) {
         setEditPastpaper({ ...editPastpaper, [name]: value });
      }
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (showAddPastpaperForm) {
         setNewPastpaper({ ...newPastpaper, image: file });
      } else if (showEditPastpaperForm) {
         setEditPastpaper({ ...editPastpaper, image: file });
      }
   };

   const handleAddPastpaper = async () => {
      const formData = new FormData();
      formData.append('cs_is', newPastpaper.cs_is);
      formData.append('year', newPastpaper.year);
      formData.append('semister', newPastpaper.semister);
      formData.append('subject', newPastpaper.subject);
      formData.append('subject_code', newPastpaper.subject_code);
      formData.append('examination_year', newPastpaper.examination_year);
      formData.append('image', newPastpaper.image);

      try {
         await axios.post("http://localhost:4000/libo/pastpaper/add", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         setShowAddPastpaperForm(false);
         setNewPastpaper({
            cs_is: "",
            year: "",
            semister: "",
            subject: "",
            subject_code: "",
            examination_year: "",
            image: "",
         });
         // Refresh pastpapers list
         const response = await axios.get("http://localhost:4000/libo/pastpaper");
         setPastpapers(response.data);
      } catch (error) {
         console.error("Error adding pastpaper:", error);
      }
   };

   const handleSaveChanges = async () => {
      const updatedPastpaper = {
         cs_is: editPastpaper.cs_is,
         year: editPastpaper.year,
         semister: editPastpaper.semister,
         subject: editPastpaper.subject,
         subject_code: editPastpaper.subject_code,
         examination_year: editPastpaper.examination_year,
         // Convert the image file to a base64 string if necessary
         image: editPastpaper.image,
      };

      try {
         await axios.patch(`http://localhost:4000/libo/pastpaper/${editPastpaper._id}`, updatedPastpaper, {
            headers: {
               "Content-Type": "application/json",
            },
         });

         setShowEditPastpaperForm(false);
         setEditPastpaper(null);

         // Refresh pastpapers list
         const response = await axios.get("http://localhost:4000/libo/pastpaper");
         setPastpapers(response.data);
      } catch (error) {
         console.error("Error editing pastpaper:", error);
      }
   };
   const handleDeletePastpaper = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this pastpaper?");

      if (confirmDelete) {
         try {
            await axios.delete(`http://localhost:4000/libo/pastpaper/${id}`);
            // Refresh pastpapers list
            setPastpapers(pastpapers.filter(pastpaper => pastpaper._id !== id));
         } catch (error) {
            console.error("Error deleting pastpaper:", error);
         }
      }
   };

   return (
      <div className="pastpapers-container">
         <Sidebar />
         <div>
            <SearchBar />
            <div className="manage-pastpapers-container-mb">
               <div className="header">
                  <button className="add-pastpaper-button" onClick={handleAddPastpaperClick}>
                     Add Pastpaper
                  </button>
               </div>

               <div className="table-container-mb">
                  {loading ? (
                     <p>Loading pastpapers...</p>
                  ) : (
                     <table className="pastpapers-table">
                        <thead>
                           <tr>
                              <th></th>
                              <th>CS / IS</th>
                              <th>Year</th>
                              <th>Semister</th>
                              <th>Subject</th>
                              <th>Subject Code</th>
                              <th>Examination Year</th>
                              <th>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {pastpapers.map((pastpaper) => (
                              <tr key={pastpaper._id}>
                                 <td>
                                    <img
                                       src={`http://localhost:4000/images/${pastpaper.image}`}
                                       alt={pastpaper.year}
                                       className="pastpaper-image"
                                    />
                                 </td>
                                 <td>{pastpaper.cs_is}</td>
                                 <td>{pastpaper.year}</td>
                                 <td>{pastpaper.semister}</td>
                                 <td>{pastpaper.subject}</td>
                                 <td>{pastpaper.subject_code}</td>
                                 <td>{pastpaper.examination_year}</td>
                                 <td>
                                    <button
                                       className="action-button edit-button"
                                       onClick={() => handleEditPastpaperClick(pastpaper)}
                                    >
                                       <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                       className="action-button delete-button"
                                       onClick={() => handleDeletePastpaper(pastpaper._id)}
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

               {showAddPastpaperForm && (
                  <div className="add-pastpaper-modal">
                     <div className="add-pastpaper-form">
                        <button className="close-button" onClick={handleCloseForm}>
                           &times;
                        </button>
                        <h2>Add New Pastpaper</h2>
                        <label>
                           CS / IS:
                           <select name="cs_is" value={newPastpaper.cs_is} onChange={handleInputChange}>
                              <option value="" disabled>Select CS / IS</option>
                              <option value="CS">CS</option>
                              <option value="IS">IS</option>
                           </select>
                        </label>
                        <label>
                           Year:
                           <select name="year" value={newPastpaper.year} onChange={handleInputChange}>
                              <option value="" disabled>Select Year</option>
                              <option value="1st">1st</option>
                              <option value="2nd">2nd</option>
                              <option value="3rd">3rd</option>
                              <option value="4th">4th</option>
                           </select>
                        </label>
                        <label>
                           Semister:
                           <select name="semister" value={newPastpaper.semister} onChange={handleInputChange}>
                              <option value="" disabled>Select Semister</option>
                              <option value="1st">1st</option>
                              <option value="2nd">2nd</option>
                           </select>
                        </label>
                        <label>
                           Subject:
                           <input
                              type="text"
                              name="subject"
                              value={newPastpaper.subject}
                              onChange={handleInputChange}
                              required
                           />
                        </label>
                        <label>
                           Subject Code:
                           <input
                              type="text"
                              name="subject_code"
                              value={newPastpaper.subject_code}
                              onChange={handleInputChange}
                              required
                           />
                        </label>
                        <label>
                           Examination Year:
                           <input
                              name="examination_year"
                              type="number"
                              placeholder="YYYY"
                              min="1900"
                              max="2100"
                              maxlength="4"
                              oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);"
                              value={newPastpaper.examination_year}
                              onChange={handleInputChange}
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
                        <button className="add-new-pastpaper-button" onClick={handleAddPastpaper}>
                           Add New Pastpaper
                        </button>
                     </div>
                  </div>
               )}

               {showEditPastpaperForm && editPastpaper && (
                  <div className="add-pastpaper-modal">
                     <div className="add-pastpaper-form">
                        <button className="close-button" onClick={handleCloseForm}>
                           &times;
                        </button>
                        <h2>Edit Pastpaper</h2>
                        <label>
                           CS / IS:
                           <select name="cs_is" value={editPastpaper.cs_is} onChange={handleInputChange}>
                              <option value="" disabled>Select CS / IS</option>
                              <option value="CS">CS</option>
                              <option value="IS">IS</option>
                           </select>
                        </label>
                        <label>
                           Year:
                           <select name="year" value={editPastpaper.year} onChange={handleInputChange}>
                              <option value="" disabled>Select Year</option>
                              <option value="1st">1st</option>
                              <option value="2nd">2nd</option>
                              <option value="3rd">3rd</option>
                              <option value="4th">4th</option>
                           </select>
                        </label>

                        <label>
                           Semister:
                           <input
                              type="text"
                              name="semister"
                              value={editPastpaper.semister}
                              onChange={handleInputChange}
                              required
                           />
                        </label>
                        <label>
                           Subject:
                           <input
                              type="text"
                              name="subject"
                              value={editPastpaper.subject}
                              onChange={handleInputChange}
                              required
                           />
                        </label>
                        <label>
                           Subject Code:
                           <input
                              type="text"
                              name="subject_code"
                              value={editPastpaper.subject_code}
                              onChange={handleInputChange}
                              required
                           />
                        </label>
                        <label>
                           Examination Year:
                           <input
                              name="examination_year"
                              type="number"
                              placeholder="YYYY"
                              min="1900"
                              max="2100"
                              maxlength="4"
                              oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);"
                              value={editPastpaper.examination_year}
                              onChange={handleInputChange}
                           />
                        </label>
                        <button className="add-new-pastpaper-button" onClick={handleSaveChanges}>
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

export default ManagePastpapers;