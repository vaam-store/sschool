import type { Page, Course } from "@prisma/client";
export interface EditCoursePagesProps {
  course: Course;
}

export interface EditPageProps {
  page?: Page;
  parentPageId?: string;
  courseId: string;
  nextPosition: number;
  onEdit: (subPage: Page) => void;
}