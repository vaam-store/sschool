import { Container } from "@app/components/container";
import {
  getLesson,
  type HasCourse,
  type HasLesson,
  type HasModule,
} from "@app/hooks/courses";
import { EditLessonEditor } from '@app/components/edit-course-lessons';

type ParamsProps = HasCourse & HasModule & HasLesson;

export default async function EditLessonPage({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);

  return (
    <Container>
      <h1 className="app-title">Edit Lesson</h1>

      <EditLessonEditor lesson={lesson} />
    </Container>
  );
}
