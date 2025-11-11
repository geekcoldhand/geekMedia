export class DragZoneStateManager {
	static isStateDragging(
		moveClientX,
		moveClientY,
		context,
		dragItemsRef,
		containerRef
	) {
		const { setItemStateAndPosition } = context;

		setItemStateAndPosition((prevState) => {
			const newState = { ...prevState };
			Object.keys(newState).forEach((key) => {
				const state = newState[key];
				if (state.isDragging) {
					const item = dragItemsRef.current[Number(key)];
					if (!item || !containerRef.current) return;

					const x = moveClientX - state.offsetX;
					const y = moveClientY - state.offsetY;

					const maxX = containerRef.current.offsetWidth - item.offsetWidth;
					const maxY = containerRef.current.offsetHeight - item.offsetHeight;

					item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
					item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
				}
			});
			return newState;
		});
	}

	static startDrag(e, index, item, context) {
		const {
			setItemStateAndPosition,
			touchedOrClickedRef,
			itemWasDraggedRef,
			movedRef,
		} = context;

		e.preventDefault();
		touchedOrClickedRef.current = true;
		itemWasDraggedRef.current = false;
		movedRef.current = false;

		const moveClientX = e.clientX ?? e.touches?.[0]?.clientX;
		const moveClientY = e.clientY ?? e.touches?.[0]?.clientY;

		setItemStateAndPosition((prev) => ({
			...prev,
			[index]: {
				isDragging: true,
				offsetX: moveClientX - item.offsetLeft + 2,
				offsetY: moveClientY - item.offsetTop + 1,
			},
		}));
	}

	static moveDrag(e, context, dragItemsRef, containerRef) {
		const {
			itemStateAndPosition,
			setItemStateAndPosition,
			touchedOrClickedRef,
			itemWasDraggedRef,
			movedRef,
		} = context;
		if (!touchedOrClickedRef.current) return;

		e.preventDefault();
		itemWasDraggedRef.current = true;
		movedRef.current = true;

		const moveClientX = e.clientX ?? e.touches?.[0]?.clientX;
		const moveClientY = e.clientY ?? e.touches?.[0]?.clientY;

		setItemStateAndPosition((prev) => {
			const newState = { ...prev };
			Object.keys(newState).forEach((key) => {
				const state = newState[key];
				if (state.isDragging) {
					const item = dragItemsRef.current[Number(key)];
					if (!item || !containerRef.current) return;
					const x = moveClientX - state.offsetX;
					const y = moveClientY - state.offsetY;
					const maxX = containerRef.current.offsetWidth - item.offsetWidth;
					const maxY = containerRef.current.offsetHeight - item.offsetHeight;

					item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
					item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
				}
			});
			return newState;
		});
	}

	static endDrag(e, context, handleAddMetaDataHelper) {
		const { setItemStateAndPosition, touchedOrClickedRef, itemWasDraggedRef } =
			context;

		e.preventDefault();
		const wasDragged = itemWasDraggedRef.current;

		setItemStateAndPosition((prev) => {
			const newState = { ...prev };
			Object.keys(newState).forEach((key) => {
				newState[key].isDragging = false;
			});
			return newState;
		});

		if (!wasDragged && touchedOrClickedRef.current) handleAddMetaDataHelper(e);

		touchedOrClickedRef.current = false;
		itemWasDraggedRef.current = false;
	}
}
