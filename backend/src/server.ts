import { App } from '@/app';
import { WeatherRouter } from '@/routes/weather.route';
import { AuthRouter } from '@/routes/auth.route';

new App([new AuthRouter(), new WeatherRouter()]).listen();
