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
import InstructorPrivateRoute from "../components/ProtectedRoutes/instructorPrivateRoutes.jsx";
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
          path="/instructor/showprofile/:id"
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

        <Route
          path="/instructor/instructorcourse/:id"
          element={
            <InstructorPrivateRoute>
              <InstructorCourseView />
            </InstructorPrivateRoute>
          }
        />
        <Route
          path="/instructor/updatecourse/:id"
          element={
            <InstructorPrivateRoute>
              <UpdateCourse />
            </InstructorPrivateRoute>
          }
        ></Route>
        <Route
          path="/instructor/coursepurchase"
          element={
            <InstructorPrivateRoute>
              <PurchaseCourse />
            </InstructorPrivateRoute>
          }
        ></Route>
        <Route
          path="/instructor/chat"
          element={
            <InstructorPrivateRoute>
              <Chat />
            </InstructorPrivateRoute>
          }
        />
        <Route
          path="/instructor/Dashboard"
          element={
            <InstructorPrivateRoute>
              <DashboardInstructor />
            </InstructorPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default InstructorRouter;
