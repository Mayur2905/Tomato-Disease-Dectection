import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./styles.css";
import { auth } from "./fireabse";
import NavBar from "./components/Navbar/NavBar";
import About from "./components/About/about";
import WeatherApp from "./components/Weather/Weather";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar name={userName} />
        <Routes>
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/about" element={<About name={userName} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
