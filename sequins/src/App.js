import React, { useState, useLayoutEffect, useEffect } from 'react';
import './App.css';

const DragContainer = ({ dimension, cellSize }) => {
  const [Isclicking, setIsClicking] = useState(false);
  const [clickedCells, setClickedCells] = useState([]);
  const [totalBoxs, setTotalBoxs] = useState(0);

  useEffect(() => {
    const floorWidth = Math.floor(dimension.width / cellSize);
    const floorHeight = Math.floor(dimension.height / cellSize);
    setTotalBoxs(floorWidth * floorHeight);
  }, [dimension]);

  const mouseDownHandler = e => {
    e.preventDefault();
    setIsClicking(true);

    const cell = Number(e.target.getAttribute('name'));
    const floorWidth = Math.floor(dimension.width / cellSize);
    const cellRange = [
      cell - 1,
      cell,
      cell + 1,
      cell + floorWidth,
      cell - floorWidth
    ];
    console.log([...cellRange]);
    clickedCells.find(el => el === cell)
      ? setClickedCells(clickedCells.filter(el => el !== cell))
      : setClickedCells(prevState => [...prevState, ...[...cellRange]]);
  };

  const mouseUpHandler = e => {
    e.preventDefault();
    setIsClicking(false);
  };

  const mouseOverHandler = e => {
    e.preventDefault();
    const cell = Number(e.target.getAttribute('name'));
    if (Isclicking) {
      clickedCells.find(el => el === cell)
        ? setClickedCells(clickedCells.filter(el => el !== cell))
        : setClickedCells(prevState => [...prevState, cell]);
    }
  };

  const mouseLeaveHandler = e => {
    e.preventDefault();
    setIsClicking(false);
  };

  let cells = [];
  for (let i = 1; i < totalBoxs + 1; i++) {
    cells.push(
      <div
        key={i}
        name={i}
        className={
          clickedCells.find(el => el === i) ? `Cell Cell-clicked` : 'Cell'
        }
        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
      />
    );
  }
  console.log('[DragContainer] is rendered');
  return (
    <div
      className='DragContainer'
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseOver={mouseOverHandler}
    >
      {cells}
    </div>
  );
};

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
      <DragContainer dimension={dimension} cellSize='15' />
    </div>
  );
};

export default App;
