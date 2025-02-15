import { type Course, type Module } from "@prisma/client";

export interface EditCourseModulesProps {
  course: Course;
  modules: Module[];
}

export interface EditModuleProps {
  module?: Module;
  courseId: string;
}

export interface OnEditModuleProps {
  onEdit: (module: Module) => void;
}
