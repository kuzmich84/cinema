import CardFilmComponent from "../components/card";
import DetailsFilmComponent from "../components/details";
import {remove, render, RenderPosition} from "../utils/render";
import LoadMoreButtonComponent from "../components/button";
import ExtraFilmComponent from "../components/extra";
import NoDataComponent from "../components/no-data";
import FilmListContainerComponent from "../components/filmsListContainer";
import FilmsListComponent from "../components/filmsList";
import Sort, {SortType} from "../components/sort";
import FilmContainerComponent from "../components/filmContainer";
import SiteMenuComponent from "../components/menu";
import {statisticData} from "../utils/common";
import StatisticComponent from "../components/statistic";

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

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
const titles = [`Top rated`, `Most commented`];

const renderCards = (cardsListElement, cards) => {
  cards.forEach((card) => renderCard(card, cardsListElement));
};



export default class BoardController {
  constructor(container) {
    this._container = container;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmListContainerComponent = new FilmListContainerComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._sortComponent = new Sort();
    this._filmContainerComponent = new FilmContainerComponent();
  }


  render(cards) {
    const container = this._container;

    const renderLoadMoreButton = () => {

      if (showingCardsCount >= cards.length) {
        return;
      }

      render(this._filmsListComponent.getElement(), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      // Логика кнопки loadMoreButton
      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        cards.slice(prevTasksCount, showingCardsCount)
          .forEach((card) => renderCard(card, this._filmListContainerComponent.getElement()));

        if (showingCardsCount >= cards.length) {
          remove(this._loadMoreButtonComponent);
        }
      });

    };
    const siteMenuComponent = new SiteMenuComponent(statisticData(cards));
    // выводить меню
    render(container, siteMenuComponent, RenderPosition.BEFOREEND);

    // выводит сортировку
    render(container, this._sortComponent, RenderPosition.BEFOREEND);

    // выводит контейнер films
    render(container, this._filmContainerComponent, RenderPosition.BEFOREEND);

    render(this._filmContainerComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    // выводит контейнер для карточек
    render(this._filmsListComponent.getElement(), this._filmListContainerComponent, RenderPosition.BEFOREEND);


    // отрисовка карточек
    if (cards.length !== 0) {
      renderCards(this._filmListContainerComponent.getElement(), cards.slice(0, showingCardsCount));
      titles.forEach((title) => render(this._filmContainerComponent.getElement(), new ExtraFilmComponent(title), RenderPosition.BEFOREEND));
    } else {
      render(container, this._noDataComponent, RenderPosition.BEFOREEND);
      remove(this._loadMoreButtonComponent);
    }

    // Отрисует кнопку

    renderLoadMoreButton();


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
          break;
        case SortType.RATING:
          sortedCards = cards.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardsCount);
          break;
      }

      this._filmListContainerComponent.getElement().innerHTML = ``;

      renderCards(this._filmListContainerComponent.getElement(), sortedCards);


      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });

    // Отрисует популярность фильмов

    const filmsListContainerExtra = document.querySelectorAll(`.films-list__container`);
    const cardsSortOfComment = cards.slice().sort((prev, next) => next.comments - prev.comments);
    const cardsSortOfRating = cards.slice().sort((prev, next) => next.filmInfo.rating - prev.filmInfo.rating);


    function renderFilmCard(containerExtra, array, count) {
      for (let i = 0; i < count; i++) {
        array.slice(0, 2).forEach((card) => renderCard(card, containerExtra));
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

    const showStat = (evt) => {
      evt.preventDefault();
      remove(this._filmContainerComponent);
      remove(this._sortComponent);
      render(container, new StatisticComponent(statisticData(cards)), RenderPosition.BEFOREEND);
      siteMenuComponent.removeShowStatClickHandler(showStat);
    };
    siteMenuComponent.setShowStatClickHandler(showStat);

  }
}
