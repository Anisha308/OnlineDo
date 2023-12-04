import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  './app.css'
import Layout from "./layout/layout";


function App() {
  return (
    <>
      

      <ToastContainer />
      <Layout />
    </>
  ); 
  
}

export default App;
