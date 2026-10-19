import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      console.log("Navigating to: ", `/books?search=${searchTerm}`);
      navigate(`/books?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-20 mb-4 hero-section">
          <div className="hero-overlay">
            <div className="container">
              <h1 className="containers">
                SUT Libraries and Learning Technologies
              </h1>

              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title h4 mb-3">Library OneSearch</h2>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 today-hours">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title h4 mb-3">Today's Hours</h2>
              <div className="row">
                <div className="col-md-3 col-6 mb-2">
                  <h3 className="h6">T1</h3>
                  <p className="text-muted">8:30 am - 10:00 pm</p>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <h3 className="h6">T2</h3>
                  <p className="text-muted">8:30 am - 9:30 pm</p>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <h3 className="h6">T3</h3>
                  <p className="text-muted">8:30 am - 2:45 pm</p>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <h3 className="h6">T4</h3>
                  <p className="text-muted">Open 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="col-12 endnavbar text-center text-white py-4">
        <div className="container text-center">
          <div className="logo-container">
            <img
              src="/photos/Asset-2.svg"
              alt="SUT Logo"
              className="logo-img img-fluid"
            />
            <img
              src="/photos/amity-logo.webp"
              alt="Amity University Logo"
              className="logo-img2 img-fluid"
            />
          </div>

          <h1 className="mt-3">SUT TECH ELSEWEDY UNIVERSITY</h1>
          <p className="text-muted">- POLYTECHNIC OF EGYPT -</p>
          <div className="contact-info mt-3">
            <FontAwesomeIcon icon={faPhoneVolume} className="phone-icon" />
            <span className="phone-number">15755</span>
          </div>
          <div className="footer-container">
            <div className="footer-links">
              <Link to="/HomePage">Home</Link>
              <Link to="/aboutus">About Us</Link>
              <Link to="/admission">Admission</Link>
              <Link to="/news">News</Link>
              <Link to="/careers">Careers at SUT</Link>
            </div>

            <div className="footer-links">
              <Link to="/campus">Campus</Link>
              <Link to="/map">Map</Link>
              <Link to="/media">Media</Link>
              <Link to="/shop">The Shop</Link>
              <Link to="/contactus">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
