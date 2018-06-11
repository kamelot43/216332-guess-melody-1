import INITIAL_GAME from "./state";
import {render, changeScreen} from "./utils/utils";
import {headerTemplate} from "./header";
let game;

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  const gameContainerElement = document.createElement(`div`);
  const header = render(headerTemplate(game));
  gameContainerElement.classList.add(`main`);
  gameContainerElement.appendChild(header);
  changeScreen(gameContainerElement);
};

export default startGame;
