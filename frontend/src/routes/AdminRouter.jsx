import React from "react";
import AdminLogin from "../pages/AdminLogin";
import Userlists from "../pages/Admin/Userlists.jsx";
import Instructorlist from "../pages/Admin/Instructorlist.jsx";
import AddCategories from "../pages/Admin/AddCategories.jsx";
import Course from "../pages/Admin/course.jsx";
import DetailedCourse from "../pages/Admin/DetailedCourse.jsx.jsx";
import { Routes, Route } from "react-router-dom";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/Login" element={<AdminLogin />} />
        <Route path="/admin/userlist" element={<Userlists />} />
        <Route path="/admin/instructorlist" element={<Instructorlist />} />

        <Route path="/admin/addcategory" element={<AddCategories />} />
        <Route path="/admin/course/:instructorId" element={<Course />} />
        <Route path="/admin/getcourse/:instructorId" element={<DetailedCourse />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
