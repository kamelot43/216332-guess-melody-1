import levels from "./data/data";
import AbstractView from "./abstract-view";

export default class GenreView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">${levels[this.game.level].title}</h2>
    <form class="genre">
    ${[...levels[this.game.level].audios].map((it) =>
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
  }

  bind() {
    const form = this.element.querySelector(`.genre`);
    const formInputs = form.elements.answer;
    const submitBtn = this.element.querySelector(`.genre-answer-send`);
    submitBtn.disabled = true;


    [...formInputs].forEach((elem) => {
      elem.addEventListener(`change`, this.onAnswerClick);
    });

    submitBtn.addEventListener(`click`, this.onSubmitClick);

    const playerBtns = this.element.querySelectorAll(`.player-control`);
    [...playerBtns].forEach((elem) => {
      elem.addEventListener(`click`, this.onControlPlayer);
    });

  }

  onAnswerClick() {}

  onSubmitClick() {}

  onControlPlayer() {}

}
