// x = row
// y = column
// (usually)
import { Ship, shipsArsenal } from "./ship.js";
import { isOutOfBoard, isShip, isEmpty, markSurrounding, flipRandomly, randomPosition, isMissedShot } from "../helpers/gameBoardHelpers.js";

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

  canReceiveAttack(x, y) {
    let value = this.getValueAt(x, y);
    try {
      if (isMissedShot(value)) return false;
      if (isShip(value) && value.isPartHit(x, y)) return false;
    } catch(e) {
      return false;
    }
    
    return true;
  };

  receiveAttack(x, y) {
    if (isOutOfBoard(x, y)) throw new Error('Invalid position');
    if (!this.canReceiveAttack(x, y)) throw new Error("Can't attack here");
    const value = this.getValueAt(x, y);

    if (isShip(value)) {
      value.hit(x, y);
    } else {
      this.missedAttacks.push([x, y]);
      this.setValueAt(2, x, y);
    }
  };

  canPlaceShip(shipType, isShipFlipped, x, y) {
    if (isOutOfBoard(x, y)) return false;
    const ship = new Ship(shipType, isShipFlipped)
    
    let value;
    for (let i = 0; i < ship.length; i++) {
      ship.isFlipped()
      ? value = this.getValueAt(x, y + i)
      : value  = this.getValueAt(x + i, y);

      if (!isEmpty(value)) return false;
    };
  
    return true;
  };

  placeShip(shipType, isShipFlipped, x, y) {
    const ship = new Ship(shipType, isShipFlipped);

    if (!this.canPlaceShip(shipType, isShipFlipped, x, y)) throw new Error("Can't place a ship here")

    for (let i = 0; i < ship.length; i++) {
      ship.isFlipped()
      ? this.setValueAt(ship, x, y + i)
      : this.setValueAt(ship, x + i, y);
    };

    markSurrounding(this.grid, ship, x, y);
  };

  haveAllShipsSunk() {
    const board = this.grid;

    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[i].length; j++) {
        const value = this.getValueAt(i, j);
        if (isShip(value) && !value.isSunk()) return false;
      };
    };
  
    return true;
  };

  // Idk why but both throw errors sometimes, and there's no need to return something in the error
  getValueAt(x, y) {
    try {
      return this.grid[x][y];
    } catch (e) {}
  };

  setValueAt(value, x, y) {
    try {
      this.grid[x][y] = value;
    } catch (e) {}
  };

  placeRandomShips() {
    for (let i = 0; i < shipsArsenal.length; i++) {
      let ship = shipsArsenal[i].type;
      let placed = false;

      while (!placed) {
        let x = randomPosition();
        let y = randomPosition();
        let isFlipped = flipRandomly();

        if (this.canPlaceShip(ship, isFlipped, x, y)) {
          this.placeShip(ship, isFlipped, x, y);
          placed = true;
        };
      };
    };
  };
};
