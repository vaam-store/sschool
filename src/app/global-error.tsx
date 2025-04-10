'use client';

// TODO Remove this when we get serious
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('global app error', error);
  return (
    // global-error must include html and body tags
    <html lang='en'>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
