import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";

export default function Navbar() {
  const [language, setLanguage] = useState("");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="Navbar">
      {/* Left Section */}
      <div className="leftNavbar">
        <img
          src="https://railmadad.indianrailways.gov.in/madad/final/images/logog20.png"
          alt=""
        />

        <div className="logo">
          <p className="RailMadadL">RailSevak</p>
          <p className="CaptionL">For Inquiry, Assistance & Grievance Redressal</p>
        </div>
      </div>

      {/* Helpline Section */}
      <div className="helplineSection">
        <div className="helpline">
          <FontAwesomeIcon className="icon" icon={faPhoneVolume} />
          <p>139</p>
        </div>

        <p>for Security/Medical Assistance</p>
      </div>

      {/* Right Section */}
      <div className="rightNavbar">
        <button>Log In</button>
        <button>Sign Up</button>

        {/* Language Selector */}
        <FormControl
          sx={{
            m: 1,
            width: "7.5rem"
          }}

        >
          <InputLabel
            id="Language"
            sx={{
                width: '100%', // Full width for Select
                alignSelf: 'center', // Center Select horizontally
              }}
          >
            Language
          </InputLabel>

          <Select
            labelId="Language"
            id="demo-simple-select-helper"
            value={language}
            label="Language"
            onChange={handleChange}
            sx={{
              width: '100%', // Full width for Select
              alignSelf: 'center', // Center Select horizontally
            }}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </Select>

        </FormControl>
      </div>
    </div>
  );
}
