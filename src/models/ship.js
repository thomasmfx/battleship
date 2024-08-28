const shipsArsenal = [
  { type: 'carrier' , length: 4 },
  { type: 'battleship', length: 3 },
  { type: 'battleship', length: 3 },
  { type: 'cruiser', length: 2 },
  { type: 'cruiser', length: 2 },
  { type: 'cruiser', length: 2 },
  { type: 'submarine', length: 1 },
  { type: 'submarine', length: 1 },
  { type: 'submarine', length: 1 },
  { type: 'submarine', length: 1 },
];

export class Ship {
  constructor(type, flipped = false) {
    const ship = shipsArsenal.filter((ship) => ship.type === type)[0];
    if (!ship) throw new Error('Invalid type of ship');

    this.type = ship.type;
    this.length = ship.length;
    this.timesHit = 0;
    this.sunk = false;
    this.flipped = flipped;
  };

  hit() {
    this.timesHit++
    if (this.timesHit === this.length) this.sunk = true;
  };

  isSunk() {
    return this.sunk
  };

  flip() {
    this.flipped = !this.flipped
  };
  
  isFlipped() {
    return this.flipped;
  };
};
