import convertAnswers from "./data/data";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
const APP_ID = 22101985;
const SERVER_URL = `https://es.dump.academy/guess-melody/questions`;
const STATICTICS_URL = `https://es.dump.academy/guess-melody/stats/${APP_ID}`;

export default class Loader {

  static loadData() {
    return window.fetch(SERVER_URL).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => convertAnswers(data));
  }

  static loadResults() {
    return window.fetch(STATICTICS_URL)
        .then(checkStatus)
        .then((response) => response.json());
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(STATICTICS_URL, requestSettings).then(checkStatus);
  }

}
