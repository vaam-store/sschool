import { redirect } from "next/navigation";

export default async function LectureAllModulesPage({ params }) {
  const { courseId } = await params;
  return redirect(`/courses/${courseId}`);
}
