import {changeScreen} from "./utils";
import WelcomeView from "./welcome-screen";
import Game from "./game";
import GameModel from "./game-model";
import ResultView from "./result-screen";

export default class Router {

  static showWelcome() {
    const welcomeView = new WelcomeView();
    const gameModel = new GameModel();
    const gameScreen = new Game(gameModel);

    welcomeView.element.classList.add(`main`);
    changeScreen(welcomeView.element);

    welcomeView.onPlayClick = () => {
      this.showGame();
      gameModel.resetState();
    };
  }

  static showGame() {
    const gameModel = new GameModel();
    const gameScreen = new Game(gameModel);
    gameScreen.init();
  }

  static showStats(statistics, gameResult) {
    const resultScreen = new ResultView(statistics, gameResult);
    resultScreen.element.classList.add(`main`);
    changeScreen(resultScreen.element);

    resultScreen.onReplayClick = () => {
      this.showWelcome();
    };
  }

}
