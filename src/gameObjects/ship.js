const shipsArsenal = [
  { type: 'carrier' , length: 4 },
  { type: 'battleship', length: 3 },
  { type: 'cruiser', length: 2 },
  { type: 'submarine', length: 1 },
];

export class Ship {
  constructor(type) {
    let foundShip = shipsArsenal.filter((ship) => ship.type === type)[0];
    if (!foundShip) throw new Error('Invalid type of ship');

    this.type = foundShip.type;
    this.length = foundShip.length;
    this.timesHit = 0;
    this.sunk = false;
  };

  hit() {
    this.timesHit++
    if (this.timesHit === this.length) this.sunk = true;
  };

  isSunk() {
    return this.sunk
  };
};
