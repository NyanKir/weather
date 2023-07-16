import { OpenWeatherClient } from '@/clients/open-weather.client';

export class WeatherService {
  client: OpenWeatherClient = new OpenWeatherClient();
  constructor() {}

  async getWeather() {}
}
