import React, { useState } from 'react';
import './lost.css';
import Navbar from '../assets/components/navbar';
import axios from 'axios';


function Lost() {
  const [image, setImage] = useState(null);
  const [locationImage, setLocationImage] = useState(null);
  const [lostDate, setLostDate] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  const [objectType, setObjectType] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('lost'); // Declare the missing type state
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!objectType || !specificLocation || !contactNumber || !description || !type) {
        alert('Please fill in all required fields.');
        return;
    }

    const formData = new FormData();
    formData.append('objectType', objectType);
    if (image) formData.append('itemPhoto', image); // Attach object image
    if (locationImage) formData.append('locationPhoto', locationImage); // Attach location image
    formData.append('lostDate', lostDate);
    formData.append('specificLocation', specificLocation);
    formData.append('contactNumber', contactNumber);
    formData.append('description', description);
    formData.append('type', type);

    try {
        const response = await axios.post('http://localhost:3000/lost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Success:', response.data);
        window.location.href = '/search';
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};


  const handleDragEvents = (event, setter) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === 'dragover');
    if (event.type === 'drop') {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        setter(file);
      }
    }
  };

  const handleFileUpload = (event, setter) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setter(file);
    }
  };

  return (
    <>
 
      <Navbar />
    
      <form onSubmit={handleSubmit} action='/lost' method='POST' encType='multipart/form-data' className="lost-form"> 
        {/* Object Type Dropdown */}
        <div className="object-type-section">
          <label htmlFor="objectType" className="object-type-label">
            Type of Object:
          </label>
          <select
            id="objectType"
            name="objectType"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            className="object-type-input"
          >
            <option value="">Select an object type</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Documents">Documents</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Object Image Upload */}
        <h1 className="obj-head">Upload the object image</h1>
        <div
          className={`drag-drop-zone ${dragActive ? 'active' : ''}`}
          onDragOver={(event) => handleDragEvents(event, setImage)}
          onDragLeave={(event) => handleDragEvents(event)}
          onDrop={(event) => handleDragEvents(event, setImage)}
        >
          {image ? (
            <div className="image-preview">
              <img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
              <p>Image Uploaded Successfully</p>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="fileInput"
                name="itemPhoto"
                onChange={(e) => handleFileUpload(e, setImage)}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" className="upload-label">
                Drag & Drop an image here or click to upload
              </label>
            </>
          )}
        </div>

        {/* Location Image Upload */}
        <h1 className="loc-head">Upload the location image</h1>
        <div
          className={`drag-drop-zone ${dragActive ? 'active' : ''}`}
          onDragOver={(event) => handleDragEvents(event, setLocationImage)}
          onDragLeave={(event) => handleDragEvents(event)}
          onDrop={(event) => handleDragEvents(event, setLocationImage)}
        >
          {locationImage ? (
            <div className="image-preview">
              <img src={URL.createObjectURL(locationImage)} alt="Location Preview" />
              <p>Location Image Uploaded Successfully</p>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="locationInput"
                name="locationPhoto"
                onChange={(e) => handleFileUpload(e, setLocationImage)}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="locationInput" className="upload-label">
                Drag & Drop a location image here or click to upload
              </label>
            </>
          )}
        </div>

        {/* Other Form Fields */}
        <div className="lost-date-section">
          <label htmlFor="lostDate">When was the object lost?</label>
          <input
            type="date"
            id="lostDate"
            value={lostDate}
            onChange={(e) => setLostDate(e.target.value)}
          />
        </div>
        <div className='location-description'>
          <label htmlFor="specificLocation">Specific Location:</label>
          <input
            type="text"
            id="specificLocation"
            value={specificLocation}
            onChange={(e) => setSpecificLocation(e.target.value)}
          />
        </div>
        <div className='contact-number'>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div className='description'>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}

export default Lost;
