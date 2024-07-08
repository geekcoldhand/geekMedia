import React from "react";
import logo from "../images/logo.svg";

const Nav = () => {
    return (
        <div>
            <nav className=" nav-bar">
                    <a className="navbar-brand" href="#">
                        geekMedia
                    </a>
                    <button
                        className="navbar-start-button"
                        type="button"
                    > 
                        <img src={logo} className="nav-logo" alt="logo" />
                    </button>
            </nav>
        </div>
    );
};

export default Nav;
