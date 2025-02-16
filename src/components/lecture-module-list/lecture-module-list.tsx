"use client";

import { api } from "@app/trpc/react";
import Link from "next/link";
import { LectureLessonList } from "./lecture-lesson-list";
import { Suspense } from "react";

export interface LectureModuleListProps {
  courseId: string;
}

export function LectureModuleList({ courseId }: LectureModuleListProps) {
  const [modules] = api.module.latestModules.useSuspenseQuery({
    courseId,
    page: 0,
    size: 10_000,
  });

  return (
    <>
      {modules.map((module) => (
        <div key={module.id}>
          <Link href={`/lectures/${courseId}/modules/${module.id}`}>
            <div className="line-clamp-2 text-2xl font-thin tracking-wide">
              {module.title}
            </div>
          </Link>

          <Suspense fallback={<span className="loading loading-sm" />}>
            <LectureLessonList
              key={module.id}
              moduleId={module.id}
              courseId={courseId}
            />
          </Suspense>
        </div>
      ))}
    </>
  );
}
