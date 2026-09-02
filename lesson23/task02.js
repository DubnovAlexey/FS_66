import { GoogleGenAI } from "@google/genai";

async function askAi(prompt) {
    const genAi = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const response = await genAi.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    return response.text;
}

async function main() {
    const prompt =
        "Напиши что такое REST API и как его использовать в JavaScript";

    const aiResponse = await askAi(prompt);

    console.log("AI Response:", aiResponse);
}

main();
