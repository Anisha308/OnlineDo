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
import Success from "../components/paymentsuccess/success.jsx";
// import Payment from "../pages/Users/payment.jsx";

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
         
              <UserProfile />
          
          }
        />{" "}
        <Route path="/getcourse" element={<Allcourse />} />
        {/* <Route path="/service" element={<Services />} /> */}
        <Route path="/viewcourse/:id" element={<ViewCourse />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail/>}/>
        {/* <Route path="/payment/:price" element={<Payment/>} /> */}

      </Routes>
    </>
  );
}

export default UserRouter;
