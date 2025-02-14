import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ courseId: string }>;
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  const { courseId } = await params;

  return <div id={`edit-${courseId}`}>{children}</div>;
}
