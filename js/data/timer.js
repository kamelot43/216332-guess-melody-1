/* const tick = () => {
  game = Object.assign({}, game, {
    time: game.time + 1
  });
  updateHeader(game);
};*/

export const timer = (state) => {
  return {
    time: state.time,
    tick() {
      // const timer = Object.assign({}, game, {time: game.time + 1});
      if (this.time > 0) {
        const time = this.time - 1;
        return Object.assign({}, state, {time});
      } else {
        return false;
      }
    }
  };
};

export const transformTime = (time) => {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);

  minutes = minutes < 10 ? `0` + minutes : minutes;
  seconds = seconds < 10 ? `0` + seconds : seconds;
  return {
    minutes,
    seconds
  };
};
