import INITIAL_GAME from "./state";
import AbstractView from "./abstract-view";
import {transformTime} from "./data/timer";

export default class HeaderView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }
  get template() {
    return `<a class="play-again play-again__wrap" href="#">
    <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer " viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${transformTime(this.game.time).minutes}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${transformTime(this.game.time).seconds}</span>
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
