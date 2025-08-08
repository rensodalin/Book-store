import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authAction } from "../store/auth"; // <-- adjust path if needed

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage after refresh
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token && id) {
      // Restore Redux state
      dispatch(authAction.login());
      fetchProfile(token, id);
    } else {
      navigate("/login"); // redirect if no token
    }
  }, []);

  const fetchProfile = async (token, id) => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-user-information", {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      });
      console.log("Fetched profile:", res.data);
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white">
      <div className="w-full md:w-1/6">
        <Sidebar data={profile} />
      </div>
      <div className="w-full md:w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
