import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from './pages/Navigation';

import About from "./pages/About";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Research from "./pages/Research";
import Services from './pages/Services';
import NewsEvents from './pages/NewsEvents';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<Research />} />
          <Route path="/services" element={<Services />} />
          <Route path="/new" element={<NewsEvents />} />
          <Route path="/about" element={<About />} />  {/* ✅ تصحيح المسار */}

        <Route path="/books" element={<BooksPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
