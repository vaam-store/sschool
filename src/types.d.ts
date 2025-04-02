declare module 'next-compose-plugins' {
  import { type NextConfig } from 'next';

  type NextConfigFunction = (nextConfig: NextConfig) => NextConfig;

  export default function withPlugins(
    plugins: [NextConfigFunction][],
    nextConfig: NextConfig,
  ): NextConfig;
}
