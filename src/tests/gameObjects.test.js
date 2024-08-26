/* eslint-disable */
import { Ship } from "../classes/ship"
import { GameBoard } from "../classes/gameBoard";
import { Player } from "../classes/player";

describe("Ship", () => {
  test("throws error if type of ship is not defined when invoking class", () => {
    expect(() => new Ship()).toThrow(Error)
  })

  test("throws error if type of ship does not exists when invoking class", () => {
    expect(() => new Ship("destroyer")).toThrow(Error)
  })

  describe("hit()", () => {
    let ship = new Ship('submarine');
    test("increases ship's times hit", () => {
      ship.hit()
      expect(ship.timesHit).toEqual(1)
    })
  })
  
  describe("isSunk()", () => {
    let ship = new Ship('cruiser');
    test("returns true/false based on whether ship has sunk or not", () => {
      expect(ship.isSunk()).toBeFalsy()
      ship.hit(), ship.hit(), ship.hit()
      expect(ship.isSunk()).toBeTruthy()
    });
  })

  describe("flip()", () => {
    let ship = new Ship('battleship');
    test("flips ship (between vertical and horizontal)", () => {
      expect(ship.isFlipped()).toBeFalsy();
      ship.flip();
      expect(ship.isFlipped()).toBeTruthy();
      ship.flip();
      expect(ship.isFlipped()).toBeFalsy();
    });
  });

  describe("isFlipped()", () => {
    let flippedShip = new Ship('carrier', true);
    let notFlippedShip = new Ship('battleship');
    test("returns true/false based on whether ship is flipped or not", () => {
      expect(flippedShip.isFlipped()).toBeTruthy()
      expect(notFlippedShip.isFlipped()).toBeFalsy()
    })
  })
})

describe("GameBoard", () => {
  describe("placeShip(shipType, isShipFlipped, x, y)", () => {
    let gameBoard = new GameBoard()
    test("ship takes as many positions in the board as its length", () => {
      gameBoard.placeShip('cruiser', false, 5, 5);
      expect(gameBoard.getValueAt(5, 5)).not.toBe(0);
      expect(gameBoard.getValueAt(5 + 1, 5)).not.toBe(0);
      expect(gameBoard.getValueAt(5 + 2, 5)).not.toBe(0);
    })
    test("places flipped ship", () => {
      gameBoard.placeShip('submarine', true, 0, 1);
      expect(gameBoard.getValueAt(0, 1)).not.toBe(0);
      expect(gameBoard.getValueAt(0, 1 + 1)).not.toBe(0);
    })
  })

  describe("canPlaceShip(shipType, isShipFlipped, x, y)", () => {
    let gameBoard = new GameBoard()
    gameBoard.placeShip('submarine', false, 8, 9)
    test("returns false if position is out of board", () => {
      expect(gameBoard.canPlaceShip('cruiser', false, -1, 10)).toBeFalsy();
    })
    test("returns false if there's already a ship in the given position", () => {
      expect(gameBoard.canPlaceShip('cruiser', false, 8, 9)).toBeFalsy();
    })
    test("returns false if there's a ship less than one square of distance from the given position", () => {
      expect(gameBoard.canPlaceShip('cruiser', false, 8, 9 + 1)).toBeFalsy();
    })
    test("returns true if none of the above tests returns false", () => {
      expect(gameBoard.canPlaceShip('cruiser', false, 1, 2)).toBeTruthy();
    })
  })

  describe("receiveAttack(x, y)", () => {
    let gameBoard = new GameBoard()
    gameBoard.placeShip('carrier', false, 5, 5)
    test("registers succesfull attacks", () => {
      gameBoard.receiveAttack(5, 5)
      expect(gameBoard.missedAttacks.length).toEqual(0);
    })
    test("registers missed attacks", () => {
      gameBoard.receiveAttack(9, 9)
      expect(gameBoard.missedAttacks.length).toEqual(1);
    })
    test("throws error if trying to attack a position out of board", () => {
      expect(() => gameBoard.receiveAttack(-1, 10)).toThrow(Error);
    })
  })

  describe("haveAllShipsSunk()", () => {
    let gameBoard = new GameBoard()
    test('returns true/false based no whether all ships have sunk or not', () => {
      expect(gameBoard.haveAllShipsSunk()).toBeTruthy();
      gameBoard.placeShip('submarine', false, 5, 5);
      expect(gameBoard.haveAllShipsSunk()).toBeFalsy();
    })
  })

  describe("getValueAt(x, y)", () => {
    let gameBoard = new GameBoard()
    gameBoard.placeShip('battleship', false, 1, 1)
    test("returns value at the given position in the board", () => {
      expect(gameBoard.getValueAt(1, 1)).not.toEqual(0)
      expect(gameBoard.getValueAt(1, 2)).toEqual(1)
      expect(gameBoard.getValueAt(1, 3)).toEqual(0)
    })
  })

  describe("setValueAt(x, y)", () => {
    let gameBoard = new GameBoard()
    gameBoard.setValueAt('value', 5, 5)
    test("sets value at the given position in the board", () => {
      expect(gameBoard.getValueAt(5, 5)).toBe('value')
    })
  })
})

describe("Player", () => {
  let player = new Player().board;

  test("can create bot players", () => {
    expect(new Player(true).isBot).toBe(true)
  });

  test("player has own gameboard", () => {
    expect(player.board).not.toBe(null)
  })
})