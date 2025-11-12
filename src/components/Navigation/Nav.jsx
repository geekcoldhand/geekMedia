import React from "react";
import { useWindowContext } from "../../context/WindowContext";

const Nav = () => {
	const { app, setApp } = useWindowContext();
	const handleApplicationClick = (e) => {
		setApp(e.target.id);
	};

	return (
		<div>
			<nav className="nav-bar">
				{" "}
				<img
					id="Finder"
					src={`${process.env.PUBLIC_URL}/images/Icons/finder.png`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Paint"
					src={`${process.env.PUBLIC_URL}/images/Icons/script.png`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Launchpad"
					src={`${process.env.PUBLIC_URL}/images/Icons/launchpad.png`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Message"
					src={`${process.env.PUBLIC_URL}/images/Icons/imessages.png`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Terminal"
					src={`${process.env.PUBLIC_URL}/images/Icons/terminal.png`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>
			</nav>
		</div>
	);
};

export default Nav;
