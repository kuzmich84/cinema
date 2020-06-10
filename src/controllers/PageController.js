import CardFilmComponent from "../components/card";
import DetailsFilmComponent from "../components/details";
import {remove, render, RenderPosition} from "../utils/render";
import LoadMoreButtonComponent from "../components/button";
import ExtraFilmComponent from "../components/extra";
import NoDataComponent from "../components/no-data";
import FilmListContainerComponent from "../components/filmsListContainer";
import FilmsListComponent from "../components/filmsList";

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


export default class BoardController {
  constructor(container) {
    this._container = container;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmListContainerComponent = new FilmListContainerComponent();
    this._filmsListComponent = new FilmsListComponent();
  }


  render(cards) {
    const container = this._container.getElement();
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent.getElement(), this._filmListContainerComponent, RenderPosition.BEFOREEND);

    const renderCards = (cardsListElement, cards) => {
      cards.forEach((card) => renderCard(card, cardsListElement);
    };

    // отрисовка карточек
    if (cards.length !== 0) {
      // cards.slice(0, showingCardsCount).forEach((card) => renderCard(card, this._filmListContainerComponent.getElement()));
      titles.forEach((title) => render(container, new ExtraFilmComponent(title), RenderPosition.BEFOREEND));
    } else {
      render(container, this._noDataComponent, RenderPosition.BEFOREEND);
      remove(this._loadMoreButtonComponent);
    }

    // Отрисует кнопку


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

  }
}
