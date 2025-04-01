// src/components/lecture/markdown-content.tsx
'use client';

import mermaid from 'mermaid';
import { useEffect } from 'react';

interface LectureContentProps {
  html: string;
}

export function LectureContent({ html }: LectureContentProps) {
  useEffect(() => {
    // Initialize mermaid with your preferred config
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    // Render any mermaid diagrams
    mermaid.contentLoaded();
  }, [html]);

  return (
    <article
      className='prose prose-neutral lg:prose-xl mx-auto'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
