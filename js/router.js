import {changeScreen} from "./utils/utils";
import INITIAL_GAME, {convertResult} from "./state";
import WelcomeView from "./views/welcome-screen";
import Game from "./game";
import GameModel from "./game-model";
import ResultView, {TYPE_POINTS} from "./views/result-screen";
import ErrorView from "./views/error-screen";
import Loader from "./loader";

export default class Router {
  static start() {
    this.gameModel = new GameModel();
    this.showWelcome();
    Loader.loadData()
      .then((data) => this.gameModel.saveData(data))
      .then(() => this.gameModel.resetQuestions())
      .then(() =>
        this.gameModel.data.forEach((el) => INITIAL_GAME.questions.push(el))
      )
      .then(() => this.welcomeView.play());
      .catch(this.showError);
  }

  static playAgain() {
    this.showWelcome();
    this.welcomeView.play();
    this.welcomeView.onPlayClick = () => {
      this.showGame(INITIAL_GAME.questions);
    };
  }

  static showWelcome() {
    this.welcomeView = new WelcomeView();
    this.welcomeView.element.classList.add(`main`);
    changeScreen(this.welcomeView.element);
    this.welcomeView.onPlayClick = () => {
      this.showGame(this.gameModel.data);
      this.gameModel.resetState();
    };
  }

  static showGame() {
    const gameScreen = new Game(this.gameModel);
    gameScreen.init();
  }

  static showStats(gameResult, userAnswers) {
    if (
      gameResult.points === TYPE_POINTS.LOSE ||
      gameResult.time === TYPE_POINTS.TIMEOUT
    ) {
      this.showResult(null, gameResult, userAnswers);
    } else {
      Loader.loadResults()
        .then((data) => this.gameModel.transformStatistic(data))
        .then((data) => this.gameModel.saveStatistic(data))
        .then(() =>
          this.showResult(this.gameModel.statistic, gameResult, userAnswers)
        );
      const result = convertResult(gameResult);
      Loader.saveResults(result);
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal();
  }

  static showResult(statistic = [], gameResult, userAnswers) {
    this.resultScreen = new ResultView(statistic, gameResult, userAnswers);
    this.resultScreen.element.classList.add(`main`);
    changeScreen(this.resultScreen.element);
    this.resultScreen.onReplayClick = () => {
      this.start();
    };
  }
}
