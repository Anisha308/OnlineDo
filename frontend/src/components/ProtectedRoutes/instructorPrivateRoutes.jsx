import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function InstructorPrivateRoute({ children }) {
  const { instructorInfo } = useSelector((state) => state.instructorAuth);
  console.log(instructorInfo);
  return instructorInfo ? <>{children}</> : <Navigate to="/instructorLogin" />;
}
InstructorPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default InstructorPrivateRoute;
