import {changeResult} from "./state";
import {changeScreen, setPauseAndPlay} from "./utils";
import HeaderView from "./header";
import ArtistView from "./artist-screen";
import GenreView from "./genre-screen";
import {Result} from "./data/data";
import calcPoints from "./data/calc-points";
import ConfirmView from "./confirm-screen";
import {timerAlarm} from "./data/timer";
import Router from "./router";

const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

class Game {
  constructor(model) {
    this.model = model;
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


  convertResult(notes, time, score) {
    return Object.assign({}, {score}, {time}, {notes}, {date: new Date()});
  }

  changeGameResult(gameState) {
    const gamePoints = calcPoints(this.model.answers, gameState.lives);
    this._gameResult = changeResult(gameState.lives, gameState.time, gamePoints);
    Router.showStats(this._gameResult, this.model.answers);
  }

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
      const answers = [...this.model.data[this.model.state.level].answers];
      const currentAnswer = evt.target.value.slice(-1);
      const isCorrectAnswer = answers[currentAnswer].isCorrect;

      if (this.model.hasNextLevel() && isCorrectAnswer === Result.NEXT_LEVEL) {
        this.answer(Result.WIN);
        return;
      }
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

      const genreForm = this.view.element.querySelector(`.genre`);
      const answers = genreForm.elements.answer;
      const currentGenre = this.model.data[this.model.state.level].genre;
      const audios = [...this.model.data[this.model.state.level].answers];

      const checkedInputs = [...answers].filter((it) => {
        return it.checked;
      });

      const filterInputs = checkedInputs.map((it) => {
        const currentAnswerGenre = it.value.slice(-1);
        return audios[currentAnswerGenre].genre;
      }).filter((it) => {
        return it === currentGenre;
      }).length;


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

      if (this.model.hasNextLevel() && compareAnswers() === Result.NEXT_LEVEL) {
        this.answer(Result.WIN);
        return;
      }

      this.answer(compareAnswers());

    };

    this.view.onControlPlayer = (evt) => {
      const playButtons = this.view.element.querySelectorAll(`.player-control`);
      evt.preventDefault();
      setPauseAndPlay(playButtons, evt);
    };
  }

  changelevelType() {
    if (this.model.data[this.model.state.level].type === QuestionType.ARTIST) {
      this.view = new ArtistView(this.model.state, this.model.data);
      this.createArtistGame();

    } else {
      this.view = new GenreView(this.model.state, this.model.data);
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
