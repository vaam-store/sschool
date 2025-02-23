import { api } from '@app/trpc/server';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const listCourses = cache(async (page = 0, size = 10) => {
  return await api.course.latestCourses({
    page,
    size,
  });
});

export const listPage = cache(
  async (
    courseId: string,
    moduleId: string | null = null,
    page = 0,
    size = 10,
  ) => {
    return await api.page.latestPages({
      page,
      size,
      courseId,
      parentId: moduleId,
    });
  },
);

export const getCourse = cache(async (id: string) => {
  const course = await api.course.getCourse({ id });

  if (!course) notFound();
  return course;
});

export const getPage = cache(async (id: string) => {
  const page = await api.page.getPage({ id });

  if (!page) notFound();
  return page;
});

export interface HasCourse {
  courseId: string;
}

export interface HasPage {
  pageId: string;
}
