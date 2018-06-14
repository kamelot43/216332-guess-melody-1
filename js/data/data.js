export let statistics = [4, 5, 8, 10, 11];
export let userAnswers = [];

export default {
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
        next() {
          return `level-2`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Боб Марли`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Kevin MacLeod`,
        next() {
        }
      }
    ])
  },
  "level-2": {
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
        next() {
          return `level-3`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Jingle Punks`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Kevin MacLeod`,
        next() {
        }
      }
    ])
  },
  "level-3": {
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
        next() {
          return `level-4`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Audionautix`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Дима Билан`,
        next() {
        }
      }
    ])
  },
  "level-4": {
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
    next() {
      return `level-5`;
    }
  },
  "level-5": {
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
        next() {
          return `level-6`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Пелагея`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Иван Дорн`,
        next() {
        }
      }
    ])
  },
  "level-6": {
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
        next() {
          return `level-7`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Боб Марли`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Kevin MacLeod`,
        next() {
        }
      }
    ])
  },
  "level-7": {
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
        next() {
          return `level-8`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Jingle Punks`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Kevin MacLeod`,
        next() {
        }
      }
    ])
  },
  "level-8": {
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
        next() {
          return `level-9`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Audionautix`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Дима Билан`,
        next() {
        }
      }
    ])
  },
  "level-9": {
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
    next() {
      return `level-10`;
    }

  },
  "level-10": {
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
        next() {
          return `level-11`;
        }
      },
      {
        id: `answer-2`,
        src: ``,
        artist: `Пелагея`,
        next() {
        }
      },
      {
        id: `answer-3`,
        src: ``,
        artist: `Иван Дорн`,
        next() {
        }
      }
    ])
  }
};
