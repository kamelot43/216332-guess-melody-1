import {changeScreen} from "./utils";
import WelcomeView from "./welcome-screen";
import Game from "./game";
import GameModel from "./game-model";
import ResultView from "./result-screen";
import {convertAnswers} from "./data/data";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Router {

  static start() {
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => convertAnswers(data)).
      then((data) => this.showGame(data));
    // catch(Application.showError).
    // then(() => splash.stop());
  }

  static showWelcome() {
    const welcomeView = new WelcomeView();
    const gameModel = new GameModel();
    const gameScreen = new Game(gameModel);

    welcomeView.element.classList.add(`main`);
    changeScreen(welcomeView.element);

    welcomeView.onPlayClick = () => {
      this.start();
      gameModel.resetState();
    };
  }

  static showGame(data) {
    const gameModel = new GameModel();
    const gameScreen = new Game(gameModel, data);
    // console.log(data);
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
