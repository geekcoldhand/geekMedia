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
            <nav className="nav-bar">
                    
            
                    <a href="https://www.youtube.com/channel/UCcesTsu0RH9FxMKHbFh9RWA" fill="white"> <img src={youtube} width={50} height={50} className="docker-links" alt="logo"/></a>
                    <a href="https://www.instagram.com/gwach_shop/"> <img src={instagram} width={50} height={50} className="docker-links"alt="logo"/></a>
                    <a href="https://github.com/geekcoldhand"> <img src={github} width={50} height={50} className="docker-links"alt="logo"/></a>
                    <a href="https://www.linkedin.com/in/horatious-harris-41970a159/"> <img src={linkedin} width={50} height={50} className="docker-links" alt="logo"/></a>
                    <a href="#"> <img src={folder} width={50} height={50} className="docker-links"alt="logo"/></a>
            </nav>
        </div>
    );
};

export default Nav;
