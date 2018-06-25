export const timer = (state) => {
  return {
    time: state.time,
    tick() {
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

export const timerAlarm = (element) => {
  const timer = element.querySelector(`.timer`);
  const circle = element.querySelector(`.timer-line`);
  circle.classList.add(`timer-line--red`);
  timer.classList.add(`timer-value`);
  timer.classList.add(`timer-value--finished`);
};
