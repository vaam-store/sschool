import { listModules } from "@app/hooks/courses";
import { SingleCourseModule } from "./single-course-module";

export interface SingleCourseModuleListProps {
  courseId: string;
}

export async function SingleCourseModuleList({
  courseId,
}: SingleCourseModuleListProps) {
  const data = await listModules(courseId, 0, 200);

  return (
    <div className="list">
      {data.map((module) => (
        <div key={module.id} className='list-row'>
          <SingleCourseModule module={module} />
        </div>
      ))}
    </div>
  );
}
