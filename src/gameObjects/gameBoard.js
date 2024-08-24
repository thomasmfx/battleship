import { Ship } from "./ship.js";
import { isOutOfBoard, isShip, isEmpty, markSurrounding } from "./gameBoardHelpers.js";

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
    
    for (let i = 0; i < ship.length; i++) {
      let value = this.grid[x + i][y];
      if (!isEmpty(value)) return false;
    };
  
    return true;
  };

  placeShip(shipType, cordinates) {
    let ship = new Ship(shipType);
    let x = cordinates.shift();
    let y = cordinates.shift();

    if (!this.canPlaceShip(ship, x, y)) throw new Error("Can't place a ship here")

    for (let i = 0; i < ship.length; i++) {
      this.grid[x + i][y] = ship;
    };

    markSurrounding(this.grid, ship.length, x, y);
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
