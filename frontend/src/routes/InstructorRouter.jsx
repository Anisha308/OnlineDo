import React from "react";
import InstructorLogin from "../pages/InstructorLogin";
import InstructorSignup from "../pages/Intructors/InstructorSignup";
import Courselists from "../pages/Intructors/Courselist";
import Addcourse from "../pages/Intructors/AddCourse.jsx";
import InstructorProfile from "../pages/Intructors/InstructorProfile";
import Instructor from "../pages/Intructors/Instructor.jsx";
import InstructorHome from "../pages/InstructorHome.jsx";
import InstructorCourseView from "../pages/Intructors/InstructorCourseView.jsx"
import { Routes, Route } from "react-router-dom";

function InstructorRouter() {
  return (
    <>
      <Routes>
        <Route path="/instructorLogin" element={<InstructorLogin />} />
        <Route path="/instructorRegister" element={<InstructorSignup />} />
        <Route
          path="/instructor/:instructorId/courselist"
          element={<Courselists />}
        />
        <Route
          path="/instructor/addcourse/:instructorId"
          element={<Addcourse />}
        />
        <Route
          path="/instructor/showprofile/:id"
          element={<InstructorProfile />}
        />
        <Route
          path="/instructor/showprofile/:instructorId"
          element={<InstructorProfile />}
        />
        <Route path="/instructor" element={<InstructorHome />} />

        <Route path="/instructorconfirm" element={<Instructor />} />
        <Route path="/instructor/instructorcourse/:id" element={<InstructorCourseView/>} />
      </Routes>
    </>
  );
}

export default InstructorRouter;
