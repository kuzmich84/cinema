import AbstractComponent from "./abstract-component";

const createMenuTemplate = (filters) => {
  const [, watchlist, history, favorites] = filters;

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.count}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.count}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.count}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

const FILTER_ID_PREFIX = `http://localhost:8080/#`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export default class SiteMenu extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createMenuTemplate(this._cards);
  }

  setShowStatClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__item--additional`).addEventListener(`click`, handler);
  }

  removeShowStatClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__item--additional`).removeEventListener(`click`, handler);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.href);
      handler(filterName);
    });
  }

}
