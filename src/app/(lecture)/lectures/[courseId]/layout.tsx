import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";
import icon from "@app/components/icon.svg";
import { ArrowLeft, Home, Menu } from "react-feather";
import Link from "next/link";
import ThemeToggle from "@app/components/theme";
import Image from "next/image";
import { getCourse, type HasCourse } from "@app/hooks/courses";
import { LectureModuleList } from "@app/components/lecture-module-list";
import { Suspense } from "react";

export default async function LectureLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<HasCourse> }>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  const { courseId } = await params;
  const course = await getCourse(courseId);

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

          <div className="bg-base-200 text-base-content flex min-h-full w-80 flex-col gap-4 py-4">
            <div className="flex flex-row justify-between px-2">
              <Link
                className="btn btn-ghost btn-soft btn-circle"
                href={`/courses/${courseId}`}
              >
                <ArrowLeft />
              </Link>

              <div className="flex flex-row gap-4">
                <ThemeToggle />

                <Link className="btn btn-ghost btn-soft btn-circle" href="/">
                  <Image src={icon} className="w-8" alt="logo" />
                </Link>
              </div>
            </div>

            <Link
              href={`/lectures/${courseId}`}
              className="hover:bg-base-300 flex flex-row gap-4 px-4 py-4"
            >
              <Home />
              <h3>{course.name}</h3>
            </Link>

            <div className="h-[calc(100vh-200px)] overflow-y-scroll px-4 py-2">
              <Suspense fallback={<span className="loading loading-sm" />}>
                <LectureModuleList courseId={course.id} />
              </Suspense>
            </div>

            <div className="px-4">
              <Link
                className="btn btn-ghost btn-soft btn-circle"
                href={`/courses/${courseId}`}
              >
                <ArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
