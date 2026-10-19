import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BooksPage.css";
import { Modal, Button } from "react-bootstrap";

const BooksPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlSearchTerm = queryParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔁 Sync the searchTerm state when the URL query changes
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  // 📚 Fetch books when searchTerm changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/books/?search=${searchTerm}`
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleQuickLook = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            📚 Library
          </Link>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "200px" }}
            />
            <Link to="/login" className="btnn btn btn-outline-light ms-3">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Book Results</h2>
        <div className="row">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">
                      Category: {book.categories_names}
                    </p>
                    <Link
                      to={`/book/${book.id}`}
                      className="btn btn-primary me-2"
                    >
                      Read
                    </Link>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleQuickLook(book)}
                    >
                      Quick Look
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <div>
              <img
                src={selectedBook.cover_image}
                alt={selectedBook.title}
                className="img-fluid mb-3"
              />
              <p>
                <strong>Category:</strong> {selectedBook.categories_names}
              </p>
              <p>
                <strong>Language:</strong> {selectedBook.language}
              </p>
              <p>
                <strong>Published Year:</strong>{" "}
                {selectedBook.publication_date}
              </p>
              <p>
                <strong>Summary:</strong> {selectedBook.description}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BooksPage;
