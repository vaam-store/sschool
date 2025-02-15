import { getModule, type HasCourse, type HasModule } from "@app/hooks/courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<HasCourse & HasModule>;
}) {
  const { moduleId } = await params;
  const mod = await getModule(moduleId);

  return {
    title: mod.title,
  };
}

export default async function LectureModulePage({
  params,
}: {
  params: Promise<HasCourse & HasModule>;
}) {
  const { moduleId } = await params;
  const mod = await getModule(moduleId);
  return (
    <>
      Module présentation {mod.courseId} - {moduleId}
    </>
  );
}
