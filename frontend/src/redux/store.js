import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../LandingPage/features/trainSlices/trainFormSlices';
import otpReducer from '../LandingPage/features/otpSlices/otpSlice';
import stationReducer from "../LandingPage/features/stationSlice/stationFormSlice"
import appreciationReducer from '../LandingPage/features/appreciationSlice/appreciationFormSlice';

export const store = configureStore({
  reducer: {
    trainForm: formReducer,
    otp: otpReducer,
    stationForm: stationReducer,
    appreciationForm: appreciationReducer,
  },
});

export default store;
