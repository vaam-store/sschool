import { auth } from "@app/server/auth";
import { redirect } from "next/navigation";
import AppFooter from "@app/components/footer";
import { AppNavBar } from "@app/components/navbar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  
  return (
    <>
      <AppNavBar />
      <div id="dashboard">{children}</div>
      <AppFooter />
    </>
  );
}
