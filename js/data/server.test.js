import {assert} from 'chai';

const localData = {
  "level-1": {
    title: `Кто исполняет эту песню ?`,
    type: `artist`,
    audio: {
      artist: `Kevin MacLeod`,
      name: `Long Stroll`,
      image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`
    },
    answers: new Set([
      {
        id: `answer-1`,
        src: ``,
        artist: `Пелагея`,
        result: Result.NEXT_LEVEL
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Боб Марли`,
        result: Result.DIE
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Kevin MacLeod`,
        result: Result.DIE
      }
    ])
  }
};


describe(`Adapt server data`, () => {

  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, serverData);
  });

});
