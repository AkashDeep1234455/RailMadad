import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formDataTrain: {
    mobileNo: '',
    pnrNo: '',
    utsNo: '',
    dateAndTime: '',
    image1: '',
    image2: '',
    grievanceDescription: '',
  },
  pnr: '',
  selectedDateTime: null,
};

export const trainFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormDataTrain(state, action) {
      state.formDataTrain = { ...state.formDataTrain, ...action.payload };
    },
    setPnr(state, action) {
      state.pnr = action.payload;
    },
    setSelectedDateTime(state, action) {
      state.selectedDateTime = action.payload;
    },
    resetTrainFormData(state) {
      state.formDataTrain = initialState.formDataTrain;
    },
  },
});

export const { setFormDataTrain, setPnr, setSelectedDateTime, resetTrainFormData } = trainFormSlice.actions;
export default trainFormSlice.reducer;
