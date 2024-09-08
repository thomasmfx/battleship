import { renderBoard } from "../views/components/board.js";
import { Player } from '../models/player.js';
import { displayWinner } from "./modals.js";

const playerBoard = document.querySelector('[data-player="Player 1"] .board__grid');
const botBoard = document.querySelector('[data-player="Player 2"] .board__grid');

let RealPlayer = new Player('Player 1');
let Bot = new Player('Player 2', true);
let gameOver = false;

RealPlayer.board.placeRandomShips();
Bot.board.placeRandomShips();

botBoard.addEventListener('click', (event) => {
  if (gameOver) return;
  let target = event.target;
  let x = parseInt(target.dataset.x);
  let y = parseInt(target.dataset.y);
  if (!Bot.board.canReceiveAttack(x, y)) return;

  attackBot(x, y);
  if (Bot.board.haveAllShipsSunk()) { 
    declareWinner(RealPlayer);
    return;
  };

  attackPlayer();
  if (RealPlayer.board.haveAllShipsSunk()) declareWinner(Bot);
});

function attackPlayer() {
  // The game is not truly over here, it's just to prevent the player from attacking
  // before the bot attack shows up
  gameOver = true;
  RealPlayer.board.receiveRandomAttack();
  setTimeout(() => {
    renderBoard(RealPlayer, playerBoard, false);
    gameOver = false;
  }, 500);
};

function attackBot(x, y) { 
  Bot.board.receiveAttack(x, y);
  renderBoard(Bot, botBoard, true);
};

function declareWinner(winner) {
  displayWinner(winner.name);
  finishGame();
};

function finishGame() {
  gameOver = true;
  renderBoard(RealPlayer, playerBoard);
  renderBoard(Bot, botBoard);
};

export function resetGame() {
  gameOver = false;
  RealPlayer = new Player('Player 1');
  Bot = new Player('Player 2', true);
  RealPlayer.board.placeRandomShips();
  Bot.board.placeRandomShips();

  renderBoard(RealPlayer, playerBoard);
  renderBoard(Bot, botBoard, true);
};

renderBoard(RealPlayer, playerBoard);

export { RealPlayer, playerBoard, Bot, botBoard }