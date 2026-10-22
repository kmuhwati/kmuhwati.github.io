import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/design-tokens.css";
import "./styles/reset.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
