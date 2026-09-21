import {GoogleGenAI} from "@google/genai";
import {AI_MODEL} from "./config.js";
import "dotenv/config";
import * as dotenv from "dotenv";

dotenv.config({
    path: "../.env",
});

export async function askAi(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error(' API key not found');
    }
    const genAi = new GoogleGenAI({
        apiKey
    });

    const response = await genAi.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
    });

    return response.text;
}