import AppFooter from "@app/components/footer";
import { AppNavBar } from "@app/components/navbar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AppNavBar />
      <div id="main">{children}</div>
      <AppFooter />
    </>
  );
}
