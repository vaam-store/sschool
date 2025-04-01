import { z } from 'zod';

import { env } from '@app/env';
import { adminProcedure, createTRPCRouter } from '@app/server/api/trpc';
import { Page, PageType } from '@prisma/client';

export const courseAiRouter = createTRPCRouter({
  // Generate a course overview plan in a JSON format
  genCoursePlan: adminProcedure
    .input(
      z.object({
        course_id: z.string(),
        max_lessons: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const course = await ctx.db.course.findUnique({
        where: { id: input.course_id },
        include: {
          pages: true,
        },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      // Step 1: Use the course description to generate a course layout
      const courseDescription = course.description;
      const layoutPrompt = `
      Generate a list of course titles based on the following description: ${courseDescription}.
      
      - They should be short and concise.
      - They should follow each other naturally.
      - They should should be at least ${input.max_lessons} items.
      - No formatting.
      - No emojis.
      - No markdown.
      - No HTML.
      - No bold.
      - No italic.
      - No underline.
      - No strikethrough.
      - No quotes.
      - No links.
      - Only a single item per line.
      - No introduction.
      - No conclusion.
      - No explanation.
      `.trim();
      const layoutResponse = await ctx.openAiClient.chat.completions.create({
        model: env.OPENAI_PAGE_LAYOUT_MODEL,
        messages: [{ role: 'user', content: layoutPrompt }],
        max_tokens: env.OPENAI_MAX_TOKENS,
        n: 1,
      });

      const titles =
        layoutResponse.choices?.[0]?.message?.content
          ?.trim()
          .split('\n')
          .filter((title) => title.length > 0)
          .map((title) => title.trim()) || [];

      // Step 2: Generate pages for each title
      const pages = await Promise.all(
        titles.map(async (title, idx) => {
          const pagePrompt = `
        Generate a simple, clear, concise and funny description for a course page titled "${title}" based on the course description: ${courseDescription}.
        
        - You might use emojis.
        - No markdown.
        - No HTML.
        - No bold.
        - No italic.
        - No underline.
        - No strikethrough.
        - No links.
        - No introduction.
        - No conclusion.
        - No explanation.
        `.trim();

          const [pageResponse] = await Promise.all([
            ctx.openAiClient.chat.completions.create({
              model: env.OPENAI_PAGE_CONTENT_MODEL,
              messages: [{ role: 'user', content: pagePrompt }],
              max_tokens: env.OPENAI_PAGE_DESCRIPTION_MAX_TOKEN,
              n: 1,
            }),
          ]);

          const description =
            pageResponse.choices?.[0]?.message?.content?.trim() || '';

          return {
            title: title,
            description: description,
            content: '{}',
            type: PageType.ARTICLE,
            position: idx,
            courseId: course.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as Page;
        }),
      );

      return pages satisfies Page[];
    }),

  // Generate a course page, in a JSON format
  genCourseLesson: adminProcedure
    .input(
      z.object({
        course_id: z.string(),
        page_id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const course = await ctx.db.course.findUnique({
        where: { id: input.course_id },
        include: {
          pages: true,
        },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      const page = course.pages.find((p) => p.id === input.page_id);

      if (!page) {
        throw new Error('Page not found');
      }

      const otherTitles = course.pages
        .filter((p) => p.id !== page.id)
        .map((p) => `"${p.title}"`)
        .join(', ');

      let parentTitles = '';

      // Traverse the parent tree to gather descriptions if a parent exists
      let currentPage: Page | undefined = page;
      while (currentPage?.parentPageId) {
        currentPage = course.pages.find(
          (p) => p.id === currentPage?.parentPageId,
        );

        if (currentPage) {
          parentTitles = `"${currentPage.title}" > ${parentTitles}`;
        }
      }

      const contentPrompt =
        `Generate detailed content in Markdown format for the lesson page titled "${page.title}".
      
      ${parentTitles.length > 0 ? `Use the following titles of parent pages for context: ${parentTitles}` : ''}
      
      Course Description: ${course.description}.

      - Skip the following topics: ${otherTitles}.
      - No introduction.
      - No conclusion.
      - With explanations.
      - With examples.
      - With code snippets.
      - With links to external sources.
      - Focused on the title.
      - This is not a blog post, it is a lesson page.
      - This is not a course overview, it is a lesson page.
      - This is not a course description, it is a lesson page.
      - This is not a course introduction, it is a lesson page.
      - This is not a course conclusion, it is a lesson page.
      - This is not a course summary, it is a lesson page.
      - This should be detailed and comprehensive.
      - This shall be written in a way that is easy to understand.
      - This shall be written in a way that is engaging and interesting.
      - This shall be written in a way that is easy to follow.
      - This shall be written in a way that is easy to implement.
      - This shall be written in a way that is easy to remember.
      - This shall be written in a way that is easy to apply.
      - This shall be long enough to be a lesson.
      
      `.trim();

      const contentResponse = await ctx.openAiClient.chat.completions.create({
        model: env.OPENAI_PAGE_CONTENT_MODEL,
        messages: [{ role: 'user', content: contentPrompt }],
        max_tokens: env.OPENAI_MAX_TOKENS * 4,
        n: 1,
      });

      return contentResponse.choices?.[0]?.message?.content?.trim() || '';
    }),
});
