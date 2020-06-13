import CardFilmComponent from "../components/card";
import DetailsFilmComponent from "../components/details";
import {remove, render, replace, RenderPosition} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._cardComponent = null;
    this._detailsFilmComponent = null;
  }

  render(card) {

    const oldCardComponent = this._cardComponent;
    const oldDetailsFilmComponent = this._detailsFilmComponent;

    this._cardComponent = new CardFilmComponent(card);
    this._detailsFilmComponent = new DetailsFilmComponent(card);

    this._cardComponent.setShowDetailsClickHandler(() => {
      this._showDetails();
    }, `.film-card__poster`);

    this._cardComponent.setShowDetailsClickHandler(() => {
      this._showDetails();
    }, `.film-card__title`);

    this._cardComponent.setShowDetailsClickHandler(() => {
      this._showDetails();
    }, `.film-card__comments`);

    this._detailsFilmComponent.setCloseDetailsClickHandler(() => this._closeDetails(), `.film-details__close-btn`);

    this._cardComponent.setWatchListButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: {
          watchlist: !card.userDetails.watchlist,
          alreadyWatched: card.userDetails.watchlist,
          favorite: card.userDetails.favorite
        },
      }));
    });

    this._cardComponent.setAlreadyWatchListButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: {
          alreadyWatched: !card.userDetails.alreadyWatched,
          watchlist: card.userDetails.watchlist,
          favorite: card.userDetails.favorite
        }
      }));
    });

    this._cardComponent.setFavoriteWatchListButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: {
          favorite: !card.userDetails.favorite,
          alreadyWatched: card.userDetails.alreadyWatched,
          watchlist: card.userDetails.watchlist,
        }
      }));
    });

    this._detailsFilmComponent.setAlreadywatchButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: {alreadyWatched: !card.userDetails.alreadyWatched}
      }));
      if (oldDetailsFilmComponent) {
        replace(this._detailsFilmComponent, oldDetailsFilmComponent);
      }
    });

    if (oldDetailsFilmComponent && oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._detailsFilmComponent, oldDetailsFilmComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  _showDetails() {
    this._onViewChange();
    render(document.querySelector(`body`), this._detailsFilmComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closeDetails() {
    remove(this._detailsFilmComponent);
  }


  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._detailsFilmComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._showDetails();
    }
  }
}
