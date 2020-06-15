export const getRandomIntegerNumber = (min, max) => min + Math.floor(max * Math.random());

export const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomFloatInRange = () =>(Math.random() * 10).toFixed(1);

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const createDescription = (description, count) => {
  let string = ``;
  for (let i = 0; i < count; i++) {
    string += getRandomArrayItem(description) + ` `;
  }
  return string;
};

export const getRandomEventTime = (yearStart, yearEnd) => {
  const date = new Date();
  date.setFullYear(getRandomInRange(2000, 2019), getRandomInRange(0, 11), getRandomInRange(1, 31));
  date.setHours(getRandomInRange(0, 23), getRandomInRange(0, 59));

  return date;
};

export const getTime = (time) => {
  if (time < 60) {
    return `${time} m`;
  } else {
    let minutes = time % 60;
    let hours = (time - minutes) / 60;
    return `${hours} h ${minutes} m`;
  }
};

// формирует данные для статистики
export const statisticData = (arr) => {
  const cardsFilterWatched = arr.filter((card) => card.userDetails.alreadyWatched);
  const cardsFilterWatchlist = arr.filter((card) => card.userDetails.watchlist);
  const cardsFilterFavorite = arr.filter((card) => card.userDetails.favorite);
  return {
    totalWatched: cardsFilterWatched.length,
    totalWatchedTime: cardsFilterWatched.reduce((sum, current) => sum + current.filmInfo.runtime, 0),
    totalWatchlist: cardsFilterWatchlist.reduce((sum, current) => sum + current.userDetails.watchlist, 0),
    totalWatchFavorite: cardsFilterFavorite.reduce((sum, current) => sum + current.userDetails.favorite, 0)
  };
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};
