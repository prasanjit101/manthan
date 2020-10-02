import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Navbar from '../components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";

 const Home = () => {
  return (
      <>
    <Navbar/>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
    </>
  );
};

export default Home;