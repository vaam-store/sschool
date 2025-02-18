"use client";

import { api } from "@app/trpc/react";
import Link from "next/link";
import { ArrowRight } from "react-feather";

export interface LectureLessonListProps {
  parentId: string;
  courseId: string;
}

export function LectureLessonList({
  parentId,
  courseId,
}: LectureLessonListProps) {
  const [lessons] = api.page.latestPages.useSuspenseQuery({
    page: 0,
    size: 10_000,
    courseId,
    parentId,
  });

  return (
    <div className="list">
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          className="list-row hover:bg-base-300 flex flex-row justify-between"
          href={`/lectures/${courseId}/${parentId}/${lesson.id}`}
        >
          <div className="line-clamp-2 font-thin tracking-tight">
            {lesson.title}
          </div>
          <ArrowRight className="opacity-50" />
        </Link>
      ))}
    </div>
  );
}
