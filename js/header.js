import INITIAL_GAME from "./state";
import AbstractView from "./abstract-view";

export default class HeaderView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }
  get template() {
    return `<a class="play-again play-again__wrap" href="#">
    <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">00</span>
    </div>
  </svg>
  <div class="main-mistakes">
      ${new Array(INITIAL_GAME.lives - this.game.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>`;
  }

  bind() {
    const playAgainButton = this.element.querySelector(`.play-again`);

    const playAgainHandler = (evt) => {
      evt.preventDefault();
      this.onPlayAgainClick();
    };

    playAgainButton.addEventListener(`click`, playAgainHandler);
  }

  onPlayAgainClick() {}
}

// const playAgainButton = document.querySelector(`.play-again`);

/* playAgainButton.addEventListener(`click`, () => {
  // changeScreen(welcomeScreen);
  console.log(`hello`);
});*/
