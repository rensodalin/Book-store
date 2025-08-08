import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this line

const BookCard = ({ data }) => {
  console.log(data); // should now show the correct object

  return (
    <Link to={`/books/${data._id || data.id}`}> {/* Add a proper `to` path */}
      <div className='bg-zinc-800 rounded p-4'>
        <div className='bg-zinc-900'>
          <img src={data.url} alt={data.title} />
        </div>
        <h3 className="text-lg font-semibold mt-2">{data.title}</h3>
        <p className="text-sm text-gray-400">{data.author}</p>
        <p className="text-sm text-gray-400">${data.price}</p>
      </div>
    </Link>
  );
};

export default BookCard;
