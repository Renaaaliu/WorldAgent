import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateAIImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality, cinematic, futuristic geopolitical simulation style image: ${prompt}. Dark aesthetic, cyan and amber accents, professional UI feel.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    // Fallback if no image parts were found
    const keywords = prompt.toLowerCase().split(' ').filter(w => w.length > 3).slice(0, 2).join(',');
    const seed = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://loremflickr.com/1280/720/${keywords || 'technology'}?lock=${seed}`;
  } catch (error: any) {
    if (error?.message?.includes('quota') || error?.status === 429) {
      console.warn("AI Image Quota exceeded. Using strategic fallback imagery.");
    } else {
      console.error("Error generating AI image:", error);
    }
    
    // Fallback to loremflickr if quota is exceeded or other error occurs
    const keywords = prompt.toLowerCase().split(' ').filter(w => w.length > 3).slice(0, 2).join(',');
    const seed = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://loremflickr.com/1280/720/${keywords || 'technology'}?lock=${seed}`;
  }
};
