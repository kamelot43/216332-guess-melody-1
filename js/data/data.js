export const Result = {
  NOOP: 0,
  DIE: 1,
  WIN: 2,
  NEXT_LEVEL: 3
};

const Server2ResultMapper = {
  'false': Result.DIE,
  'true': Result.NEXT_LEVEL
};

const convertAnswers = (answers) => {
  answers.map((el) => {
    if (el.type === `artist`) {
      el.answers.map((it) => {
        it.isCorrect = Server2ResultMapper[it.isCorrect];
      });
    }
    return el;
  });
  return answers;
};

export default convertAnswers;
