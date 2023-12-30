import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function InstructorPrivateRoute({ children }) {
  const { instructorInfo } = useSelector((state) => state.instructorAuth);
  return instructorInfo ? <>{children}</> : <Navigate to="/instructorLogin" />;
}

export default InstructorPrivateRoute;
