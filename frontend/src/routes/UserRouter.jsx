import React from "react";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/Users/UserSignup.jsx";
import Login from "../pages/Users/UserLogin.jsx";
import Contact from "../pages/Contact.jsx";

// import Services from "../pages/Services.jsx";

import UserProfile from "../pages/Users/UserProfile.jsx";
import { Routes, Route } from "react-router-dom";

import Allcourse from "../pages/Users/Allcourse.jsx";
import ViewCourse from "../pages/Users/ViewCourse.jsx";
import Fail from "../components/paymentfail/Fail.jsx";
import Success from "../components/paymentsuccess/Success.jsx";
import PurchaseList from "../pages/Users/PurchaseList.jsx";
import CourseView from "../pages/Users/CourseView.jsx";
import Chat1 from "../pages/Users/ChatMain.jsx";
import UserPrivateRoute from "../components/ProtectedRoutes/userprivateRoutes.jsx";
import Rating from "../pages/Users/rating.jsx";
function UserRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/profile/:id"
          element={
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          }
        />{" "}
        <Route path="/getcourse" element={<Allcourse />} />
        <Route
          path="/viewcourse/:id"
          element={
            <UserPrivateRoute>
              <ViewCourse />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/success"
          element={
            <UserPrivateRoute>
              <Success />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/fail"
          element={
            <UserPrivateRoute>
              <Fail />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/:userId/purchaselist"
          element={
            <UserPrivateRoute>
              <PurchaseList />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/:purchaseId/courseview"
          element={
            <UserPrivateRoute>
              <CourseView />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <UserPrivateRoute>
              <Chat1 />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/rating"
          element={
            <UserPrivateRoute>
              <Rating />
            </UserPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default UserRouter;
