import axios from 'axios';
import {WeatherForecastData} from '../models/ForecastData';
import {LocationData} from '../models/LocationData';
import {WeatherData} from '../models/WeatherData';

const Api = axios.create({baseURL: 'https://api.openweathermap.org/'});
const ApiKey = 'be8953a6c88d8dedaa4786675228f3d7'; // should be put on .env

export const getForecastWeatherData = (latitude: number, longitude: number) => {
  return Api.get<WeatherForecastData>('data/2.5/forecast', {
    params: {lat: latitude, lon: longitude, units: 'metric', appid: ApiKey},
  });
};

export const getCurrentWeatherData = (latitude: number, longitude: number) => {
  return Api.get<WeatherData>('data/2.5/weather', {
    params: {lat: latitude, lon: longitude, units: 'metric', appid: ApiKey},
  });
};

export const getLocationInfo = (latitude: number, longitude: number) => {
  return Api.get<LocationData[]>('geo/1.0/reverse', {
    params: {lat: latitude, lon: longitude, limit: 5, appid: ApiKey},
  });
};
