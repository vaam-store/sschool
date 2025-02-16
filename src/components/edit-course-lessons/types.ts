import { type Course, type Lesson } from "@prisma/client";

export interface EditCourseLessonsProps {
  course: Course;
}

export interface EditLessonProps {
  lesson?: Lesson;
  moduleId: string;
  nextPosition: number;
  onEdit: (lesson: Lesson) => void;
}