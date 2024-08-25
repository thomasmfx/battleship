// Just so you know, the positions in the board are like this:
// x = vertical
// y = horizontal
// Vertical is ALWAYS accessed first, go to a position with board[x][y]

import { Ship } from "./ship";
import { isOutOfBoard, isShip, isEmpty, markSurrounding } from "./gameBoardHelpers";

function newGrid() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
};

export class GameBoard {
  constructor() {
    this.grid = newGrid();
    this.missedAttacks = [];
  };

  receiveAttack(x, y) {
    if (isOutOfBoard(x, y)) throw new Error('Invalid position');
    let position = this.grid[x][y];

    position !== 0 ? position.hit() : this.missedAttacks.push([x, y]);
  };

  canPlaceShip(ship, x, y) {
    if (isOutOfBoard(x, y)) return false;
    
    let value;
    for (let i = 0; i < ship.length; i++) {
      ship.isFlipped()
      ? value = this.grid[x][y + i]
      : value  = this.grid[x + i][y];

      if (!isEmpty(value)) return false;
    };
  
    return true;
  };

  placeShip(shipType, cordinates, isFlipped) {
    let ship = new Ship(shipType, isFlipped);
    let x = cordinates.shift();
    let y = cordinates.shift();

    if (!this.canPlaceShip(ship, x, y)) throw new Error("Can't place a ship here")

    for (let i = 0; i < ship.length; i++) {
      ship.isFlipped()
      ? this.grid[x][y + i] = ship
      : this.grid[x + i][y] = ship; 
    };

    markSurrounding(this.grid, ship, x, y);
  };

  areAllShipsSunk() {
    let board = this.grid;

    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[i].length; j++) {
        let square = board[i][j];
        if (isShip(square) && !square.isSunk()) return false;
      };
    };
  
    return true;
  };
};
