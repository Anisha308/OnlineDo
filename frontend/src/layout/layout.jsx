import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import UserRouter from '../routes/UserRouter'
import AdminRouter from '../routes/AdminRouter'
import InstructorRouter from '../routes/InstructorRouter'
import { useLocation } from "react-router-dom";
import AdminHeader from '../components/Header/AdminHeader';
import InstructorHeader from '../components/Header/InstructorHeader'

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const instructor=location.pathname.startsWith('/instructor')
  return (
    <>
      {isAdmin ? (
        <AdminHeader />
      ) : instructor ? (
        <InstructorHeader />
      ) : (
        <Header />
      )}

      <main>
        {isAdmin ? (
          <AdminRouter />
        ) : instructor ? (
          <InstructorRouter />
        ) : (
          <UserRouter />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Layout
