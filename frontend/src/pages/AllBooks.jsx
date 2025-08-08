import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
        setBooks(response.data.data); // adjust if API response structure is different
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div className="w-full bg-zinc-900 text-white min-h-screen py-12 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-yellow-100 mb-6">All Books</h2>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="text-white">No books available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} data={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
