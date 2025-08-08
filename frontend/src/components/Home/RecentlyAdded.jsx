import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
        console.log(response);
        setData(response.data.data); // this is correct if response.data = { status: 'Success', data: [...] }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="w-full bg-zinc-900 py-12 px-6 md:px-12">
      <h4 className="text-3xl text-yellow-100 mb-6">Recently Added Books</h4>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data && Data.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
