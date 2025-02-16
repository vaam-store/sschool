import { EditCourse } from "@app/components/edit-course";
import { getCourse, type HasCourse } from "@app/hooks/courses";
import { Container } from "@app/components/container";
import { EditCourseModules } from "@app/components/edit-course-modules";
import { EditCourseLessons } from "@app/components/edit-course-lessons";
import { UploadCourse } from "@app/components/downloads/upload-course";

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
  return (
    <>
      <Container className="flex flex-row gap-4">
        <h1 className="app-title">Edit course</h1>
        <UploadCourse courseId={course.id} />
      </Container>

      <div className="pb-8">
        <EditCourse course={course} />
      </div>

      <div className="bg-base-300 py-8">
        <EditCourseModules course={course} />
      </div>

      <div className="bg-base-200 py-8">
        <EditCourseLessons course={course} />
      </div>
    </>
  );
}
