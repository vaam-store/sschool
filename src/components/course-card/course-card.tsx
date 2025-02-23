import { type Course } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Edit, Star } from 'react-feather';
import { twMerge } from 'tailwind-merge';

export type LessonCardProps =
  | {
      course: Course;
      canEdit?: boolean;
      disableLink?: boolean;
    }
  | {
      course: Pick<Course, 'name' | 'description' | 'meta'>;
      disableLink: true;
      canEdit?: false;
    };

export function CourseCard({ course, disableLink, canEdit }: LessonCardProps) {
  const meta = course.meta as {
    thumbnailImage: { url: string; alt: string };
    canBookmark: boolean;
  };
  return (
    <div className='card bg-base-100 card-border'>
      {meta.thumbnailImage?.url && (
        <figure className='relative h-48'>
          <Image
            fill
            className='w-full object-cover saturate-150'
            src={meta.thumbnailImage.url}
            alt={meta.thumbnailImage.alt}
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 30vw'
          />
        </figure>
      )}

      <div className='card-body'>
        <div className='card-title line-clamp-2 text-2xl font-bold tracking-wide'>
          {course.name}
        </div>
        <p className='line-clamp-3'>{course.description}</p>
        <div className='card-actions'>
          {canEdit && (
            <Link
              href={`/courses/${course.id}/edit`}
              className='btn btn-circle btn-soft btn-primary'>
              <Edit />
            </Link>
          )}

          {meta.canBookmark && (
            <button className='btn btn-circle btn-soft btn-accent'>
              <Star />
            </button>
          )}

          {disableLink && (
            <button className='btn btn-soft btn-primary' color='ghost'>
              <span>View course</span>
              <ArrowRight />
            </button>
          )}

          {!disableLink && (
            <Link href={`/courses/${course.id}`}>
              <button
                className={twMerge('btn btn-soft btn-primary', [
                  canEdit && 'btn-circle',
                ])}
                color='ghost'>
                <span className={twMerge('', [canEdit && 'hidden'])}>
                  View course
                </span>
                <ArrowRight />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
