import { api, HydrateClient } from "@app/trpc/server";
import {
  getLesson,
  type HasCourse,
  type HasLesson,
  type HasModule,
} from "@app/hooks/courses";

type ParamsProps = HasCourse & HasModule & HasLesson;

export async function generateStaticParams() {
  const courses = await api.course.latestCourses({
    page: 0,
    size: 10_000,
  });

  const modules = (
    await Promise.all(
      courses.map((course) =>
        api.course.latestModules({
          page: 0,
          size: 10_000,
          courseId: course.id,
        }),
      ),
    )
  ).flatMap((i) => i);

  const lessons = await Promise.all(
    modules.map((module) =>
      api.course
        .latestLessons({
          page: 0,
          size: 10_000,
          moduleId: module.id,
        })
        .then((lessons) =>
          lessons.map(
            (lesson) =>
              ({
                moduleId: module.id,
                courseId: module.courseId,
                lessonId: lesson.id,
              }) satisfies ParamsProps,
          ),
        ),
    ),
  );

  return lessons.flatMap((i) => i);
}

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
