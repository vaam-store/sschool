export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div id="main">{children}</div>;
}
