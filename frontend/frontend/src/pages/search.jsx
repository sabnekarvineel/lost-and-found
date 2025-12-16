import React, { useState, useEffect } from "react";
import "./search.css";
import Navbar from "../assets/components/navbar";

const Search = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data from the API
  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/");
      const result = await response.json();
      if (!response.ok) {
        const message = `An error has occurred: ${result.message}`;
        throw new Error(message);
      }
      setData(result); // Set the fetched data
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Handle card click to show details
  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="app">
      <Navbar />
      <header className="header">
        <h1>Lost and Found</h1>
        <p>Discover your missing or found items below!</p>
      </header>

      <main className="main-content">
        {/* Error Handling */}
        {error && <p className="error-message">{error}</p>}

        {/* Found Items Section */}
        <section className="found-section">
          <h2>Found Items</h2>
          <div className="item-cards">
            {data
              .filter((item) => item.type === "found") // Filter for found items
              .map((item) => (
                <div
                  key={item._id} // Use _id for unique key
                  className="card"
                  onClick={() => handleCardClick(item)}
                >
                  <img
                    src={`http://localhost:3000/${item.itemPhoto}`} // Ensure the correct URL
                    alt={item.objectType}
                    className="item-image"
                  />
                  <p>
                    <strong>{item.objectType}</strong>
                  </p>
                  <p>Found at: {item.specificLocation}</p>
                  <p>Contact: {item.contactNumber}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Lost Items Section */}
        <section className="lost-section">
          <h2>Lost Items</h2>
          <div className="item-cards">
            {data
              .filter((item) => item.type === "lost") // Filter for lost items
              .map((item) => (
                <div
                  key={item._id} // Use _id for unique key
                  className="card"
                  onClick={() => handleCardClick(item)}
                >
                  <img
                    src={`http://localhost:3000/${item.itemPhoto}`} // Ensure the correct URL
                    alt={item.objectType}
                    className="item-image"
                  />
                  <p>
                    <strong>{item.objectType}</strong>
                  </p>
                  <p>Lost at: {item.specificLocation}</p>
                  <p>Contact: {item.contactNumber}</p>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Modal for Full Details */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on content click
          >
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>
            <h2>{selectedItem.objectType}</h2>
            <img
              src={`http://localhost:3000/${selectedItem.itemPhoto}`} // Ensure the correct URL
              alt={selectedItem.objectType}
              className="modal-image"
            />
            <p>
              <strong>Description:</strong> {selectedItem.description}
            </p>
            <p>
              <strong>Date:</strong> {selectedItem.lostDate}
              
            </p>
            <p>
              <strong>Contact:</strong> {selectedItem.contactNumber}
            </p>
            <p>
              <strong>Location:</strong> {selectedItem.specificLocation}
            </p>
            <img
              src={`http://localhost:3000/${selectedItem.locationPhoto}`} // Ensure the correct URL for location photo
              alt="Location"
              className="location-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
