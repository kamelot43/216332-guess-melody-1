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

class Game {
  constructor() {
    this.game = Object.assign({}, INITIAL_GAME);
    this.header = new HeaderView(this.game);
    this.baseAnswer = Object.assign({}, USER_ANSWER);
    this.baseResult = Object.assign({}, BASE_RESULT);
    this.root = document.createElement(`div`);
    this.root.classList.add(`main`);
  }


  init() {
    this.changelevelType();
    changeScreen(this.root);
    this.header.onPlayAgainClick = () => {
      this.restartGame();
    };
  }

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
    if (!canContinue(gameValue)) {
      this.changeGameResult(gameValue, false);
    } else if (this.game.level === INITIAL_GAME.maxLevel) {
      this.changeGameResult(gameValue);
    } else {
      return;
    }
  }

  resetState() {
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
          switch (answer.result) {
            case Result.NEXT_LEVEL:
              this.game = changeLevel(this.game, `level-${+this.game.level.slice(-1) + 1}`);
              userAnswers.push(this.baseAnswer);
              this.changelevelType();
              break;
            case Result.DIE:
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
      const result = levels[this.game.level].result;

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

      // результат игры в зависимости от ответа пользователя
      if (checkedInputs === trueValue) {
        switch (result) {
          case Result.NEXT_LEVEL:
            this.game = changeLevel(this.game, `level-${+this.game.level.slice(-1) + 1}`);
            userAnswers.push(this.baseAnswer);
            this.changelevelType();
            break;
          case Result.WIN:
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
  }

}

const game = new Game();
export default game;
