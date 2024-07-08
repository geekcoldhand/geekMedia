import React, { useEffect, useRef, useState } from 'react';
import blueLogo from '../images/blueLogo.png';
import redLogo from '../images/redLogo.png';
import orangeLogo from '../images/orangeLogo.png';

const DragZone = () => {
  const containerRef = useRef(null);
  const dragItemsRef = useRef([]);
  const [itemStateAndPosition, setItemStateAndPosition] = useState({});

    
    let count = 90;
    const alignItemPosition = (item) => {
    count = count + 70;
    const container = containerRef.current;
    const containerBoundsRect = container.getBoundingClientRect();
    const maxY = containerBoundsRect.height - item.offsetHeight - count;

    item.style.top = `${maxY}px`;
  };

  const populateBoxesWithDelay = (items) => {
    items.forEach((item, index) => {
      setTimeout(() => {
        alignItemPosition(item);
      }, index * 100);
    });
  };

  const handleAddMetaData = (e) => {
    e.preventDefault();
   // window.open('https://');
  };

  const startDrag = (moveClientX, moveClientY, index, item) => {
    setItemStateAndPosition((prevState) => ({
      ...prevState,
      [index]: {
        isDragging: true,
        offsetX: moveClientX - item.offsetLeft,
        offsetY: moveClientY - item.offsetTop,
      },
    }));
  };

  const isStateDragging = (moveClientX, moveClientY) => {
    setItemStateAndPosition((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        const state = newState[key];
        if (state.isDragging) {
          const item = dragItemsRef.current[key];
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

  let moved = false;
  let touchedOrClicked = false;
  let itemWasDragged = false;

  const handleMouseDown = (e, index, item) => {
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;
    item.classList.add('grow-on-drag');
    startDrag(e.clientX, e.clientY, index, item);
  };

  const handleTouchStart = (e, index, item) => {
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;
    item.classList.add('grow-on-drag');
    startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
  };

  useEffect(() => {
    dragItemsRef.current = document.querySelectorAll('.box');
    const container = containerRef.current;

    // Populate boxes with delay on mount
    populateBoxesWithDelay(dragItemsRef.current);

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
      if (!moved) {
        handleAddMetaData(e);
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
      if (!moved) {
        handleAddMetaData(e);
      }
      touchedOrClicked = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchend', handleTouchEnd);

    dragItemsRef.current.forEach((item, index) => {
      item.addEventListener('mousedown', (e) => handleMouseDown(e, index, item));
      item.addEventListener('touchstart', (e) => handleTouchStart(e, index, item));
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchend', handleTouchEnd);

      dragItemsRef.current.forEach((item, index) => {
        item.removeEventListener('mousedown', (e) => handleMouseDown(e, index, item));
        item.removeEventListener('touchstart', (e) => handleTouchStart(e, index, item));
      });
    };
  }, []);

    return (
      <div id="container" ref={containerRef}>
        <div className='macos-button-box'>
          <button className="macos-buttons red"></button>
          <button className="macos-buttons green"></button>
          <button className="macos-buttons yellow"></button>
        </div>
        <img className="box" src={blueLogo} alt="logo" />
        <img className="box" src={redLogo} alt="logo" />
        <img className="box" src={orangeLogo} alt="logo" />
       
        {/* Add more boxes as needed */}
      </div>
    );

}

export default DragZone