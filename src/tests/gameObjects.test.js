/* eslint-disable */
import { Ship } from "../gameObjects/ship"

describe("Ship object/class", () => {
  let ship = new Ship('carrier');

  test("'hit()' increases 'timesHit'", () => {
    ship.hit()
    expect(ship.timesHit).toEqual(1)
    expect(ship.length).toEqual(4)
  });

  test("returns whether ship is sunk or not", () => {
    expect(ship.isSunk()).toBeFalsy()
  });

  test("ship sunks after receiving as many hits as its length", () => {
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBeTruthy()
  });

  test('throws error if type of ship is invalid or undefined', () => {
    expect(() => new Ship()).toThrow(Error)
    expect(() => new Ship('destroyer')).toThrow(Error)
  })
})