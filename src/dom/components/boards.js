import { isShip } from "../../helpers/gameBoardHelpers.js";
import { createElementWithClass } from "../helpers.js";
import wavesImg from '../../../assets/waves.svg';

function newSquare(x, y) {
  const waves = createElementWithClass('img', 'waves');
  waves.src = wavesImg;
  
  const square = createElementWithClass('button', 'board__square');
  square.classList.add();
  square.dataset.x = x;
  square.dataset.y = y;

  square.append(waves);

  return square;
};

function newShip(x, y) {
  let ship = document.createElement('div');
  ship.classList.add('ship-cover');
  ship.dataset.x = x;
  ship.dataset.y = y;

  return ship;
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
