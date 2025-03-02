const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');

// Using json based data for now as the API has limited responses
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.CLOUDFLARE_AI_KEY;

exports.ask = async (req, res) => {
    try {
        const { question } = req.body;
        const response = await axios.post(
            `${API_BASE_URL}@cf/meta/llama-3-8b-instruct`,
            { messages: [{ role: "user", content: question }] },
            { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
        );

        res.json({ answer: response.data.result || "No response from AI" });
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Server error" });
    }
};