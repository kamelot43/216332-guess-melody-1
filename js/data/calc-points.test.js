import {assert} from 'chai';
import calcPoints from './calc-points';

const correctAnswers = [
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31},
  {answer: true, time: 31}
];

const incorrectAnswers = [
  {answer: true, time: 25},
  {answer: false, time: 25},
  {answer: false, time: 25},
  {answer: false, time: 25},
  {answer: false, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
];

const quickCorrectAnswers = [
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25},
  {answer: true, time: 25}
];


describe(`calculate points`, () => {

  it(`should return right points for all correct answers`, () => {
    assert.equal(calcPoints(correctAnswers, 3), 10);
  });

  it(`should return right points for all correct and quick answers`, () => {
    assert.equal(calcPoints(quickCorrectAnswers, 3), 20);
  });


  it(`should return -1 at not finish game`, () => {
    assert.equal(calcPoints(incorrectAnswers, 0), -1);
  });

});
