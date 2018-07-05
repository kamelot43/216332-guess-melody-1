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

const toggleState = (element) => {
  if (element.classList.contains(`player-control--pause`)) {
    element.previousElementSibling.play();
  } else {
    element.previousElementSibling.pause();
  }
};

export const setPauseAndPlay = (arrays, evt) => {
  evt.preventDefault();
  const target = evt.target;

  [...arrays].forEach((it) => {
    it.classList.remove(`player-control--pause`);
    // it.previousElementSibling.pause();
    toggleState(it);
  });
  target.classList.add(`player-control--pause`);
  toggleState(target);
};
