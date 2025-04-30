import React from "react";
import linkedin from "../images/Icons/linkedin.svg";
import youtube from "../images/Icons/youtube.svg";
import instagram from "../images/Icons/instagram.svg";
import folder from "../images/Icons/Folder.svg";
import github from "../images/Icons/github.svg";

const Nav = () => {
    return (
        <div>
            <nav className="nav-bar">
                    
                    <a href="https://www.youtube.com/channel/UCcesTsu0RH9FxMKHbFh9RWA" fill="white"> <img src={youtube}  className="docker-links" alt="logo"/></a>
                    <a href="https://www.instagram.com/gwach_shop/"> <img src={instagram}  className="docker-links"alt="logo"/></a>
                    <a href="https://github.com/geekcoldhand"> <img src={github}  className="docker-links"alt="logo"/></a>
                    <a href="https://www.linkedin.com/in/horatious-harris-41970a159/"> <img src={linkedin}  className="docker-links" alt="logo"/></a>
                    <a href="#"> <img src={folder}  className="docker-links"alt="logo"/></a>
            </nav>
        </div>
    );
};

export default Nav;
