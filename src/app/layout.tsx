import '@app/styles/globals.scss';

import { type Metadata } from 'next';

import { TRPCReactProvider } from '@app/trpc/react';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Learning platform',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
