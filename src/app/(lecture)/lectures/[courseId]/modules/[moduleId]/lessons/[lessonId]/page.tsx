import { HydrateClient } from "@app/trpc/server";
import {
  getLesson,
  type HasCourse,
  type HasLesson,
  type HasModule,
} from "@app/hooks/courses";

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
      Some lesson content page: Created at {lesson.createdAt}
    </HydrateClient>
  );
}
