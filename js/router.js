import {changeScreen} from "./utils";
import {INITIAL_GAME} from "./state";
import WelcomeView from "./welcome-screen";
import Game from "./game";
import GameModel from "./game-model";
import ResultView, {TYPE_POINTS} from "./result-screen";
import ErrorView from "./error-screen";
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
    this.showWelcome();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => convertAnswers(data)).
      then((data) => this.data = data).
      then(() => INITIAL_GAME.questions.length = 0).
      then(() => this.data.forEach((el) => INITIAL_GAME.questions.push(el))).
      then(() => this.welcomeView.play()).
      catch(this.showError);
  }

  static playAgain() {
    const gameModel = new GameModel();
    this.showWelcome();
    this.welcomeView.play();
    this.welcomeView.onPlayClick = () => {
      this.showGame(INITIAL_GAME.questions);
      gameModel.resetState();
    };
  }

  static showWelcome() {
    this.welcomeView = new WelcomeView();
    const gameModel = new GameModel();

    this.welcomeView.element.classList.add(`main`);
    changeScreen(this.welcomeView.element);

    this.welcomeView.onPlayClick = () => {
      this.showGame(this.data);
      gameModel.resetState();
    };

  }

  static showGame(data) {
    const gameModel = new GameModel();
    const gameScreen = new Game(gameModel, data);
    gameScreen.init();
  }

  static showStats(statistics, gameResult) {
    const resultScreen = new ResultView(statistics, gameResult);
    resultScreen.element.classList.add(`main`);
    changeScreen(resultScreen.element);

    if (gameResult.points == TYPE_POINTS.LOSE) {
      resultScreen.onReplayClick = () => {
        this.playAgain();
      };
    } else {
      resultScreen.onReplayClick = () => {
        this.start();
      };
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal();
  }

}
