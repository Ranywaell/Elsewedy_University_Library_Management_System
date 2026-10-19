import React from "react";
import { useParams } from "react-router-dom";
import booksData from "../data/books.json";

const BookPage = () => {
  const { id } = useParams();
  const book = booksData.find((b) => b.id.toString() === id);

  if (!book) return <h2>Book not found</h2>;

  return (
    <div className="container mt-4">
      <h2>{book.title}</h2>
      <p>Category: {book.category}</p>

      <h3>Login to Borrow</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default BookPage;
