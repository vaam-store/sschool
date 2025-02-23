import { Container } from '@app/components/container';
import { Editor } from '@app/components/editor';
import { type OutputData } from '@editorjs/editorjs';
import { type Course, type Page } from '@prisma/client';

interface LecturePageProps {
  page: Page;
  course: Course;
}

export async function LecturePage({ page }: LecturePageProps) {
  return (
    <Container>
      <Editor readOnly initialData={page.content as unknown as OutputData} />
    </Container>
  );
}
