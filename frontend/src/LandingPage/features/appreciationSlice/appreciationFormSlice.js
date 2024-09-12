import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formDataAppreciation: {
    mobileNo: '',
    trainNo: '',
    stationName: '',
    experience: '',
    value: 2,
    hover: -1,
    positiveAspects: ''
  },
  trainOrStation: '',
};

export const appreciationFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormDataAppreciation(state, action) {
      state.formDataAppreciation = { ...state.formDataAppreciation, ...action.payload };
    },
    setTrainOrStation(state, action) {
      state.pnr = action.payload;
    },
    resetAppreciationFormData(state) {
      state.formDataAppreciation = initialState.formDataAppreciation;
    },
  },
});

export const { setFormDataAppreciation, setTrainOrStation, resetAppreciationFormData } = appreciationFormSlice.actions;
export default appreciationFormSlice.reducer;
