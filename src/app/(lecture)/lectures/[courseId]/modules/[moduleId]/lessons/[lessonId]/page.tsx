import { HydrateClient } from "@app/trpc/server";
import {
  getLesson,
  type HasCourse,
  type HasLesson,
  type HasModule,
} from "@app/hooks/courses";
import { Editor } from "@app/components/editor";
import type { OutputData } from "@editorjs/editorjs";
import { Container } from "@app/components/container";

type ParamsProps = HasCourse & HasModule & HasLesson;

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);

  return {
    title: lesson.title,
  };
}

export default async function LectureLessonPage({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);

  return (
    <HydrateClient>
      <Container>
        <Editor
          readOnly
          initialData={lesson.content as unknown as OutputData}
        />
      </Container>
    </HydrateClient>
  );
}
