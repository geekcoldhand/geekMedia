import React from "react";

const Nav = () => {
	return (
		<div>
			<nav className="nav-bar">
				<a
					href="https://www.youtube.com/channel/UCcesTsu0RH9FxMKHbFh9RWA"
					fill="white"
				>
					{" "}
					<img
						src={`${process.env.PUBLIC_URL}/images/Icons/youtube.svg`}
						className="docker-links"
						alt="logo"
					/>
				</a>
				<a href="https://www.instagram.com/gwach_shop/">
					{" "}
					<img
						src={`${process.env.PUBLIC_URL}/images/Icons/instagram.svg`}
						className="docker-links"
						alt="logo"
					/>
				</a>
				<a href="https://github.com/geekcoldhand">
					{" "}
					<img
						src={`${process.env.PUBLIC_URL}/images/Icons/github.svg`}
						className="docker-links"
						alt="logo"
					/>
				</a>
				<a href="https://www.linkedin.com/in/horatious-harris-41970a159/">
					{" "}
					<img
						src={`${process.env.PUBLIC_URL}/images/Icons/linkedin.svg`}
						className="docker-links"
						alt="logo"
					/>
				</a>
				<a href="#">
					{" "}
					<img
						src={`${process.env.PUBLIC_URL}/images/Icons/Folder.svg`}
						className="docker-links"
						alt="logo"
					/>
				</a>
			</nav>
		</div>
	);
};

export default Nav;
