import 'server-only';

import { env } from '@app/env';
import { Client } from 'minio';

const createS3Client = () =>
  new Client({
    endPoint: env.S3_ENDPOINT,
    accessKey: env.S3_ACCESS_KEY,
    secretKey: env.S3_SECRET_KEY,
    useSSL: env.S3_SCHEME === 'https',
    port: env.S3_PORT,
  });

export const client = createS3Client();
