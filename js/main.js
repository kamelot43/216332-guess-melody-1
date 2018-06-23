// import {changeScreen} from "./utils";
// import welcomeScreen from "./welcome-screen";

// changeScreen(welcomeScreen);

import {changeScreen} from "./utils";
import WelcomeView from "./welcome-screen";
import Game from "./game";
import GameModel from "./game-model";

const welcomeView = new WelcomeView();
const gameModel = new GameModel();
const gameScreen = new Game(gameModel);

welcomeView.element.classList.add(`main`);
changeScreen(welcomeView.element);

welcomeView.onPlayClick = () => {
  gameScreen.init();
};
