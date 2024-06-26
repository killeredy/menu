import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ActionStateProvider } from "./Provider/ActionStateProvider.jsx";

const doom = document.createElement("div");
doom.id = "root-menu";
document.getElementsByTagName("body")[0].append(doom);

setTimeout(function () {
  ReactDOM.createRoot(doom).render(
    <React.StrictMode>
        <App />     
    </React.StrictMode>
  );
}, 10);
