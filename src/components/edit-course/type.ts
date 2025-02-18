import { type Course } from "@prisma/client";

export interface EditCourseProps {
  course?: Course;
  large?: boolean;
}
