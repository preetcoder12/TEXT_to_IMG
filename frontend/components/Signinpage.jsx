import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../src/index.css";

const SignIn = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
<<<<<<< HEAD
            const response = await axios.post("http://localhost:1000/api/user/signin", {
=======
            const response = await axios.post("http://localhost:5000/api/user/signin", {
>>>>>>> 9e52e56 (tested ok)
                email,
                password,
            });


            if (response.data.message) {
                setSuccess(response.data.message);
                setEmail("");
                setPassword("");
                setLoading(false);
                // Storing the token
                localStorage.setItem("authToken", response.data.token);

                // Set isLoggedIn to true
                setIsLoggedIn(true); // Notify the parent component
                navigate("/");  // Redirect to Home
            } else {
                setError(response.data.error || "Unknown error");
                setLoading(false);
            }
        } catch (error) {
            setError("User not found");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center">
            <a href="/"> <img className="logo-animation" src="/logo.png" alt="Logo" width="200px" /></a>
            <div className="logo-animation w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 orbitron">Sign In</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="orbitron w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    <div className="mt-4 flex justify-center">
                        <p>Create account ?<a href="/signup"> Signup</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Validate props
SignIn.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired, // Ensures it's a function and is required
};

export default SignIn;
