import { Container } from '@app/components/container';
import { type Course } from '@prisma/client';

interface LectureCourseProps {
  course: Course;
}

export async function LectureCourse({ course }: LectureCourseProps) {
  return <Container>Course page: {course.name}</Container>;
}
