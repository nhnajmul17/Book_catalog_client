/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
