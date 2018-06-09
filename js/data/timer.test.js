import {assert} from 'chai';
import {timer} from './timer';

describe(`timer`, () => {
  it(`should return right time`, () => {
    const time = timer(30);
    assert.equal(29, time.tick());
    assert.equal(28, time.tick());
    assert.equal(27, time.tick());
  });
  it(`should return time is up`, () => {
    const time = timer(1);
    assert.equal(false, time.tick());
  });
  it(`should return object`, () => {
    assert.equal(`object`, typeof timer(10));
  });
});
