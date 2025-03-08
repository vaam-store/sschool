import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import withPlugins from 'next-compose-plugins';

import './src/env.js';

const isDev = process.env.NODE_ENV !== 'production';

const shouldPwa = async (nextConfig: NextConfig): Promise<NextConfig> => {
  if (!isDev) {
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      dest: 'public',
    });
    return withPWA(nextConfig);
  }

  return nextConfig;
};

const withImageSizes = (nextConfig: NextConfig): NextConfig => {
  if (isDev) {
    return {
      ...nextConfig,
      images: {
        ...nextConfig.images,
        remotePatterns: [
          ...(nextConfig?.images?.remotePatterns ?? []),
          {
            hostname: '*',
          },
        ],
      },
    };
  }
  return {
    ...nextConfig,
    images: {
      ...nextConfig.images,
      remotePatterns: [
        ...(nextConfig?.images?.remotePatterns ?? []),
        {
          protocol: 'https',
          hostname: '*.dev.vymalo.com',
        },
        {
          protocol: 'https',
          hostname: '*.store.vymalo.com',
        },
        {
          protocol: 'https',
          hostname: '*.vymalo.com',
        },
        {
          protocol: 'https',
          hostname: '*.ssegning.me',
        },
        {
          protocol: 'https',
          hostname: '*.ssegning.com',
        },
      ],
    },
  };
};

const withWebpack = (nextConfig: NextConfig): NextConfig => {
  if (isDev) {
    return nextConfig;
  }
  return {
    ...nextConfig,
    webpack: (config, context) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.optimization.splitChunks = {
        chunks: 'all',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return nextConfig.webpack ? nextConfig.webpack(config, context) : config;
    },
  };
};

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
};

export default withPlugins(
  [
    [withImageSizes],
    [withWebpack],
    [
      withBundleAnalyzer({
        enabled: !isDev,
        openAnalyzer: isDev,
      }),
    ],
    [shouldPwa],
  ],
  nextConfig,
);
