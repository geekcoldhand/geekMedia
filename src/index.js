import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
	createRoutesFromElements,
	createHashRouter,
	Route,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import LockScreen from "./components/LockScreen/LockScreen";
import Nav from "./components/Navigation/Nav";
import DragZone from "./components/DragZone/DragZone";
import UserProvider from "./context/UserContext";
import {DragProvider} from "./context/DragContext";
import SplashPage from "./components/SplashPage/SplashPage";
import TopDock from "./components/Navigation/TopDock";

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
			</div>
			<div id="main-content" className="App hidden">
				<TopDock />
				<DragZone />
				<Nav />
			</div>
		</div>
	);
};
const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<LockScreen />} />
			<Route path="/home" element={<App />} />
		</>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UserProvider>
			<DragProvider>
				<RouterProvider router={router} />
			</DragProvider>
		</UserProvider>
	</React.StrictMode>
);
