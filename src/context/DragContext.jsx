import React, { createContext, useContext, useState, useRef } from "react";
import { useUserContext } from "./WindowContext";
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

	const movedRef = useRef(false);
	const touchedOrClickedRef = useRef(false);
	const itemWasDraggedRef = useRef(false);

	const value = {
		itemStateAndPosition,
		setItemStateAndPosition,
		projectContext,
		setProjectContext,
		movedRef,
		touchedOrClickedRef,
		itemWasDraggedRef,
	};

	return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
}

export default DragProvider;
