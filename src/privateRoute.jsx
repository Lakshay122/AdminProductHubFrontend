import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  console.log('location',location)

  if (!token || token === "undefined" && !userRole) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the allowed role for the route
  if (role === "admin" && userRole !== "admin") {
    // Redirect to user dashboard if trying to access admin routes without admin role
    return <Navigate to="/user" />;
  }

  // If accessing root, redirect based on role
  if (location.pathname === "/") {
    if (userRole === "admin") {
      return <Navigate to="/admin" />;
    } else if (userRole === "user") {
      return <Navigate to="/user" />;
    }
  }

  if (role === "user" && userRole !== "user") {
    // Redirect to admin dashboard if trying to access user routes without user role
    return <Navigate to="/admin" />;
  }

  // Render the protected content if the user is authenticated and has the correct role
  return children;
};

export default PrivateRoute;
