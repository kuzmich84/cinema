import AbstractComponent from "./abstract-component";

const createMenuTemplate = (filters) => {
  const [, totalWatchlist, totalWatched, totalWatchFavorite] = filters;

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${totalWatchlist.count}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${totalWatched.count}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${totalWatchFavorite.count}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

const FILTER_ID_PREFIX = `http://localhost:8080/#`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export default class SiteMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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
