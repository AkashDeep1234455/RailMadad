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

  let [formDataTrain, setFormDataTrain] = useState({
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

  let handleInputChangeTrain = (event) => {
    setFormDataTrain((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };


  let handleSubmitTrain = (event) => {
    console.log(formDataTrain);

    event.preventDefault();

    setFormDataTrain({
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
    <form onSubmit={handleSubmitTrain}>
      <div className="formData">
        <div className="formInputGroup">
          <TextField
            id="outlined-basic"
            label="Mobile No."
            name="mobileNo"
            variant="outlined"
            sx={{ minWidth: 200 }}
            required
            onChange={handleInputChangeTrain}
            disabled={isOtpVerified}
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
              onChange={handleInputChangeTrain}
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
          <TextField
            id="outlined-basic"
            label="PNR No."
            name="pnrNo"
            variant="outlined"
            sx={{ ml: 2 }}
            required
            onChange={handleInputChangeTrain}
            disabled={!isOtpVerified}
          />
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
              onChange={(newValue) => setSelectedDateTime(newValue)}
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
            // size='small'
            required
            type="file"
            // onChange={handleInputChange}
            // value={formData.image}
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
            // size='small'
            required
            type="file"
            // onChange={handleInputChange}
            // value={formData.image}
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
            // size='small'
            required
            type="textArea"
            // onChange={handleInputChange}
            // value={formData.image}
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
