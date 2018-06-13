import {render, changeScreen} from "./utils";
import genreScreen from "./genre-screen";
import welcomeScreen from "./welcome-screen";
import INITIAL_GAME from "./state";
import levels from "./data/data";

export const artistTemplate = (state = INITIAL_GAME) =>
  `<section class="main main--level main--level-artist">
  <div class="main-wrap">
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">

      ${[...levels[state.level].answers].map((it) =>
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
