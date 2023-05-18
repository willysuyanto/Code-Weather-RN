import {configureStore} from '@reduxjs/toolkit';
import WeatherSlices from './slices/WeatherSlices';
import LocationSlices from './slices/LocationSlices';

export const store = configureStore({
  reducer: {
    weather: WeatherSlices,
    location: LocationSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
