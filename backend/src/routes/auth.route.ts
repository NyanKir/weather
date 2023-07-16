import { Routes } from '@interfaces/route';
import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import {
  ValidationMiddleware,
  ValidationSource
} from '@middlewares/validation.middleware';
import { signUpSchema } from '@/routes/schemas/auth.schema';
import { AuthService } from '@/services/auth.service';
import { AuthAccesses, AuthMiddleware } from '@middlewares/auth.middleware';

export class AuthRouter implements Routes {
  path: string = '/auth';
  router: Router = Router();
  controller: AuthController = new AuthController(new AuthService());

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}/signup`,
      AuthMiddleware(AuthAccesses.notAuth),
      ValidationMiddleware(signUpSchema, ValidationSource.BODY),
      this.controller.sigUp.bind(this.controller)
    );
    this.router.post(
      `${this.path}/login`,
      AuthMiddleware(AuthAccesses.notAuth),
      ValidationMiddleware(signUpSchema, ValidationSource.BODY),
      this.controller.logIn.bind(this.controller)
    );
    this.router.post(
      `${this.path}/logout`,
      AuthMiddleware(AuthAccesses.isAuth),
      this.controller.logOut.bind(this.controller)
    );
    this.router.post(
      `${this.path}/refresh-token`,
      AuthMiddleware(AuthAccesses.public),
      this.controller.refreshToken.bind(this.controller)
    );
  }
}
