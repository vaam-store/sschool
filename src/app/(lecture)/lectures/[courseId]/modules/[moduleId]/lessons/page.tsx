import { redirect } from "next/navigation";

export default async function LectureAllModulesPage({ params }) {
  const { courseId, moduleId } = await params;
  return redirect(`/courses/${courseId}/modules/${moduleId}`);
}
