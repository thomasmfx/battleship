import { removeAllChilds } from "../helpers.js";
import { renderCoordinates } from "./boardSquares.js";

export function renderBoard(player, DOMboard, hideShips) {
  let playerBoard = player.board.grid;
  removeAllChilds(DOMboard);

  for (let x = 0; x < playerBoard.length; x++) {
    for (let y = 0; y < playerBoard[x].length; y++) {
      let value = player.board.getValueAt(x, y);

      if (hideShips) {
        DOMboard.append(renderCoordinates(x, y, value));
        continue;
      };

      DOMboard.append(renderCoordinates(x, y, value));
    };
  };
};
