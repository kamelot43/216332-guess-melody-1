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
    this.gameModel = new GameModel();
    this.showWelcome();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => convertAnswers(data)).
      then((data) => this.gameModel.saveData(data)).
      // then(() => console.log(gameModel.data)).
      then(() => this.gameModel.resetQuestions()).
      then(() => this.gameModel.data.forEach((el) => INITIAL_GAME.questions.push(el))).
      then(() => this.welcomeView.play()).
      catch(this.showError);
  }

  static playAgain() {
    this.showWelcome();
    this.welcomeView.play();
    this.welcomeView.onPlayClick = () => {
      this.gameModel.resetState();
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

  static showStats(statistics, gameResult, userAnswers) {
    const resultScreen = new ResultView(statistics, gameResult, userAnswers);
    resultScreen.element.classList.add(`main`);
    changeScreen(resultScreen.element);

    if (gameResult.points === TYPE_POINTS.LOSE) {
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
