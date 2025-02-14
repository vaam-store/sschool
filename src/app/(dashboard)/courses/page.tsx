import { SchoolList } from "@app/components/school-list";
import { listCourses } from "@app/hooks/courses";
import { Container } from "@app/components/container";
import { auth } from "@app/server/auth";
import Link from "next/link";
import { Plus } from "react-feather";
import { UserRole } from "@prisma/client";

export default async function AllCoursesPage({}) {
  const courses = await listCourses(0, 10);
  const session = await auth();
  return (
    <Container>
      <div className="mb-4 flex flex-row items-center md:mb-8 md:justify-between">
        <h1 className="app-title">All Schools</h1>
        {session && session.user && session.user.role === UserRole.ADMIN && (
          <Link className="btn btn-circle btn-ghost" href="/courses/add">
            <Plus className="text-primary" />
          </Link>
        )}
      </div>

      <SchoolList data={courses} />
    </Container>
  );
}
