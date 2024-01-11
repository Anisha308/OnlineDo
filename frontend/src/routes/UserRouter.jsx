import React from "react";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/Users/UserSignup.jsx";
import Login from "../pages/Users/UserLogin.jsx";
import Contact from "../pages/Contact.jsx";


import Services from "../pages/Services.jsx";

import UserProfile from "../pages/Users/UserProfile.jsx";
import { Routes, Route } from "react-router-dom";

import Allcourse from "../pages/Users/Allcourse.jsx";
import UserPrivateRoute from "../components/PrivateRoute/userPrivateRoute.jsx";
import ViewCourse from "../pages/Users/ViewCourse.jsx";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignUp />} />
        {/* <Route path="/instructor/verify" element={<InstructorDashboard />} /> */}
        <Route
          path="/profile/:id"
          element={
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          }
        />{" "}
        <Route path="/getcourse" element={<Allcourse />} />
        <Route path="/service" element={<Services />} />
        <Route path="/viewcourse/:id" element={<ViewCourse/>}/>
      </Routes>
    </>
  );
}

export default UserRouter;
