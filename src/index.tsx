import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import UserSettings from "./UserSettings";
import NotFound from "./NotFound";
import {Provider} from "jotai";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import Terms from "./Terms";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: `/settings`,
      element: <UserSettings />,
    },
    {
      path: `/terms`,
      element: <Terms />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {basename: "/react-typescript-todo-app-001"}
);

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({colors});
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
