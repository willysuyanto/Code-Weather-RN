import {configureStore} from '@reduxjs/toolkit';
import WeatherSlices from './slices/WeatherSlices';

export const store = configureStore({
  reducer: {
    weather: WeatherSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
