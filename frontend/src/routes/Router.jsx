import React from 'react'
import Home from '../pages/Home.jsx'
import Services from '../pages/Services'
import SignUp from '../pages/Users/UserSignup'
import Login from '../pages/Users/UserLogin.jsx'
import Contact from '../pages/Contact'
import Instructor from '../pages/Intructors/Instructor'
import InstructorLogin from '../pages/InstructorLogin.jsx'
import InstructorSignup from '../pages/Intructors/InstructorSignup'
import AdminLogin from '../pages/AdminLogin.jsx'
import Courselist from '../pages/Intructors/Courselist.jsx'
import Addcourse from '../pages/Intructors/AddCourse.jsx'

import Userlists from '../pages/Admin/Userlists.jsx'
import Instructorlist from '../pages/Admin/Instructorlist.jsx'

import { Routes, Route } from 'react-router-dom'
import InstructorDashboard from '../pages/Intructors/Instructor'

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
        <Route path="/instructor/courselist" element={<Courselist />} />
        <Route path="/instructor/addcourse" element={<Addcourse />} />

        <Route path="/admin/Login" element={<AdminLogin />} />
        <Route path="/admin/userlist" element={<Userlists />} />
        <Route path="/admin/instructorlist" element={<Instructorlist />} />
        <Route path="/instructor/verify" element={<InstructorDashboard />} />
      </Routes>
    </>
  );
}

export default Router
