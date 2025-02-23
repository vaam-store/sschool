import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";
import icon from "@app/components/icon.svg";
import { ArrowLeft, Edit3, Menu } from "react-feather";
import Link from "next/link";
import ThemeToggle from "@app/components/theme";
import Image from "next/image";
import { getCourse, type HasCourse } from "@app/hooks/courses";
import { LecturePageList } from "@app/components/lecture-module-list";
import { Suspense } from "react";
import { LecturePageListSkeleton } from "@app/components/skeleton";
import { UserRole } from "@prisma/client";

export default async function LectureLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<HasCourse> }>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  const isAdmin = session.user.role === UserRole.ADMIN;

  const { courseId } = await params;
  const course = await getCourse(courseId);
  const meta = course.meta as {
    thumbnailImage: { url: string; alt: string };
  };

  return (
    <div id="lecture">
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="navbar bg-base-300 w-full lg:hidden">
            <div className="navbar-start flex flex-row items-center gap-4">
              <label
                htmlFor="drawer"
                className="btn drawer-button btn-ghost btn-soft btn-circle"
              >
                <Menu />
              </label>

              <Link className="btn btn-ghost btn-soft btn-circle" href="/">
                <Image src={icon} className="w-8" alt="logo" />
              </Link>
            </div>
            <div className="navbar-end">
              <ThemeToggle />
            </div>
          </nav>

          {children}
        </div>

        <div className="drawer-side z-40">
          <label
            htmlFor="drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />

          <div className="bg-base-200 text-base-content flex min-h-full w-80 flex-col gap-4">
            <div className="bg-base-200 border-b-base-300 sticky top-0 z-10 flex flex-row justify-between border-b-2 px-4 py-2">
              <Link
                className="btn btn-ghost btn-soft btn-circle"
                href={`/courses/${courseId}`}
              >
                <ArrowLeft />
              </Link>

              <div className="flex flex-row gap-4">
                <ThemeToggle />

                {isAdmin && (
                  <Link
                    href={`/courses/${courseId}/edit`}
                    className="btn btn-soft btn-circle btn-accent"
                  >
                    <Edit3 />
                  </Link>
                )}

                <Link className="btn btn-ghost btn-soft btn-circle" href="/">
                  <Image src={icon} className="w-8" alt="logo" />
                </Link>
              </div>
            </div>

            <div className="list min-h-full overflow-y-scroll pb-2">
              <Link
                href={`/lectures/${courseId}`}
                className="list-row flex flex-row items-center gap-4 hover:cursor-pointer"
              >
                <div className="relative hidden size-10 md:block">
                  <Image
                    fill
                    className="rounded-box object-cover"
                    src={meta.thumbnailImage.url}
                    alt={meta.thumbnailImage.alt}
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 5vw"
                  />
                </div>
                <h3 className="line-clamp-2 font-thin tracking-wide md:text-2xl">
                  {course.name}
                </h3>
              </Link>

              <Suspense fallback={<LecturePageListSkeleton />}>
                <LecturePageList courseId={course.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
