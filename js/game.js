import INITIAL_GAME, {
  changeLevel,
  canContinue,
  die,
  changeAnswer,
  USER_ANSWER,
  BASE_RESULT,
  changeResult
} from "./state";
import {render, changeScreen} from "./utils/utils";
import {headerTemplate} from "./header";
import {artistTemplate} from "./artist-screen";
import {genreTemplate} from "./genre-screen";
import levels, {statistics, userAnswers} from "./data/data";
import calcPoints from "./data/calc-points";
import resultScreen from "./result-screen";

let game;
let header;
let view;
let baseAnswer = Object.assign({}, USER_ANSWER);
let baseResult = Object.assign({}, BASE_RESULT);
let result;

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  header = render(headerTemplate(game));
  const gameContainerElement = document.createElement(`div`);
  gameContainerElement.classList.add(`main`);

  const renderLevel = () => {
    gameContainerElement.innerHTML = ``;
    view.classList.add(`main`);
    gameContainerElement.appendChild(header);
    gameContainerElement.appendChild(view);
    changeScreen(gameContainerElement);
  };

  const updateHeader = (state) => {
    const currentHeader = render(headerTemplate(state));
    gameContainerElement.replaceChild(currentHeader, header);
    header = currentHeader;
  };
  // Функция проверки текущего уровня : возможно ли продолжить игру или игра закончена ?
  const checkLevel = (game) => {
  // .1 Условие , если игру нельзя продолжать
    if (!canContinue(game)) {
      const gamePoints = calcPoints(userAnswers, game.lives);
      const gameResult = changeResult(baseResult, game.lives);
      result = render(resultScreen(statistics, gameResult));
      result.classList.add(`main`);
      changeScreen(result);
    }
    // Условие достижения максимального уровня
    else if (game.level === INITIAL_GAME.maxLevel) {
      const gamePoints = calcPoints(userAnswers, game.lives);
      const gameResult = changeResult(
          baseResult,
          undefined,
          undefined,
          gamePoints
      );
      result = render(resultScreen(statistics, gameResult));
      result.classList.add(`main`);
      changeScreen(result);

    }
    // все другие случаи
    else {
      changelevelType();
    }
  };

  const createArtistGame = () => {
    const form = document.querySelector(`.main-list`);

    form.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-answer-r`)) {
        let answers = [...levels[game.level].answers];

        for (let it of answers) {
          if (it.id === evt.target.value) {
            const nextLevel = it.next();
            try {
              game = changeLevel(game, nextLevel);
              // Добавить ответ в массив ответов пользователя
              userAnswers.push(baseAnswer);
            } catch (e) {
              game = die(game);
              // Добавить ответ в массив ответов пользователя
              const falseAnswer = changeAnswer(baseAnswer, false);
              userAnswers.push(falseAnswer);
              updateHeader(game);
            }
            checkLevel(game);
            /* if (game.level === INITIAL_GAME.maxLevel) {
              const gamePoints = calcPoints(userAnswers, game.lives);
              const gameResult = changeResult(
                  baseResult,
                  undefined,
                  undefined,
                  gamePoints
              );
              result = render(resultScreen(statistics, gameResult));
              result.classList.add(`main`);
              changeScreen(result);
            } else {
              changelevelType();
            }*/

            /* if (!canContinue(game)) {
              const gamePoints = calcPoints(userAnswers, game.lives);
              const gameResult = changeResult(baseResult, game.lives);
              result = render(resultScreen(statistics, gameResult));
              result.classList.add(`main`);
              changeScreen(result);
            }*/
          }
        }
      }
    });
  };

  const createGenreGame = () => {
    const answerBtn = document.querySelector(`.genre-answer-send`);
    // const playAgainButton = document.querySelector(`.play-again`);
    const genreForm = document.querySelector(`.genre`);
    const answers = genreForm.elements.answer;

    answerBtn.disabled = true;

    const isChecked = () => {
      if ([...answers].some((node) => node.checked)) {
        answerBtn.disabled = false;
      } else {
        answerBtn.disabled = true;
      }
    };

    genreForm.addEventListener(`click`, (evt) => {
      if (evt.target.hasAttribute(`name`)) {
        isChecked();
      }
    });

    answerBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      // все выбранные пользователем кнопки
      // дополнитльное условие : кнопки выбраны с правльным ответом
      const checkedInputs = [...answers].filter((it) => {
        return it.checked && it.value === `true`;
      }).length;

      // Выбрать все варианты правилшьных ответов в режиме игры "выбор тректов одного жанра"
      const audios = [...levels[game.level].audios];
      const trueValue = audios.filter((it) => {
        return it.answer === true;
      }).length;

      // результат игры в зависимости от ответа пользователя
      if (checkedInputs === trueValue) {
        let nextLevel = levels[game.level].next();
        game = changeLevel(game, nextLevel);
        userAnswers.push(baseAnswer);
        // Дублирование кода
        /* if (game.level === INITIAL_GAME.maxLevel) {
          const gamePoints = calcPoints(userAnswers, game.lives);
          const gameResult = changeResult(
              baseResult,
              undefined,
              undefined,
              gamePoints
          );
          result = render(resultScreen(statistics, gameResult));
          result.classList.add(`main`);
          changeScreen(result);
        } else {
          changelevelType();
        }*/
      } else {
        game = die(game);
        const falseAnswer = changeAnswer(baseAnswer, false);
        userAnswers.push(falseAnswer);
        updateHeader(game);
      }
      checkLevel(game);
      // дублирование кода
      /* if (!canContinue(game)) {
        const gamePoints = calcPoints(userAnswers, game.lives);
        const gameResult = changeResult(baseResult, game.lives);
        result = render(resultScreen(statistics, gameResult));
        result.classList.add(`main`);
        changeScreen(result);
      }*/
    });
  };

  const changelevelType = () => {
    if (levels[game.level].type === `artist`) {
      view = render(artistTemplate(game));
      renderLevel();
      createArtistGame();
    } else {
      view = render(genreTemplate(game));
      renderLevel();
      createGenreGame();
    }
    return view;
  };

  changelevelType();
};

export default startGame;
