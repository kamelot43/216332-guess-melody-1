export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  maxLevel: 9,
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

export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

const Server2ResultMapper = {
  'false': Result.DIE,
  'true': Result.NEXT_LEVEL
};

export const convertAnswers = (answers) => {
  answers.map((el) => {
    if (el.type === QuestionType.ARTIST) {
      el.answers.map((it) => {
        it.isCorrect = Server2ResultMapper[it.isCorrect];
      });
    }
    return el;
  });
  return answers;
};

export const currentAnswer = (success = true, time) => {
  return Object.assign({}, {success}, {time});
};

export const changeResult = (notes, time, points) => {
  return Object.assign({}, {notes}, {time}, {points});
};

export const convertResult = (object) => {
  const date = new Date();
  return Object.assign(
      {},
      {score: object.points},
      {time: object.time},
      {notes: object.notes},
      {date: date.getTime()}
  );
};

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

export default INITIAL_GAME;
