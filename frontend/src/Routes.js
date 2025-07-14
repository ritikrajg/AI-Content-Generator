import React from "react";
import { useAuth } from "./AuthContext/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "./components/Loader.component";

const ProtectedRoute = () => {
  const { auth, isLoading, isError } = useAuth();
  const location = useLocation();
  if (auth) {
    return <Outlet />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isError || auth === false) {
    return <Navigate to="/login" state={location} replace />;
  }
};

const PublicRoute = () => {
  const { auth } = useAuth();
  if (auth) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
};

export { ProtectedRoute, PublicRoute };
