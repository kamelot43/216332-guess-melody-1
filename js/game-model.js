import {INITIAL_GAME, currentAnswer, die, changeLevel} from "./state";
import {timer} from "./data/timer";


class GameModel {
  constructor() {
    this.restart();
    this.userAnswers();
  }

  get state() {
    return this._state;
  }

  get answers() {
    return this._userAnswers;
  }

  hasNextLevel() {
    return this._state.level === INITIAL_GAME.maxLevel;
  }

  checkLevel() {
    return this.hasNextLevel() || this.isDead() || this.isTimeOut();
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  isTimeOut() {
    return this._state.time <= 0;
  }

  isAlarm() {
    return this._state.time <= 30;
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

  saveUserAnswers(current = true, currentTime) {
    const currentValue = currentAnswer(current, currentTime);
    this._userAnswers.push(currentValue);
  }

  resetUserAnswers() {
    this._userAnswers.length = 0;
    return this._userAnswers;
  }

  resetState() {
    this.restart();
    this.resetUserAnswers();
  }

  tick() {
    this._state = timer(this._state).tick();
  }

  findDifference() {
    return this._currentTime - this._game.time;
  }

  detectTime() {
    this._currentTime = this._state.time;
  }

}

export default GameModel;
