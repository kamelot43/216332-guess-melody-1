import {render, changeScreen} from "./utils";
import getRandomResult from "./result-screen";
import welcomeScreen from "./welcome-screen";
import INITIAL_GAME from "./state";
import levels from "./data/data";

export const genreTemplate = (state = INITIAL_GAME) =>
  `<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
    ${[...levels[state.level].audios].map((it) =>
    `<div class="genre-answer">
       <div class="player-wrapper">
         <div class="player">
           <audio src= "${it.src}" preload></audio>
           <button class="player-control"></button>
           <div class="player-track">
             <span class="player-status"></span>
           </div>
         </div>
       </div>
       <input type="checkbox" name="answer" value="${it.answer}" id="${it.id}">
       <label class="genre-answer-check" for="${it.id}"></label>
     </div>`).join(``)}

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
</section>`;

/* const genreScreen = render(template);
const answerBtn = genreScreen.querySelector(`.genre-answer-send`);
const playAgainButton = genreScreen.querySelector(`.play-again`);
const genreForm = genreScreen.querySelector(`.genre`);
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
  const randomResult = getRandomResult();
  changeScreen(randomResult);
});

playAgainButton.addEventListener(`click`, () => {
  changeScreen(welcomeScreen);
});

// есть две проблемы : первая - форма должна очищаться после ответа и перехода на новый экрана
// воторая - дублирование переменной playAgainButton и обработчика событий.

export default genreScreen;
*/
