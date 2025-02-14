import { useListModules } from "@openapi/queries";
import { type Module } from "@prisma/client";

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

export function SingleCourseModuleList({
  courseId,
}: SingleCourseModuleListProps) {
  const { error, data, isPending } = useListModules({
    query: {
      courseId: courseId,
      limit: 5,
      offset: 0,
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner" />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {data!.items.map((module) => (
        <SingleCourseModule key={module.id} module={module} />
      ))}
    </div>
  );
}
