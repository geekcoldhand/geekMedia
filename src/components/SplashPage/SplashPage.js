import React from "react";

const SplashPage = () => {
	return (
		<div className="splash-container">
			<div className="splash-logo">
				<img
					src={`${process.env.PUBLIC_URL}/images/trioLogo.svg`}
					width={300}
					height={300}
					alt="logo"
				/>
			</div>
		</div>
	);
};

export default SplashPage;
