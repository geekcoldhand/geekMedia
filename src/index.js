import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import logo from "./images/logo.svg";
import Nav from "./componets/Nav";
import DragZone from "./componets/DragZone";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
      </header>
      <DragZone/>
        <Nav/>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  </React.StrictMode>
);
