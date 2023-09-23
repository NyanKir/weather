import { OpenWeatherClient } from '@/clients/open-weather/base';

export class ForecastApi extends OpenWeatherClient {
    constructor() {
        super();
    }

    async getForecastByCoordinates(lat: string,lon:string) {
        const { data } = await this.axios.get<Forecast>('/data/2.5/forecast', {
            params: {
                lat,
                lon
            }
        });
        return data;
    }
}
