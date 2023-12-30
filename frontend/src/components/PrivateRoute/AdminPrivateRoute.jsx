import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPrivateRoute({ children }) {
  const { adminInfo } = useSelector((state) => state.authAdmin);
  return adminInfo ? <>{children}</> : <Navigate to="/admin/Login" />;
}

export default AdminPrivateRoute;
