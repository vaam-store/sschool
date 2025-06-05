import 'server-only';

import { createOpenAI } from '@ai-sdk/openai';
import { env } from '@app/env';

// This is a singleton client for OpenAI API.
const createOpenAiClient = () => {
  const openai = createOpenAI({
    compatibility: 'compatible',
    baseURL: env.OPENAI_URL,
    apiKey: env.OPENAI_KEY,
  });

  return {
    pageLayoutModel: openai(env.OPENAI_PAGE_LAYOUT_MODEL),
    pageContentModel: openai(env.OPENAI_PAGE_CONTENT_MODEL),
  };
};

// This is a singleton client for OpenAI API.
const globalForOpenAI = globalThis as unknown as {
  openAiClient: ReturnType<typeof createOpenAiClient> | undefined;
};

// This is a singleton client for OpenAI API.
export const openAiClient =
  globalForOpenAI.openAiClient ?? createOpenAiClient();

if (env.NODE_ENV !== 'production') globalForOpenAI.openAiClient = openAiClient;
