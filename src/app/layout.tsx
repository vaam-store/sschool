import '@app/styles/globals.scss';

import { type Metadata } from 'next';

import { mainThemes, themeDataKey } from '@app/components/theme/constants';
import { TRPCReactProvider } from '@app/trpc/react';
import { HydrateClient } from '@app/trpc/server';
import { ThemeProvider } from 'next-themes';
import { type PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Learning platform',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <TRPCReactProvider>
        <body>
          <HydrateClient>
            <ThemeProvider storageKey={themeDataKey} themes={mainThemes}>
              {children}
            </ThemeProvider>
          </HydrateClient>
        </body>
      </TRPCReactProvider>
    </html>
  );
}
