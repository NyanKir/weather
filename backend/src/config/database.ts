import { ConnectOptions } from 'mongoose';
import { DB_DATABASE, DB_HOST, DB_PORT } from '@/config';

interface IConfig {
  url: string;
  options?: ConnectOptions;
}
export const dbConnection: IConfig = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`
};
