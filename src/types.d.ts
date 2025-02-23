declare module 'editorjs-alert';
declare module '@editorjs/checklist';
declare module '@editorjs/attaches';
declare module '@editorjs/link';
declare module '@editorjs/embed';
declare module 'editorjs-latex';
declare module '@editorjs/raw';
declare module '@editorjs/marker';

declare module 'next-compose-plugins' {
  import { type NextConfig } from 'next';
  
  type NextConfigFunction = (nextConfig: NextConfig) => NextConfig;
  
  export default function withPlugins(
    plugins: [NextConfigFunction][],
    nextConfig: NextConfig,
  ): NextConfig;
}
