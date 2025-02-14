import { type Course } from "@prisma/client";
import { ArrowRight, Star } from "react-feather";
import Link from "next/link";

export interface LessonCardProps {
  course: Course;
}

export function LessonCard({ course }: LessonCardProps) {
  return (
    <div className="card outline outline-1">
      <div className="card-body">
        <div className="card-title">{course.name}</div>
        <p>{course.description}</p>
        <div className="card-actions">
          <button className="btn btn-circle btn-ghost">
            <Star />
          </button>

          <Link href={`/courses/${course.id}`}>
            <button className="btn btn-ghost" color="ghost">
              <span>View course</span>
              <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
