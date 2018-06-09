export const timer = (time) => {
  return {
    value: time,
    tick() {
      if (this.value > 0) {
        this.value -= 1;
        return this.value;
      } else {
        return false;
      }
    }
  };
};
