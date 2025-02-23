"use client";

import { api } from "@app/trpc/react";
import Link from "next/link";
import { ArrowRight } from "react-feather";
import { PageListItem } from "@app/components/page-list-item";

export interface LectureLessonListProps {
  parentId: string;
  courseId: string;
}

export function LectureLessonList({
  parentId,
  courseId,
}: LectureLessonListProps) {
  const [pages] = api.page.latestPages.useSuspenseQuery({
    page: 0,
    size: 10_000,
    courseId,
    parentId,
  });

  return (
    <div className="list">
    </div>
  );
}
