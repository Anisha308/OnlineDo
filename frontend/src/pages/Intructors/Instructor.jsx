import React from "react";
import { useSelector } from "react-redux";

const InstructorDashboard = () => {
  const instructor = useSelector((state) => state.instructor);

  // Check if instructor is available before accessing its properties
  if (!instructor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {instructor?.name || "Guest"}!</h1>

      {instructor.verified ? (
        <p>Your account is verified and ready to use.</p>
      ) : (
        <p>
          Your account is pending verification. Please wait for admin approval.
        </p>
      )}

      {/* Additional content for verified instructors */}
      {instructor.verified && (
        <div>{/* Display content or actions for verified instructors */}</div>
      )}
    </div>
  );
};

export default InstructorDashboard;
