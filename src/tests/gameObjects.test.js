/* eslint-disable */
import { Ship } from "../gameObjects/ship"
import { canPlaceShip, GameBoard, isOutOfBoard } from "../gameObjects/gameBoard";

describe("Ship", () => {
  let ship = new Ship('carrier');

  test("throws error if type of ship is invalid or undefined when creating a new ship", () => {
    expect(() => new Ship()).toThrow(Error)
    expect(() => new Ship("destroyer")).toThrow(Error)
  })

  test("'hit()' increases 'timesHit'", () => {
    ship.hit()
    expect(ship.timesHit).toBeDefined()
    expect(ship.length).toEqual(4)
  });

  test("returns whether ship has sunk or not", () => {
    expect(ship.isSunk()).toBeFalsy()
  });

  test("ship sunks after receiving as many hits as its length", () => {
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBeTruthy()
  });
})

describe("GameBoard", () => {
  let firstBoard = new GameBoard();
  let secondBoard = new GameBoard();
  let x = 5;
  let y = 5;
  let a = 3;
  let b = 3;
  
  test("places ship in correct squares according to its length", () => {
    firstBoard.placeShip('carrier', [x, y]);
    expect(firstBoard.grid[x][y]).toBeDefined();
    expect(firstBoard.grid[x][y - 1]).toBeDefined();
    expect(firstBoard.grid[x][y - 2]).toBeDefined();
    expect(firstBoard.grid[x][y - 3]).toBeDefined();

    firstBoard.placeShip('cruiser', [a, b]);
    expect(firstBoard.grid[a][b]).toBeDefined();
    expect(firstBoard.grid[a][b - 1]).toBeDefined();
  })

  test("registers succesfull attacks", () => {
    firstBoard.receiveAttack(5, 5)
    expect(firstBoard.missedAttacks.length).toEqual(0);
  })

  test("registers missed attacks", () => {
    firstBoard.receiveAttack(0, 9)
    firstBoard.receiveAttack(4, 7)
    expect(firstBoard.missedAttacks.length).toBeGreaterThan(0);
  })

  test("does not allow attacks out of board", () => {
    expect(isOutOfBoard(-1, 10)).toBeTruthy();
    expect(() => firstBoard.receiveAttack(-1, 10)).toThrow(Error);
  })

  test("does not allow placing ships out of board or over another ship", () => {
    expect(canPlaceShip(new Ship('cruiser'), firstBoard.grid, x, y)).toBeFalsy();
    expect(canPlaceShip(new Ship('cruiser'), firstBoard.grid, -1, 10)).toBeFalsy();
  })

  test('reports whether all ships are sunk or not', () => {
    expect(secondBoard.areAllShipsSunk()).toBeTruthy();
    secondBoard.placeShip('submarine', [x, y]);
    expect(secondBoard.areAllShipsSunk()).toBeFalsy();
    secondBoard.receiveAttack(x, y);
    expect(secondBoard.areAllShipsSunk()).toBeTruthy();
  })
})
