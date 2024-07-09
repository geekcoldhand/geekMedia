
import React, { useEffect } from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import logo from "./images/logo.svg";
import Nav from "./componets/Nav";
import DragZone from "./componets/DragZone";
import SplashPage from "./componets/SplashPage";
import TopDock from "./componets/TopDock";




const App = () => {
  useEffect(() => {
    const splash = document.getElementById('splash');
    const mainContent = document.getElementById('main-content');
    splash.style.display = 'flex';

    setTimeout(() => {
      splash.style.display = 'none';
      mainContent.style.display = 'flex';
    }, 2500); 
  }, []);

  return (
    <div>
      <div id="splash" className="splash-container">
        <SplashPage />
      </div>
      <div id="main-content" className="App hidden">
        
        <TopDock />
        <DragZone />
        <Nav />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
