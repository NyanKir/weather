import { Routes } from '@/declarations/route';
import { Router } from 'express';
import { WeatherController } from '@/controllers/weather.controller';
import { WeatherService } from '@/services/weather.service';
import { AuthAccesses, AuthMiddleware } from '@middlewares/auth.middleware';

export class WeatherRouter implements Routes {
  public path: string = '/weather';
  public router: Router = Router();
  private controller = new WeatherController(new WeatherService());

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      this.path,
      AuthMiddleware(AuthAccesses.public),
      this.controller.getWeather.bind(this.controller)
    );
  }
}
