import { GoogleGenAI } from "@google/genai";

/**
 * Safely retrieves the API Key.
 * Note: We explicitly avoid using 'process' to prevent ReferenceErrors in browser environments.
 */
function getApiKey(): string {
  // 1. Try Vite / Modern Bundlers (import.meta.env)
  try {
    // @ts-ignore
    if (import.meta && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch (e) {}

  // 2. Try Window Injection (common for some setups)
  try {
    if (typeof window !== 'undefined' && (window as any).__GEMINI_API_KEY) {
      return (window as any).__GEMINI_API_KEY;
    }
  } catch (e) {}

  return "";
}

let ai: GoogleGenAI | null = null;
const apiKey = getApiKey();

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI client", e);
  }
}

// Export 1: Post Enhancement (Required by CreatePostBox.tsx)
export const generatePostEnhancement = async (draft: string): Promise<string> => {
  if (!ai) return draft + " (AI Unavailable)";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a social media expert. Enhance the following post draft to be more engaging, fixing grammar and adding appropriate emojis. Keep the tone similar to the original. Return ONLY the enhanced text. Draft: "${draft}"`,
    });
    return response.text?.trim() || draft;
  } catch (error) {
    console.error("Error generating content:", error);
    return draft;
  }
};

// Export 2: Mock Post Generation (Required by App.tsx)
export const generateMockPost = async (topic: string): Promise<{content: string}> => {
  if (!ai) return { content: `Simulated post about ${topic}` };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, engaging social media post about "${topic}". Include emojis. Return only the text content.`,
    });
    return { content: response.text?.trim() || "" };
  } catch (error) {
    console.error("Error generating mock post:", error);
    return { content: `Could not generate post about ${topic}` };
  }
};