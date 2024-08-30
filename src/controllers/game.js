import { Player } from '../models/player.js';
import { fillBoard } from '../dom/components/boards.js';

let currentTurn;

const player1 = new Player();
const player2 = new Player(true);

player1.board.placeShip('carrier', false, 2, 1);
player1.board.placeShip('battleship', true, 0, 2);
player1.board.placeShip('battleship', false, 0, 6);
player1.board.placeShip('cruiser', true, 5, 5);
player1.board.placeShip('cruiser', false, 5, 3);
player1.board.placeShip('cruiser', false, 3, 9);
player1.board.placeShip('cruiser', true, 3, 3);
player1.board.placeShip('submarine', false, 9, 6);
player1.board.placeShip('submarine', false, 9, 3);
player1.board.placeShip('submarine', false, 9, 0);
player1.board.placeShip('submarine', false, 9, 9);

const player1Board = document.querySelector('.player-1');
const player2Board = document.querySelector('.player-2');

function loadBoard(player, DOMboard) {
  fillBoard(player, DOMboard);
};

loadBoard(player1, player1Board);
loadBoard(player2, player2Board);
