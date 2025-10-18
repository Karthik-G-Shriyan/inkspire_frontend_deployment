// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(StoreContext);

  if (!token) {
    // User is not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in → render the page
  return children;
};

export default ProtectedRoute;
