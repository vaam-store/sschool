import { auth } from '@app/server/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  return <>{children}</>;
}
