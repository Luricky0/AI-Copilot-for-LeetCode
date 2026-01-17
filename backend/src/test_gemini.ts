// src/test-gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Checking Key:", process.env.GEMINI_API_KEY?.substring(0, 5));
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  try {
    const result = await model.generateContent("Hello, are you there?");
    console.log("Response:", result.response.text());
  } catch (e) {
    console.error("STILL FAILED:", e);
  }
}
run();