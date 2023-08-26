import { NextFunction, Request, Response, Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

export type RouteHandle<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;
