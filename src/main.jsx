import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


const doom = document.createElement("div");
doom.id = "root-menu";
document.getElementsByTagName("body")[0].append(doom);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.createRoot(doom).render(
    <React.StrictMode>
        <App />     
    </React.StrictMode>
  );
})
