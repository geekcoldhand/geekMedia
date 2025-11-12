import React, { createContext, useContext, useState } from "react";

const WindowContext = createContext();

export function useWindowContext() {
	const context = useContext(WindowContext);
	if (context === undefined) {
		throw new Error("useUserContext must be used within a WindowProvider");
	}
	return context;
}
export function WindowProvider({ children }) {
	const [app, setApp] = useState("");
	const [projects, setProjects] = useState([]);

	const value = {
		app,
		setApp,
		projects,
		setProjects,
	};

	return (
		<WindowContext.Provider value={value}>{children}</WindowContext.Provider>
	);
}

export default WindowProvider;
