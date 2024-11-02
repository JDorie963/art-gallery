import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
// import AboutUs from "./Components/Pages/AboutUs";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import './locale.jsx';



function App() {

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/aboutus" element={<AboutUs />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    
    </>
    
  );
}

export default App;