// import levels from "./data/data";
import AbstractView from "./abstract-view";

export default class GenreView extends AbstractView {
  constructor(game, data) {
    super();
    this.game = game;
    this.data = data;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">${this.data[this.game.level].question}</h2>
    <form class="genre">
    ${[...this.data[this.game.level].answers].map((it, idx) =>
    `<div class="genre-answer">
       <div class="player-wrapper">
         <div class="player">
           <audio src= "" preload></audio>
           <button class="player-control"></button>
           <div class="player-track">
             <span class="player-status"></span>
           </div>
         </div>
       </div>
       <input type="checkbox" name="answer" value="answer-${idx}" id="a-${idx}">
       <label class="genre-answer-check" for="a-${idx}"></label>
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
