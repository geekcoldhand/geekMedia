import React from "react";
import logo from "../images/logo.svg";
import linkedin from "../images/linkedin.svg";
import youtube from "../images/youtube.svg";
import instagram from "../images/instagram.svg";
import folder from "../images/Folder.svg";
import github from "../images/github.svg";
import trioLogo from "../images/trioLogo.svg";

const Nav = () => {
    return (
        <div>
            <nav className=" nav-bar">
                    
                    <a href="#"> <img src={trioLogo} width={50} height={50} alt="logo"/></a>
                    <a href="#"> <img src={youtube} width={50} height={50} alt="logo"/></a>
                    <a href="#"> <img src={instagram} width={50} height={50} alt="logo"/></a>
                    <a href="#"> <img src={github} width={50} height={50} alt="logo"/></a>
                    <a href="#"> <img src={linkedin} width={50} height={50} alt="logo"/></a>
                    <a href="#"> <img src={folder} width={50} height={50} alt="logo"/></a>
            </nav>
        </div>
    );
};

export default Nav;
