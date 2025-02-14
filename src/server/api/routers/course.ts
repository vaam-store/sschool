import { z } from "zod";
import { CourseStatus, UserRole } from "@prisma/client";
import { CourseCreateInputSchema } from "@app/generated/zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@app/server/api/trpc";

export const courseRouter = createTRPCRouter({
  latestCourses: publicProcedure
    .input(
      z.object({
        page: z.number().default(0),
        size: z.number().default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.course.findMany({
        orderBy: { createdAt: "desc" },
        where: { status: CourseStatus.PUBLISHED },
        skip: input.page * input.size,
        take: input.size,
      });
    }),

  latestModules: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        page: z.number().default(0),
        size: z.number().default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const status =
        ctx.session.user.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;
      return await ctx.db.module.findMany({
        orderBy: { position: "asc" },
        where: {
          course: {
            status,
            id: input.courseId,
          },
        },
        skip: input.page * input.size,
        take: input.size,
      });
    }),

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
            id: input.courseId,
            course: {
              status,
            },
          },
        },
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
        ctx.session.user.role === UserRole.ADMIN
          ? undefined
          : CourseStatus.PUBLISHED;
      const course = await ctx.db.course.findUnique({
        where: { status, id: input.id },
      });

      return course;
    }),

  getModule: protectedProcedure
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

      const course = await ctx.db.module.findUnique({
        where: { id: input.id, course: { status } },
      });

      return course;
    }),

  create: protectedProcedure
    .input(CourseCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.course.findFirst({
      orderBy: { createdAt: "desc" },
      where: { status: CourseStatus.PUBLISHED },
    });

    return courses ?? null;
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
});
