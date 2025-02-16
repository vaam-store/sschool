import { z } from "zod";
import { CourseStatus, UserRole } from "@prisma/client";
import { LessonCreateInputSchema } from "@app/generated/zod";

import { createTRPCRouter, protectedProcedure } from "@app/server/api/trpc";

export const lessonRouter = createTRPCRouter({
  latestLessons: protectedProcedure
    .input(
      z.object({
        moduleId: z.string(),
        page: z.number().default(0),
        size: z.number().default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const status =
        ctx.session.user.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;
      return await ctx.db.lesson.findMany({
        orderBy: { position: "asc" },
        where: {
          module: {
            id: input.moduleId,
            course: {
              status,
            },
          },
        },
        skip: input.page * input.size,
        take: input.size,
      });
    }),

  createLesson: protectedProcedure
    .input(LessonCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lesson.create({
        data: input,
      });
    }),

  updateLesson: protectedProcedure
    .input(LessonCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lesson.update({
        data: input,
        where: {
          id: input.id,
        },
      });
    }),

  updateLessonContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.object({}).passthrough(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input.content", input.content);
      return ctx.db.lesson.update({
        data: {
          content: input.content,
        },
        where: {
          id: input.id,
        },
      });
    }),

  getLesson: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
      const status =
        ctx.session.user.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;
      const found = await ctx.db.lesson.findFirst({
        where: {
          id,
          module: {
            course: { status },
          },
        },
      });

      return found ?? null;
    }),

  updatePosition: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          position: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const updates = input.map(({ id, position }) =>
        ctx.db.lesson.update({
          data: {
            position,
          },
          where: {
            id,
          },
        }),
      );

      return await ctx.db.$transaction(updates);
    }),
});
