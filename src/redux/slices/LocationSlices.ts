import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ErrorResponse} from '../../models/ErrorResponse';
import {LocationData} from '../../models/LocationData';
import {RootState} from '../store';
import {ForecastParam} from '../../models/ForecastData';
import {getLocationInfo} from '../../services/api';

interface LocationState {
  loading: boolean;
  data: null | LocationData[];
  error: null | ErrorResponse;
}

const initialState: LocationState = {
  loading: false,
  data: null,
  error: null,
};

export const getCurrentLocationInfo = createAsyncThunk(
  'location/getCurrentLocationInfo',
  async (params: ForecastParam) => {
    const response = await getLocationInfo(params.lat, params.lon);
    console.log(response);
    return response.data;
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentLocationInfo.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCurrentLocationInfo.fulfilled, (state, action) => {
      state.data = action.payload as LocationData[];
      state.loading = false;
    });
    builder.addCase(getCurrentLocationInfo.rejected, (state, action) => {
      state.error = action.error as ErrorResponse;
      state.loading = false;
    });
  },
});

export const {} = locationSlice.actions;
export const selectLocation = (state: RootState) => state.location;
export default locationSlice.reducer;
