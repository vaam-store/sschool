import '@app/styles/globals.scss';

import { type Metadata } from 'next';

import { ThemeProvider } from '@app/components/theme';
import { TRPCReactProvider } from '@app/trpc/react';
import { type PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Learning platform',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
