import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
	createRoutesFromElements,
	createBrowserRouter,
	createHashRouter,
	Route,
	Router,
	RouterProvider,
	Routes,
} from "react-router-dom";
import "./index.css";
import LockScreen from "./components/LockScreen/LockScreen";
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
			</div>
			<div id="main-content" className="App hidden">
				<TopDock />
				<DragZone></DragZone>
				<Nav />
			</div>
		</div>
	);
};
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="geekMedia/" element={<LockScreen />} />
			<Route path="geekMedia/home" element={<App />} />
		</>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
