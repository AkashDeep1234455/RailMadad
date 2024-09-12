import "./Form.css";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, Stack } from "@mui/material";

import { sendOtp, verifyOtp } from "./otphandle";
import {setFormDataStation, setPnr, setSelectDateTime, resetStationFormData} from "../features/stationSlice/stationFormSlice"
import { requestOtp, verifyOtp as verifyOtpAction, setUserOtp } from "../features/otpSlices/otpSlice";
import {useSelector, useDispatch} from "react-redux"

export default function Train() {
  const dispatch = useDispatch();
  const formDataStation = useSelector((state) => state.stationForm.formDataStation);
  const pnr = useSelector((state) => state.stationForm.pnr);
  const selectedDateTime = useSelector((state) => state.stationForm.selectedDateTime);
  const  isOtpRequested = useSelector((state) => state.otp.isOtpRequested);
  const isOtpVerified = useSelector((state) => state.otp.isOtpVerified);
  const otptoken = useSelector((state) => state.otp.otptoken);
  const userOtp = useSelector((state) => state.otp.userOtp);

  const handleChange = (event) => {
    dispatch(setPnr(event.target.value));
  };

  let handleInputChangeStation = (event) => {
    dispatch(setFormDataStation((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    }));
  };

  let handleSubmitStation = (event) => {

    event.preventDefault();
    console.log(formDataStation);
    dispatch(resetStationFormData());
  };

  const userotpchange = (event) => {
    dispatch(setUserOtp(event.target.value));
  };

  const handleGetOtp = () => {
    console.log(isOtpRequested);
    sendOtp({
      mobileNumber: formDataStation.mobileNo,
      setotptoken: (token) => dispatch(requestOtp(token)),
    });
    console.log(isOtpRequested);
  };

  const handleVerifyOtp = () => {
    verifyOtp({
      otp: userOtp,
      mobileNumber: formDataStation.mobileNo,
      token: otptoken,
    });
    dispatch(verifyOtpAction());
  };

  return (
    <form onSubmit={handleSubmitStation}>
      <div className="formData">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DateTimePicker
              label="Select Date & Time"
              value={selectedDateTime}
              required
              defaultValue={Date.now()}
              onChange={handleInputChangeStation}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <br />
        <br />

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Grievance Description"
            variant="outlined"
            required
            type="textArea"
            onChange={handleInputChangeStation}
            name="Grievance Description"
            sx={{ width: 650 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <br />

        <div className="formInputGroup">
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={pnr}
              required
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select Ticket Type
              </MenuItem>
              <MenuItem value={"PNR"}>PNR</MenuItem>
              <MenuItem value={"UTS"}>UTS</MenuItem>
            </Select>
          </FormControl>
          {pnr === "PNR" && <TextField
            id="outlined-basic"
            label="PNR No."
            name="pnrNo"
            variant="outlined"
            required
            onChange={handleInputChangeStation}
          />}
          {pnr === "UTS" && <TextField
            id="outlined-basic"
            label="UTS No."
            name="utsNo"
            variant="outlined"
            required
            onChange={handleInputChangeStation}
          />}
        </div>

        <br />

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Station No."
            variant="outlined"
            required
            name="stationNo"
            onChange={handleInputChangeStation}
          />
        </div>

        <br />
        <br />

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Image"
            variant="outlined"
            // size='small'
            required
            type="file"
            // onChange={handleInputChange}
            // value={formData.image}
            name="image1"
            onChange={handleInputChangeStation}
            sx={{ width: 650 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <br />

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Image"
            variant="outlined"
            // size='small'
            required
            type="file"
            // onChange={handleInputChange}
            // value={formData.image}
            name="image2"
            onChange={handleInputChangeStation}
            sx={{ width: 650 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <br />

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Mobile No."
            variant="outlined"
            sx={{ minWidth: 200 }}
            required
            name="mobileNo"
            onChange={handleInputChangeStation}
            disabled={isOtpRequested}
          />
          <Button
            variant="contained"
            sx={{ minWidth: 120, minHeight: 30, ml: 2 }}
            required
            onClick={handleGetOtp}
            disabled={isOtpRequested}
          >
            Get OTP
          </Button>
        </div>

        <br />

        {isOtpRequested && (
          <div className="formInputGroup">
            <TextField
              id="outlined-basic"
              label="OTP"
              name="OTP"
              variant="outlined"
              sx={{ minWidth: 200 }}
              required
              onChange={userotpchange}
              disabled={isOtpVerified}
            />
            <Button
              variant="contained"
              sx={{ minWidth: 120, minHeight: 30, ml: 2 }}
              required
              onClick={handleVerifyOtp}
              disabled={isOtpVerified}
            >
              Verify
            </Button>
          </div>
        )}

        <br />

        <Button
          variant="contained"
          sx={{ minWidth: 120, minHeight: 30 }}
          required
          onSubmit={handleSubmitStation}
          disabled={!isOtpVerified}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
