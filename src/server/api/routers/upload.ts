import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@app/server/api/trpc';
import { createPresignedPostUrl } from '@app/server/s3';

export const uploadRouter = createTRPCRouter({
  getUploadUrl: protectedProcedure
    .input(z.object({
      filename: z.string()
    }))
    .output(z.object({
      url: z.string().url(),
      publicUrl: z.string().url()
    }))
    .mutation(async ({ input }) => {
      const { filename } = input;
      const { url, publicUrl } = await createPresignedPostUrl(filename);
      return { url, publicUrl };
    })
});