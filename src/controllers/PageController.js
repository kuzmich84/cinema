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
import MovieController from "./MovieController";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
const titles = [`Top rated`, `Most commented`];

const renderCards = (cardsListElement, cards) => {
  return cards.map((card) => {
    const movieController = new MovieController(cardsListElement);
    movieController.render(card);
    return movieController;
  });
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
    this._onSortTypeChange = this._onSortTypeChange.bind(this); // привязываем контекст к сортитровке, доступ к this._cards


    this._cards = [];
    this._showedCardsControllers = [];
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

  }


  render(cards) {
    const container = this._container;
    this._cards = cards;
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

    const newCards = renderCards(this._filmListContainerComponent.getElement(), cards.slice(0, showingCardsCount));
    // отрисовка карточек
    if (newCards.length !== 0) {
      titles.forEach((title) => render(this._filmContainerComponent.getElement(), new ExtraFilmComponent(title), RenderPosition.BEFOREEND));
    } else {
      render(container, this._noDataComponent, RenderPosition.BEFOREEND);
      remove(this._loadMoreButtonComponent);
    }

    this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

    // Отрисует кнопку
    this._renderLoadMoreButton();
    // сортировка


    // Отрисует популярность фильмов

    this._renderExtraList();


    // Показывает статистику
    const showStat = (evt) => {
      evt.preventDefault();
      remove(this._filmContainerComponent);
      remove(this._sortComponent);
      render(container, new StatisticComponent(statisticData(cards)), RenderPosition.BEFOREEND);
      siteMenuComponent.removeShowStatClickHandler(showStat);
    };
    siteMenuComponent.setShowStatClickHandler(showStat);
  }

  _renderLoadMoreButton() {
    if (this._showingCardsCount >= this._cards.length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    // Логика кнопки loadMoreButton
    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const cardListElement = this._filmListContainerComponent.getElement();
      const newCards = renderCards(cardListElement, this._cards.slice(prevCardsCount, this._showingCardsCount));
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

      if (this._showingCardsCount >= this._cards.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];


    switch (sortType) {
      case SortType.DATE:
        sortedCards = this._cards.slice().sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        break;
      case SortType.RATING:
        sortedCards = this._cards.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
        break;
      case SortType.DEFAULT:
        sortedCards = this._cards.slice(0, showingCardsCount);
        break;
    }

    const cardListElement = this._filmListContainerComponent.getElement();
    cardListElement.innerHTML = ``;

    const newCards = renderCards(cardListElement, sortedCards);
    this._showedCardsControllers = newCards;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderExtraList() {

    const filmsListContainerExtra = this._container.querySelectorAll(`.films-list__container`);
    const cardsSortOfComment = this._cards.slice().sort((prev, next) => next.comments - prev.comments);
    const cardsSortOfRating = this._cards.slice().sort((prev, next) => next.filmInfo.rating - prev.filmInfo.rating);

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
      renderCards(Array.from(filmsListContainerExtra).slice(1)[0], cardsSortOfRating.slice(0, 2));
    }

    if (proverkaOfComment(cardsSortOfComment)) {
      renderCards(Array.from(filmsListContainerExtra).slice(1)[1], cardsSortOfComment.slice(0, 2));
    }
  }
}
