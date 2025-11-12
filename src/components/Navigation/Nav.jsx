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
					src={`${process.env.PUBLIC_URL}/images/Icons/macLogo.png`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Paint"
					src={`${process.env.PUBLIC_URL}/images/Icons/instagram.svg`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Calculator"
					src={`${process.env.PUBLIC_URL}/images/Icons/github.svg`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Message"
					src={`${process.env.PUBLIC_URL}/images/Icons/linkedin.svg`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>{" "}
				<img
					id="Terminal"
					src={`${process.env.PUBLIC_URL}/images/Icons/Folder.svg`}
					className="docker-links"
					alt="logo"
					onClick={(e) => handleApplicationClick(e)}
				/>
			</nav>
		</div>
	);
};

export default Nav;
