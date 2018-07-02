import {assert} from "chai";
import displayResults from "./display-results";

const statistics = [4, 5, 8, 10, 11];

// Данные игрока
const player1 = {
  notes: 3,
  time: 25,
  points: 7
};

const player2 = {
  notes: 3,
  time: 25,
  points: 9
};

const timeOut = {
  notes: 3,
  time: 0,
  points: 7
};

const gameOver = {
  notes: 0,
  time: 450,
  points: 7
};

describe(`return game statistic`, () => {
  it(`should return right result`, () => {
    assert.equal(
        displayResults(statistics, player1),
        `Вы заняли 4 место из 6 игроков. Это лучше, чем у 33% игроков`
    );
    assert.equal(
        displayResults(statistics, player2),
        `Вы заняли 3 место из 7 игроков. Это лучше, чем у 57% игроков`
    );
  });
  it(`should return time is over`, () => {
    assert.equal(
        displayResults(statistics, timeOut),
        `Время вышло! Вы не успели отгадать все мелодии`
    );
  });
  it(`should return game is over`, () => {
    assert.equal(
        displayResults(statistics, gameOver),
        `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
    );
    assert.equal(
        displayResults(statistics, gameOver),
        `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
    );
  });
});
