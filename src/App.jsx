import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file for styling
import collegesData from "./data/college.json"; // Import colleges data from JSON file

export default function App() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    setColleges(collegesData);
  }, []);

  const handleSort = (column) => {
    const sortedColleges = [...colleges].sort((a, b) => {
      if (column === "rank") {
        return parseInt(a[column].slice(1)) - parseInt(b[column].slice(1));
      } else if (column === "fees") {
        return a[column] - b[column];
      } else if (column === "userRating") {
        return parseFloat(a[column]) - parseFloat(b[column]);
      } else {
        return a[column].localeCompare(b[column]);
      }
    });
    setColleges(sortedColleges);
  };

  const handleSearch = (query) => {
    const filteredColleges = collegesData.filter((college) =>
      college.name.toLowerCase().includes(query.toLowerCase())
    );
    setColleges(filteredColleges);
  };

  return (
    <div>
      <table className="colleges-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("rank")}>CD Rank</th>
            <th>Colleges</th>
            <th onClick={() => handleSort("fees")}>Course Fees</th>
            <th>Placement</th>
            <th onClick={() => handleSort("userRating")}>User Review</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => (
            <tr key={college.id}>
              <td>{college.rank}</td>
              <td>
                <img src={college.logo} alt="logo" /> {college.name}
                <br />
                <span>{college.location}</span>
                <br />
                <label htmlFor="college"></label>
                <select name="Branch" id="branch">
                  <option value="cse">{college.course}</option>
                </select>
                <p>{college.cutoff}</p>
                <span style={{ color: "#FF6633" }}> → Apply Now</span>
                <span style={{ color: "#0ae1ecfc" }}> ⤓ Download Brochure</span>
                <input type="checkbox" style={{ color: "#141110" }} />
                Add To Compare
              </td>
              <td>
                ₹{college.fees}
                <br />
                <span>BE/B.Tech</span>
                <br />
                <span>- 1st Year Fees</span>
                <br />
                <span style={{ color: "#FF6633" }}>⇄Compare Fees</span>
              </td>
              <td>
                ₹{college.avgPackage}
                <br />
                <span>Average Package</span>
                <br />
                <span style={{ color: "#FF6633" }}>⇄Compare Placement</span>
              </td>
              <td>
                {college.userRating}
                <br />
                <span>{college.userReviews}</span>
                <br />
                <label htmlFor="Social"></label>
                <select name="Life" id="life">
                  <option value="social">✓Best in social Life</option>
                </select>
              </td>
              <td>
                {college.ranking}
                <br />
                
                2023
                <br />
                <label htmlFor="Social"></label>
                <img src="" alt="logo" />
                <select name="Life" id="life">
                  <option value="social">+9 more</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
