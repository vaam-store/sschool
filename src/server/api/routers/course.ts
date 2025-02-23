import { CourseCreateInputSchema } from '@app/generated/zod';
import { CourseStatus, UserRole } from '@prisma/client';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@app/server/api/trpc';
import { TRPCError } from '@trpc/server';

export const courseRouter = createTRPCRouter({
  getCourseForDownload: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== UserRole.ADMIN) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return await ctx.db.course.findUnique({
        where: { id: input.id },
        include: {
          pages: true,
        },
      });
    }),

  latestCourses: publicProcedure
    .input(
      z.object({
        page: z.number().default(0),
        size: z.number().default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const status =
        ctx.session?.user?.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;

      return await ctx.db.course.findMany({
        orderBy: { createdAt: 'desc' },
        where: { status },
        skip: input.page * input.size,
        take: input.size,
      });
    }),

  getCourse: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const status =
        ctx.session?.user?.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;
      const course = await ctx.db.course.findUnique({
        where: { status, id: input.id },
      });

      return course;
    }),

  createCourse: protectedProcedure
    .input(CourseCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.create({
        data: input,
      });
    }),

  updateCourse: protectedProcedure
    .input(CourseCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.update({
        data: input,
        where: {
          id: input.id,
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.course.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { status: CourseStatus.PUBLISHED },
    });

    return courses ?? null;
  }),
});
