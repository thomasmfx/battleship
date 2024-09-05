import { isMissedShot, isShip } from "../../helpers/gameBoardHelpers.js";
import { createElementWithClass } from "../helpers.js";
import missShotImg from '../../../assets/miss-shot.svg';
import shotImg from '../../../assets/shot.svg';

export function renderCoordinates(x, y, value) {
  let square = createElementWithClass('div', 'board__square');
  
  if (isMissedShot(value)) {
    square = createElementWithClass('img', 'board__square', 'board__square--missed-shot');
    square.src = missShotImg;
  } 
  
  if (isShip(value)) {
    square = createElementWithClass('div', 'ship-cover');
    if (value.isPartHit(x, y)) {
      square = createElementWithClass('img', 'board__square', 'board__square--succesfull-shot');
      square.src = shotImg;
    };
  };

  square.dataset.x = x;
  square.dataset.y = y;
  
  return square;
};