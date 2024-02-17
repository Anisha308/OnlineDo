import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UserRouter from "../routes/UserRouter";
import AdminRouter from "../routes/AdminRouter";
import InstructorRouter from "../routes/InstructorRouter";
import { useLocation } from "react-router-dom";
import AdminHeader from "../components/Header/AdminHeader.jsx";
import InstructorHeader from "../components/Header/InstructorHeader.jsx";

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const instructor = location.pathname.startsWith("/instructor");
  const chat=location.pathname.startsWith("/instructor/chat")
  return (
    <>
      {isAdmin ? (
        <AdminHeader />
      ) : instructor ? (
        <InstructorHeader />
      ) : chat ? (
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
};

export default Layout;
