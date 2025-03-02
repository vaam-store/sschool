'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ThemeToggleRender = dynamic(() => import('./button'), {
  ssr: false,
});

export default function ThemeToggle() {
  return (
    <Suspense fallback={<span className='loading loading-sm' />}>
      <ThemeToggleRender />
    </Suspense>
  );
}
