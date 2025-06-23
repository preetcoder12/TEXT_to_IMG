import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../src/index.css"; // Import CSS file

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("https://text-to-img-backend.onrender.com/api/user/signup", {
                username,
                email,
                password,
            });
            if (response.data.message) {
                setSuccess(response.data.message);
                setUsername("");
                setEmail("");
                setPassword("");

                // Redirect to SignIn page after successful signup
                setTimeout(() => {
                    navigate("/signin");  // Navigate to signin page
                }, 1500);  // Delay for success message display
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setError("User Already exist");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center ">
            <a href="/"> < img className="logo-animation" src="/logo.png" alt="" width="200px" /></a>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg logo-animation">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 orbitron">Sign Up</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

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
                        className="orbitron w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign Up
                    </button>
                    <div className="mt-4 flex justify-center">

                        <p>Already have an account ?<a href="/signin"> Signin</a></p>
                    </div>                </form>
            </div>
        </div>
    );
};

export default Signup;
