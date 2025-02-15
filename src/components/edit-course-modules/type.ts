import { type Course, type Module } from "@prisma/client";

export interface EditCourseModulesProps {
  course: Course;
  modules: Module[];
}