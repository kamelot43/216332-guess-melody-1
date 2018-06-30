import levels, {userAnswers} from "./data/data";

export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  maxLevel: 10,
  time: 300,
  minLives: 0,
  baseTime: 35,
  questions: []
});

export const Result = {
  NOOP: 0,
  DIE: 1,
  WIN: 2,
  NEXT_LEVEL: 3
};


export const currentAnswer = (success = true, time) => {
  return Object.assign({}, {success}, {time});
};


export const changeResult = (notes, time, points) => {
  return Object.assign({}, {notes}, {time}, {points});
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
