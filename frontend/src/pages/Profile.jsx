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
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token && id) {
      dispatch(authAction.login());
      fetchProfile(token, id);
    } else {
      navigate("/login");
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
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  return (
    <div className="bg-zinc-900 px-4 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white">
      <div className="w-full md:w-1/6">
        <Sidebar data={profile} />
      </div>

      <main
        className="w-full md:w-5/6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-6 md:p-12 shadow-lg border border-zinc-700 overflow-auto"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        <Outlet context={{ profile }} />

        {/* Hide scrollbar for Webkit browsers */}
        <style>{`
          main::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </main>
    </div>
  );
};

export default Profile;
