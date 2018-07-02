import AbstractView from "./abstract-view";

export default class ArtistView extends AbstractView {
  constructor(game, data) {
    super();
    this.game = game;
    this.data = data;
  }
  get template() {
    return `<section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${this.data[this.game.level].question}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src= "${this.data[this.game.level].src}" preload></audio>
            <button class="player-control"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">

          ${[...this.data[this.game.level].answers]
            .map(
                (it, idx) =>
                  ` <div class="main-answer-wrapper">
               <input class="main-answer-r" type="radio" id="answer-${idx}" name="answer" value="val-${idx}"/>
               <label class="main-answer" for="answer-${idx}">
                 <img class="main-answer-preview" src="${it.image.url}"
                      alt="Пелагея" width="134" height="134">
                 ${it.title}
               </label>
             </div>`
            )
            .join(``)}
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

    playerBtn.previousElementSibling.play();
    playerBtn.classList.add(`player-control--pause`);
  }

  onAnswerClick() {}
  onControlPlayer() {}
}
