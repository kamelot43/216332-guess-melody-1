import levels from "./data/data";
import AbstractView from "./abstract-view";

export default class ArtistView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }
  get template() {
    return `<section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${levels[this.game.level].title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src= "${levels[this.game.level].audio.src}" preload></audio>
            <button class="player-control"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">

          ${[...levels[this.game.level].answers].map((it) =>
    ` <div class="main-answer-wrapper">
               <input class="main-answer-r" type="radio" id="${it.id}" name="answer" value="${it.id}"/>
               <label class="main-answer" for="${it.id}">
                 <img class="main-answer-preview" src="http://placehold.it/134x134"
                      alt="Пелагея" width="134" height="134">
                 ${it.artist}
               </label>
             </div>`).join(``)}
        </form>
      </div>
    </section>`;
  }

  bind() {

    const artistAnswers = this.element.querySelectorAll(`.main-answer-r`);
    [...artistAnswers].forEach((elem) => {
      elem.addEventListener(`change`, this.onAnswerClick);
    });

    const playerBtn = this.element.querySelector(`.player-control`);
    playerBtn.addEventListener(`click`, this.onControlPlayer);
  }

  onAnswerClick() {}
  onControlPlayer() {}
}
