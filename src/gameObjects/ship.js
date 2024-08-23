const shipsArsenal = [
  { type: 'carrier' , length: 5 },
  { type: 'battleship', length: 4 },
  { type: 'cruiser', length: 3 },
  { type: 'submarine', length: 2 },
];

export class Ship {
  constructor(type) {
    let foundShip = shipsArsenal.filter((ship) => ship.type === type)[0];
    if (!foundShip) throw new Error('Invalid type of ship');

    this.type = foundShip.type;
    this.length = foundShip.length;
    this.timesHit = 0;
    this.sunk = false;
    this.vertical = true;
  };

  hit() {
    this.timesHit++
    if (this.timesHit === this.length) this.sunk = true;
  };

  isSunk() {
    return this.sunk
  };

  flip() {
    this.vertical = !this.vertical
  };

  isFlipped() {
    return !this.vertical;
  };
};
