// src/pages/Register/Register.jsx
import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../../service/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();



    // Password validation
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    if (!/[A-Za-z]/.test(data.password)) {
      toast.error("Password must contain at least one letter");
      setLoading(false);
      return;
    }
    if (data.password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(data);

      if (response.status === 201) {
        toast.success("Registration completed. Please verify your email.");
        sessionStorage.setItem("email", data.email);
        navigate("/verify-email");
      } else {
        toast.error("Unable to register. Please try again");
      }

    } catch (error) {
      if (error.response) {
        const { status, data: errData } = error.response;

        if (status === 409) {
          toast.error(errData.message || "An Account already registered with this email. please log in..");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
          
        } else {
          toast.error("Unable to register. Please try again");
        }

      } else {
        toast.error("Network error. Please check your connection.");
      }

      console.error("Registration error:", error);

    } finally {
      setLoading(false);
    }

  };

   // OAuth2 placeholders
  const handleGoogleOAuth = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};
  const handleGithubOAuth = () => toast.info("GitHub OAuth2 login clicked!");

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6
      w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <h1 className="text-2xl font-bold text-center">Register</h1>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={data.name}
          onChange={onChangeHandler}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={onChangeHandler}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandler}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* OR separator */}
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
          <FaGoogle size={20} /> Continue with Google
        </button>

        <button
          onClick={handleGithubOAuth}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          <FaGithub size={20} /> Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Register;
