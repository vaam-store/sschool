import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";
import { type HasCourse } from "@app/hooks/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Course",
  description: "Here you can edit a course.",
};

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  params: Promise<HasCourse>;
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  const { courseId } = await params;

  return <div id={`edit-${courseId}`}>{children}</div>;
}
