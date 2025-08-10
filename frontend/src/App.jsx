// import React, { useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { authAction } from "./store/auth";

// // Pages & Components
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import AllBooks from "./pages/AllBooks";
// import LogIn from "./pages/LogIn";
// import SignUp from "./pages/SignUp";
// import Cart from "./pages/Cart";
// import Profile from "./pages/Profile";
// import BookDetail from "./components/BookDetail/BookDetail";
// import Favourites from "./components/Profile/Favourites";
// import UserOrderHistory from "./components/Profile/UserOrderHistory";
// import Settings from "./components/Profile/Settings";
// import AllOrders from "./pages/AllOrders";
// import AddBook from "./pages/AddBook";

// const App = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
//   const role =
//     useSelector((state) => state.auth.role) || localStorage.getItem("role");

//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     const token = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");

//     if (!isLoggedIn && id && token && storedRole) {
//       dispatch(authAction.login());
//       dispatch(authAction.setRole(storedRole));

//       if (["/", "/login", "/signup"].includes(window.location.pathname)) {
//         navigate("/profile");
//       }
//     }
//   }, [dispatch, navigate, isLoggedIn]);

//   return (
//     <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/all-books" element={<AllBooks />} />
//         <Route path="/books/:id" element={<BookDetail />} />
//         <Route path="/cart" element={<Cart />} />

//         <Route path="/profile" element={<Profile />}>
//           {/* Index route changes based on role */}
//           {role === "user" ? (
//             <Route index element={<Favourites />} />
//           ) : (
//             <Route index element={<AllOrders />} />
//           )}

//           {/* Only admin gets AddBook route */}
//           {role === "admin" && <Route path="add-book" element={<AddBook />} />}

//           <Route path="orderHistory" element={<UserOrderHistory />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<LogIn />} />
//       </Routes>

//       <Footer />
//     </div>
//   );
// };

// export default App;
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
import AboutUs from "./pages/AboutUs"; // Add this import
import BookDetail from "./components/BookDetail/BookDetail";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
  const role =
    useSelector((state) => state.auth.role) || localStorage.getItem("role");

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!isLoggedIn && id && token && storedRole) {
      dispatch(authAction.login());
      dispatch(authAction.setRole(storedRole));

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
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          {/* Index route changes based on role */}
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}

          {/* Only admin gets AddBook route */}
          {role === "admin" && <Route path="add-book" element={<AddBook />} />}

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
