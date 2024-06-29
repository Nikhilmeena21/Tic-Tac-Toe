import './App.css';
import React, { useState } from 'react';

function Square({ value, onClick, color }) {
  return (
    <button className="square" style={{ backgroundColor: color }} onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [colors, setColors] = useState(Array(9).fill('')); 
  const [winner, setWinner] = useState(null);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const newColors = colors.slice();
    newColors[i] = xIsNext ? '#d62728' : '#2980b9';
    setColors(newColors);

    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="board-container" style={{ backgroundColor: winner ? (winner === 'X' ? '#d62728' : '#2980b9') : ' #1a1a1a' }}>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} color={colors[0]} />
        <Square value={squares[1]} onClick={() => handleClick(1)} color={colors[1]} />
        <Square value={squares[2]} onClick={() => handleClick(2)} color={colors[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} color={colors[3]} />
        <Square value={squares[4]} onClick={() => handleClick(4)} color={colors[4]} />
        <Square value={squares[5]} onClick={() => handleClick(5)} color={colors[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} color={colors[6]} />
        <Square value={squares[7]} onClick={() => handleClick(7)} color={colors[7]} />
        <Square value={squares[8]} onClick={() => handleClick(8)} color={colors[8]} />
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <Board />
      <button className='reset' onClick={() => window.location.reload()}>New Game</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;