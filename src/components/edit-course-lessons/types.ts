import type { Course, Page } from '@prisma/client';
export interface EditCoursePagesProps {
  course: Course;
}

export interface GenerateCourseLayoutProps {
  courseId: string;
  onEdit: (pages: Page[]) => void;
}

export interface EditPageProps {
  page?: Page;
  parentPageId?: string;
  courseId: string;
  nextPosition: number;
  onEdit: (subPage: Page) => void;
}
