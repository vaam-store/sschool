import { type Course } from "@prisma/client";
import { LessonCard } from "@app/components/lesson-card";

export interface SchoolListProps {
  data: Array<Course>;
}

export function SchoolList({ data }: SchoolListProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((course) => (
        <LessonCard key={course.id} course={course} />
      ))}
    </div>
  );
}
