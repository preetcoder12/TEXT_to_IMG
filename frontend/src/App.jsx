import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Signup from "../components/Signup";
import SignIn from "../components/Signinpage";
import About from "../components/About";
import Navbar from "../components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
        <Navbar />

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <SignIn setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
