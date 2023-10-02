import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import UserSettings from "./UserSettings";
import NotFound from "./NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/react-typescript-todo-app-001/",
    element: <App />,
  },
  {
    path: `/react-typescript-todo-app-001/settings:username`,
    element: <UserSettings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
