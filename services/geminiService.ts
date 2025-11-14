import { GoogleGenAI } from "@google/genai";

export const generateText = async (prompt: string): Promise<string> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return "خطا: کلید API یافت نشد. لطفاً مطمئن شوید که متغیر محیطی API_KEY تنظیم شده است.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    if (error instanceof Error) {
        return `خطا در ارتباط با Gemini API: ${error.message}`;
    }
    return "یک خطای ناشناخته رخ داد.";
  }
};
