import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set Login as the default page */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
