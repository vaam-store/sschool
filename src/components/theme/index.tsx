'use client';

import dynamic from 'next/dynamic';
import { type PropsWithChildren, Suspense } from 'react';

const ThemeToggleRender = dynamic(() => import('./button'));
const ThemeProviderRender = dynamic(() => import('./provider'));

export function ThemeToggle() {
  return (
    <Suspense fallback={<span className='loading loading-sm' />}>
      <ThemeToggleRender />
    </Suspense>
  );
}

export function ThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProviderRender>{children}</ThemeProviderRender>;
}
