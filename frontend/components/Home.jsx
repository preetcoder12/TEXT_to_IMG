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

    // List of random prompts
    const randomPrompts = [
        "A fantasy dragon soaring over a medieval kingdom",
        "A peaceful Zen garden with cherry blossoms in spring",
        "A giant whale floating in the sky, surrounded by hot air balloons",
        "A mystical portal opening in the middle of a dark forest",
        "An abandoned lighthouse on a rocky shore, glowing eerily",
        "A futuristic sports car racing through a neon-lit city",
        "A time traveler stepping out of a glowing time machine",
        "A celestial goddess surrounded by swirling galaxies",
        "A Viking warrior standing on a snowy battlefield",
        "A steampunk airship floating above a Victorian city",
        "A pirate ship sailing through a magical storm with lightning",
        "An astronaut discovering an alien city on a distant planet",
        "A haunted mansion on a foggy hill under a full moon",
        "A robotic knight wielding a plasma sword in battle",
        "A phoenix rising from the ashes in a burst of fire",
        "A deep-sea diver exploring an ancient underwater temple",
        "A fairy tale castle surrounded by waterfalls and rainbows",
        "A futuristic robot bartender serving drinks in a cyberpunk bar",
        "A samurai facing off against a giant serpent in a bamboo forest",
        "A lost astronaut floating in space with Earth in the background",
        "A carnival at night with glowing Ferris wheels and eerie lights",
        "A futuristic library filled with floating holographic books"
    ];

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
            const response = await axios.post("http://localhost:1000/api/text", { prompt: text }, { responseType: "arraybuffer" });
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            setImage(imageUrl);
            const newcredits = credits - 1;
            setCredits(newcredits);
            localStorage.setItem("credits", newcredits); // Store updated credits in localStorage
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

                    {error && (
                        <div className="mt-4 text-red-500 text-center">{error}</div>
                    )}

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
        </div>
    );
};

export default Home;
