import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./AvailablePastpapers.css";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/SideBar";
import { UserContext } from "../../context/UserContext";

const AvailablePastpapers = () => {
  const [pastpapers, setPastpapers] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const { userdata } = useContext(UserContext);

  useEffect(() => {
    if (!userdata.email) {
      console.error("User data is not available");
      return;
    }

    const fetchPastpapers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/libo/pastpaper");
        setPastpapers(response.data);
      } catch (error) {
        console.error("Error fetching pastpapers:", error);
      }
    };

    fetchPastpapers();
  }, [userdata]);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchItems([]); // Reset to empty array when search input is cleared
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/libo/pastpaper/year/${query}`);
      setSearchItems(response.data);
    } catch (error) {
      console.error("Error fetching pastpapers:", error);
    }
  };

  const displayPastpapers = searchItems.length > 0 ? searchItems : pastpapers;

  return (
    <div className="pastpapers-container-ab">
      <Sidebar />
      <div>
        <SearchBar onSearch={handleSearch} />
        <div className="manage-apastpapers-container">
          <div className="table-container-ab">
            <table className="pastpapers-table-ab">
              <thead>
                <tr>
                  <th></th>
                  <th>CS / IS</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Subject</th>
                  <th>Subject Code</th>
                  <th>Examination Year</th>
                </tr>
              </thead>
              <tbody>
                {displayPastpapers.map((pastpaper) => (
                  <tr key={pastpaper.id}>
                    <td>
                      <img
                        src={`http://localhost:4000/images/${pastpaper.image}`}
                        alt={pastpaper.cs_is}
                        className="pastpaper-image-ab"
                      />
                    </td>
                    <td>{pastpaper.cs_is}</td>
                    <td>{pastpaper.year}</td>
                    <td>{pastpaper.semister}</td>
                    <td>{pastpaper.subject}</td>
                    <td>{pastpaper.subject_code}</td>
                    <td>{pastpaper.examination_year}</td>
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

export default AvailablePastpapers;
