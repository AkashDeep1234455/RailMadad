// import "./Form.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrain } from "@fortawesome/free-solid-svg-icons";
// import { faBuilding } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import Train from "./Train";
// import Station from "./Station";
// import {Route, Routes, NavLink, BrowserRouter as Router} from "react-router-dom"

// export default function Form() {
//   const [selectedForm, setSelectedForm] = useState("Train");

//   const handleFormChange = (formType) => {
//     setSelectedForm(formType);
//     setIsOtpRequested(false);
//     setIsOtpVerified(false);
//   };

//   return (
//     <div className="Form">
//       <div className="formContainer">

//         <div className="fromComp">
//           <NavLink
//             to='/'
//             className="formCompButton"
//             onClick={() => handleFormChange("Train")}
//           >
//             <FontAwesomeIcon
//               className="formCompIcon"
//               style={{ fontSize: "2rem" }}
//               icon={faTrain}
//             />
//             Train
//           </NavLink>
//           <NavLink
//             to = '/station'
//             className="formCompButton"
//             onClick={() => handleFormChange("Station")}
//           >
//             <FontAwesomeIcon
//               className="formCompIcon"
//               style={{ fontSize: "2rem" }}
//               icon={faBuilding}
//             />
//             Station
//           </NavLink>
//           <NavLink to='/apprciation' className="formCompButton">
//             <FontAwesomeIcon
//               className="formCompIcon"
//               style={{ fontSize: "2rem" }}
//               icon={faBuilding}
//             />
//             Apperciation/Rail Anubhav
//           </NavLink>
//           <NavLink to='/enquiry' className="formCompButton">
//             <FontAwesomeIcon
//               className="formCompIcon"
//               style={{ fontSize: "2rem" }}
//               icon={faBuilding}
//             />
//             Enquiry
//           </NavLink>
//           <NavLink to='/tract-query' className="formCompButton">
//             <FontAwesomeIcon
//               className="formCompIcon"
//               style={{ fontSize: "2rem" }}
//               icon={faBuilding}
//             />
//             Track Your Concern
//           </NavLink>
//           <NavLink to='/suggestion' className="formCompButton">
//             <FontAwesomeIcon
//               className="formCompIcon"
//               style={{ fontSize: "2rem" }}
//               icon={faBuilding}
//             />
//             Suggestions
//           </NavLink>
//         </div>
//         <Routes>
//           <Route path="/" element={<Train />} />
//           <Route path="/station" element={<Station />} />
//           <Route path="/*" element={<Train/>} />
//         </Routes>

//       </div>
//     </div>
//   );
// }


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