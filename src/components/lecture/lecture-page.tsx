import { Container } from '@app/components/container';
import { markdownToHtml } from '@app/server/md/converter';
import { type Course, type Page } from '@prisma/client';
import { LectureContent } from './lecture-content';

interface LecturePageProps {
  page: Page;
  course: Course;
}

export async function LecturePage({ page }: LecturePageProps) {
  const html = await markdownToHtml(page.content);

  return <Container>{html && <LectureContent html={html} />}</Container>;
}
