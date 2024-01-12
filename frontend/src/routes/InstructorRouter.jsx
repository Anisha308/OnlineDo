import React from "react";
import InstructorLogin from "../pages/InstructorLogin";
import InstructorSignup from "../pages/Intructors/InstructorSignup";
import InstructorPrivateRoute from "../components/PrivateRoute/instructorPrivateRoute";
import Courselists from "../pages/Intructors/Courselist";
import Addcourse from "../pages/Intructors/AddCourse.jsx";
import InstructorProfile from "../pages/Intructors/InstructorProfile";
import Instructor from "../pages/Intructors/Instructor.jsx";
import AddCategories from "../pages/Intructors/AddCategories";
import InstructorHome from "../pages/InstructorHome.jsx";
import { Routes, Route } from "react-router-dom";

function InstructorRouter() {
  return (
    <>
      <Routes>
        <Route path="/instructorLogin" element={<InstructorLogin />} />
        <Route path="/instructorRegister" element={<InstructorSignup />} />
        <Route
          path="/instructor/:instructorId/courselist"
          element={
            <InstructorPrivateRoute>
              <Courselists />
            </InstructorPrivateRoute>
          }
        />
        <Route
          path="/instructor/addcourse/:instructorId"
          element={
            <InstructorPrivateRoute>
              <Addcourse />
            </InstructorPrivateRoute>
          }
        />
        <Route
          path="/instructor/showprofile/:instructorId"
          element={
            <InstructorPrivateRoute>
              <InstructorProfile />
            </InstructorPrivateRoute>
          }
        />
        <Route
          path="/instructor/showprofile/:instructorId"
          element={
            <InstructorPrivateRoute>
              <InstructorProfile />
            </InstructorPrivateRoute>
          }
        />
        <Route path="/instructor" element={<InstructorHome />} />

        <Route path="/instructorconfirm" element={<Instructor />} />

        <Route path="/instructor/addcategory" element={<AddCategories />} />
      </Routes>
    </>
  );
}

export default InstructorRouter;