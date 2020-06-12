import CardFilmComponent from "../components/card";
import DetailsFilmComponent from "../components/details";
import {remove, render, RenderPosition} from "../utils/render";


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

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

    this._detailsFilmComponent.setCloseDetailsClickHandler(()=> this._closeDetails(), `.film-details__close-btn`)

    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);

  }

  _showDetails() {
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
}
