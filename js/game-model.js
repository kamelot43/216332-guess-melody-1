import INITIAL_GAME from "./state";

class GameModel {
  constructor() {
    this.restart();
    this.userAnswers();
  }

  get state() {
    return this._state;
  }

  hasNextLevel() {
    // return getLevel(this._state.level + 1) !== void 0;
    return this._state.level === INITIAL_GAME.maxLevel;
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  nextLevel() {
    this._state = changeLevel(this._state, `level-${+this._state.level.slice(-1) + 1}`);
  }

  die() {
    this._state = die(this._state);
  }

  userAnswers() {
    this._userAnswers = [];
  }

  saveUserAnswer(currentAnswer = true, currentTime) {
    const currentValue = isCorrectAnswer(currentAnswer, currentTime);
    this._userAnswers.push(currentValue);
  }

  tick() {
    this._state = timer(this._state).tick();
  }

  findDifference() {
    return this._currentTime - this._game.time;
  }

  detectTime() {
    this._currentTime = this_.game.time;
  }

}
