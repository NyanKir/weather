import { OpenWeatherClient } from '@/clients/open-weather/base';

export class GeocoderApi extends OpenWeatherClient {
  constructor() {
    super();
  }

  async getCoordinatesByLocationName(query: string) {
    const { data } = await this.axios.get<Coordinate[]>('/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5
      }
    });
    return data;
  }
}
