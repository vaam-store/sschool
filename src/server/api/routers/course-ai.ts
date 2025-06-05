import { z } from 'zod';

import { env } from '@app/env';
import { adminProcedure, createTRPCRouter } from '@app/server/api/trpc';
import { type Page, PageType } from '@prisma/client';
import { streamText } from 'ai';

const endMarkers = '###====###';

export const courseAiRouter = createTRPCRouter({
  // Generate a course overview plan in a JSON format
  genCoursePlan: adminProcedure
    .input(
      z.object({
        course_id: z.string(),
        max_lessons: z.number(),
      }),
    )
    .mutation(async function* ({ input, ctx }) {
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
      const { textStream } = streamText({
        model: ctx.openAiClient.pageLayoutModel,
        messages: [{ role: 'user', content: layoutPrompt }],
        maxTokens: env.OPENAI_MAX_TOKENS,
      });

      const pages: Page[] = [];
      let currentIndex = 0;
      for await (const item of textStream) {
        if (item == '\n') {
          // It's a new title
          currentIndex += 1;
          continue;
        }

        if (item.includes('\n')) {
          const newLineSplits = item.split('\n');

          for (let i = 0; i < newLineSplits.length; i++) {
            const line = newLineSplits[i]!;
            pages[i] = {
              ...pages[i],
              title: line,
              content: '{}',
              description: '',
              type: PageType.ARTICLE,
              position: i,
              courseId: course.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Page;

            yield pages;
          }

          continue;
        }

        pages[currentIndex] = {
          ...pages[currentIndex],
          title: (pages?.[currentIndex]?.title ?? '') + item,
          content: '{}',
          description: '',
          type: PageType.ARTICLE,
          position: currentIndex,
          courseId: course.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Page;
        yield pages;
      }

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const pagePrompt = `
        Generate a simple, clear, concise and funny description for a course page titled "${page?.title}" based on the course description: ${courseDescription}.
        
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

        const { textStream: pageResponse } = streamText({
          model: ctx.openAiClient.pageLayoutModel,
          messages: [{ role: 'user', content: pagePrompt }],
          maxTokens: env.OPENAI_PAGE_DESCRIPTION_MAX_TOKEN,
        });

        for await (const item of pageResponse) {
          pages[i] = {
            ...pages[i],
            description: (pages[i]?.description ?? '') + item,
          } as Page;
          yield pages;
        }
      }
    }),

  // Generate a course page, in a JSON format
  genCourseLesson: adminProcedure
    .input(
      z.object({
        course_id: z.string(),
        page_id: z.string(),
      }),
    )
    .mutation(async function* ({ input, ctx }) {
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
      - You can use Mermaid diagrams. Use it also to illustrate practical examples.
      
      `.trim();

      let fullContent = '';
      let isComplete = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!isComplete && attempts < maxAttempts) {
        const currentPrompt =
          attempts === 0
            ? contentPrompt
            : `Continue the following content: ${fullContent}\n\nRemaining content should:${contentPrompt.split('Content:')[1]}`;

        const { textStream: contentResponse } = streamText({
          model: ctx.openAiClient.pageContentModel,
          messages: [{ role: 'user', content: currentPrompt }],
          maxTokens: env.OPENAI_MAX_TOKENS * 4,
          temperature: 0.7,
          // Add stop sequences to detect completion
          stopSequences: [endMarkers],
        });

        let newContent = '';
        for await (const item of contentResponse) {
          newContent += item;
          fullContent += (attempts === 0 ? '' : '\n') + item;
          yield fullContent;
        }

        // Check if response is complete (ends with a concluding marker or is significantly sized)
        isComplete =
          newContent.length < env.OPENAI_MAX_TOKENS * 4 * 0.9 || // Response is significantly shorter than max
          newContent.endsWith('.') || // Ends with a period
          attempts === maxAttempts - 1; // Last attempt

        attempts++;
      }
    }),
});
