import { LectureCourse, LecturePage } from '@app/components/lecture';
import { getCourse, getPage } from '@app/hooks/courses';
import { HydrateClient } from '@app/trpc/server';

interface Props {
  params: Promise<{ slug?: string[]; courseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, courseId } = await params;
  const course = await getCourse(courseId);
  const lastId = slug?.[slug.length - 1];
  if (!lastId) {
    // We're on the course page
    return {
      title: `${course.name} | Learn`,
    };
  }

  const page = await getPage(lastId);
  return {
    title: `${page.title} | Learn`,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug, courseId } = await params;
  const course = await getCourse(courseId);
  const lastId = slug?.[slug.length - 1];

  if (lastId) {
    const lastPage = await getPage(lastId);
    return (
      <HydrateClient>
        <LecturePage course={course} page={lastPage} />
      </HydrateClient>
    );
  }

  return (
    <HydrateClient>
      <LectureCourse course={course} />
    </HydrateClient>
  );
}
