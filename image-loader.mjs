import { env } from './src/env.js';

export default function emgrImageLoader({ src, width, quality, height }) {
  const url = new URL(env.NEXT_PUBLIC_EMGR_CDN);
  url.searchParams.set('format', 'jpg');

  if (!!src) {
    url.searchParams.set('url', src);
  }

  if (!!width) {
    url.searchParams.set('width', width.toString());
  }

  if (!!height) {
    url.searchParams.set('height', height.toString());
  }

  if (!!quality) {
    url.searchParams.set('quality', quality);
  }
  return url.href;
}
