import React from 'react'
import Home from '../pages/Home.jsx'
import SignUp from '../pages/Users/UserSignup'
import Login from '../pages/Users/UserLogin.jsx'
import Contact from '../pages/Contact'
import Instructor from '../pages/Intructors/Instructor'
import InstructorLogin from '../pages/InstructorLogin.jsx'
import InstructorSignup from '../pages/Intructors/InstructorSignup'
import AdminLogin from '../pages/AdminLogin.jsx'
import Courselist from '../pages/Intructors/Courselist.jsx'
import Addcourse from '../pages/Intructors/AddCourse.jsx'
import Services from '../pages/Services.jsx'
import Userlists from '../pages/Admin/Userlists.jsx'
import Instructorlist from '../pages/Admin/Instructorlist.jsx'
import UserProfile from '../pages/Users/UserProfile.jsx'
import { Routes, Route } from 'react-router-dom'
import InstructorProfile from '../pages/Intructors/InstructorProfile.jsx'
import Courselists from '../pages/Intructors/Courselist.jsx'
import Allcourse from '../pages/Users/Allcourse.jsx'
import InstructorHome from '../pages/InstructorHome.jsx'
import UserPrivateRoute from '../components/PrivateRoute/userPrivateRoute.jsx'
import AdminPrivateRoute from '../components/PrivateRoute/AdminPrivateRoute.jsx'
import InstructorPrivateRoute from '../components/PrivateRoute/instructorPrivateRoute.jsx'
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/instructor" element={<InstructorHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignUp />} />
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
        <Route path="/admin/Login" element={<AdminLogin />} />
        <Route
          path="/admin/userlist"
          element={
            <AdminPrivateRoute>
              <Userlists />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/instructorlist"
          element={
            <AdminPrivateRoute>
              <Instructorlist />
            </AdminPrivateRoute>
          }
        />
        {/* <Route path="/instructor/verify" element={<InstructorDashboard />} /> */}
        <Route
          path="/profile/:id"
          element={
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          }
        />{" "}
        <Route
          path="/instructor/showprofile/:instructorId"
          element={
            <InstructorPrivateRoute>
              <InstructorProfile />
            </InstructorPrivateRoute>
          }
        />
        <Route path="/getcourse" element={<Allcourse />} />
        <Route path="/instructorconfirm" element={<Instructor />} />
        <Route path="/service" element={<Services />} />
      </Routes>
    </>
  );
}

export default Router
