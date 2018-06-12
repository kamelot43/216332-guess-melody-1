export const INITIAL_GAME = Object.freeze({
  level: `level-1`,
  lives: 3,
});

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
