import React from 'react'
import AdminLogin from '../pages/AdminLogin'
import Userlists from "../pages/Admin/Userlists.jsx";
import Instructorlist from "../pages/Admin/Instructorlist.jsx";
import AdminPrivateRoute from "../components/PrivateRoute/AdminPrivateRoute.jsx";
import { Routes, Route } from "react-router-dom";


const AdminRouter = () => {
  return (
    <div>
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
      /></Routes>
    </div>
  );
}

export default AdminRouter
