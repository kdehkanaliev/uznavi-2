import { GoogleGenAI, Type } from "@google/genai";
import { BudgetTier, TripType, Pace } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export const generateItinerary = async (params: {
  interests: string[];
  budgetTier: BudgetTier;
  tripType: TripType;
  days: number;
  pace: Pace;
}) => {
  const model = "gemini-pro";

  const prompt = `Generate a detailed day-by-day travel itinerary for Uzbekistan.
  User Profile:
  - Interests: ${params.interests.join(", ")}
  - Budget Tier: ${params.budgetTier}
  - Trip Type: ${params.tripType}
  - Duration: ${params.days} days
  - Pace: ${params.pace}
  
  Please provide a JSON response listing activities for each day including morning, lunch, afternoon, and evening slots. Recommend real places in Uzbekistan (Tashkent, Samarkand, Bukhara, Khiva).`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return JSON.parse(response.text);
};
