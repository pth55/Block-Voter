// src/pages/Landing/Landing.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../../components/Home";
import About from "../../components/About";
import Contact from "../../components/Contact";
import AdminLogin from "../AdminLogin/AdminLogin";
import VoterLogin from "../VoterLogin/VoterLogin";
import NotFound from "../../components/NotFound";

export default function Landing() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home for / route */}
        <Route path="/home" element={<Home />} /> {/* Home for /home route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/voterLogin" element={<VoterLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
