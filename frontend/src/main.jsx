import React, { StrictMode } from "react"; // Added React import
import { createRoot } from "react-dom/client";
import Home from "./LandingPage/Home/Home.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";


// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
   
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </StrictMode>
);
