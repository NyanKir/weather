import { RouteHandle } from '@/declarations/route';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { getAuthorization } from '@middlewares/auth.middleware';

interface IController {
  sigUp: RouteHandle<void>;
  logIn: RouteHandle<void>;
  logOut: RouteHandle<void>;
  refreshToken: RouteHandle<void>;
}

export class AuthController implements IController {
  private auth: AuthService;
  constructor(auth: AuthService) {
    this.auth = auth;
  }
  async logIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cookie, email, token } = await this.auth.login(req.body);
      res.setHeader('Set-Cookie', [cookie]);
      res.send({ token });
    } catch (e) {
      next(e);
    }
  }

  async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { cookie: sessionId } = getAuthorization(req);

    await this.auth.logOut(sessionId);
    res.clearCookie('Authorization');
    res.status(200);
  }

  async sigUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.auth.signup(req.body);
      res.send(user);
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { cookie: sessionId } = getAuthorization(req);
      const { cookie, token } = await this.auth.refreshToken(sessionId);
      res.setHeader('Set-Cookie', [cookie]);
      res.send({ token: token.token });
    } catch (e) {
      next(e);
      res.clearCookie('Authorization');
    }
  }
}
