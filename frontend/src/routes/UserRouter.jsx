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
import Rating from "../pages/Users/rating.jsx";
import Test from "../pages/Users/test.jsx"
function UserRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile/:id" element={<UserProfile />} />{" "}
        <Route path="/getcourse" element={<Allcourse />} />
        <Route path="/viewcourse/:id" element={<ViewCourse />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/:userId/purchaselist" element={<PurchaseList />} />
        <Route path="/:purchaseId/courseview" element={<CourseView />} />
        <Route path="/chat" element={<Chat1 />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default UserRouter;
