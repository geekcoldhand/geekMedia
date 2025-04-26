import react from "react";
import eyeglasses from "../images/eyeglasses.svg";
import { Link } from "react-router";


const TopDock = () => {
    const month = new Date().toDateString();
    return (
        <div className="top-dock">
            <div className="top-dock-right">
                <Link to="/">
                <img src={eyeglasses} alt="logo" id="top-dock-logo" />
                </Link>
                <div className="top-dock-date">
                    { " " + month }
                </div>
            </div>
                <span className="top-dock-text">Geek Media</span> 
            <div className="top-dock-left">
              Horatious Harris II
            </div>
        </div>
    );
};
export default TopDock;