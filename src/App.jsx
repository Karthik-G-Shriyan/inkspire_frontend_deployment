// src/App.jsx
import React from "react";
import "./App.css"; 
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom"; 
import About from "./pages/About/About";
import PostPage from "./pages/Posts/PostPage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./pages/Auth/EmailVerify/EmailVerify";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import OAuthSuccess from "./pages/Auth/OAuthSuccess/OAuthSuccess";


const App = () => {


  return (
    <div className="app-container flex flex-col min-h-screen">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
       <Route path="/oauth-success" element={<OAuthSuccess />} />

      </Routes>

       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
