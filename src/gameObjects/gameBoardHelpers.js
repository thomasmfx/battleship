export function isOutOfBoard(x, y) {
  if ((x < 0 || x > 9) || (y < 0 || y > 9)) return true;
};

export function isShip(value) {
  if (typeof value !== 'number') return true;
};

function isAroundShip(value) {
  if (value === 1) return true;
};

export function isEmpty(value) {
  if (!isShip(value) && !isAroundShip(value)) return true;
};

export function surroundingPositions(x, y) {
  let positions = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];

  return positions.filter((p) => !isOutOfBoard(p[0], p[1]));
};

export function markSurrounding(board, ship, x, y) {
  for (let i = 0; i < ship.length; i++) {
    let positions;

    ship.isFlipped()
    ? positions = surroundingPositions(x, y + i)
    : positions = surroundingPositions(x + i, y)

    for (let j = 0; j < positions.length; j++) {
      let a = positions[j].shift();
      let b = positions[j].shift();
      if (isEmpty(board[a][b])) board[a][b] = 1;
    };
  };
};
