import express, { Express } from 'express';
import { PORT } from '@config';
import { Routes } from '@interfaces/route';
import { connect } from 'mongoose';
import { dbConnection } from '@/config/database';
import * as console from 'console';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { ErrorMiddleware } from '@middlewares/error.middleware';

export class App {
  private app: Express;
  private port: any;
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT;

    void this.connectToDatabase();
    this.initMiddlewares();
    this.initRoutes(routes);
  }

  public async listen() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }

  private async connectToDatabase() {
    await connect(dbConnection.url, dbConnection.options);
  }

  private initMiddlewares() {
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private initRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });

    this.app.use(ErrorMiddleware);
  }
}
