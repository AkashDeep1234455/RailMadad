import "./Form.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Stack } from "@mui/material";
import { sendOtp, verifyOtp } from "./otphandle";

import {
  requestOtp,
  verifyOtp as verifyOtpAction,
  setUserOtp,
} from "../features/otpSlices/otpSlice";

import {
  setFormDataAppreciation,
  setTrainOrStation,
  resetAppreciationFormData,
} from "../features/appreciationSlice/appreciationFormSlice";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Appreciation() {
  const dispatch = useDispatch();

  const formDataAppreciation = useSelector(
    (state) => state.appreciationForm.formDataAppreciation
  );
  const trainOrStation = useSelector(
    (state) => state.appreciationForm.trainOrStation
  );

  const isOtpRequested = useSelector((state) => state.otp.isOtpRequested);
  const isOtpVerified = useSelector((state) => state.otp.isOtpVerified);
  const otptoken = useSelector((state) => state.otp.otptoken);
  const userOtp = useSelector((state) => state.otp.userOtp);

  const handleChange = (event) => {
    dispatch(setTrainOrStation(event.target.value));
  };

  const handleInputChangeAppreciation = (event) => {
    dispatch(
      setFormDataAppreciation({ [event.target.name]: event.target.value })
    );
  };

  const userotpchange = (event) => {
    dispatch(setUserOtp(event.target.value));
  };

  const handleGetOtp = () => {
    console.log(isOtpRequested);
    sendOtp({
      mobileNumber: formDataTrain.mobileNo,
      setotptoken: (token) => dispatch(requestOtp(token)),
    });
    console.log(isOtpRequested);
  };

  const handleSubmitAppreciation = (event) => {
    event.preventDefault();
    console.log(formDataAppreciation);
    dispatch(resetAppreciationFormData());
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
    <form onSubmit={handleSubmitAppreciation}>
      <div className="formData">
        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Mobile No."
            name="mobileNo"
            variant="outlined"
            sx={{ minWidth: 200 }}
            required
            onChange={handleInputChangeAppreciation}
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

        <div className="formInputGroup">
          <FormControl sx={{ minWidth: 120 }} disabled={!isOtpVerified}>
            <Select
              value={trainOrStation}
              required
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                --SELECT MODE--
              </MenuItem>
              <MenuItem value={"TRAIN"}>TRAIN</MenuItem>
              <MenuItem value={"STATION"}>STATION</MenuItem>
            </Select>
          </FormControl>
          {trainOrStation === "TRAIN" && (
            <TextField
              id="outlined-basic"
              label="Train No."
              sx={{ ml: 2 }}
              name="trainNo"
              variant="outlined"
              required
              disabled={!isOtpVerified}
              onChange={handleInputChangeAppreciation}
            />
          )}
          {trainOrStation === "STATION" && (
            <TextField
              id="outlined-basic"
              label="Station Name"
              name="stationName"
              variant="outlined"
              sx={{ ml: 2 }}
              disabled={!isOtpVerified}
              required
              onChange={handleInputChangeAppreciation}
            />
          )}
        </div>

        <div className="formInputGroup">
          <FormControl sx={{ minWidth: 120 }} disabled={!isOtpVerified}>
            <Select
              value={formDataAppreciation.positiveAspects}
              required
              onChange={handleInputChangeAppreciation}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select Positive Aspects
              </MenuItem>
              <MenuItem value={"OPTION 1"}>OPTION 1</MenuItem>
              <MenuItem value={"OPTION 2"}>OPTION 2</MenuItem>
              <MenuItem value={"OPTION 3"}>OPTION 3</MenuItem>
              <MenuItem value={"OPTION 4"}>OPTION 4</MenuItem>-
            </Select>
          </FormControl>
        </div>

        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Write Your Experience"
            variant="outlined"
            required
            type="textArea"
            name="experience"
            onChange={handleInputChangeAppreciation}
            sx={{ width: 650 }}
            disabled={!isOtpVerified}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
          <Rating
            name="hover-feedback"
            value={formDataAppreciation.value}
            precision={0.5}
            style={{color:"black"}}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              dispatch(setFormDataAppreciation({ [value]: newValue }));
            }}
            onChangeActive={(event, newHover) => {
              dispatch(setFormDataAppreciation({ [value]: newHover }));
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            disabled={!isOtpVerified}
          />
          {formDataAppreciation.value !== null && (
            <Box sx={{ ml: 2 }}  style={{color:"black"}} >
              {
                labels[
                  formDataAppreciation.hover !== -1
                    ? formDataAppreciation.hover
                    : formDataAppreciation.value
                ]
              }
            </Box>
          )}
        </Box>
      </div>

      <Button
        variant="contained"
        sx={{ minWidth: 120, minHeight: 30 }}
        required
        disabled={!isOtpVerified}
      >
        Submit
      </Button>
    </form>
  );
}
