import { type Course } from "@prisma/client";
import { Container } from "@app/components/container";

interface LectureCourseProps {
  course: Course;
}

export async function LectureCourse({ course }: LectureCourseProps) {
  return <Container>Course page: {course.name}</Container>;
}
