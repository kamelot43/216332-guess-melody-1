import levels, {userAnswers} from "./data/data";

export const INITIAL_GAME = Object.freeze({
  level: `level-1`,
  lives: 3,
  maxLevel: `level-10`,
  minLives: 0,
  baseTime: 35
});

export const Result = {
  NOOP: 0,
  DIE: 1,
  WIN: 2,
  NEXT_LEVEL: 3
};

export const USER_ANSWER = Object.freeze({
  success: true,
  time: 35
});

export const changeAnswer = (base, success, time = INITIAL_GAME.baseTime) => {
  return Object.assign({}, base, {success}, {time});
};

export const BASE_RESULT = {
  notes: 3,
  time: 35,
  points: 0
};

export const changeResult = (base, notes = INITIAL_GAME.lives, time = INITIAL_GAME.baseTime, points) => {
  return Object.assign({}, base, {notes}, {time}, {points});
};

export const getLevel = (state) => levels[`level-${state.level}`];

export const changeLevel = (game, level) => {
  if (level === undefined) {
    throw new Error(`Level should be of type number`);
  }


  return Object.assign({}, game, {
    level
  });
};

export const canContinue = (game) => game.lives - 1 >= 0;

export const die = (game) => {
  if (!canContinue(game)) {
    throw new Error(`You can't continue anymore`);
  }

  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};

export const resetUserAnswers = () => {
  userAnswers.length = 0;
  return userAnswers;
};

export default INITIAL_GAME;
