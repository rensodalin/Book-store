import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrLanguage } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use exactly "isLoggedIn" to match your Redux slice
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        setError('Failed to fetch book data');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-white p-6 text-center text-xl">Loading...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500 p-6 text-center text-lg">{error || 'Book not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12 md:px-24 md:py-20 flex flex-col md:flex-row gap-12 relative">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-10 md:left-10 text-sm text-white flex items-center gap-1 hover:underline mt-16"
      >
        <IoArrowBack size={20} /> Back
      </button>

      {/* Image section */}
      <div className="bg-zinc-800 rounded-lg p-6 flex items-center justify-center md:w-1/2 shadow-lg relative">
        <img
          src={data.url}
          alt={data.title}
          className="max-h-[75vh] w-auto object-contain rounded-md"
        />

        {/* Icons on image, show only if logged in as user */}
        {isLoggedIn && role === "user" && (
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            <button className="p-2 bg-zinc-700 rounded-full hover:bg-red-500 transition-all">
              <FaHeart size={20} />
            </button>
            <button className="p-2 bg-zinc-700 rounded-full hover:bg-green-500 transition-all">
              <FaCartShopping size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Details section */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">{data.title}</h1>
        <p className="text-xl mb-3">
          <span className="font-semibold">Author:</span> {data.author}
        </p>
        <p className="text-base text-gray-300 leading-relaxed whitespace-pre-wrap">{data.desc}</p>
        <div className="flex items-center text-gray-400 mt-4 mb-4 space-x-2">
          <GrLanguage size={20} />
          <span>English</span>
        </div>
        <p className="text-xl mb-6 text-yellow-400 font-semibold">${data.price}</p>

        {/* Action buttons only if logged in as user */}
        {isLoggedIn && role === "user" && (
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition-all">
              <FaHeart /> Add to Favourites
            </button>
            <button className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded hover:bg-green-400 transition-all">
              <FaCartShopping /> Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
