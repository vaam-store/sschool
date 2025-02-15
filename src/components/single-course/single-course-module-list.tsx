import { listModules } from "@app/hooks/courses";
import { SingleCourseModule } from "@app/components/single-course/single-course-module";

export interface SingleCourseModuleListProps {
  courseId: string;
}

export async function SingleCourseModuleList({
  courseId,
}: SingleCourseModuleListProps) {
  const data = await listModules(courseId, 0, 200);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {data.map((module) => (
        <SingleCourseModule key={module.id} module={module} />
      ))}
    </div>
  );
}
