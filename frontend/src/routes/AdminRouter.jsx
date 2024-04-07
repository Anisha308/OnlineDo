import React from "react";
import AdminLogin from "../pages/AdminLogin";
import Userlists from "../pages/Admin/Userlists.jsx";
import Instructorlist from "../pages/Admin/Instructorlist.jsx";
import AddCategories from "../pages/Admin/AddCategories.jsx";
import Course from "../pages/Admin/course.jsx";
import DetailedCourse from "../pages/Admin/DetailedCourse.jsx.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import AdminPrivateRoute from "../components/ProtectedRoutes/adminPrivateRoute.jsx";
const AdminRouter = () => {
  return (
    <>
      <Routes>
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

        <Route
          path="/admin/addcategory"
          element={
            <AdminPrivateRoute>
              <AddCategories />
            </AdminPrivateRoute>
          }
        />
        <Route path="/admin/course/:instructorId" element={<Course />} />
        <Route
          path="/admin/getcourse/:instructorId"
          element={
            <AdminPrivateRoute>
              <DetailedCourse />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/Dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminRouter;
