import {remove, render, RenderPosition} from "../utils/render";
import LoadMoreButtonComponent from "../components/button";
import ExtraFilmComponent from "../components/extra";
import NoDataComponent from "../components/no-data";
import FilmListContainerComponent from "../components/filmsListContainer";
import FilmsListComponent from "../components/filmsList";
import Sort, {SortType} from "../components/sort";
import FilmContainerComponent from "../components/filmContainer";
import MovieController from "./MovieController";
import {FilterType} from "../utils/common";


const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const titles = [`Top rated`, `Most commented`];

const renderCards = (cardsListElement, cards, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(cardsListElement, onDataChange, onViewChange);
    movieController.render(card);
    return movieController;
  });
};


export default class BoardController {
  constructor(container, moviesModel) {
    this._container = container;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmListContainerComponent = new FilmListContainerComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._sortComponent = new Sort();
    this._filmContainerComponent = new FilmContainerComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this); // привязываем контекст к сортитровке, доступ к this._cards
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._moviesModel = moviesModel;
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._filterType = FilterType;

    this._showedCardControllers = [];
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._creatingCard = null;

  }


  render() {
    const container = this._container;
    const cards = this._moviesModel.getMovies();


    // const siteMenuComponent = new SiteMenuComponent(statisticData(cards));
    // выводить меню


    // выводит сортировку
    render(container, this._sortComponent, RenderPosition.BEFOREEND);

    // выводит контейнер films
    render(container, this._filmContainerComponent, RenderPosition.BEFOREEND);

    render(this._filmContainerComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    // выводит контейнер для карточек
    render(this._filmsListComponent.getElement(), this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(cards.slice(0, this._showingCardsCount));
    this._renderLoadMoreButton();

    titles.forEach((title) => render(this._filmContainerComponent.getElement(), new ExtraFilmComponent(title), RenderPosition.BEFOREEND));
    this._renderLoadMoreButton();
    this._renderExtraList();
  }

  _removeCards() {
    this._showedCardControllers.forEach((cardController) => cardController.destroy());
    this._showedCardControllers = [];
  }

  _renderCards(cards) {
    const taskListElement = this._filmListContainerComponent.getElement();
    const newCards = renderCards(taskListElement, cards, this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    this._showingCardsCount = this._showedCardControllers.length;
  }

  _updateCards(count) {
    this._removeCards();
    this._renderCards(this._moviesModel.getMovies().slice(0, count));
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);
    if (this._showingCardsCount >= this._moviesModel.getMovies().length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {

    const prevCardsCount = this._showingCardsCount;
    const cards = this._moviesModel.getMovies();
    this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    this._renderCards(cards.slice(prevCardsCount, this._showingCardsCount));
    if (this._showingCardsCount >= cards.length) {
      remove(this._loadMoreButtonComponent);
    }
  }


  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const cards = this._moviesModel.getMovies();

    switch (sortType) {
      case SortType.DATE:
        sortedCards = cards.slice().sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        break;
      case SortType.RATING:
        sortedCards = cards.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice(0, this._showingCardsCount);
        break;
    }

    this._removeCards();
    this._renderCards(sortedCards);

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    }
  }

  _renderExtraList() {

    const filmsListContainerExtra = this._container.querySelectorAll(`.films-list__container`);
    const cardsSortOfComment = this._moviesModel.getMovies().slice().sort((prev, next) => next.comments - prev.comments);
    const cardsSortOfRating = this._moviesModel.getMovies().slice().sort((prev, next) => next.filmInfo.rating - prev.filmInfo.rating);

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
      renderCards(Array.from(filmsListContainerExtra).slice(1)[0], cardsSortOfRating.slice(0, 2), this._onDataChange, this._onViewChange);
    }

    if (proverkaOfComment(cardsSortOfComment)) {
      renderCards(Array.from(filmsListContainerExtra).slice(1)[1], cardsSortOfComment.slice(0, 2), this._onDataChange, this._onViewChange);
    }
  }

  _onDataChange(cardController, oldData, newData) {

    console.log(`oldData`, oldData);
    console.log(`newData`, newData);

    if (oldData === newData) {
      this._moviesModel.removeCard(oldData.id);
      this._updateCards(this._showingCardsCount);
    }
    const isSuccess = this._moviesModel.updateCard(oldData.id, newData);
    if (isSuccess) {
      cardController.render(newData);
    }
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateCards(SHOWING_CARDS_COUNT_ON_START);
  }
}
