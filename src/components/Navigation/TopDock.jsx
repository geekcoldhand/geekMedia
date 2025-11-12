import react from "react";
import { Link } from "react-router";

const TopDock = () => {
	const month = new Date().toDateString();
	return (
		<div className="top-dock">
			<div className="top-dock-right"></div>
			<span className="top-dock-text">Horatious Harris II</span>
			<div className="top-dock-left"> </div>
		</div>
	);
};
export default TopDock;
