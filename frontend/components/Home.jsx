import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../src/index.css"; // Import CSS file

const Home = () => {
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [credits, setCredits] = useState(() => {
        const storedCredits = localStorage.getItem("credits");
        return storedCredits ? parseInt(storedCredits) : 5; // Default to 5 if not found
    });

    const [gallery, setGallery] = useState([]); // To store the generated images

    // List of random prompts
    const randomPrompts = [
        "A fantasy dragon soaring over a medieval kingdom",
        "A peaceful Zen garden with cherry blossoms in spring",
        "A giant whale floating in the sky, surrounded by hot air balloons",
        "A medieval knight riding a dragon through stormy clouds.",
        "A futuristic city skyline at sunset, with flying cars zooming between towering skyscrapers.",
        "A serene mountain landscape with a glowing waterfall under a full moon.",
        "A magical forest with trees that glow in the dark, surrounded by mist.",
        "A steampunk-powered robot building a wooden airship in a dusty workshop.",
        "A pirate ship sailing on a neon ocean, with bioluminescent sea creatures swimming beneath.",
        "A cozy cabin in a snowy forest, with a warm light shining through the win",

    ];

    // for dev purpose
    // const resetcredit=()=>{
    //     localStorage.setItem("credits",5);
    // }

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors
        if (credits <= 0) {
            setError("Not enough credits to generate an image.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post("https://text-to-img-backend.onrender.com/api/text", { prompt: text }, { responseType: "arraybuffer" });
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            setImage(imageUrl);
            const newcredits = credits - 1;
            setCredits(newcredits);
            localStorage.setItem("credits", newcredits); // Store updated credits in localStorage

            // Add the generated image to the gallery
            setGallery((prevGallery) => [...prevGallery, { imageUrl, prompt: text }])
        } catch (error) {
            setError("Failed to generate image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to set a random prompt
    const handleRandomPrompt = () => {
        const randomIndex = Math.floor(Math.random() * randomPrompts.length);
        setText(randomPrompts[randomIndex]);
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

            <img
                src="/logo.png"
                alt="web logo"
                width="250px"
                className={`mt-4 mb-8 shadow-lg rounded-lg logo-animation ${loading ? "hidden" : ""}`}
            />

            {/* Credits Section */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Credits Available: {credits}</h2>
            </div>

            {/* Image Generation Section */}
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full flex flex-col sm:flex-row items-center justify-between space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="w-full sm:w-1/2 logo-animation">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 orbitron">
                        Generate AI Image from Text
                    </h1>
                    <form className="space-y-6" onSubmit={handleGenerate}>
                        <textarea
                            className="w-full p-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Write a description for your image"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="w-1/2 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-400 transition-all"
                            >
                                Generate
                            </button>
                            <button
                                type="button"
                                className="w-1/2 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all"
                                onClick={handleRandomPrompt}
                            >
                                Random Prompt
                            </button>
                        </div>
                    </form>

                    {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

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

                <div className="w-full sm:w-1/2 flex justify-center items-center right-section">
                    {loading ? (
                        <div className="w-20 h-20 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    ) : image ? (
                        <img
                            src={image}
                            alt="Generated"
                            className="rounded-xl shadow-lg transition-transform transform hover:scale-105 logo-animation"
                        />
                    ) : null}
                </div>
            </div>

            {/* Gallery Section */}
            <div className="mt-12 w-full max-w-6xl px-4">
                <h2 className="text-3xl font-semibold text-white mb-6 text-center">Generated Image Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                            <img
                                src={item.imageUrl}
                                alt={`Generated ${index}`}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <p className="text-sm text-gray-700">{item.prompt}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instructions Section */}
            <div className="mt-16 p-6 bg-white rounded-lg shadow-xl w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">How to Use</h2>
                <p className="text-gray-700">
                    1. Write a description in the text box above to generate an image.
                    <br />
                    2. Click "Generate" to see the magic!
                    <br />
                    3. If you don’t know what to write, click "Random Prompt" for inspiration.
                    <br />
                    4. You can download your generated images and share them with friends.
                </p>
            </div>
        </div>
    );
};

export default Home;
