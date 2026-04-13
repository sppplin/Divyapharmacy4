import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Divya Pharmacy Wellness Assistant, an expert in Ayurveda and natural wellness. 
Your goal is to help customers find the right Ayurvedic products and provide wellness advice based on traditional Vedic wisdom.

Here is our product catalog:
${JSON.stringify(PRODUCTS, null, 2)}

Guidelines:
1. Be polite, warm, and professional.
2. Recommend specific products from the catalog when relevant.
3. Provide general Ayurvedic wellness tips (e.g., lifestyle, diet) alongside product recommendations.
4. If a user asks about a medical condition, provide helpful Ayurvedic context but always include a disclaimer: "Please consult with a healthcare professional or an Ayurvedic practitioner before starting any new supplement or treatment."
5. Keep responses concise and easy to read.
6. Use "Divya Pharmacy" when referring to the brand.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: message,
    });

    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("I'm having trouble connecting to my wellness wisdom right now. Please try again in a moment.");
  }
}
