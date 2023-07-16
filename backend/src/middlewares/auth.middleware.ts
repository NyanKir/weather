import { NextFunction, Request, Response } from 'express';
import { ErrorBuilder, HttpException } from '@exceptions/http.exception';
import { SECRET_KEY } from '@config';
import { verify } from 'jsonwebtoken';
import { IUser, UserModel } from '@/models/user';

export enum AuthAccesses {
  public,
  isAuth,
  notAuth
}

export const getAuthorization = (
  req: Request
): { cookie: unknown; header: unknown } => {
  const cookie = req?.cookies?.Authorization;
  let header = req?.header('Authorization');

  if (header) {
    header = header.split('Bearer ')[1];
  }
  return {
    cookie,
    header
  };
};

export const AuthMiddleware = (access: AuthAccesses = AuthAccesses.isAuth) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (access === AuthAccesses.public) {
      return next();
    }

    try {
      const { header, cookie } = getAuthorization(req);

      if (!cookie && !header && access === AuthAccesses.notAuth) {
        return next();
      }

      if (typeof header === 'string') {
        const { _id } = (await verify(header, SECRET_KEY)) as { _id: string };
        const findUser: IUser = await UserModel.findById(_id);

        if (findUser && access === AuthAccesses.notAuth) {
          return next(ErrorBuilder.Forbidden());
        }

        if (findUser) {
          req.user = findUser;
          return next();
        }
      }
    } catch (e) {
      console.error(e);
    }
    next(ErrorBuilder.Forbidden());
  };
};
