import { PageCreateInputSchema } from '@app/generated/zod';
import { CourseStatus, UserRole } from '@prisma/client';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@app/server/api/trpc';

export const pageRouter = createTRPCRouter({
  latestPages: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        page: z.number().default(0),
        size: z.number().default(10),
        parentId: z.string().or(z.null()),
      }),
    )
    .query(async ({ input, ctx }) => {
      const status =
        ctx.session?.user?.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;
      return await ctx.db.page.findMany({
        orderBy: { position: 'asc' },
        where: {
          course: {
            status,
            id: input.courseId,
          },
          parentPageId: input.parentId,
        },
        skip: input.page * input.size,
        take: input.size,
      });
    }),

  getPage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const status =
        ctx.session.user.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;

      const course = await ctx.db.page.findUnique({
        where: { id: input.id, course: { status } },
      });

      return course;
    }),

  createPage: protectedProcedure
    .input(PageCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.page.create({
        data: input,
      });
    }),

  updatePage: protectedProcedure
    .input(PageCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.page.update({
        data: input,
        where: {
          id: input.id,
        },
      });
    }),

  updatePageContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.object({}).passthrough(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.page.update({
        data: {
          content: input.content,
        },
        where: {
          id: input.id,
        },
      });
    }),

  updatePosition: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          position: z.number(),
          parentId: z.string().optional(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const updates = input.map(({ id, position, parentId }) =>
        ctx.db.page.update({
          data: {
            position,
            ...(parentId
              ? {
                  parentPage: {
                    connect: {
                      id: parentId,
                    },
                  },
                }
              : {}),
          },
          where: {
            id,
          },
        }),
      );

      return await ctx.db.$transaction(updates);
    }),
});
