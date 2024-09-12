import React, { StrictMode } from 'react'; // Added React import
import { createRoot } from 'react-dom/client';
import Home from "./LandingPage/Home/Home.jsx"
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Provider} from "react-redux"
import {store} from "./redux/store.js"

// Define the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    // children:[
    //   {
    //     path:"/",
    //     element:<div>Hello</div>
    //   },
    // ]
  }
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);