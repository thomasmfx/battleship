/* eslint-disable */
import { Ship } from "../gameObjects/ship"
import { GameBoard } from "../gameObjects/gameBoard";

describe("Ship", () => {
  let ship = new Ship('carrier');

  test("throws error if type of ship is invalid or undefined when creating a new ship", () => {
    expect(() => new Ship()).toThrow(Error)
    expect(() => new Ship("destroyer")).toThrow(Error)
  })

  test("'hit()' increases 'timesHit'", () => {
    ship.hit()
    expect(ship.timesHit).toEqual(1)
  });

  test("ship can be flipped", () => {
    expect(ship.isFlipped()).toBeFalsy()
    ship.flip()
    expect(ship.isFlipped()).toBeTruthy()
    ship.flip()
    expect(ship.isFlipped()).toBeFalsy()
  });

  test("returns whether ship has sunk or not", () => {
    expect(ship.isSunk()).toBeFalsy()
  });

  test("ship sunks after receiving as many hits as its length", () => {
    ship.hit()
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
    expect(firstBoard.grid[x][y]).not.toBe(0);
    expect(firstBoard.grid[x + 1][y]).not.toBe(0);
    expect(firstBoard.grid[x + 2][y]).not.toBe(0);
    expect(firstBoard.grid[x + 3][y]).not.toBe(0);
    expect(firstBoard.grid[x + 4][y]).not.toBe(0);
    
    firstBoard.placeShip('submarine', [a, b]);
    expect(firstBoard.grid[a][b]).not.toBe(0);
    expect(firstBoard.grid[a + 1][b]).not.toBe(0);
  })

  test("does not allow placing ships out of board or over another ship", () => {
    expect(firstBoard.canPlaceShip(new Ship('cruiser'), x, y)).toBeFalsy();
    expect(firstBoard.canPlaceShip(new Ship('cruiser'), -1, 10)).toBeFalsy();
  })

  test("does not allow placing ships less than one square of distance from another ship", () => {
    expect(firstBoard.canPlaceShip(new Ship('cruiser'), x, y + 1)).toBeFalsy();
  })

  test("registers succesfull attacks", () => {
    firstBoard.receiveAttack(x, y)
    expect(firstBoard.missedAttacks.length).toEqual(0);
  })

  test("registers missed attacks", () => {
    firstBoard.receiveAttack(0, 9)
    firstBoard.receiveAttack(4, 7)
    expect(firstBoard.missedAttacks.length).toBeGreaterThan(0);
  })

  test("does not allow attacks out of board", () => {
    expect(() => firstBoard.receiveAttack(-1, 10)).toThrow(Error);
  })

  test('reports whether all ships are sunk or not', () => {
    expect(secondBoard.areAllShipsSunk()).toBeTruthy();
    secondBoard.placeShip('submarine', [x, y]);
    expect(secondBoard.areAllShipsSunk()).toBeFalsy();
  })
})