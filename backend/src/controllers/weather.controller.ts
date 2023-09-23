import { WeatherService } from '@/services/weather.service';
import { RouteHandle } from '@/declarations/route';
import { Request, Response } from 'express';
import {GeocoderApi} from "@/clients/open-weather/geocoder";

interface IController {
  getWeather: RouteHandle<void>;
}
export class WeatherController implements IController {
  private weatherService: WeatherService;
  private geocoderApi: GeocoderApi = new GeocoderApi()
  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  async searchLocation(req: Request, res: Response): Promise<void> {
    const {q} = req.query
    const data  = await this.geocoderApi.getCoordinatesByLocationName(q as unknown as string)
    console.log(data)
    res.status(200).send(data);
  }

  async getWeather(req: Request, res: Response): Promise<void> {
    console.log(req.user);
    res.status(200).send();
    return Promise.resolve(undefined);
  }
}
