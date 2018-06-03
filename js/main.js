import {render, changeScreen} from "./utils";
import welcomeScreen from "./welcome-screen";

changeScreen(welcomeScreen);

/*
const template = document.getElementById(`templates`);
const screens = template.content.querySelectorAll(`.main`);
const sectionMain = document.querySelector(`.main`);
const app = document.querySelector(`.app`);
const leftArrow = 37;
const rightArrow = 39;
let currentIndex = 0;

const arrowButtons = document.createElement(`DIV`);
arrowButtons.className = `arrows__wrap`;
arrowButtons.innerHTML = `<style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn" onclick="showScreen(currentIndex-1)"></button>
    <button class="arrows__btn" onclick="showScreen(currentIndex+1)"></button>`;

app.appendChild(arrowButtons);

const showScreen = (idx) => {
  if (idx < screens.length && idx >= 0) {
    renderScreen(idx);
    currentIndex = idx;
  }
};

const renderScreen = (number) => {
  sectionMain.innerHTML = ``;
  sectionMain.appendChild(screens[number]);
};

renderScreen(currentIndex);

// Переключение экрана. Обработчик события.
document.addEventListener(`keydown`, function (evt) {
  if (evt.ctrlKey) {
    return;
  }
  if (evt.keyCode === rightArrow) {
    showScreen(currentIndex + 1);
  } else if (evt.keyCode === leftArrow) {
    showScreen(currentIndex - 1);
  }
});
*/
