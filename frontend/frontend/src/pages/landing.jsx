// src/pages/homepage.jsx
import React from 'react';
import './landing.css';
import Navbar from '../assets/components/navbar';
import { Link } from 'react-router-dom';


function landing() {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div>
 
    </div>
      <div className="btn-container">
        <h2 className="question-text">Have You <a href="/lost">Lost</a> Or <a href="/found">Found</a> Anything</h2>
        <div className="button-row">
          <Link to='/lost' className="styled-btn lost-btn">LOST</Link>
          <Link to='/found' className="styled-btn found-btn">FOUND</Link>
        </div>
      </div>
    </>
  );
}

export default landing;