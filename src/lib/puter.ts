export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const PUTER_MODELS = [
  'gemini-3.1-flash-lite-preview',
  'gemini-3-flash-preview',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
];



const buildPrompt = (messages: ChatMessage[]): string => {
  return messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n\n');
};
const PUTER_MODELS = ['google/gemini-2.0-flash-lite', 'google/gemini-2.0-flash'];

const extractText = (response: any): string => {
  if (!response) return '';
  if (typeof response === 'string') return response.trim();
  if (typeof response?.message?.content === 'string') return response.message.content.trim();
  if (typeof response?.content === 'string') return response.content.trim();
  if (typeof response?.text === 'string') return response.text.trim();
  if (Array.isArray(response?.choices) && typeof response.choices[0]?.message?.content === 'string') {
    return response.choices[0].message.content.trim();
  }
  if (Array.isArray(response?.output)) {
    const combined = response.output
      .map((item: any) => item?.content || item?.text || '')
      .filter(Boolean)
      .join('\n')
      .trim();
    return combined;
  }
  return '';
};

export const isPuterAvailable = (): boolean => {
  return typeof window !== 'undefined' && Boolean((window as any).puter?.ai?.chat);
};

export const callPuterGemini = async (messages: ChatMessage[]): Promise<string> => {
  const puter = (window as any).puter;
  if (!puter?.ai?.chat) {
    throw new Error('Puter SDK is not available');
  }

  const prompt = buildPrompt(messages);
  const prompt = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n\n');

  let lastError: unknown;

  for (const model of PUTER_MODELS) {
    try {
      const response = await puter.ai.chat(prompt, { model });
      const text = extractText(response);
      if (!text) {
        throw new Error(`Puter returned empty content (model=${model})`);
      }
      return text;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Puter chat failed');
};


export const streamPuterGemini = async function* (
  messages: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  const puter = (window as any).puter;
  if (!puter?.ai?.chat) {
    throw new Error('Puter SDK is not available');
  }

  const prompt = buildPrompt(messages);
  let lastError: unknown;

  for (const model of PUTER_MODELS) {
    try {
      const response = await puter.ai.chat(prompt, { model, stream: true });
      let emitted = false;

      for await (const part of response) {
        const text = extractText(part);
        if (text) {
          emitted = true;
          yield text;
        }
      }

      if (!emitted) {
        throw new Error(`Puter stream returned empty content (model=${model})`);
      }

      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Puter stream chat failed');
};
