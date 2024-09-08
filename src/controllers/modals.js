import { resetGame } from "./versusBot.js";
import { renderBoard } from "../views/components/board.js";
import { RealPlayer, playerBoard, Bot, botBoard } from "./versusBot.js";
import { hideElement, unhideElement } from "../views/helpers.js";

const actionsModal = document.querySelector('.actions-modal');
const randomizeBtn = document.querySelector('.actions-modal__randomize');
const startGameBtn = document.querySelector('.actions-modal__start-game');

const winnerModal = document.querySelector('.win-modal');
const resetBtn = document.querySelector('.win-modal__reset-btn');

// || actionsModal
randomizeBtn.addEventListener('click', () => {
  RealPlayer.board.placeRandomShips();
  renderBoard(RealPlayer, playerBoard);
});

startGameBtn.addEventListener('click', () => {
  hideElement(actionsModal);
  unhideElement(botBoard.parentElement)
  renderBoard(Bot, botBoard, true);
})

// || winnerModal
export function displayWinner(winnerName) {
  winnerModal.firstElementChild.textContent = `Game over! ${winnerName} won`;
  unhideElement(winnerModal);
};

resetBtn.addEventListener('click', () => {
  resetGame();
  hideElement(winnerModal);
  hideElement(botBoard.parentElement);
  unhideElement(actionsModal);
});
