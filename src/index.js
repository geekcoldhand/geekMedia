import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import  LockScreen  from "./components/LockScreen/LockScreen";
import Nav from "./components/Nav";
import DragZone from "./components/DragZone/DragZone";
import SplashPage from "./components/SplashPage/SplashPage";
import TopDock from "./components/TopDock";

const App = () => {
	useEffect(() => {
		const splash = document.getElementById("splash");
		const mainContent = document.getElementById("main-content");
		if (splash && mainContent) {
			splash.style.display = "flex";

			setTimeout(() => {
				splash.style.display = "none";
				mainContent.style.display = "flex";
			}, 1500);
		}
	}, []);

	return (
		<div>
			<div id="splash" className="splash-container">
				<SplashPage />
				<LockScreen />
			</div>
			<div id="main-content" className="App hidden">
				<TopDock />
				<DragZone />
				<Nav />
			</div>
		</div>
	);
};

//const root = ReactDOM.createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(
	document.getElementById("root") 
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
