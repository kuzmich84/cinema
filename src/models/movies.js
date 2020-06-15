import {getCardsByFilter} from "../utils/filter";
import {FilterType} from "../utils/common";

export default class Movies {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.ALL;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getMovies() {
    return getCardsByFilter(this._cards, this._activeFilterType);
  }

  getMoviesAll() {
    return this._cards;
  }

  setMovies(cards) {
    this._cards = Array.from(cards);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  updateCard(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  removeCard(id) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), this._cards.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

}
