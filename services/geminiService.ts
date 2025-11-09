// Fix: Implemented the missing Gemini service for emotion detection.
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Fix: Correctly access the API key using Vite's import.meta.env syntax.
const apiKey = (import.meta as any).env.VITE_API_KEY;
if (!apiKey) {
    throw new Error("Gemini API key is required. Please set VITE_API_KEY in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

const model = 'gemini-2.5-flash';

/**
 * Detects the dominant emotion from an image.
 * @param imageBase64 The base64 encoded image data.
 * @param mimeType The MIME type of the image.
 * @returns The detected emotion as a string (e.g., 'happy', 'sad').
 */
export const detectEmotion = async (imageBase64: string, mimeType: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType,
            },
        };

        const textPart = {
            text: "Analyze the person's facial expression in this image and identify the dominant emotion. Choose one from: neutral, happy, sad, angry, surprised, fearful."
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        emotion: {
                            type: Type.STRING,
                            description: 'The detected dominant emotion from the list: neutral, happy, sad, angry, surprised, fearful.',
                        },
                    },
                    required: ["emotion"],
                }
            }
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        // Make it robust by converting to lower case
        const emotion = result.emotion ? String(result.emotion).toLowerCase() : 'neutral';

        // Validate against a list of expected emotions
        const validEmotions = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'fearful'];
        if (validEmotions.includes(emotion)) {
            return emotion;
        } else {
            console.warn(`Unexpected emotion detected: ${emotion}. Defaulting to neutral.`);
            return 'neutral';
        }
    } catch (error) {
        console.error("Error detecting emotion with Gemini API:", error);
        // Fallback in case of API error
        return 'neutral';
    }
};
