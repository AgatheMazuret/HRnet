import React from "react";
import ReactDOM from "react-dom/client";
import App from "./router";
import "./index.css";

// Point d'entrée principal de l'application React
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Rendu de l'application dans le DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
