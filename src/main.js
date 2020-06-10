import {generateCards} from "./mock/card";
import {render, RenderPosition, remove} from "./utils/render";
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

const renderCard = (card, container) => {
  const cardComponent = new CardFilmComponent(card);
  const detailsFilmComponent = new DetailsFilmComponent(card);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(detailsFilmComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const showDetails = () => {
    render(document.querySelector(`body`), detailsFilmComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  cardComponent.setShowDetailsClickHandler(() => {
    showDetails();
  }, `.film-card__poster`);

  cardComponent.setShowDetailsClickHandler(() => {
    showDetails();
  }, `.film-card__title`);

  cardComponent.setShowDetailsClickHandler(() => {
    showDetails();
  }, `.film-card__comments`);

  const detailsButton = detailsFilmComponent.getElement().querySelector(`.film-details__close-btn`);
  detailsButton.addEventListener(`click`, () => {
    remove(detailsFilmComponent);
  });

  render(container, cardComponent, RenderPosition.BEFOREEND);

};

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
render(header, new UserProfileComponent(statisticData(cards)), RenderPosition.BEFOREEND);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenuComponent(statisticData(cards)), RenderPosition.BEFOREEND);

const sortComponent = new SortComponent();
render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);

const filmContainerComponent = new FilmContainerComponent();
render(siteMainElement, filmContainerComponent, RenderPosition.BEFOREEND);

const filmsList = filmContainerComponent.getElement().querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(filmsList, loadMoreButtonComponent, RenderPosition.BEFOREEND);


// Логика кнопки loadMoreButton
loadMoreButtonComponent.setClickHandler(() => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => renderCard(card, filmsListContainer));

  if (showingCardsCount >= cards.length) {
    remove(loadMoreButtonComponent);
  }
});


const titles = [`Top rated`, `Most commented`];

if (cards.length !== 0) {
  cards.slice(0, showingCardsCount).forEach((card) => renderCard(card, filmsListContainer));
  titles.forEach((title) => render(filmContainerComponent.getElement(), new ExtraFilmComponent(title), RenderPosition.BEFOREEND));
} else {
  render(filmsListContainer, new NoDataComponent(), RenderPosition.BEFOREEND);
  remove(loadMoreButtonComponent);
}

const filmsListContainerExtra = document.querySelectorAll(`.films-list__container`);
const cardsSortOfComment = cards.slice().sort((prev, next) => next.comments - prev.comments);
const cardsSortOfRating = cards.slice().sort((prev, next) => next.filmInfo.rating - prev.filmInfo.rating);


function renderFilmCard(container, array, count) {
  for (let i = 0; i < count; i++) {
    array.slice(0, 2).forEach((card) => renderCard(card, container));
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

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(cards), RenderPosition.BEFOREEND);

const stat = document.querySelector(`.main-navigation__item--additional`);

const showStat = (evt) => {
  evt.preventDefault();
  remove(filmContainerComponent);
  remove(sortComponent);
  render(siteMainElement, new StatisticComponent(statisticData(cards)), RenderPosition.BEFOREEND);
  stat.removeEventListener(`click`, showStat);
};

stat.addEventListener(`click`, showStat);


console.log(statisticData(cards));

