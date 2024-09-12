import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOtpRequested: false,
  isOtpVerified: false,
  otptoken: '',
  userOtp: '',
};

export const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    requestOtp(state, action) {
      state.isOtpRequested = true;
      state.otptoken = action.payload;
    },
    verifyOtp(state) {
      state.isOtpVerified = true;
    },
    setUserOtp(state, action) {
      state.userOtp = action.payload;
    },
  },
});

export const { requestOtp, verifyOtp, setUserOtp } = otpSlice.actions;
export default otpSlice.reducer;
