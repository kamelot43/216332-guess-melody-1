export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`.main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

const playAudio = (it) => {
  it.classList.add(`player-control--pause`);
  it.previousElementSibling.play();
};

const pauseAudio = (it) => {
  it.previousElementSibling.pause();
  it.classList.remove(`player-control--pause`);
};

export const setPauseAndPlay = (arrays, evt) => {
  evt.preventDefault();
  const target = evt.target;
  [...arrays].forEach((it) => {
    if (it !== target) {
      pauseAudio(it);
    }
  });

  if (target.classList.contains(`player-control--pause`)) {
    pauseAudio(target);
  } else {
    playAudio(target);
  }
};
