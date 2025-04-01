import { Container } from '@app/components/container';
import { markdownToHtml } from '@app/server/md/converter';
import { type Course, type Page } from '@prisma/client';

interface LecturePageProps {
  page: Page;
  course: Course;
}

export async function LecturePage({ page }: LecturePageProps) {
  const html = await markdownToHtml(page.content);

  return (
    <Container>
      {html && (
        <article
          className='prose prose-neutral lg:prose-xl mx-auto'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </Container>
  );
}
