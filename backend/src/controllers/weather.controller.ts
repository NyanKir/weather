import { WeatherService } from '@/services/weather.service';
import { RouteHandle } from '@/declarations/route';
import { Request, Response } from 'express';

interface IController {
  getWeather: RouteHandle<void>;
}
export class WeatherController implements IController {
  private weatherService: WeatherService;
  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  async getWeather(req: Request, res: Response): Promise<void> {
    console.log(req.user);
    res.status(200).send();
    return Promise.resolve(undefined);
  }
}
