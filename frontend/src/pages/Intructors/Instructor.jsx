import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiInstance from "../../../Api";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const { instructor } = useSelector((state) => state.authInstructor) || {};
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make sure to include the instructor ID in the request if needed
        const response = await apiInstance.get("/api/users/instructorconfirm");

        // Assuming the response contains instructor details
        const instructorData = response.data;

    
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructor data", error);
        // Handle errors
        setLoading(false);
      }
    };

    if (instructor) {
      fetchData();
    } else {
      navigate('/instructorLogin')
    }
  }, [instructor]); // Run the effect when the instructor changes

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if instructor is available before accessing its properties
  if (!instructor) {
    return <div>No instructor data available</div>;
  }

  // Check if the instructor object is resolved
  if (Object.keys(instructor).length === 0) {
    return <div>No instructor data available</div>;
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
