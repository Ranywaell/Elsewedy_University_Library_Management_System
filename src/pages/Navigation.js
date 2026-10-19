import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 
import { Nav } from 'react-bootstrap';

// import About from "./pages/About";
const Navigation = () => {


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container navbar">
        <Link className="navbar-brand" to="/">
        <img src="/photos/logo.jpg" alt="Logo"  className='logo-img'/>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/research">Research</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/new">News & Events</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <form className="d-flex me-3">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search library" 
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;




