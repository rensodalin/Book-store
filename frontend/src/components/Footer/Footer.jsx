import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center border-t border-zinc-700 pt-6">
        <h1 className="text-lg md:text-xl font-medium text-gray-300 flex justify-center items-center gap-2">
          &copy; 2025 · Made with <FaHeart className="text-red-500" /> by <span className="font-semibold text-white">Ren Sodalin</span>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
