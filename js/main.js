// import {changeScreen} from "./utils";
// import welcomeScreen from "./welcome-screen";

// changeScreen(welcomeScreen);

import {changeScreen} from "./utils";
import WelcomeView from "./welcome-screen";
import game from "./game";

const welcomeView = new WelcomeView();

welcomeView.element.classList.add(`main`);
changeScreen(welcomeView.element);

welcomeView.onPlayClick = () => {
  game.init();
};
