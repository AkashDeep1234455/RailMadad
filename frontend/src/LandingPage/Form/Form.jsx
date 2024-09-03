import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Train from "./Train";
import Station from "./Station";

export default function Form() {
  const [selectedForm, setSelectedForm] = useState("Train");

  const handleFormChange = (formType) => {
    setSelectedForm(formType);
    setIsOtpRequested(false);
    setIsOtpVerified(false);
  };

  return (
    <div className="Form">
      <div className="formContainer">

        <div className="fromComp">
          <button
            className="formCompButton"
            onClick={() => handleFormChange("Train")}
          >
            <FontAwesomeIcon
              className="formCompIcon"
              style={{ fontSize: "2rem" }}
              icon={faTrain}
            />
            Train
          </button>
          <button
            className="formCompButton"
            onClick={() => handleFormChange("Station")}
          >
            <FontAwesomeIcon
              className="formCompIcon"
              style={{ fontSize: "2rem" }}
              icon={faBuilding}
            />
            Station
          </button>
          <button className="formCompButton">
            <FontAwesomeIcon
              className="formCompIcon"
              style={{ fontSize: "2rem" }}
              icon={faBuilding}
            />
            Apperciation/Rail Anubhav
          </button>
          <button className="formCompButton">
            <FontAwesomeIcon
              className="formCompIcon"
              style={{ fontSize: "2rem" }}
              icon={faBuilding}
            />
            Enquiry
          </button>
          <button className="formCompButton">
            <FontAwesomeIcon
              className="formCompIcon"
              style={{ fontSize: "2rem" }}
              icon={faBuilding}
            />
            Track Your Concern
          </button>
          <button className="formCompButton">
            <FontAwesomeIcon
              className="formCompIcon"
              style={{ fontSize: "2rem" }}
              icon={faBuilding}
            />
            Suggestions
          </button>
        </div>

        {/* Train  */}
        {selectedForm === "Train" && <Train />}

        {/* Station  */}
        {selectedForm === "Station" && <Station />}
      </div>
    </div>
  );
}
