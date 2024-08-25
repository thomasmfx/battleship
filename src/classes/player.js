import { GameBoard } from "./gameBoard";

export class Player {
  constructor(isBot = false){
    this.board = new GameBoard();
    this.isBot = isBot;
  };
};