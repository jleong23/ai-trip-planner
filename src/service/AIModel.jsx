// src/lib/AIModel.jsx (or wherever your AI model logic lives)
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

const model = 'gemini-2.5-pro';

const config = {
  thinkingConfig: {
    thinkingBudget: -1,
  },
};

export const chatSession = {
  async sendMessage(prompt) {
    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text || '';
    }

    return result;
  },
};
