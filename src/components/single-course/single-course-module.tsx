import { type Module } from "@prisma/client";
import { listModules } from "@app/hooks/courses";

export interface SingleCourseModuleProps {
  module: Module;
}

export function SingleCourseModule({ module }: SingleCourseModuleProps) {
  return (
    <div className="card outline outline-1">
      <div className="card-body">
        <div className="card-title">{module.title}</div>
        <p>{module.description}</p>
      </div>
    </div>
  );
}

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
