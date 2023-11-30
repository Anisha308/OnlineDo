import React from "react";
import AdminHeader from "../components/Header/AdminHeader";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Router";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
