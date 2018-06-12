import INITIAL_GAME, {changeLevel, canContinue, die} from "./state";
import {render, changeScreen} from "./utils/utils";
import {headerTemplate} from "./header";
import {artistTemplate} from "./artist-screen";
import {genreTemplate} from "./genre-screen";
import levels from "./data/data";


let game;
let header;
let view;

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

  const createArtistGame = () => {
    const form = document.querySelector(`.main-list`);

    form.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-answer-r`)) {
        let test = [...levels[game.level].answers];
        for (let i of test) {
          if (i.id === evt.target.value) {
            const res = i.next();
            try {
              game = changeLevel(game, res);
              changelevelType();
            } catch (e) {
              game = die(game);
              updateHeader(game);
            }
            if (!canContinue(game)) {

            }
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
      const checkedInputs = [...answers].filter((it) => {
        return it.checked && it.value === `true`;
      }).length;


      let test = [...levels[game.level].audios];
      let z = levels[game.level].next();
      game = changeLevel(game, z);
      let sort = test.filter((it) => {
        return it.answer == true;
      }).length;
      // console.log(sort);
      console.log(game);
      // const randomResult = getRandomResult();
      // changeScreen(randomResult);
    });

    /* form.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-answer-r`)) {
        let test = [...levels[game.level].answers];
        for (let i of test) {
          if (i.id === evt.target.value) {
            const res = i.next();
            try {
              game = changeLevel(game, res);
              changelevelType();
            } catch (e) {
              game = die(game);
              updateHeader(game);
            }
            if (!canContinue(game)) {

            }
          }
        }
      }
    });*/
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
