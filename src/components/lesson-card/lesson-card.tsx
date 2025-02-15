import { type Course } from "@prisma/client";
import { ArrowRight, Edit, List, Star } from "react-feather";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export type LessonCardProps =
  | {
      course: Course;
      canEdit?: boolean;
      disableLink?: boolean;
    }
  | {
      course: Pick<Course, "name" | "description" | "meta">;
      disableLink: true;
      canEdit?: false;
    };

export function LessonCard({ course, disableLink, canEdit }: LessonCardProps) {
  const meta = course.meta as Record<string, any>;
  return (
    <div className="card bg-base-100 outline outline-1">
      {meta.thumbnailImage?.url && (
        <figure className="relative h-48">
          <Image
            fill
            objectFit="cover"
            className="w-full saturate-150"
            src={meta.thumbnailImage.url}
            alt={meta.thumbnailImage.alt}
          />
        </figure>
      )}

      <div className="card-body">
        <div className="card-title line-clamp-2">{course.name}</div>
        <p className="line-clamp-3">{course.description}</p>
        <div className="card-actions">
          {canEdit && (
            <Link
              href={`/courses/${course.id}/edit`}
              className="btn btn-circle btn-ghost"
            >
              <Edit />
            </Link>
          )}
          {canEdit && (
            <Link
              href={`/courses/${course.id}/edit`}
              className="btn btn-circle btn-ghost"
            >
              <List />
            </Link>
          )}

          {meta.canBookmark && (
            <button className="btn btn-circle btn-ghost">
              <Star className="text-accent" />
            </button>
          )}

          {disableLink && (
            <button className="btn btn-ghost" color="ghost">
              <span className="text-primary">View course</span>
              <ArrowRight className="text-primary" />
            </button>
          )}

          {!disableLink && (
            <Link href={`/courses/${course.id}`}>
              <button
                className={twMerge("btn btn-ghost", [canEdit && "btn-circle"])}
                color="ghost"
              >
                <span
                  className={twMerge("text-primary", [canEdit && "hidden"])}
                >
                  View course
                </span>
                <ArrowRight className="text-primary" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
