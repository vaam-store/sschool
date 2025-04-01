import 'server-only';

import { env } from '@app/env';
import OpenAI from 'openai';

// This is a singleton client for OpenAI API.
const createOpenAiClient = () =>
  new OpenAI({
    apiKey: env.OPENAI_KEY,
    baseURL: env.OPENAI_URL,
  });

// This is a singleton client for OpenAI API.
const globalForOpenAI = globalThis as unknown as {
  openAiClient: ReturnType<typeof createOpenAiClient> | undefined;
};

// This is a singleton client for OpenAI API.
export const openAiClient =
  globalForOpenAI.openAiClient ?? createOpenAiClient();

if (env.NODE_ENV !== 'production') globalForOpenAI.openAiClient = openAiClient;
