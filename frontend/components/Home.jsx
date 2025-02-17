import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../src/index.css"; // Import CSS file

const Home = () => {
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:1000/api/text", { prompt: text }, { responseType: "arraybuffer" });
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            setImage(imageUrl);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = image;
        link.download = `${text.slice(0, 10)}.png`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-600 to-pink-600 flex flex-col items-center justify-center p-4">
            <Navbar />

            {/* Logo with Bottom to Top Animation */}
            <img
                src="/logo.png"
                alt="web logo"
                width="250px"
                className={`mt-4 mb-8 shadow-lg rounded-lg logo-animation ${loading ? "hidden" : ""}`}
            />

            {/* Main Content */}
            <div className={`bg-white  rounded-lg shadow-2xl p-8 max-w-4xl w-full flex flex-col sm:flex-row items-center justify-between space-y-8 sm:space-y-0 sm:space-x-8 
                `}>

                {/* Left section for text input (Fade-in Left) */}
                <div className={`w-full sm:w-1/2 logo-animation`}>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 orbitron">Generate AI Image from Text</h1>
                    <form className="space-y-6" onSubmit={handleGenerate}>
                        <textarea
                            className="w-full p-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Write a description for your image"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-400 transition-all"
                        >
                            Generate
                        </button>
                    </form>

                    {image && (
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                type="button"
                                className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all"
                                onClick={handleDownload}
                            >
                                Download Image
                            </button>
                        </div>
                    )}
                </div>

                {/* Right section for generated image (Fade-in Right) */}
                <div className={`w-full sm:w-1/2 flex justify-center items-center right-section `}>
                    {loading ? (
                        <div className="w-20 h-20 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    ) : image ? (
                        <img
                            src={image}
                            alt="Generated"
                            className=" rounded-xl shadow-lg transition-transform transform hover:scale-105"
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Home;
