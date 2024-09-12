import "./Form.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, Stack } from "@mui/material";
import { sendOtp, verifyOtp } from "./otphandle";

import { setFormDataTrain, setPnr, setSelectedDateTime, resetTrainFormData } from "../features/trainSlices/trainFormSlices";
import { requestOtp, verifyOtp as verifyOtpAction, setUserOtp } from "../features/otpSlices/otpSlice";

export default function Train() {
  const dispatch = useDispatch();
  const formDataTrain = useSelector((state) => state.trainForm.formDataTrain);
  const pnr = useSelector((state) => state.trainForm.pnr);
  const selectedDateTime = useSelector((state) => state.trainForm.selectedDateTime);
  const isOtpRequested = useSelector((state) => state.otp.isOtpRequested);
  const isOtpVerified = useSelector((state) => state.otp.isOtpVerified);
  const otptoken = useSelector((state) => state.otp.otptoken);
  const userOtp = useSelector((state) => state.otp.userOtp);

  const handleChange = (event) => {
    dispatch(setPnr(event.target.value));
  };

  const handleInputChangeTrain = (event) => {
    dispatch(setFormDataTrain({ [event.target.name]: event.target.value }));
  };

  const userotpchange = (event) => {
    dispatch(setUserOtp(event.target.value));
  };

  const handleSubmitTrain = (event) => {
    event.preventDefault();
    console.log(formDataTrain);
    dispatch(resetTrainFormData());
  };

  const handleGetOtp = () => {
    console.log(isOtpRequested);
    sendOtp({
      mobileNumber: formDataTrain.mobileNo,
      setotptoken: (token) => dispatch(requestOtp(token)),
    });
    console.log(isOtpRequested);
  };

  const handleVerifyOtp = () => {
    verifyOtp({
      otp: userOtp,
      mobileNumber: formDataTrain.mobileNo,
      token: otptoken,
    });
    dispatch(verifyOtpAction());
  };

  return (
    <form onSubmit={handleSubmitTrain}>
      <div className="formData">
        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Mobile No."
            name="mobileNo"
            variant="outlined"
            sx={{ minWidth: 200 }}
            type="tel"
            required
            onChange={handleInputChangeTrain}
            disabled={isOtpRequested}
            
          />
          <Button
            variant="contained"
            sx={{ minWidth: 120, minHeight: 30, ml: 2 }}
            onClick={handleGetOtp}
            disabled={isOtpRequested}
            required
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
              onClick={handleVerifyOtp}
              disabled={isOtpVerified}
            >
              Verify
            </Button>
          </div>
        )}

        <br />

        <div className="formInputGroup">
          <FormControl sx={{ minWidth: 120 }} disabled={!isOtpVerified}>
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
            sx={{ ml: 2 }}
            name="pnrNo"
            variant="outlined"
            required
            disabled={!isOtpVerified}
            onChange={handleInputChangeTrain}
          />}
          {pnr === "UTS" && <TextField
            id="outlined-basic"
            label="UTS No."
            name="utsNo"
            variant="outlined"
            sx={{ ml: 2 }}
            disabled={!isOtpVerified}
            required
            onChange={handleInputChangeTrain}
          />}
        </div>

        <br />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DateTimePicker
              label="Select Date & Time"
              value={selectedDateTime}
              defaultValue={Date.now()}
              required
              name="dateAndTime"
              onChange={(newValue) => dispatch(setSelectedDateTime(newValue))}
              renderInput={(params) => <TextField {...params} />}
              disabled={!isOtpVerified}
            />
          </Stack>
        </LocalizationProvider>

        <br />
        <br />

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Image"
            variant="outlined"
            required
            type="file"
            name="image1"
            onChange={handleInputChangeTrain}
            sx={{ width: 650 }}
            disabled={!isOtpVerified}
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
            required
            type="file"
            name="image2"
            onChange={handleInputChangeTrain}
            sx={{ width: 650 }}
            disabled={!isOtpVerified}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Grievance Description"
            variant="outlined"
            required
            type="textArea"
            name="grievanceDescription"
            onChange={handleInputChangeTrain}
            sx={{ width: 650 }}
            disabled={!isOtpVerified}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <Button
          variant="contained"
          sx={{ minWidth: 120, minHeight: 30 }}
          required
          disabled={!isOtpVerified}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
