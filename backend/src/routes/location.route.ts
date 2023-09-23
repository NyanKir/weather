import { Routes } from '@/declarations/route';
import { Router } from 'express';
import { WeatherController } from '@/controllers/weather.controller';
import { WeatherService } from '@/services/weather.service';
import { AuthAccesses, AuthMiddleware } from '@middlewares/auth.middleware';
import { searchLocationScheme } from '@/routes/schemas/location.route';
import {
  ValidationMiddleware,
  ValidationSource
} from '@middlewares/validation.middleware';
import { signUpSchema } from '@/routes/schemas/auth.schema';

export class LocationRouter implements Routes {
  public path: string = '/location';
  public router: Router = Router();
  private controller = new WeatherController(new WeatherService());

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      this.path,
      AuthMiddleware(AuthAccesses.public),
      ValidationMiddleware(searchLocationScheme, ValidationSource.QUERY),
      this.controller.searchLocation.bind(this.controller)
    );
  }
}
