import React from "react";
import trioLogo from "../images/trioLogo.svg";

const SplashPage = () => {
    return (
      <div className="splash-container">
        <div
          className="splash-logo">
          <img src={trioLogo} width={300} height={300} alt="logo"/>
  
          </div>
      
      </div>
    );
  };
  
  export default SplashPage;