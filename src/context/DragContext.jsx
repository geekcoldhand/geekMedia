import React, { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
const DragContext = createContext();

export function useDragContext() {
	const context = useContext(DragContext);
	if (context === undefined) {
		throw new Error("useDragContext must be used within a DragProvider");
	}
	return context;
}
export function DragProvider({ children }) {
	const { projects } = useUserContext();

	const [itemStateAndPosition, setItemStateAndPosition] = useState({});
	const [projectContext, setProjectContext] = useState(projects);

	const [isMoved, setIsMoved] = useState(false);
	const [touchedOrClicked, setTouchedOrClicked] = useState(false);
	const [itemWasDragged, setItemWasDragged] = useState(false);

	const value = {
		itemStateAndPosition,
		setItemStateAndPosition,
		projectContext,
		setProjectContext,
		isMoved,
		setIsMoved,
		touchedOrClicked,
		setTouchedOrClicked,
		itemWasDragged,
		setItemWasDragged,
	};

	return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
}

export default DragProvider;
