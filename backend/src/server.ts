import { App } from '@/app';
import { WeatherRouter } from '@/routes/weather.route';
import { AuthRouter } from '@/routes/auth.route';
import { LocationRouter } from '@/routes/location.route';

new App([new AuthRouter(), new WeatherRouter(), new LocationRouter()]).listen();
