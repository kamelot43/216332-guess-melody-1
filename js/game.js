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
import {timer} from "./data/timer";

class Game {
  constructor() {
    // this.model = model;
    this.game = Object.assign({}, INITIAL_GAME);
    this.header = new HeaderView(this.game);
    this.baseAnswer = Object.assign({}, USER_ANSWER);
    this.baseResult = Object.assign({}, BASE_RESULT);
    this.root = document.createElement(`div`);
    this.root.classList.add(`main`);
  }

  // Инициализация и запуск игры
  init() {
    this.changelevelType();
    changeScreen(this.root);
    this.startTimer();
    // this.detectTime();
    this.header.onPlayAgainClick = () => {
      this.restartGame();
    };
  }
  // Перезапустить игру
  restartGame() {
    const welcomeView = new WelcomeView();
    welcomeView.element.classList.add(`main`);
    welcomeView.onPlayClick = () => {
      this.resetState();
      this.updateHeader();
      game.init();
    };
    changeScreen(welcomeView.element);
  }
  // Обновить шапку
  updateHeader() {
    const header = new HeaderView(this.game);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onPlayAgainClick = () => {
      this.restartGame();
    };
  }

  // Расчет результата игры : подсчет очков, вывод экрана победы или поражения
  changeGameResult(gameState, state = true) {
    let gameResult;
    const gamePoints = calcPoints(userAnswers, gameState.lives);
    if (!state) {
      gameResult = changeResult(this.baseResult, gameState.lives);
    } else {
      gameResult = changeResult(
          this.baseResult,
          gameState.lives,
          undefined,
          gamePoints
      );
    }
    this.result = new ResultView(statistics, gameResult);
    this.result.element.classList.add(`main`);
    this.result.onReplayClick = () => {
      this.restartGame();
    };
    changeScreen(this.result.element);

  }

  // Функция проверки текущего уровня : возможно ли продолжить игру или игра закончена ?
  checkLevel(gameValue) {
  // .1 Условие , если игру нельзя продолжать
  // isDead
    if (!canContinue(gameValue)) {
      this.changeGameResult(gameValue, false);
      //  hasNextLevel
    } else if (this.game.level === INITIAL_GAME.maxLevel) {
      this.changeGameResult(gameValue);
    } else {
      this.startTimer();
      return;
    }
  }

  answer(answer) {
    // console.log(this.currentTime);
    this.stopGame();
    let currentAnswer;
    const difference = this.currentTime - this.game.time;
    // console.log(this.currentTime);
    switch (answer.result) {
      case Result.NEXT_LEVEL:
      // this.model.nextLevel();
      // this.startGame();
        // break;
        this.game = changeLevel(this.game, `level-${+this.game.level.slice(-1) + 1}`);
        // this.model.saveUserAnswer();
        currentAnswer = changeAnswer(true, difference);
        userAnswers.push(currentAnswer);
        this.changelevelType();
        // console.log(this.currentTime - this.game.time);
        this.startTimer();
        break;
      case Result.DIE:
        // this.model.die();
        this.game = die(this.game);
        // this.model.saveUserAnswer(false);
        currentAnswer = changeAnswer(false, difference);
        userAnswers.push(currentAnswer);
        this.updateHeader(this.game);
        this.checkLevel(this.game);
        break;
      case Result.WIN:
      // this.model.saveUserAnswer();
        userAnswers.push(this.baseAnswer);
        this.checkLevel(this.game);
        break;
      case Result.NOOP:
      // just do nothing
        break;
      default:
        throw new Error(`Unknown result`);
    }
  }

  // тестовая функция
  timer() {
    this.interval = setInterval(() => {
      this.game = timer(this.game).tick();
      this.updateHeader();
    }, 1000);
    // return timer(this.game).tick();
    // return test;
    // test.tick();
    // console.log(this.game);
    // this.updateHeader();
  }

  stopGame() {
    clearInterval(this.interval);
  }

  detectTime() {
    this.currentTime = this.game.time;
  }

  startTimer() {
    this.timer();
    this.detectTime();
  }

