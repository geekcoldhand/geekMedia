import { useEffect, useRef, useState } from "react";
import { useDragContext } from "../../context/DragContext";
import data from "../../data/project_data";
import "./Desktop.css";
import { DragZoneStateManager } from "./DragZoneStateManager";
import { UserIcon } from "../DesktopIcons/UserIcon";

const DragZone = () => {
	const projects = data;
	const {
		itemStateAndPosition,
		setItemStateAndPosition,
		movedRef,
		itemWasDraggedRef,
		touchedOrClickedRef,
	} = useDragContext();

	const containerRef = useRef(null);
	const dragItemsRef = useRef([]);
	const [projectContext, setProjectContext] = useState(projects);

	let pixelSpacing = 80;
	let verticalSpace = 90;

	const loadDragItemToTop = (loadItem) => {
		if (!loadItem) {
			console.error("Item not found in alignItemPosition.");
			return;
		}
		pixelSpacing += 50;
		const container = containerRef.current;
		const containerBoundsRect = container.getBoundingClientRect();
		const maxY =
			containerBoundsRect.height - loadItem.offsetHeight - pixelSpacing;

		loadItem.style.top = `${verticalSpace}px`;
		loadItem.style.left = "20px";
		verticalSpace += 50;
	};

	const populateBoxesWithDelay = () => {
		dragItemsRef.current.forEach((dragItem, index) => {
			if (dragItem) {
				setTimeout(() => {
					loadDragItemToTop(dragItem);
				}, index * 100);
			}
		});
	};

	const handleAddMetaDataHelper = (e) => {
		e.preventDefault();
		if (!e.target) return;
		window.open(e.target.dataset.link);
	};

	const handleMouseDown = (e, index, item) => {
		DragZoneStateManager.startDrag(e, index, item, {
			setItemStateAndPosition,
			touchedOrClickedRef,
			itemWasDraggedRef,
			movedRef,
		});
	};

	const handleTouchStart = (e, index, item) => {
		DragZoneStateManager.startDrag(e, index, item, {
			setItemStateAndPosition,
			touchedOrClickedRef,
			itemWasDraggedRef,
			movedRef,
		});
	};

	useEffect(() => {
		dragItemsRef.current = dragItemsRef.current.slice(0, projectContext.length);

		setTimeout(() => {
			populateBoxesWithDelay();
		}, 100);

		const container = containerRef.current;

		const handleMouseMove = (e) => {
			e.preventDefault();
			if (touchedOrClickedRef.current) {
				itemWasDraggedRef.current = true;
				movedRef.current = true;
				DragZoneStateManager.isStateDragging(
					e.clientX,
					e.clientY,
					{
						setItemStateAndPosition,
					},
					dragItemsRef,
					containerRef
				);
			}
		};

		const handleTouchMove = (e) => {
			e.preventDefault();
			if (touchedOrClickedRef.current) {
				itemWasDraggedRef.current = true;
				movedRef.current = true;
				const touch = e.touches[0];
				DragZoneStateManager.isStateDragging(
					touch.clientX,
					touch.clientY,
					{
						setItemStateAndPosition,
					},
					dragItemsRef,
					containerRef
				);
			}
		};

		const handleMouseUp = (e) => {
			DragZoneStateManager.endDrag(
				e,
				{
					setItemStateAndPosition,
					touchedOrClickedRef,
					itemWasDraggedRef,
				},
				handleAddMetaDataHelper
			);
		};

		const handleTouchEnd = (e) => {
			DragZoneStateManager.endDrag(
				e,
				{
					setItemStateAndPosition,
					touchedOrClickedRef,
					itemWasDraggedRef,
				},
				handleAddMetaDataHelper
			);
		};

		container?.addEventListener("mousemove", handleMouseMove);
		container?.addEventListener("touchmove", handleTouchMove);
		container?.addEventListener("mouseup", handleMouseUp);
		container?.addEventListener("touchend", handleTouchEnd);

		const addEventListeners = () => {
			dragItemsRef.current.forEach((item, index) => {
				if (item) {
					item.addEventListener("mousedown", (e) =>
						handleMouseDown(e, index, item)
					);
					item.addEventListener("touchstart", (e) =>
						handleTouchStart(e, index, item)
					);
				}
			});
		};

		setTimeout(addEventListeners, 200);

		return () => {
			container?.removeEventListener("mousemove", handleMouseMove);
			container?.removeEventListener("touchmove", handleTouchMove);
			container?.removeEventListener("mouseup", handleMouseUp);
			container?.removeEventListener("touchend", handleTouchEnd);

			dragItemsRef.current.forEach((item, index) => {
				if (item) {
					item.removeEventListener("mousedown", (e) =>
						handleMouseDown(e, index, item)
					);
					item.removeEventListener("touchstart", (e) =>
						handleTouchStart(e, index, item)
					);
				}
			});
		};
	}, []);

	return (
		<div id="container" ref={containerRef} className="draggable-container">
			{projectContext.map((project, index) => (
				<UserIcon
					key={index}
					dragItemsRef={dragItemsRef}
					index={index}
					project={project}
				/>
			))}
		</div>
	);
};

export default DragZone;
