const displayResults = (statistics, player) => {

  if (player.notes <= 0) {
    return `У вас закончились все попытки. <br> Ничего, повезёт в следующий раз!`;
  } else if (player.time <= 0) {
    return `Время вышло! <br> Вы не успели отгадать все мелодии`;
  }

  const newArray = [...statistics];
  newArray.sort((a, b) => {
    return b - a;
  });
  const position = newArray.indexOf(player.points) + 1;
  const players = newArray.length;
  const percent = Math.floor(((players - position) / players) * 100) + `%`;
  return `Вы заняли ${position} место из ${players} игроков. Это лучше, чем у ${percent} игроков`;

};

export default displayResults;
