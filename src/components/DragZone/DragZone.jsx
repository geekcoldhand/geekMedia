import React, { useEffect, useRef, useState } from "react";
import projectData from "../../context/project_data";
import "./DragZone.css";

const DragZone = () => {
  const containerRef = useRef(null);
  const dragItemsRef = useRef([]);
  const [itemStateAndPosition, setItemStateAndPosition] = useState({});
  const [projectContext, setProjectContext] = useState(projectData);

  let moved = false;
  let touchedOrClicked = false;
  let itemWasDragged = false;
  
  let pixelSpacing = 90;
  let verticalSpace = 100;
  const loadDragItemToTop = (loadItem) => {
    if (!loadItem) {
      console.error("Item not found in alignItemPosition.");
      return;
    }
    pixelSpacing = pixelSpacing + 50;
    const container = containerRef.current;
    const containerBoundsRect = container.getBoundingClientRect();
    const maxY =
      containerBoundsRect.height - loadItem.offsetHeight - pixelSpacing;


    loadItem.style.top = `${verticalSpace}px`;
    loadItem.style.left = "20px";
    verticalSpace += 90;
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
    console.log("handle meta daas funciton boiiii")
    // window.open('https://');
  };

  const handleMouseDown = (e, index, item) => {
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;

    startDrag(e.clientX, e.clientY, index, item);
  };

  const handleTouchStart = (e, index, item) => {
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;
    startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
  };

  const startDrag = (moveClientX, moveClientY, index, item) => {
    setItemStateAndPosition((prevState) => ({
      ...prevState,
      [index]: {
        isDragging: true,
        offsetX: moveClientX - item.offsetLeft + 2,
        offsetY: moveClientY - item.offsetTop + 1,
      },
    }));
  };

  const isStateDragging = (moveClientX, moveClientY) => {
    setItemStateAndPosition((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        const state = newState[key];
        if (state.isDragging) {
          if (!containerRef.current) return;
          const item = dragItemsRef.current[Number(key)]; // Convert key to number for indexing
          if (!item) return;
          
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
  };

  useEffect(() => {
    
    dragItemsRef.current = dragItemsRef.current.slice(0, projectContext.length);
    
    
    setTimeout(() => {
      populateBoxesWithDelay();
    }, 100);
    
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (touchedOrClicked) {
        itemWasDragged = true;
        moved = true;
        isStateDragging(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (touchedOrClicked) {
        itemWasDragged = true;
        moved = true;
        isStateDragging(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseUp = (e) => {
      e.preventDefault();
      if (itemWasDragged) {
        setItemStateAndPosition((prevState) => {
          const newState = { ...prevState };
          Object.keys(newState).forEach((key) => {
            newState[key].isDragging = false;
          });
          return newState;
        });
      }
      touchedOrClicked = false;
    };

    const handleTouchEnd = (e) => {
      if (itemWasDragged) {
        setItemStateAndPosition((prevState) => {
          const newState = { ...prevState };
          Object.keys(newState).forEach((key) => {
            newState[key].isDragging = false;
          });
          return newState;
        });
      }

      touchedOrClicked = false;
    };

    const handleDoubleClick = (e) => {
      handleAddMetaDataHelper(e);
      
    }

    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("touchmove", handleTouchMove);
    container?.addEventListener("mouseup", handleMouseUp);
    container?.addEventListener("touchend", handleTouchEnd);

    const addEventListeners = () => {
      dragItemsRef.current.forEach((item, index) => {
        if (item) {
          item.addEventListener("dblclick", (e) =>
            handleDoubleClick(e, index, item)
          );
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
          item.removeEventListener("dblclick", (e) =>
            handleDoubleClick(e, index, item)
          );
          item.removeEventListener("mousedown", (e) =>
            handleMouseDown(e, index, item)
          );
          item.removeEventListener("touchstart", (e) =>
            handleTouchStart(e, index, item)
          );
        }
      });
    };
  }, [projectContext]);

  return (
    <div id="container" ref={containerRef} className="draggable-container">
      <div className="macos-button-box">
        <button className="macos-buttons red"></button>
        <button className="macos-buttons green"></button>
        <button className="macos-buttons yellow"></button>
        <span className="macos-text"> Featured Projects</span>
      </div>
      <button id="add-image-button">Add Image</button>
      
      {projectContext.map((project, index) => (
        <div 
          key={index}
          className="draggable-item"
          ref={el => dragItemsRef.current[index] = el}
			  style={{ position: 'absolute' }}
        >
          <img
            src={project.image}
            alt={project.title || `Project ${index + 1}`}
            className="box project-image"
          />
          {project.name && <div className="project-title">{project.name}</div>}
        </div>
      ))}
    </div>
  );
};

export default DragZone;