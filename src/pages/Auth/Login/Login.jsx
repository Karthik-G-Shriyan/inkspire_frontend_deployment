// src/pages/Login/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../../Context/StoreContext";
import "react-toastify/dist/ReactToastify.css";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {loginUser} from "../../../service/AuthService"


const Login = () => {
 const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  const authDTO = { email, password };

  try {
    const res = await loginUser(authDTO);

    const data = await res.data;

     setToken(data.token);
        sessionStorage.setItem('token', data.token);

    if (res.status === 200 && data.token) {
      
      toast.success("Login successful!");

      //  Conditional redirect based on verification status
      if (data.emailVerified) {
        navigate("/"); // verified user → home/dashboard
      } else {
        sessionStorage.setItem("email", authDTO.email);
        navigate("/verify-email"); // not verified → verify page
      }

    } else {
      toast.error(data.message || "Login failed. Check your credentials.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Login failed due to network error.");
  }
};

  // OAuth2 placeholders
  const handleGoogleOAuth = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};
  const handleGithubOAuth = () => toast.info("GitHub OAuth2 login clicked!");

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6
    w-full max-w-xs sm:max-w-sm  md:max-w-md lg:max-w-lg  xl:max-w-xl ">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      {/* Forgot password and register links */}
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </span>
      </div>

      {/* OR Separator */}
      <div className="flex items-center gap-2 mt-4">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-500">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* OAuth2 Buttons */}
      <div className="flex flex-col gap-4 mt-4">
        <button
          onClick={handleGoogleOAuth}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          <FaGoogle size={20}  className="text-red-500" /> Continue with Google
        </button>

        <button
          onClick={handleGithubOAuth}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          <FaGithub size={20}/> Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
