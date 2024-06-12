import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.scss";
import App from "./App";
import { LanguageProvider } from "./hooks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);