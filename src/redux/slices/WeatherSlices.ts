import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {getForecastWeatherData} from '../../services/api';
import {ForecastParam, WeatherForecastData} from '../../models/ForecastData';
import {ErrorResponse} from '../../Interfaces/ErrorInterfaces';

interface WeatherState {
  data: null | WeatherForecastData;
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

const initialState: WeatherState = {
  data: null,
  error: null,
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
      console.log('err', action.error);
      state.error = action.error as ErrorResponse;
      state.loading = false;
    });
  },
});

export const {testReducer} = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;
export default weatherSlice.reducer;
