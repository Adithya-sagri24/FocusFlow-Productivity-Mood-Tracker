import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI with a named apiKey parameter as per the coding guidelines.
// Fix: Use process.env.API_KEY for the API key as per coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const detectEmotionFromImage = async (base64Image: string): Promise<string | null> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };
    
    const textPart = {
        text: "Analyze the person's facial expression in this image and identify the primary emotion they are feeling. Choose from one of the following emotions: Neutral, Happy, Sad, Angry, Surprised, Fearful. Return only the single word for the emotion."
    };

    // Fix: Use ai.models.generateContent with the model and contents as per coding guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    // Fix: Access the generated text directly from the `response.text` property.
    const emotion = response.text.trim();
    if (!emotion) return null;
    return emotion;
  } catch (error) {
    console.error("Error detecting emotion:", error);
    return null;
  }
};