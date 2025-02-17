import { redirect } from "next/navigation";

export default async function LectureAllModulesPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return redirect(`/courses/${courseId}`);
}
