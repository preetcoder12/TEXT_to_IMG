import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa"; // Import icons
import "../src/index.css"; // Import CSS file

const Navbar = () => {
    const [user, setUser] = useState(false); // Track login status
    const [menuOpen, setMenuOpen] = useState(false); // Track menu toggle
    const [darkMode, setDarkMode] = useState(false); // Track dark mode
    const [credits, setCredits] = useState(5); // Default credits, updated from localStorage
    const navigate = useNavigate(); // Navigation hook

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove token
        setUser(false); // Update state
        navigate("/signup", { replace: true }); // Redirect to sign-up page
    };

    // Load User & Credits on Mount
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedCredits = localStorage.getItem("credits");

        if (token) setUser(true); // Mark user as logged in
        if (storedCredits) setCredits(parseInt(storedCredits)); // Set credits
    }, []);

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <>
            {user && (
                <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 fixed w-full top-0 z-50 shadow-md transition-all  top-section ">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold tracking-wide">AI ImageGen</Link>
                        {/* Desktop Navigation - Now Visible on Desktop */}
                        <div className="flex flex-col md:flex-row md:space-x-6 items-center ">
                            <Link to="/" className="hover:text-blue-500 transition-all">Home</Link>
                            <Link to="/about" className="hover:text-blue-500 transition-all">About</Link>
                            <p className="text-green-500 font-semibold">Credits: {credits}</p>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <button className="block md:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden absolute top-full left-0 w-full bg-gray-200 dark:bg-gray-800 p-5 flex flex-col space-y-4 shadow-lg transition-all">
                            <Link to="/" className="hover:text-blue-500 transition-all" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link to="/about" className="hover:text-blue-500 transition-all" onClick={() => setMenuOpen(false)}>About</Link>
                            <p className="text-green-500 font-semibold">Credits: {credits}</p>
                            <button onClick={toggleDarkMode} className="text-xl">
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </nav>
            )}
        </>
    );
};

export default Navbar;
