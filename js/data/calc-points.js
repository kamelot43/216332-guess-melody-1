const BASE_VALUE = {
  correctAnswer: 1,
  quickCorrectAnswer: 2,
  falseAnswer: 2,
  baseNotes: 3,
  fullGame: 10
};

const calcPoints = (arr, notes) => {
  let points = 0;
  if (notes <= 0 || arr.length < BASE_VALUE.fullGame) {
    return -1;
  }

  arr.forEach((it) => {
    if (it.success === true && it.time < 30) {
      points += BASE_VALUE.quickCorrectAnswer;
    }
    if (it.success === true && it.time > 30) {
      points += BASE_VALUE.correctAnswer;
    } else if (it.success === false) {
      points -= BASE_VALUE.falseAnswer;
    }

  });
  return points;
};

export default calcPoints;
