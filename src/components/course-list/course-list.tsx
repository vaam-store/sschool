import { CourseCard } from '@app/components/course-card';
import { listCourses } from '@app/hooks/courses';
import { auth } from '@app/server/auth';
import { UserRole } from '@prisma/client';

export async function CourseList() {
  const courses = await listCourses(0, 10);
  const session = await auth();
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {courses.map((course) => (
        <CourseCard
          canEdit={session?.user.role === UserRole.ADMIN}
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
}
