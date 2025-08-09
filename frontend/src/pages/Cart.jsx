
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        const cartData = res.data.data || [];
        setCart(cartData);
        calculateTotals(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate totals
  const calculateTotals = (items) => {
    const priceSum = items.reduce((acc, item) => acc + (item.price || 0), 0);
    const bookCount = items.length;
    setTotalPrice(priceSum);
    setTotalBooks(bookCount);
  };

  // Remove book from cart
  const deleteItem = async (bookId) => {
    try {
      await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookId}`, {}, { headers });
      const updatedCart = cart.filter(item => item._id !== bookId);
      setCart(updatedCart);
      calculateTotals(updatedCart);
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  // Place order
  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      if (res.data.status === "success") {
        alert("Order placed successfully!");
        setCart([]);
        setTotalPrice(0);
        setTotalBooks(0);
        navigate("/profile/orderhistory"); // ✅ Redirect to order history
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  // Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-yellow-300 text-xl font-semibold">
        Loading Cart...
      </div>
    );
  }

  return (
    <>
      {/* Empty Cart */}
      {cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-full flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img src="/empty-cart.png" alt="empty cart" className='lg:h-[50vh]' />
          </div>
        </div>
      )}

      {/* Cart with items */}
      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            Your Cart
          </h1>

          {cart.map((item, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              key={i}
            >
              <img src={item.url} alt={item.title} className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ${item.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 p-2 ms-12 rounded'
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className='text-right text-2xl font-semibold text-yellow-400 mt-8'>
            Total Price: ${totalPrice.toFixed(2)}  
            <br />
            Total Books: {totalBooks} {totalBooks === 1 ? 'Book' : 'Books'}
          </div>

          {/* Place Order */}
          <div className='flex justify-end mt-4'>
            <button
              onClick={placeOrder}
              className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold'
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

