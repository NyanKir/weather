import axios, { AxiosInstance } from 'axios';

export class OpenWeatherClient {
    protected axios: AxiosInstance;
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.openweathermap.org',
            params: {
                appid: '3a6b60d02d8f85ec306b99e5f9d5e178'
            }
        });
    }
}
