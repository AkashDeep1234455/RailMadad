import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    formDataStation : {
        mobileNo: "",
        pnrNo: "",
        utsNo: '',
        dateAndTime: "",
        image1: "",
        image2: "",
        grivenceDescription: ""
    },
    pnr: '',
    selectedDateTime: null
}

const stationFormSlice = createSlice({
    name: "form",
    initialState,
    reducers:{
        setFormDataStation(state, action){
            state.formDataStation = {...state.formDataStation, ...action.payload};
        },
        setPnr(state, action){
            state.pnr = action.payload;
        },
        setSelectDateTime(state, action){
            state.selectedDateTime = action.payload;
        },
        resetStationFormData(state,action){
            state.formDataStation = initialState.formDataStation;
        }
    }
})

export const {setFormDataStation, setPnr, setSelectDateTime, resetStationFormData} = stationFormSlice.actions;
export default stationFormSlice.reducer;