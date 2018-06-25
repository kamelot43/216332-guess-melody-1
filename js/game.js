import INITIAL_GAME, {
  changeLevel,
  canContinue,
  die,
  changeAnswer,
  USER_ANSWER,
  BASE_RESULT,
  changeResult,
  resetUserAnswers,
} from "./state";
import {changeScreen, setPauseAndPlay} from "./utils";
import HeaderView from "./header";
import ArtistView from "./artist-screen";
import GenreView from "./genre-screen";
import levels, {statistics, userAnswers, Result} from "./data/data";
import calcPoints from "./data/calc-points";
import ResultView from "./result-screen";
import WelcomeView from "./welcome-screen";
import {timer, timerAlarm} from "./data/timer";
import Router from "./router";


class Game {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.root = document.createElement(`div`);
    this.root.classList.add(`main`);
  }

  // Инициализация и запуск игры
  init() {
    this.changelevelType();
    this.startTimer();
    this.header.onPlayAgainClick = () => {
      Router.showWelcome();
    };
  }
  // Перезапустить игру
  /* restartGame() {
    const welcomeView = new WelcomeView();
    welcomeView.element.classList.add(`main`);
    welcomeView.onPlayClick = () => {
      this.model.resetState();
      // this.updateHeader();
      this.init();
    };
    changeScreen(welcomeView.element);
  }*/
  // Обновить шапку
  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.time = this.header.element.querySelector(`div.timer-value`);
    this.header.onPlayAgainClick = () => {
      Router.showWelcome();
    };
  }

  updateTime() {
    const header = new HeaderView(this.model.state);
    const time = header.element.querySelector(`div.timer-value`);
    this.header.element.replaceChild(time, this.time);
    this.time = time;
  }

  // Расчет результата игры : подсчет очков, вывод экрана победы или поражения
  changeGameResult(gameState) {
    const gamePoints = calcPoints(this.model.answers, gameState.lives);
    this._gameResult = changeResult(gameState.lives, gameState.time, gamePoints);
    Router.showStats(statistics, this._gameResult);
    // Router.showWelcome();
    // this.result = new ResultView(statistics, this._gameResult);
    // this.result.element.classList.add(`main`);
    /* this.result.onReplayClick = () => {
      console.log(`hello`);
      this.restartGame();
    };*/
    // changeScreen(this.result.element);
  }

  // Функция проверки текущего уровня : возможно ли продолжить игру или игра закончена ?
  checkLevel(gameValue) {
    if (this.model.checkLevel()) {
      this.changeGameResult(gameValue);
      this.stopGame();
    } else {
      this.startTimer();
      return;
    }
  }

  answer(answer) {
    this.stopGame();
    let currentAnswer;
    const difference = this.model._currentTime - this.model.state.time;
    switch (answer) {
      case Result.NEXT_LEVEL:
        this.model.nextLevel();
        this.model.saveUserAnswers(true, difference);
        this.changelevelType();
        this.startTimer();
        break;
      case Result.DIE:
        this.model.die();
        this.model.saveUserAnswers(false, difference);
        this.updateHeader();
        // this.updateTime();
        this.checkLevel(this.model.state);
        break;
      case Result.WIN:
        this.model.saveUserAnswers(true, difference);
        this.checkLevel(this.model.state);
        break;
      case Result.NOOP:
      // just do nothing
        break;
      default:
        throw new Error(`Unknown result`);
    }
  }

  // инициализация таймера
  timer() {
    this.interval = setInterval(() => {
      if (this.model.isTimeOut()) {
        this.checkLevel(this.model.state);
        this.stopGame();
        return;
      } else if (this.model.isAlarm()) {
        // this.checkLevel(this.model.state);
        // this.stopGame();
        timerAlarm(this.header.element);
        // this.updateHeader();
      }
      this.model.tick();
      // this.updateHeader();
      this.updateTime();
    }, 1000);
  }

  stopGame() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.timer();
    this.model.detectTime();
  }

  /* resetState() {
    this.model.restart();
    this.model.resetUserAnswers();
  }*/

  createArtistGame() {
    this.view.onAnswerClick = (evt) => {
      const answers = [...levels[this.model.state.level].answers];

      for (let answer of answers) {
        if (answer.id === evt.target.value) {
          this.answer(answer.result);
        }
      }
    };

    this.view.onControlPlayer = (evt) => {
      evt.preventDefault();
      setPauseAndPlay(evt);
    };
  }


  createGenreGame() {

    this.view.onAnswerClick = (evt) => {
      const answerBtn = this.view.element.querySelector(`.genre-answer-send`);
      const genreForm = this.view.element.querySelector(`.genre`);
      const answers = genreForm.elements.answer;

      const isChecked = () => {
        if ([...answers].some((node) => node.checked)) {
          answerBtn.disabled = false;
        } else {
          answerBtn.disabled = true;
        }
      };
      if (evt.target.hasAttribute(`name`)) {
        isChecked();
      }
    };


    this.view.onSubmitClick = (evt) => {
      evt.preventDefault();

      // Избыточное объявление переменных
      const genreForm = this.view.element.querySelector(`.genre`);
      const answers = genreForm.elements.answer;
      let result = levels[this.model.state.level].result;

      // все выбранные пользователем кнопки
      // дополнитльное условие : кнопки выбраны с правльным ответом
      const checkedInputs = [...answers].filter((it) => {
        return it.checked && it.value === `true`;
      }).length;

      // Выбрать все варианты правильных ответов в режиме игры "выбор треков одного жанра"
      const audios = [...levels[this.model.state.level].audios];
      const trueValue = audios.filter((it) => {
        return it.answer === true;
      }).length;

      const compareAnswers = () => {
        let result;
        if (checkedInputs !== trueValue) {
          result = Result.DIE;
        } else {
          result = levels[this.model.state.level].result;
        }
        return result;
      };

      this.answer(compareAnswers());

    };

    this.view.onControlPlayer = (evt) => {
      evt.preventDefault();
      setPauseAndPlay(evt);
    };
  }

  changelevelType() {
    if (levels[this.model.state.level].type === `artist`) {
      this.view = new ArtistView(this.model.state);
      this.createArtistGame();

    } else {
      this.view = new GenreView(this.model.state);
      this.createGenreGame();
    }

    this.view.element.classList.add(`main`);
    this.root.innerHTML = ``;
    this.time = this.header.element.querySelector(`div.timer-value`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.view.element);
    changeScreen(this.root);
  }

}

export default Game;
