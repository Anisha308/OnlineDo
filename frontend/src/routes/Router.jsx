import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Contact from '../pages/Contact'
import Instructor from '../pages/Intructors/Instructor'
import InstructorDetails from '../pages/Intructors/InstructorDetails'

import {Routes,Route} from 'react-router-dom'
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/instructor" element={<Instructor/>} />

      <Route path="/register" element={<SignUp />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}

export default Router
