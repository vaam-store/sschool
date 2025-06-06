import { env } from './src/env.js';

export default function myImageLoader({ src, width, quality, height }) {
  return `${env.NEXT_PUBLIC_IMAGE_LOADER_URL}/url=${encodeURIComponent(src)}?width=${width}&height=${height ?? width}&quality=${quality || 75}`;
}
