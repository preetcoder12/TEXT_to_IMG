require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");

const text_to_img = async (req, res) => {
    try {
        const { prompt } = req.body; // Extract prompt from request

        if (!prompt) {
            return res.status(400).json({ error: "Prompt text is required" });
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await axios.post(process.env.API_URL, formData, {
            headers: {
                "x-api-key": process.env.API_KEY, // API Key authentication
                ...formData.getHeaders(), // Set multipart headers
            },
            responseType: "arraybuffer", // Expect an image as response
        });

        // Send image as response
        res.set("Content-Type", "image/png");
        res.set("x-remaining-credits", response.headers["x-remaining-credits"]);
        res.set("x-credits-consumed", response.headers["x-credits-consumed"]);
        res.send(response.data);
    } catch (error) {
        console.error("Error generating image:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            error: error.response?.data?.error || "Internal server error",
        });
    }
};

module.exports = { text_to_img };
