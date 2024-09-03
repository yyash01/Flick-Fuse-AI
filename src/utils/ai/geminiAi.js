import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../constant";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export default genAI;
