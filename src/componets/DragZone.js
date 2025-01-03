import React, { useEffect, useRef, useState } from 'react';
import blueLogo from '../images/blueLogo.png';
import redLogo from '../images/redLogo.png';
import orangeLogo from '../images/orangeLogo.png';

const DragZone = () => {
  const containerRef = useRef(null);
  const dragItemsArray = useRef(document.querySelectorAll('.box'));
  const [dragItemStateAndPositionObj, setDragItemStateAndPosition] = useState({});
  const [isImageBeingAdded, setIsImageBeingAdded] = useState(false);

  let count = 190;

  const loadDragItemToTop = (loadItem) => {
    if (!loadItem) {
      console.error("Item not found in alignItemPosition.");
      return;
    }
    count = count + 50;
    const container = containerRef.current;
    const containerBoundsRect = container.getBoundingClientRect();
    const maxY = containerBoundsRect.height - loadItem.offsetHeight - count;

    loadItem.style.top = `${maxY}px`;
  };

  const populateBoxesWithDelay = (dragArray) => {
    dragArray.forEach((dragItem, index) => {
      setTimeout(() => {
        loadDragItemToTop(dragItem);
      }, index * 100);
    });
  };

  const handleAddMetaData = (e) => {
    e.preventDefault();
    // window.open('https://');
  };

  const startDrag = (moveClientX, moveClientY, element) => { // Updated to accept element directly
    const index = dragItemsArray.current.indexOf(element);
    if (index!== -1) {
      setDragItemStateAndPosition((prevState) => ({
       ...prevState,
        [index]: {
          isDragging: true,
          offsetX: moveClientX - element.offsetLeft + 19,
          offsetY: moveClientY - element.offsetTop + 29,
        },
      }));
    } else {
      console.error(`Item not found in dragItemsArray.`);
    }
  };

  const updateItemDraggingState = (targetClientX, targetCleintY) => {
    setDragItemStateAndPosition((prevState) => {

      const updatedState = { ...prevState };
      Object.keys(updatedState).forEach((key) => {

        const currState = updatedState[key];
        if (currState.isDragging) {
          const currItem = dragItemsArray.current[key];
          const x = targetClientX - currState.offsetX;
          const y = targetCleintY - currState.offsetY;

          const maxX = containerRef.current.offsetWidth - currItem.offsetWidth;
          const maxY = containerRef.current.offsetHeight - currItem.offsetHeight;

          currItem.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
          currItem.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
        }
      });
      return updatedState;
    });
  };

  let moved = false;
  let touchedOrClicked = false;
  let itemWasDragged = false;

  const handleMouseDown = (e, element) => { // Updated to accept element directly
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;
    //element.classList.add('grow-on-drag');
    startDrag(e.clientX, e.clientY, element);
  };

  const handleTouchStart = (e, element) => { // Updated to accept element directly
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;
    //element.classList.add('grow-on-drag');
    startDrag(e.touches[0].clientX, e.touches[0].clientY, element);
  };

  useEffect(() => {
    const originalBoxes = containerRef.current.querySelectorAll('.box');
    originalBoxes.forEach((box) => {
      box.addEventListener('mousedown', (e) => handleMouseDown(e, box));
      box.addEventListener('touchstart', (e) => handleTouchStart(e, box));
    });

    dragItemsArray.current = Array.from(containerRef.current.children).filter((child) => child.className === 'box');
    const container = containerRef.current;
    const addImageButtonRef = document.getElementById('add-image-button');
  
    // Populate dragItemsRef.current with the elements
    dragItemsArray.current = Array.from(containerRef.current.children).filter((child) => child.className === 'box');

    // Populate boxes with delay on mount
    populateBoxesWithDelay(dragItemsArray.current);

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (touchedOrClicked) {
        itemWasDragged = true;
        moved = true;
        updateItemDraggingState(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (touchedOrClicked) {
        itemWasDragged = true;
        moved = true;
        updateItemDraggingState(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseUp = (e) => {
      e.preventDefault();
      if (itemWasDragged) {
        setDragItemStateAndPosition((prevState) => {
          const newState = { ...prevState };
          Object.keys(newState).forEach((key) => {
            newState[key].isDragging = false;
          });
          return newState;
        });
      }
      if (!moved) {
        handleAddMetaData(e);
      }
      touchedOrClicked = false;
    };

    const handleTouchEnd = (e) => {
      if (itemWasDragged) {
        setDragItemStateAndPosition((prevState) => {
          const newState = { ...prevState };
          Object.keys(newState).forEach((key) => {
            newState[key].isDragging = false;
          });
          return newState;
        });
      }
      if (!moved) {
        handleAddMetaData(e);
      }
      touchedOrClicked = false;
    };

   
    const handleAddImage = (e) => {
      if (!isImageBeingAdded) { // Check if an image is already being added
        setIsImageBeingAdded(true);
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.addEventListener('change', (e) => {
          const file = fileInput.files[0];
          const reader = new FileReader();

          reader.addEventListener('load', (event) => {
            const imageElement = document.createElement('img');
            imageElement.src = event.target.result;
            imageElement.className = 'box';
  
            imageElement.addEventListener('mousedown', (e) => handleMouseDown(e, imageElement));
            imageElement.addEventListener('touchstart', (e) => handleTouchStart(e, imageElement));
          
            containerRef.current.appendChild(imageElement);
            dragItemsArray.current = Array.from(containerRef.current.children).filter((child) => child.className === 'box');
            setIsImageBeingAdded(false); // Reset state after image addition
          });

          reader.readAsDataURL(file);
        });

        fileInput.click();
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchend', handleTouchEnd);
    addImageButtonRef.addEventListener('click', handleAddImage);
    addImageButtonRef.addEventListener('touchstart', handleAddImage);

    
    // Remove event listeners when component unmounts
    dragItemsArray.current.forEach((item, index) => {
      item.addEventListener('mousedown', (e) => handleMouseDown(e, index));
      item.addEventListener('touchstart', (e) => handleTouchStart(e, index));
    });
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchend', handleTouchEnd);
    
      dragItemsArray.current.forEach((item, index) => {
        item.removeEventListener('mousedown', (e) => handleMouseDown(e, index));
        item.removeEventListener('touchstart', (e) => handleTouchStart(e, index));
      });
    };
    }, []);
    
    return (
      <div id="container" ref={containerRef}>
    
        <div className='macos-button-box'>
          <button className="macos-buttons red"></button>
          <button className="macos-buttons green"></button>
          <button className="macos-buttons yellow"></button>
          <span className="macos-text"> Featured Projects</span>
        </div>
        <button id="add-image-button" >Add Image</button>
        <img className="box" src={blueLogo} alt="logo" />
        <img className="box" src={redLogo} alt="logo" />
        <img className="box" src={orangeLogo} alt="logo" />
       
        {/* Add more boxes as needed */}
      </div>
    );
    
    };
    
    export default DragZone;