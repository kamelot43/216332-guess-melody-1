import INITIAL_GAME from "./state";
import displayResults from "./data/display-results";
import {quickAnswers} from "./data/calc-points";
import AbstractView from "./abstract-view";

const TYPE_TEXT = {
  win: {
    title: `Вы настоящий меломан!`
  },
  livesOver: {
    title: `Какая жалость!`
  },
  timeOver: {
    title: `Увы и ах!`
  }
};

export const TYPE_POINTS = {
  LOSE: -1,
  TIMEOUT: 0
};

export default class ResultView extends AbstractView {
  constructor(statistics, gameResult, userAnswers) {
    super();
    this.gameResult = gameResult;
    this.statistics = statistics;
    this.userAnswers = userAnswers;
  }

  get template() {
    if (this.gameResult.notes > 0 && this.gameResult.time > 0) {
      return `<section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">${this.findCurrentTitle()}</h2>
        <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
          <br>вы&nbsp;набрали ${this.gameResult.points} баллов (${quickAnswers(this.userAnswers)} быстрых)
          <br>совершив ${INITIAL_GAME.lives - this.gameResult.notes} ошибки</div>
        <span class="main-comparison">${displayResults(this.statistics, this.gameResult)}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
    } else {
      return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this.findCurrentTitle()}</h2>
      <div class="main-stat">${displayResults(this.statistics, this.gameResult)}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
    }
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);

    const replayHandler = (evt) => {
      evt.preventDefault();
      this.onReplayClick();
    };

    replayBtn.addEventListener(`click`, replayHandler);
  }

  findCurrentTitle() {
    if (this.gameResult.notes <= 0) {
      return TYPE_TEXT.livesOver.title;
    } else if (this.gameResult.time <= 0) {
      return TYPE_TEXT.timeOver.title;
    } else {
      return TYPE_TEXT.win.title;
    }
  }

  onReplayClick() {}
}
