const BASE_VALUE = {
  quickAnswerTime: 30,
  correctAnswer: 1,
  quickCorrectAnswer: 2,
  falseAnswer: 2,
  baseNotes: 3,
  fullGame: 10
};

export const quickAnswers = (array) => {
  return array.filter((it) => {
    return it.time <= BASE_VALUE.quickAnswerTime;
  }).length;
};

const calcPoints = (arr, notes) => {
  let points = 0;
  if (notes <= 0 || arr.length < BASE_VALUE.fullGame) {
    return -1;
  }

  arr.forEach((it) => {
    if (it.success === true && it.time < BASE_VALUE.quickAnswerTime) {
      points += BASE_VALUE.quickCorrectAnswer;
    }
    if (it.success === true && it.time > BASE_VALUE.quickAnswerTime) {
      points += BASE_VALUE.correctAnswer;
    } else if (it.success === false) {
      points -= BASE_VALUE.falseAnswer;
    }
  });
  return points;
};

export default calcPoints;
