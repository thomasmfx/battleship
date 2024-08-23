import { Ship } from "./ship";

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

export function isOutOfBoard(x, y) {
  if ((x < 0 || x > 9) || (y < 0 || y > 9)) return true;
};

export function canPlaceShip(ship, board, x, y) {
  if (isOutOfBoard(x, y)) return false;
  if (isOutOfBoard(x - ship.length, y - ship.length)) return false;
  if (board[x][y] !== 0) return false;

  return true;
}

export class GameBoard {
  constructor() {
    this.grid = newGrid();
    this.missedAttacks = [];
  };

  receiveAttack(x, y) {
    if (isOutOfBoard(x, y)) throw new Error('Invalid position');
    let position = this.grid[x][y];

    position === 0 ? this.missedAttacks.push([x, y]) : position.hit();
  };

  placeShip(shipType, cordinates) {
    let ship = new Ship(shipType);
    let length = ship.length;
    let x = cordinates.shift();
    let y = cordinates.shift();

    if (!canPlaceShip(ship, this.grid, x, y)) throw new Error("Can't place a ship here")

    for (let i = 0; i < length; i++) {
      this.grid[x + i][y] = ship;
    };
  };

  areAllShipsSunk() {
    let board = this.grid;

    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0 && !board[i][j].isSunk()) return false;
      };
    };
  
    return true;
  };
};
