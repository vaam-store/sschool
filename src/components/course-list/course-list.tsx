import { UserRole } from "@prisma/client";
import { CourseCard } from "@app/components/course-card";
import { auth } from "@app/server/auth";
import { listCourses } from "@app/hooks/courses";

export async function CourseList() {
  const courses = await listCourses(0, 10);
  const session = await auth();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
