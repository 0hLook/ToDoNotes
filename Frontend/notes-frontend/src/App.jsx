import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import Signup from './pages/SignupPage/Signup';

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />}></Route>
      <Route path="/login" exact element={<Login />}></Route>
      <Route path="/signup" exact element={<Signup />}></Route>
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App