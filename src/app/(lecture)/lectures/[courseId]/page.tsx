import { api } from "@app/trpc/server";
import { getCourse, type HasCourse } from "@app/hooks/courses";

export async function generateStaticParams() {
  const courses = await api.course.latestCourses({
    page: 0,
    size: 10_000,
  });

  return courses?.map((course) => ({
    courseId: course.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<HasCourse>;
}) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  return {
    title: course.name,
  };
}

export default async function LectureCoursePage({
  params,
}: {
  params: Promise<HasCourse>;
}) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  return <>Course lecture {course.id}</>;
}
