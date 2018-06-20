export const render = (template) => {
  const wrapper = document.createElement(`div`);
  // wrapper.className = `main`;
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`.main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const setPauseAndPlay = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  if (target.classList.contains(`player-control--pause`)) {
    target.classList.remove(`player-control--pause`);
    target.previousElementSibling.pause();
  } else {
    target.classList.add(`player-control--pause`);
    target.previousElementSibling.play();
  }

};
