import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'prod'
  ? '.env.prod'
  : '.env.dev';

dotenv.config({ path: envFile });

export const env = {
  PORT: process.env.PORT || '3000',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt',
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: process.env.DB_PORT!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!
};
