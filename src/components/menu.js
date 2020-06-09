import {createElement} from "../utils/common";

const createMenuTemplate = (cards) => {
  const {totalWatchlist, totalWatched, totalWatchFavorite} = cards;
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${totalWatchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${totalWatched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${totalWatchFavorite}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export default class SiteMenu {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createMenuTemplate(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
