import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ExternalProvider } from "./Provider/ExternalProvider.jsx";



const doom = document.createElement("div");
doom.id = "root-menu";
document.getElementsByTagName("body")[0].append(doom);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.createRoot(doom).render(
    <React.StrictMode>
      <ExternalProvider>
        <App />     
      </ExternalProvider>
    </React.StrictMode>
  );
})
