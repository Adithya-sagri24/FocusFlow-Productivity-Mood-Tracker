// Fix: Implemented the geminiService to provide emotion detection functionality.
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // This will be handled by the user's environment setup as per guidelines.
  console.warn("API_KEY environment variable is not set for Gemini.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const model = 'gemini-2.5-flash';

const predefinedEmotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'fearful'];

export const getEmotionFromImage = async (base64Image: string): Promise<string> => {
  if (!apiKey) {
    console.error("Gemini API key is missing.");
    return 'neutral';
  }
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            {
              text: `Analyze the dominant emotion of the person in this image. Respond with only one of the following words: ${predefinedEmotions.join(', ')}.`,
            },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const emotion = response.text.trim().toLowerCase();

    if (predefinedEmotions.includes(emotion)) {
      return emotion;
    } else {
      console.warn(`Gemini returned an unexpected emotion: "${emotion}". Defaulting to neutral.`);
      return 'neutral';
    }
  } catch (error) {
    console.error("Error detecting emotion with Gemini:", error);
    // Return a default emotion on error
    return 'neutral';
  }
};
