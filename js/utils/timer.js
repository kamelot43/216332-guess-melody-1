export const timer = (time) => {
  return {
    time,
    tick() {
      if (this.time > 0) {
        this.time--;
        return this.time;
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
  const timerNode = element.querySelector(`.timer`);
  const circle = element.querySelector(`.timer-line`);
  circle.classList.add(`timer-line--red`);
  timerNode.classList.add(`timer-value`);
  timerNode.classList.add(`timer-value--finished`);
};
