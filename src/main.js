import {createFilmCardTemplate} from "./components/card";
import {createMenuTemplate} from "./components/menu";
import {createFilmsContainer} from "./components/filmContainer";
import {createSortTemplate} from "./components/sort";
import {createButtonShowMoreTemplate} from "./components/button";
import {createUserProfileTemplate} from "./components/profile";
import {createFilmsExtraContainer} from "./components/extra";
import {generateCards} from "./mock/card";
import {createFilmDetailsTemplate} from "./components/details";
import {createFooterStatisticTemplate} from "./components/footerStatistic";
import {createNoDataTemplate} from "./components/no-data";
import {createStatisticTemplate} from "./components/statistic";

// функция для отрисовки компонент
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILM_COUNT = 15;
const EXTRA_COUNT = 2;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const cards = generateCards(FILM_COUNT).map((item, index) => {
  item.id = index;
  return item;
});

// формирует данные для статистики
const statisticData = (arr) => {
  const cardsFilterWatched = arr.filter((card) => card.userDetails.alreadyWatched);
  const cardsFilterWatchlist = arr.filter((card)=> card.userDetails.watchlist);
  const cardsFilterFavorite = arr.filter((card)=> card.userDetails.favorite);
  return {
    totalWatched: cardsFilterWatched.length,
    totalWatchedTime: cardsFilterWatched.reduce((sum, current) => sum + current.filmInfo.runtime, 0),
    totalWatchlist: cardsFilterWatchlist.reduce((sum, current) => sum + current.userDetails.watchlist, 0),
    totalWatchFavorite: cardsFilterFavorite.reduce((sum, current) => sum + current.userDetails.favorite, 0)
  };
};


console.log(cards);


const header = document.querySelector(`.header`);
render(header, createUserProfileTemplate(statisticData(cards)), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMenuTemplate(statisticData(cards)), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainer(), `beforeend`);
const filmsList = document.querySelector(`.films-list`);


const filmsListContainer = filmsList.querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;


render(filmsList, createButtonShowMoreTemplate(), `beforeend`);
const posters = document.querySelectorAll(`.film-card__poster`);
// Логика кнопки loadMoreButton
const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);


loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => render(filmsListContainer, createFilmCardTemplate(card), `beforeend`));

  if (showingCardsCount >= cards.length) {
    loadMoreButton.remove();
  }

  const postersClick = document.querySelectorAll(`.film-card__poster`);
  showDetails(postersClick);

});

const showDetails = (collection) => {
  collection.forEach((item, index) => {
    item.addEventListener(`click`, () => {
      render(document.querySelector(`body`), createFilmDetailsTemplate(cards[index]), `beforeend`);
      const buttonDetails = document.querySelector(`.film-details__close-btn`);
      buttonDetails.addEventListener(`click`, () => {
        document.querySelector(`.film-details`).remove();
      });
    });
  });
};

if (cards.length !== 0) {
  cards.slice(0, showingCardsCount).forEach((card) => render(filmsListContainer, createFilmCardTemplate(card), `beforeend`));
  const postersClick = document.querySelectorAll(`.film-card__poster`);
  showDetails(postersClick);
} else {
  render(filmsListContainer, createNoDataTemplate(), `beforeend`);
  loadMoreButton.remove();
}


const films = document.querySelector(`.films`);

render(films, createFilmsExtraContainer(), `beforeend`);


const filmsListContainerExtra = document.querySelectorAll(`.films-list__container`);
const cardsSortOfComment = cards.slice().sort((prev, next) => next.comments - prev.comments);
const cardsSortOfRating = cards.slice().sort((prev, next) => next.filmInfo.rating - prev.filmInfo.rating);


function renderFilmCard(container, array, count) {
  for (let i = 0; i < count; i++) {
    array.slice(0, 2).forEach((card) => render(container, createFilmCardTemplate(card), `beforeend`));
  }
}

const proverkaOfRating = (arr) => {
  let bool = true;
  arr.slice(0, 1).forEach((item) => {
    if (item.filmInfo.rating === 0) {
      bool = false;
    } else {
      bool = true;
    }
    return bool;
  });
  return bool;
};
const proverkaOfComment = (arr) => {
  let bool = true;
  arr.slice(0, 1).forEach((item) => {
    if (item.comments === 0) {
      bool = false;
    } else {
      bool = true;
    }
    return bool;
  });
  return bool;
};


if (proverkaOfRating(cardsSortOfRating)) {
  renderFilmCard(Array.from(filmsListContainerExtra).slice(1)[0], cardsSortOfRating, 1);
}
if (proverkaOfComment(cardsSortOfComment)) {
  renderFilmCard(Array.from(filmsListContainerExtra).slice(1)[1], cardsSortOfComment, 1);
}



showDetails(posters);

const footer = document.querySelector(`.footer`);
render(footer, createFooterStatisticTemplate(cards), `beforeend`);

const stat = document.querySelector(`.main-navigation__item--additional`);
const sort = document.querySelector(`.sort`);
stat.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  films.remove();
  sort.remove();
  render(siteMainElement, createStatisticTemplate(statisticData(cards)), `beforeend`);
}
);

console.log(statisticData(cards));

