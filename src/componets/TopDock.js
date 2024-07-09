import react from "react";
import eyeglasses from "../images/eyeglasses.svg";

const TopDock = () => {


    return (
        <div className="top-dock">
            <div className="top-dock-right">
            <img src={eyeglasses} alt="logo" className="top-dock-logo"/>
                <span className="top-dock-text">Geek Media</span> 
            </div>
            <div className="top-dock-left">
                Mon, 25 Aug11:47 PM
            </div>
        </div>
    );
};
export default TopDock;