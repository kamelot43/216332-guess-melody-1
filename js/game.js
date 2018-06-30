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
import {statistics, userAnswers, Result} from "./data/data";
import calcPoints from "./data/calc-points";
import ResultView from "./result-screen";
import WelcomeView from "./welcome-screen";
import ConfirmView from "./confirm-screen";
import {timer, timerAlarm} from "./data/timer";
import Router from "./router";

let gameData;

class Game {
  constructor(model, data) {
    this.model = model;
    this.data = data;
    this.header = new HeaderView(this.model.state);
    this.root = document.createElement(`div`);
    this.root.classList.add(`main`);
  }

  showModal() {
    this.modalView = new ConfirmView();
    this.modalView.showModal();
    this.modalView.onConfirmClick = () => {
      Router.start();
      this.modalView.closeModal();
    };
    this.modalView.onCloseClick = () => {
      this.modalView.closeModal();
    };
  }


  // Инициализация и запуск игры
  init() {
    this.changelevelType();
    this.startTimer();
    this.header.onPlayAgainClick = () => {
      this.showModal();
    };
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.time = this.header.element.querySelector(`div.timer-value`);
    this.header.onPlayAgainClick = () => {
      this.showModal();
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
        timerAlarm(this.header.element);
      }
      this.model.tick();
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
  createArtistGame() {
    this.view.onAnswerClick = (evt) => {
      const answers = [...this.data[this.model.state.level].answers];
      const currentAnswer = evt.target.value.slice(-1);
      const isCorrectAnswer = answers[currentAnswer].isCorrect;

      this.answer(isCorrectAnswer);
    };

    this.view.onControlPlayer = (evt) => {
      const playButtons = this.view.element.querySelectorAll(`.player-control`);
      evt.preventDefault();
      setPauseAndPlay(playButtons, evt);
    };
  }


  createGenreGame() {

    this.view.onAnswerClick = (evt) => {
      const answerBtn = this.view.element.querySelector(`.genre-answer-send`);
      const genreForm = this.view.element.querySelector(`.genre`);
      const answers = genreForm.elements.answer;
      let result = this.data[this.model.state.level].genre;
      // console.log(result);

      // эксперементальный код

      // Выбрать все варианты правильных ответов в режиме игры "выбор треков одного жанра"
      const audios = [...this.data[this.model.state.level].answers];
      // console.log(audios);
      const trueValue = audios.filter((it) => {
        return it.genre === result;
      });

      // console.log(trueValue);

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
      // экспериментальный код !!!!!!!!!!!
      // const playButtons = this.view.element.querySelectorAnn(`.player-control`);
      const answers = genreForm.elements.answer;
      const currentGenre = this.data[this.model.state.level].genre;
      const audios = [...this.data[this.model.state.level].answers];
      // console.log(audios);

      // let result = this.data[this.model.state.level].result;

      // все выбранные пользователем кнопки
      // дополнитльное условие : кнопки выбраны с правльным ответом
      const checkedInputs = [...answers].filter((it) => {
        return it.checked;
      });

      const filterInputs = checkedInputs.map((it) => {
        const currentGenre = it.value.slice(-1);
        return audios[currentGenre].genre;
      }).filter((it) => {
        return it === currentGenre;
      }).length;

      // Выбрать все варианты правильных ответов в режиме игры "выбор треков одного жанра"
      const trueValue = audios.filter((it) => {
        return it.genre === currentGenre;
      }).length;

      const compareAnswers = () => {
        let result;
        if (filterInputs !== trueValue || checkedInputs.length !== trueValue) {
          result = Result.DIE;
        } else {
          result = Result.NEXT_LEVEL;
        }
        return result;
      };

      this.answer(compareAnswers());

    };

    this.view.onControlPlayer = (evt) => {
      const playButtons = this.view.element.querySelectorAll(`.player-control`);
      evt.preventDefault();
      setPauseAndPlay(playButtons, evt);
    };
  }

  changelevelType() {
    if (this.data[this.model.state.level].type === `artist`) {
      this.view = new ArtistView(this.model.state, this.data);
      this.createArtistGame();

    } else {
      this.view = new GenreView(this.model.state, this.data);
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
