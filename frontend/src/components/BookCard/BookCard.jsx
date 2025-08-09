import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favorite, onRemove }) => {
  const handleRemoveBook = async (e) => {
    e.stopPropagation(); // Stop Link click bubbling
    e.preventDefault();  // Prevent navigation

    try {
      await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favorite",
        {},
        {
          headers: {
            id: localStorage.getItem("id"),
            bookid: data._id || data.id,
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (onRemove) onRemove(data._id || data.id); // Update UI
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className='bg-zinc-800 rounded p-4'>
      <Link to={`/books/${data._id || data.id}`}>
        <div className='bg-zinc-900'>
          <img src={data.url} alt={data.title} />
        </div>
        <h3 className="text-lg font-semibold mt-2">{data.title}</h3>
        <p className="text-sm text-gray-400">{data.author}</p>
        <p className="text-sm text-gray-400">${data.price}</p>
      </Link>

      {favorite && (
        <button
          className="bg-yellow-50 py-2 px-4 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove From Favorite
        </button>
      )}
    </div>
  );
};

export default BookCard;
