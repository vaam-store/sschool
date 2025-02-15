import { getCourse, type HasCourse } from "@app/hooks/courses";

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
