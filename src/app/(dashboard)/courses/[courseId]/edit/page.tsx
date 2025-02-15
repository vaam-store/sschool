import { EditCourse } from "@app/components/edit-course";
import { getCourse, type HasCourse, listModules } from "@app/hooks/courses";
import { Container } from "@app/components/container";
import { EditCourseModules } from "@app/components/edit-course-modules";

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
  const [course, modules] = await Promise.all([
    getCourse(courseId),
    listModules(courseId, 0, 10_000),
  ]);
  return (
    <>
      <Container>
        <h1 className="app-title">Edit course</h1>
      </Container>

      <div>
        <EditCourse course={course} />
      </div>

      <div className="bg-base-300">
        <EditCourseModules course={course} modules={modules} />
      </div>
    </>
  );
}
