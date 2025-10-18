// src/Context/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  if (role === "ADMIN" && token) {
    return children;
  }

  return <Navigate to="/admin-login" />;
};

export default ProtectedAdminRoute;
