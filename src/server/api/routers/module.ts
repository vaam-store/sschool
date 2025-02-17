import { z } from "zod";
import { CourseStatus, UserRole } from "@prisma/client";
import { ModuleCreateInputSchema } from "@app/generated/zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@app/server/api/trpc";

export const moduleRouter = createTRPCRouter({
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
        ctx.session?.user?.role === UserRole.ADMIN
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

  createModule: protectedProcedure
    .input(ModuleCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.create({
        data: input,
      });
    }),

  updateModule: protectedProcedure
    .input(ModuleCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.update({
        data: input,
        where: {
          id: input.id,
        },
      });
    }),

  updatePosition: protectedProcedure.input(
    z.array(
      z.object({
        id: z.string(),
        position: z.number(),
      }),
    ),
  ).mutation(async ({ ctx, input }) => {
    const updates = input.map(({ id, position }) =>
      ctx.db.module.update({
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
