"use client";

import { api } from "@app/trpc/react";
import Link from "next/link";
import { ArrowRight } from "react-feather";

export interface LectureLessonListProps {
  moduleId: string;
  courseId: string;
}

export function LectureLessonList({
  moduleId,
  courseId,
}: LectureLessonListProps) {
  const [lessons] = api.lesson.latestLessons.useSuspenseQuery({
    moduleId,
    page: 0,
    size: 10_000,
  });

  return (
    <div className="list">
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          className="list-row hover:bg-base-300 flex flex-row justify-between"
          href={`/lectures/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}
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
