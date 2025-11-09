class DragZoneHelperMethods {
	static getHandleTouchStart(e) {
		return "";
	}

	static getHandleMouseStart(e, index, item) {
		e.preventDefault();
		touchedOrClicked = true;
		moved = false;
		itemWasDragged = false;

		startDrag(e.clientX, e.clientY, index, item);
	}

	static getHanldeTouchMove(e) {}

	static getHandleMouseMove(e) {}

	static handleTouchEnd(e) { }
	
	static handleMouseUp(e) { }

	
}

export default DragZoneHelperMethods;
