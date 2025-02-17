import { redirect } from "next/navigation";

export default async function LectureAllModulesPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const { courseId, moduleId } = await params;
  return redirect(`/courses/${courseId}/modules/${moduleId}`);
}
