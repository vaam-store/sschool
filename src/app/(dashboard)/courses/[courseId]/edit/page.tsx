import { EditCourse } from "@app/components/edit-course";
import { getCourse, type HasCourse } from "@app/hooks/courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<HasCourse>;
}) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  return {
    title: `${course.name} - Edit Course`,
    description: "Here you can create a new course.",
  };
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<HasCourse>;
}) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  return <EditCourse course={course} />;
}
