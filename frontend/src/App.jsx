import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";

// Pages & Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import BookDetail from "./components/BookDetail/BookDetail";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isloggedIn); // use your correct key here

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");  // consistent key name
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const avatar = localStorage.getItem("avatar");

    if (!isLoggedIn && id && token && role) {
      // Restore Redux state
      dispatch(authAction.login());
      dispatch(authAction.changeRole(role));
      dispatch(
        authAction.setUser({
          id,
          username,
          email,
          avatar,
        })
      );

      // If on home/login/signup page, redirect to profile
      if (["/", "/login", "/signup"].includes(window.location.pathname)) {
        navigate("/profile");
      }
    }
  }, [dispatch, navigate, isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
