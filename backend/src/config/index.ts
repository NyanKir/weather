import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { NODE_ENV, PORT, SECRET_KEY, SESSION_TTL } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
