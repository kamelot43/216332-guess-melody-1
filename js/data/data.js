export let statistics = [4, 5, 8, 10, 11];
export let userAnswers = [];

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

export const convertAnswers = (answers) => {
  answers.map((el) => {
    if (el.type === `artist`) {
      el.answers.map((it) => {
        it.isCorrect = Server2ResultMapper[it.isCorrect];
      });
    }

    return el;
  });
  // console.log(answers);
  return answers;
};

const data = [
  {
    "type": `genre`,
    "question": `Выберите все песни в жанре R'n'B`,
    "genre": `rnb`,
    "answers": [
      {
        "src": `/path/to/file.mp3`,
        "genre": `rnb`
      },
      {
        "src": `/path/to/file.mp3`,
        "genre": `blues`
      },
      {
        "src": `/path/to/file.mp3`,
        "genre": `rock`
      },
      {
        "src": `/path/to/file.mp3`,
        "genre": `rnb`
      }
    ]
  },
  {
    "type": `artist`,
    "question": `Кто исполняет эту песню?`,
    "src": `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    "answers": [
      {
        "image": {
          "url": `http://placehold.it/705x455`,
          "width": 300,
          "height": 300
        },
        "title": `Пелагея`,
        "isCorrect": false
      },
      {
        "image": {
          "url": `http://placehold.it/705x455`,
          "width": 300,
          "height": 300
        },
        "title": `Краснознамённая дивизия имени моей Бабушки`,
        "isCorrect": false
      },
      {
        "image": {
          "url": `http://placehold.it/705x455`,
          "width": 300,
          "height": 300
        },
        "title": `Кровосток`,
        "isCorrect": true
      }
    ]
  }
];

export default convertAnswers(data);
/* export default [{
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
},
{
  title: `Кто исполняет эту песню ?`,
  type: `artist`,
  audio: {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  answers: new Set([
    {
      id: `answer-1`,
      src: ``,
      artist: `Metalica`,
      result: Result.NEXT_LEVEL
    },
    {
      id: `answer-2`,
      src: ``,
      artist: `Jingle Punks`,
      result: Result.DIE
    },
    {
      id: `answer-3`,
      src: ``,
      artist: `Kevin MacLeod`,
      result: Result.DIE
    }
  ])
},
{
  title: `Кто исполняет эту песню ?`,
  type: `artist`,
  audio: {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  answers: new Set([
    {
      id: `answer-1`,
      src: ``,
      artist: `Дидюля`,
      result: Result.NEXT_LEVEL
    },
    {
      id: `answer-2`,
      src: ``,
      artist: `Audionautix`,
      result: Result.DIE
    },
    {
      id: `answer-3`,
      src: ``,
      artist: `Дима Билан`,
      result: Result.DIE
    }
  ])
},
{
  title: `Выберите инди-рок треки`,
  type: `genre`,
  audios: new Set([
    {
      id: `a-1`,
      artist: `Audionautix`,
      name: `Travel Light`,
      src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
      genre: `Country`,
      answer: true
    },
    {
      id: `a-2`,
      artist: `Gunnar Olsen`,
      name: `Home Stretch`,
      src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
      genre: `Electronic`,
      answer: true
    },
    {
      id: `a-3`,
      artist: `Riot`,
      name: `Level Plane`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
      genre: `R&B`,
      answer: true
    },
    {
      id: `a-4`,
      artist: `Kevin MacLeod`,
      name: `Long Stroll`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`,
      answer: false
    }
  ]),
  result: Result.NEXT_LEVEL
},
{
  title: `Кто исполняет эту песню ?`,
  type: `artist`,
  audio: {
    artist: `Riot`,
    name: `Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  answers: new Set([
    {
      id: `answer-1`,
      src: ``,
      artist: `Riot`,
      result: Result.NEXT_LEVEL
    },
    {
      id: `answer-2`,
      src: ``,
      artist: `Пелагея`,
      result: Result.DIE
    },
    {
      id: `answer-3`,
      src: ``,
      artist: `Иван Дорн`,
      result: Result.DIE
    }
  ])
},
{
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
},
{
  title: `Кто исполняет эту песню ?`,
  type: `artist`,
  audio: {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  answers: new Set([
    {
      id: `answer-1`,
      src: ``,
      artist: `Metalica`,
      result: Result.NEXT_LEVEL
    },
    {
      id: `answer-2`,
      src: ``,
      artist: `Jingle Punks`,
      result: Result.DIE
    },
    {
      id: `answer-3`,
      src: ``,
      artist: `Kevin MacLeod`,
      result: Result.DIE
    }
  ])
},
{
  title: `Кто исполняет эту песню ?`,
  type: `artist`,
  audio: {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  answers: new Set([
    {
      id: `answer-1`,
      src: ``,
      artist: `Дидюля`,
      result: Result.NEXT_LEVEL
    },
    {
      id: `answer-2`,
      src: ``,
      artist: `Audionautix`,
      result: Result.DIE
    },
    {
      id: `answer-3`,
      src: ``,
      artist: `Дима Билан`,
      result: Result.DIE
    }
  ])
},
{
  title: `Выберите инди-рок треки`,
  type: `genre`,
  audios: new Set([
    {
      id: `a-1`,
      artist: `Audionautix`,
      name: `Travel Light`,
      src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
      genre: `Country`,
      answer: true
    },
    {
      id: `a-2`,
      artist: `Gunnar Olsen`,
      name: `Home Stretch`,
      src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
      genre: `Electronic`,
      answer: true
    },
    {
      id: `a-3`,
      artist: `Riot`,
      name: `Level Plane`,
      src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
      genre: `R&B`,
      answer: true
    },
    {
      id: `a-4`,
      value: `answer-4`,
      artist: `Kevin MacLeod`,
      name: `Long Stroll`,
      src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
      genre: `Jazz`,
      answer: false
    }
  ]),
  result: Result.NEXT_LEVEL

},
{
  title: `Кто исполняет эту песню ?`,
  type: `artist`,
  audio: {
    artist: `Riot`,
    name: `Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  answers: new Set([
    {
      id: `answer-1`,
      src: ``,
      artist: `Riot`,
      result: Result.WIN
    },
    {
      id: `answer-2`,
      src: ``,
      artist: `Пелагея`,
      result: Result.DIE
    },
    {
      id: `answer-3`,
      src: ``,
      artist: `Иван Дорн`,
      result: Result.DIE
    }
  ])
}
];
*/
