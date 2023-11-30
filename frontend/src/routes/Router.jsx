import React from 'react'
import Home from '../pages/Home.jsx'
import Services from '../pages/Services'
import SignUp from '../pages/Users/UserSignup'
import Login from '../pages/UserLogin.jsx'
import Contact from '../pages/Contact'
import Instructor from '../pages/Intructors/Instructor'
import InstructorDetails from '../pages/Intructors/InstructorDetails'
import InstructorLogin from '../pages/InstructorLogin.jsx'
import InstructorSignup from '../pages/Intructors/InstructorSignup'
import AdminLogin from '../pages/AdminLogin.jsx'

import Userlists from '../pages/Admin/Userlists.jsx'
import Instructorlist from '../pages/Admin/Instructorlist.jsx'

import { Routes, Route } from 'react-router-dom'

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/services" element={<Services />} />

        <Route path="/instructor" element={<Instructor />} />
        <Route path="/instructorLogin" element={<InstructorLogin />} />
        <Route path="/instructorRegister" element={<InstructorSignup />} />

        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/userlist" element={<Userlists />} />
        <Route path="/instructorlist" element={<Instructorlist />} />
        <Route path="/adminhome" element={<Instructorlist />} />
      </Routes>
    </>
  );
}

export default Router
