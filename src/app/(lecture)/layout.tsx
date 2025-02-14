import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";

export default async function LectureLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return <div id="lecture">{children}</div>;
}
