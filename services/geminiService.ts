
import { GoogleGenAI, Type } from "@google/genai";

export const summarizeResource = async (title: string, description: string) => {
  try {
    // Correct initialization using process.env.API_KEY directly as per guidelines.
    // The key is guaranteed to be available in the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an academic assistant. Briefly summarize the following resource and provide 3-5 keywords for better searchability.
      Title: ${title}
      Description: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "tags"]
        }
      }
    });
    
    // .text is a property, not a method. Accessing it directly.
    const text = response.text;
    if (!text) {
      return { summary: "AI Summary unavailable at this moment.", tags: [] };
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { summary: "Error generating summary.", tags: [] };
  }
};