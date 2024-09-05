import { removeAllChilds } from "../helpers.js";
import { renderCoordinates } from "./boardSquares.js";

export function renderBoard(player, boardElement, hideShips) {
  let playerBoard = player.board.grid;
  removeAllChilds(boardElement);

  for (let x = 0; x < playerBoard.length; x++) {
    for (let y = 0; y < playerBoard[x].length; y++) {
      let value = player.board.getValueAt(x, y);

      if (hideShips) {
        boardElement.append(renderCoordinates(x, y, value));
        continue;
      };

      boardElement.append(renderCoordinates(x, y, value));
    };
  };
};
