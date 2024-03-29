import React from "react";
import InstructorLogin from "../pages/InstructorLogin";
import InstructorSignup from "../pages/Intructors/InstructorSignup";
import Courselists from "../pages/Intructors/Courselist";
import Addcourse from "../pages/Intructors/AddCourse.jsx";
import InstructorProfile from "../pages/Intructors/InstructorProfile";
import InstructorHome from "../pages/InstructorHome.jsx";
import InstructorCourseView from "../pages/Intructors/InstructorCourseView.jsx";
import { Routes, Route } from "react-router-dom";
import UpdateCourse from "../pages/Intructors/UpdateCourse.jsx";
import PurchaseCourse from "../pages/Intructors/purchasedCourse.jsx";
import Chat from "../pages/Users/ChatMain.jsx";
import DashboardInstructor from "../pages/Intructors/DashboardInstructor.jsx";
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

        <Route
          path="/instructor/instructorcourse/:id"
          element={<InstructorCourseView />}
        />
        <Route
          path="/instructor/updatecourse/:id"
          element={<UpdateCourse />}
        ></Route>
        <Route
          path="/instructor/coursepurchase"
          element={<PurchaseCourse />}
        ></Route>
        <Route path="/instructor/chat" element={<Chat />} />
        <Route path="/instructor/Dashboard" element={<DashboardInstructor />} />
      </Routes>
    </>
  );
}

export default InstructorRouter;
