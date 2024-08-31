import { GameBoard } from "./gameBoard.js";

export class Player {
  constructor(name, isBot = false) {
    this.name = name;
    this.board = new GameBoard();
    this.isBot = isBot;
  };
};
