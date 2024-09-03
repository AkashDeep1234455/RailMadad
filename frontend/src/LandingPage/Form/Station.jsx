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

export default function Train() {
  const [pnr, setPnr] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  let [formDataStation, setFormDataStation] = useState({
    mobileNo: "",
    pnrNo: "",
    dateAndTime: "",
    image1: "",
    image2: "",
    grievanceDescription: "",
  });

  const handleChange = (event) => {
    setPnr(event.target.value);
  };

  let handleInputChangeStation = (event) => {
    setFormDataTrain((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmitStation = (event) => {
    console.log(formDataTrain);

    event.preventDefault();

    setFormDataStation({
      mobileNo: "",
      pnrNo: "",
      dateAndTime: "",
      image1: "",
      image2: "",
      grievanceDescription: "",
    });
  };

  const handleGetOtp = () => {
    setIsOtpRequested(true);
  };

  const handleVerifyOtp = () => {
    setIsOtpVerified(true);
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
              onChange={(newValue) => setSelectedDateTime(newValue)}
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
            // size='small'
            required
            type="textArea"
            // onChange={handleInputChange}
            // value={formData.image}
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
          <TextField
            id="outlined-basic"
            label="PNR No."
            variant="outlined"
            required
          />
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
            disabled={isOtpVerified}
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
              onChange={handleInputChangeStation}
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
