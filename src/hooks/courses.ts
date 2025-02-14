import { cache } from "react";
import { notFound } from "next/navigation";
import { api } from "@app/trpc/server";

export const getCourse = cache(async (id: string) => {
  const course = await api.course.getCourse({ id });

  if (!course) notFound();
  return course;
});

export const getModule = cache(async (id: string) => {
  const mod = await api.course.getModule({ id });

  if (!mod) notFound();
  return mod;
});

export const getLesson = cache(async (id: string) => {
  const lesson = await api.course.getLesson({ id });

  if (!lesson) notFound();
  return lesson;
});


export interface HasCourse {
  courseId: string;
}

export interface HasModule {
  moduleId: string;
}

export interface HasLesson {
  lessonId: string;
}