import { AppNavBar } from "@app/components/navbar";
import LargeFooter from "../../components/footer/large-footer";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AppNavBar />
      <div id="main">{children}</div>
      <LargeFooter />
    </>
  );
}
