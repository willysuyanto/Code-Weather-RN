import axios from 'axios';
import {WeatherForecastData} from '../models/ForecastData';

const Api = axios.create({baseURL: 'https://api.openweathermap.org/'});
const ApiKey = 'be8953a6c88d8dedaa4786675228f3d7'; // should be put on .env

export const getForecastWeatherData = (latitude: number, longitude: number) => {
  return Api.get<WeatherForecastData>('data/2.5/weather', {
    params: {lat: latitude, lon: longitude, appid: ApiKey},
  });
};

export const getPastWeatherData = () => {};
