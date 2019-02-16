import React, { useState, useLayoutEffect, useEffect, memo } from 'react';
import './App.css';

const DragContainer = memo(({ dimension, cellSize }) => {
  const [Isclicking, setIsClicking] = useState(false);
  const [clickedCells, setClickedCells] = useState([]);
  const [totalBoxs, setTotalBoxs] = useState(0);
  const [clientY, setClientY] = useState(0);

  useEffect(() => {
    const floorWidth = Math.floor(dimension.width / cellSize);
    const floorHeight = Math.floor(dimension.height / cellSize);
    setTotalBoxs(floorWidth * floorHeight);
  }, [dimension]);

  const mouseDownHandler = e => {
    e.preventDefault();
    setIsClicking(true);
  };

  const mouseOverHandler = e => {
    e.preventDefault();
    if (!e.target.getAttribute('name')) return;
    const cell = Number(e.target.getAttribute('name'));
    const floorWidth = Math.floor(dimension.width / cellSize);
    let cellRange;

    if ((cell - floorWidth) % floorWidth === 0) {
      cellRange = [
        cell - 1,
        cell,
        cell + floorWidth,
        cell + floorWidth - 1,
        cell - floorWidth,
        cell - floorWidth - 1
      ];
    } else if ((cell - floorWidth) % floorWidth === 1) {
      cellRange = [
        cell,
        cell + 1,
        cell + floorWidth,
        cell + floorWidth + 1,
        cell - floorWidth,
        cell - floorWidth + 1
      ];
    } else {
      cellRange = [
        cell - 1,
        cell,
        cell + 1,
        cell + floorWidth,
        cell + floorWidth + 1,
        cell + floorWidth - 1,
        cell - floorWidth,
        cell - floorWidth + 1,
        cell - floorWidth - 1
      ];
    }

    if (Isclicking) {
      e.nativeEvent.clientY > clientY
        ? setClickedCells(prevState => [...prevState, ...cellRange])
        : setClickedCells(clickedCells.filter(el => !cellRange.includes(el)));
    }
  };

  const mouseUpHandler = e => {
    e.preventDefault();
    setIsClicking(false);
  };

  const mouseLeaveHandler = e => {
    e.preventDefault();
    setIsClicking(false);
  };

  const mouseMoveHandler = e => {
    e.preventDefault();
    setClientY(e.nativeEvent.clientY);
  };

  //console.log('[DragContainer] is rendered');
  return (
    <div
      className='DragContainer'
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseOver={mouseOverHandler}
      onMouseMove={mouseMoveHandler}
    >
      <Cells
        totalBoxs={totalBoxs}
        cellSize={cellSize}
        clickedCells={clickedCells}
      />
    </div>
  );
});

const Cells = memo(props => {
  let cells = [];
  for (let i = 1; i < props.totalBoxs + 1; i++) {
    cells.push(
      <div
        key={i}
        className='Cell-box'
        style={{
          width: `${props.cellSize}px`,
          height: `${props.cellSize}px`
        }}
      >
        <div
          name={i}
          style={
            props.clickedCells.find(el => el === i)
              ? { zIndex: `${props.totalBoxs - i}` }
              : null
          }
          className={
            props.clickedCells.find(el => el === i)
              ? `Cell Cell-clicked`
              : 'Cell'
          }
        />
      </div>
    );
  }
  return cells;
});

const App = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [isResizing, SetIsResizing] = useState(false);
  useLayoutEffect(() => {
    if (!isResizing) {
      window.addEventListener('resize', () => {
        SetIsResizing(true);
        setTimeout(() => {
          SetIsResizing(false);
        }, 2500);
      });
    }
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [isResizing]);
  return (
    <div className='App'>
      <DragContainer dimension={dimension} cellSize='35' />
    </div>
  );
};

export default App;
