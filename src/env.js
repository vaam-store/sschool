import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    AUTH_KEYCLOAK_ID: z.string(),
    AUTH_KEYCLOAK_SECRET: z.string(),
    AUTH_KEYCLOAK_ISSUER: z.string().url(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    S3_ENDPOINT: z.string(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
    S3_PORT: z.number(),
    S3_SCHEME: z.string(),
    S3_BUCKET: z.string(),
    S3_CDN_URL: z.string().url(),

    // Add session environment variables
    AUTH_SESSION_MAX_AGE: z.number().optional(),
    AUTH_SESSION_UPDATE_AGE: z.number().optional(),

    OPENAI_KEY: z.string().optional(),
    OPENAI_URL: z.string().url(),
    OPENAI_MAX_TOKENS: z.string().transform((val) => Number(val)),
    OPENAI_PAGE_DESCRIPTION_MAX_TOKEN: z
      .string()
      .transform((val) => Number(val)),
    OPENAI_PAGE_LAYOUT_MODEL: z.string(),
    OPENAI_PAGE_CONTENT_MODEL: z.string(),
    REDIS_URL: z.string().url().optional(),
    REDIS_PREFIX: z.string().optional(),
    
    PLAUSIBLE_URL: z.string().url().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_EMGR_CDN: z.string().url().optional(),
    NEXT_PUBLIC_EMGR_APP_URL: z.string().url().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID,
    AUTH_KEYCLOAK_SECRET: process.env.AUTH_KEYCLOAK_SECRET,
    AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER,
    DATABASE_URL: process.env.DATABASE_URL,

    NODE_ENV: process.env.NODE_ENV,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_PORT: Number(process.env.S3_PORT),
    S3_SCHEME: process.env.S3_SCHEME,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_CDN_URL: process.env.S3_CDN_URL,

    AUTH_SESSION_MAX_AGE: Number(process.env.AUTH_SESSION_MAX_AGE),
    AUTH_SESSION_UPDATE_AGE: Number(process.env.AUTH_SESSION_UPDATE_AGE),

    OPENAI_KEY: process.env.OPENAI_KEY,
    OPENAI_URL: process.env.OPENAI_URL,
    OPENAI_MAX_TOKENS: process.env.OPENAI_MAX_TOKENS,
    OPENAI_PAGE_LAYOUT_MODEL: process.env.OPENAI_PAGE_LAYOUT_MODEL,
    OPENAI_PAGE_CONTENT_MODEL: process.env.OPENAI_PAGE_CONTENT_MODEL,
    OPENAI_PAGE_DESCRIPTION_MAX_TOKEN:
      process.env.OPENAI_PAGE_DESCRIPTION_MAX_TOKEN,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PREFIX: process.env.REDIS_PREFIX,
    
    PLAUSIBLE_URL: process.env.PLAUSIBLE_URL,
    
    NEXT_PUBLIC_EMGR_CDN: process.env.NEXT_PUBLIC_EMGR_CDN,
    NEXT_PUBLIC_EMGR_APP_URL: process.env.NEXT_PUBLIC_EMGR_APP_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
