import { api } from "@app/trpc/server";
import { getModule, type HasCourse, type HasModule } from "@app/hooks/courses";

export async function generateStaticParams() {
  const courses = await api.course.latestCourses({
    page: 0,
    size: 10_000,
  });
  const modules = await Promise.all(
    courses.map((course) =>
      api.course.latestModules({
        page: 0,
        size: 10_000,
        courseId: course.id,
      }),
    ),
  );

  return modules
    .flatMap((i) => i)
    .map(
      (mod) =>
        ({
          courseId: mod.courseId,
          moduleId: mod.id,
        }) satisfies HasCourse & HasModule,
    );
}

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
