import { listPage } from "@app/hooks/courses";
import { SingleCoursePage } from "./single-course-parent";

export interface SingleCourseModuleListProps {
  courseId: string;
}

export async function SingleCourseModuleList({
  courseId,
}: SingleCourseModuleListProps) {
  const data = await listPage(courseId, null, 0, 200);

  return (
    <div className="list">
      {data.map((parent) => (
        <div key={parent.id} className="list-row">
          <SingleCoursePage page={parent} />
        </div>
      ))}
    </div>
  );
}
