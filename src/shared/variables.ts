import { ClientConfig } from 'pg';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
} = process.env;

export const PG_CLIENT_CONFIG: ClientConfig = {
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  database: POSTGRES_DATABASE,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
};
