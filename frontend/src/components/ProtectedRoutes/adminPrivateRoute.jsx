import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function AdminPrivateRoute({ children }) {
  const { adminInfo } = useSelector((state) => state.authAdmin);
  return adminInfo ? <>{children}</> : <Navigate to="/admin/login" />;
}
AdminPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminPrivateRoute;