  resetState() {
    // this.model.restart();
    this.game.level = INITIAL_GAME.level;
    this.game.lives = INITIAL_GAME.lives;
    this.game.time = INITIAL_GAME.time;
    resetUserAnswers();
    return this.game;
  }

  createArtistGame() {
    this.view.onAnswerClick = (evt) => {
      const answers = [...levels[this.game.level].answers];

      for (let answer of answers) {
        if (answer.id === evt.target.value) {
          // this.stopGame();
          // this.updateHeader();
          // x.tick();
          // this.game = x;
          // console.log(this.game);
          // console.log(this.game);

          this.answer(answer);
          /* switch (answer.result) {
            case Result.NEXT_LEVEL:
            // this.model.nextLevel();
            // this.startGame();
              // break;
              this.game = changeLevel(this.game, `level-${+this.game.level.slice(-1) + 1}`);
              userAnswers.push(this.baseAnswer);
              this.changelevelType();
              break;
            case Result.DIE:
              // this.model.die();
              this.game = die(this.game);
              const falseAnswer = changeAnswer(this.baseAnswer, false);
              userAnswers.push(falseAnswer);
              this.updateHeader(this.game);
              this.checkLevel(this.game);
              break;
            case Result.WIN:
              userAnswers.push(this.baseAnswer);
              this.checkLevel(this.game);
              break;
            case Result.NOOP:
            // just do nothing
              break;
            default:
              throw new Error(`Unknown result`);
          }
          */
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
      const answerBtn = document.querySelector(`.genre-answer-send`);
      const genreForm = document.querySelector(`.genre`);
      const answers = genreForm.elements.answer;

      const isChecked = () => {
        if ([...answers].some((node) => node.checked)) {
          answerBtn.disabled = false;
        } else {
          answerBtn.disabled = true;
        }
      };
      // Возможно блок if можно удалить
      if (evt.target.hasAttribute(`name`)) {
        isChecked();
      }
    };

    this.view.onSubmitClick = (evt) => {
      evt.preventDefault();

      // Избыточное объявление переменных
      const form = this.view.element.querySelector(`.genre`);
      const formInputs = form.elements.answer;
      let result = levels[this.game.level].result;

      // все выбранные пользователем кнопки
      // дополнитльное условие : кнопки выбраны с правльным ответом
      const checkedInputs = [...formInputs].filter((it) => {
        return it.checked && it.value === `true`;
      }).length;

      // Выбрать все варианты правильных ответов в режиме игры "выбор тректов одного жанра"
      const audios = [...levels[this.game.level].audios];
      const trueValue = audios.filter((it) => {
        return it.answer === true;
      }).length;

      const compareAnswers = () => {
        let result;
        if (checkedInputs !== trueValue) {
          result = Result.DIE;
        } else {
          result = levels[this.game.level].result;
        }
        return result;
      };

      answers(compareAnswers);

      // результат игры в зависимости от ответа пользователя
      /* if (checkedInputs === trueValue) {
        switch (result) {
          case Result.NEXT_LEVEL:
            this.game = changeLevel(this.game, `level-${+this.game.level.slice(-1) + 1}`);
            userAnswers.push(this.baseAnswer);
            this.changelevelType();
            break;
          case Result.WIN:
            userAnswers.push(this.baseAnswer);
            this.checkLevel(this.game);
            break;
          case Result.NOOP:
            // just do nothing
            break;
          default:
            throw new Error(`Unknown result: ${result}`);
        }
      } else {
        this.game = die(this.game);
        const falseAnswer = changeAnswer(this.baseAnswer, false);
        userAnswers.push(falseAnswer);
        this.updateHeader(this.game);
        this.checkLevel(this.game);
      }
      */
    };

    this.view.onControlPlayer = (evt) => {
      evt.preventDefault();
      setPauseAndPlay(evt);
    };
  }

  changelevelType() {
    if (levels[this.game.level].type === `artist`) {
      this.view = new ArtistView(this.game);
      this.createArtistGame();

    } else {
      this.view = new GenreView(this.game);
      this.createGenreGame();
    }
    // возможно этот обработчик событий не на своем месте

    this.view.element.classList.add(`main`);
    this.root.innerHTML = ``;
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.view.element);
    // this.timer();
  }

}

const game = new Game();
export default game;
