"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ThemeToggleRender = dynamic(() => import("./button"), {
  ssr: false,
});

export default function ThemeToggle() {
  return (
    <Suspense fallback={<span className="loading loading-sm" />}>
      <ThemeToggleRender />
    </Suspense>
  );
}
