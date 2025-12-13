// Note: We use dynamic imports for @google/genai to avoid build-time/load-time issues with 'process'

/**
 * Safely retrieves the API Key.
 * STRICT: No process.env usage here to prevent browser crashes.
 */
function getApiKey(): string {
  // 1. Try Vite (import.meta.env)
  try {
    // @ts-ignore
    if (import.meta && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch (e) {
    // Ignore errors accessing import.meta
  }

  // 2. Try Global/Window Injection
  try {
    if ((globalThis as any).__GEMINI_API_KEY) {
      return (globalThis as any).__GEMINI_API_KEY;
    }
  } catch (e) {
    // Ignore errors accessing globalThis
  }

  return "";
}

let aiClient: any = null;

/**
 * Async Lazy initialization of the GoogleGenAI client.
 * Uses dynamic import to prevent top-level execution issues.
 */
async function getClient() {
  if (aiClient) return aiClient;

  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    // Dynamic import
    const { GoogleGenAI } = await import("@google/genai");
    aiClient = new GoogleGenAI({ apiKey });
    return aiClient;
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI client dynamically", e);
    return null;
  }
}

// Export 1: Post Enhancement (Required by CreatePostBox.tsx)
export const generatePostEnhancement = async (draft: string): Promise<string> => {
  const client = await getClient();
  
  // Fallback if no API key or client init failed
  if (!client) {
    console.warn("Gemini API key missing or client failed. Returning original draft.");
    return draft;
  }
  
  try {
    const response = await client.models.generateContent({
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
  const client = await getClient();

  // Fallback allows the app to function visually even without API key
  if (!client) {
    return { 
      content: `(Simulated Mode) Just thinking about ${topic}! It's amazing how much we can achieve when we focus. #inspiration #${topic.replace(/\s+/g, '')}` 
    };
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, engaging social media post about "${topic}". Include emojis. Return only the text content.`,
    });
    return { content: response.text?.trim() || `Post about ${topic}` };
  } catch (error) {
    console.error("Error generating mock post:", error);
    return { content: `Could not generate post about ${topic}` };
  }
};