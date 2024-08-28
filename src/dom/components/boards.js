import { newElementWithClass } from "../helpers.js"

const boardPlayer1 = document.querySelector('.player-1');
const boardPlayer2 = document.querySelector('.player-2');
const positionsY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function newSquare(x, y) {
  const square = document.createElement('button')
  square.classList.add('board__square', 'fa-solid', 'fa-water');
  square.dataset.x = x;
  square.dataset.y = y;
  return square;
}

function setGridArea(element, rowStart, colStart) {
  element.style.gridRow = `${rowStart} / span 1`;
  element.style.gridColumn = `${colStart} / span 1`;
};

function appendPositionsX(board) {
  for (let i = 0; i < 10; i++) {
    const element = newElementWithClass('p', positionsY[i], 'board__positions');
    // row 1 is already of an empty div, gotta start from row 2
    setGridArea(element, i + 2, 1);
    board.appendChild(element);
  };
};

function appendPositionsY(board) {
  for (let i = 0; i < 10; i++) {
    let element = newElementWithClass('p', i, 'board__positions');
    // column 1 is already of an empty div, gotta start from column 2
    setGridArea(element, 1, i + 2);
    board.appendChild(element);
  };
};

function fillBoardSquares(board) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.appendChild(newSquare(i, j))
    };
  };
};

function loadBoard(board) {
  appendPositionsY(board);
  appendPositionsX(board);
  fillBoardSquares(board);
};

loadBoard(boardPlayer1);
loadBoard(boardPlayer2);
