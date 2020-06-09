import {generateCards} from "./mock/card";
import {render, RenderPosition} from "./utils/common";
import LoadMoreButtonComponent from "./components/button";
import CardFilmComponent from "./components/card";
import DetailsFilmComponent from "./components/details";
import ExtraFilmComponent from "./components/extra";
import FilmContainerComponent from "./components/filmContainer";
import SiteMenuComponent from "./components/menu";
import NoDataComponent from "./components/no-data";
import UserProfileComponent from "./components/profile";
import SortComponent from "./components/sort";
import StatisticComponent from "./components/statistic";
import FooterStatisticComponent from "./components/footerStatistic";

const FILM_COUNT = 15;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const cards = generateCards(FILM_COUNT).map((item, index) => {
  item.id = index;
  return item;
});

// формирует данные для статистики
const statisticData = (arr) => {
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


console.log(cards);


const header = document.querySelector(`.header`);
render(header, new UserProfileComponent(statisticData(cards)).getElement(), RenderPosition.BEFOREEND);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenuComponent(statisticData(cards)).getElement(), RenderPosition.BEFOREEND);

const sortComponent = new SortComponent();
render(siteMainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);

const filmContainerComponent = new FilmContainerComponent();
render(siteMainElement, filmContainerComponent.getElement(), RenderPosition.BEFOREEND);

const filmsList = filmContainerComponent.getElement().querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(filmsList, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);


// Логика кнопки loadMoreButton
loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => render(filmsListContainer, new CardFilmComponent(card).getElement(), RenderPosition.BEFOREEND));

  if (showingCardsCount >= cards.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }

  showDetails(document.querySelectorAll(`.film-card__poster`));
  showDetails(document.querySelectorAll(`.film-card__title`));
  showDetails(document.querySelectorAll(`.film-card__comments`));

});

const showDetails = (collection) => {
  collection.forEach((item, index) => {
    item.addEventListener(`click`, () => {
      const detailsFilmComponent = new DetailsFilmComponent(cards[index]);
      render(document.querySelector(`body`), detailsFilmComponent.getElement(), RenderPosition.BEFOREEND);
      const buttonDetails = detailsFilmComponent.getElement().querySelector(`.film-details__close-btn`);
      buttonDetails.addEventListener(`click`, () => {
        detailsFilmComponent.getElement().remove();
        detailsFilmComponent.removeElement();
      });
    });
  });
};
const titles = [`Top rated`, `Most commented`];

if (cards.length !== 0) {
  cards.slice(0, showingCardsCount).forEach((card) => render(filmsListContainer, new CardFilmComponent(card).getElement(), RenderPosition.BEFOREEND));
  titles.forEach((title) => render(filmContainerComponent.getElement(), new ExtraFilmComponent(title).getElement(), RenderPosition.BEFOREEND));
} else {
  render(filmsListContainer, new NoDataComponent().getElement(), RenderPosition.BEFOREEND);
  loadMoreButtonComponent.getElement().remove();
  loadMoreButtonComponent.removeElement();
}

const filmsListContainerExtra = document.querySelectorAll(`.films-list__container`);
const cardsSortOfComment = cards.slice().sort((prev, next) => next.comments - prev.comments);
const cardsSortOfRating = cards.slice().sort((prev, next) => next.filmInfo.rating - prev.filmInfo.rating);


function renderFilmCard(container, array, count) {
  for (let i = 0; i < count; i++) {
    array.slice(0, 2).forEach((card) => render(container, new CardFilmComponent(card).getElement(), RenderPosition.BEFOREEND));
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

showDetails(document.querySelectorAll(`.film-card__poster`));
showDetails(document.querySelectorAll(`.film-card__title`));
showDetails(document.querySelectorAll(`.film-card__comments`));


const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(cards).getElement(), RenderPosition.BEFOREEND);

const stat = document.querySelector(`.main-navigation__item--additional`);


stat.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filmContainerComponent.getElement().remove();
  filmContainerComponent.removeElement();
  sortComponent.removeElement();
  render(siteMainElement, new StatisticComponent(statisticData(cards)).getElement(), RenderPosition.BEFOREEND);
}
);


console.log(statisticData(cards));

