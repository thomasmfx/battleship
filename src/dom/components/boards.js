import { isShip } from "../../helpers/gameBoardHelpers.js";
import { newElementWithClass } from "../helpers.js";

function newSquare(x, y) {
  let square = document.createElement('button');
  square.classList.add('button', 'board__square', 'fa-solid', 'fa-water');
  square.dataset.x = x;
  square.dataset.y = y;

  return square;
};

function newShip(x, y) {
  let ship = document.createElement('div');
  ship.classList.add('ship-cover');
  ship.dataset.x = x;
  ship.dataset.y = y;

  return ship;
};

function setGridArea(element, rowStart, colStart) {
  element.style.gridRow = `${rowStart} / span 1`;
  element.style.gridColumn = `${colStart} / span 1`;
};

export function appendPositionsLabels(board) {
  const letterPositions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  for (let i = 0; i < 10; i++) {
    const positionX = newElementWithClass('p', 'board__positions');
    const positionY = newElementWithClass('p', 'board__positions');

    positionX.textContent = i;
    setGridArea(positionX, 1, i + 2);
    positionY.textContent = letterPositions[i];
    setGridArea(positionY, i + 2, 1);

    board.append(positionX, positionY);
  };

};

export function fillBoard(player, DOMboard) {
  let playerBoard = player.board.grid;

  for (let x = 0; x < playerBoard.length; x++) {
    for (let y = 0; y < playerBoard[x].length; y++) {
      let currPosition = player.board.getValueAt(x, y);

      isShip(currPosition)
      ? DOMboard.append(newShip(x, y))
      : DOMboard.append(newSquare(x, y));
    };
  };
};
