import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../components/Home";
import Signup from "../components/Signup"; // Ensure this import
import SignIn from '../components/Signinpage';
import About from '../components/About';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
