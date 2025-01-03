import react from "react";
import eyeglasses from "../images/eyeglasses.svg";

const TopDock = () => {

    let date = new Date().getUTCDate();
    let day = new Date().getDay().toLocaleString();
    let month = new Date().getMonth();
    return (
        <div className="top-dock">
            <div className="top-dock-right">
            <img src={eyeglasses} alt="logo" id="top-dock-logo"/>
            </div>
                <span className="top-dock-text">Geek Media</span> 
            <div className="top-dock-left">
              Horatious Harris II
            </div>
        </div>
    );
};
export default TopDock;