import React, { useState } from 'react';
import './App.css';

const DragContainer = () => {
  const [Isclicking, setIsClicking] = useState(false);
  const [clickedCells, setClickedCells] = useState([]);

  function mouseDownHandler(e) {
    e.preventDefault();
    setIsClicking(true);

    const cell = Number(e.target.getAttribute('name'));
    clickedCells.find(el => el === cell)
      ? setClickedCells(clickedCells.filter(el => el !== cell))
      : setClickedCells(prevState => [...prevState, cell]);
  }

  function mouseUpHandler(e) {
    e.preventDefault();
    setIsClicking(false);
    console.log(e.target.getAttribute('name'));
  }

  function mouseOverHandler(e) {
    e.preventDefault();
    const cell = Number(e.target.getAttribute('name'));
    if (Isclicking) {
      clickedCells.find(el => el === cell)
        ? setClickedCells(clickedCells.filter(el => el !== cell))
        : setClickedCells(prevState => [...prevState, cell]);
    }
  }

  function mouseLeaveHandler(e) {
    e.preventDefault();
    setIsClicking(false);
    console.log(e.target.getAttribute('name'));
  }

  let cells = [];
  for (let i = 1; i < 2000; i++) {
    cells.push(
      <div
        key={i}
        name={i}
        className={
          clickedCells.find(el => el === i) ? `Cell Cell-clicked` : 'Cell'
        }
      />
    );
  }

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
  return (
    <div className='App'>
      <DragContainer />
    </div>
  );
};

export default App;
