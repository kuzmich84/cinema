import {getTime} from '../utils/common';
import AbstractComponent from "./abstract-component";
import moment from "moment";

const createFilmCardTemplate = (card) => {

  const {comments, filmInfo, userDetails} = card;
  let date = new Date(filmInfo.release.date);
  let year = date.getFullYear();
  const {runtime} = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${filmInfo.title}</h3>
          <p class="film-card__rating">${filmInfo.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${getTime(runtime)}</span>
            <span class="film-card__genre">${filmInfo.genre[0]}</span>
          </p>
          <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${filmInfo.description}</p>
          <a class="film-card__comments">${comments} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
        </article>`);
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setShowDetailsClickHandler(handler, element) {
    this.getElement().querySelector(element)
      .addEventListener(`click`, handler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setAlreadyWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
