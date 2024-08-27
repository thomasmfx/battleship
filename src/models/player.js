import { GameBoard } from "./gameBoard.js";

export class Player {
  constructor(isBot = false){
    this.board = new GameBoard();
    this.isBot = isBot;
  };
};