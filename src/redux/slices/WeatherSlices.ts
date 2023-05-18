import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  getCurrentWeatherData,
  getForecastWeatherData,
} from '../../services/api';
import {ForecastParam, WeatherForecastData} from '../../models/ForecastData';
import {ErrorResponse} from '../../models/ErrorResponse';
import {WeatherData} from '../../models/WeatherData';

interface WeatherState {
  data: null | WeatherForecastData;
  currentWeather: null | WeatherData;
  error: null | ErrorResponse;
  loading: boolean;
}

export const getWeatherForecast = createAsyncThunk(
  'weather/getWeatherForecast',
  async (paramData: ForecastParam) => {
    const response = await getForecastWeatherData(paramData.lat, paramData.lon);
    return response.data;
  },
);

export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async (paramData: ForecastParam) => {
    const response = await getCurrentWeatherData(paramData.lat, paramData.lon);
    return response.data;
  },
);

const initialState: WeatherState = {
  data: null,
  error: null,
  currentWeather: null,
  loading: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    testReducer: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getWeatherForecast.pending, state => {
      state.loading = true;
    });
    builder.addCase(getWeatherForecast.fulfilled, (state, action) => {
      state.data = action.payload as WeatherForecastData;
      state.loading = false;
    });
    builder.addCase(getWeatherForecast.rejected, (state, action) => {
      state.error = action.error as ErrorResponse;
      state.loading = false;
    });
    builder.addCase(getCurrentWeather.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.loading = false;
      console.log('current', action.payload);
      state.currentWeather = action.payload as WeatherData;
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as ErrorResponse;
    });
  },
});

export const {testReducer} = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;
export default weatherSlice.reducer;
