import { env } from '@app/env';
import { createId } from '@paralleldrive/cuid2';
import { client } from './client';

const maxAge = 3600 * 24; // 24 hours

export async function createPresignedPostUrl(filename: string) {
  const objectName = `images/${createId()}-${filename}`;
  const url = await client.presignedPutObject(
    env.S3_BUCKET,
    objectName,
    maxAge,
  );
  const publicUrl = `${getBasePublicUrl()}/${env.S3_BUCKET}/${objectName}`;
  return { url, publicUrl };
}

export function getBasePublicUrl() {
  if (process.env.S3_CDN_URL) {
    return env.S3_CDN_URL;
  }

  return `${env.S3_SCHEME}://${env.S3_ENDPOINT}:${env.S3_PORT}`;
}
