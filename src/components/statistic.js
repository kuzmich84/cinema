import {createElement, getTime} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createStatisticTemplate = (cards) => {

  const {totalWatched, totalWatchedTime} = cards;

  const countFilm = totalWatched;
  let nameProfile = ``;

  if (countFilm === 0) {
    nameProfile = ``;
  } else if (countFilm >= 1 && countFilm <= 10) {
    nameProfile = `Novice`;
  } else if (countFilm >= 11 && countFilm <= 20) {
    nameProfile = `Fan`;
  } else {
    nameProfile = `Movie Buff`;
  }

  const time = getTime(totalWatchedTime).split(` `);
  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${nameProfile}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${totalWatched}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${time[0]}<span class="statistic__item-description">h</span>${time[2]}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
};

export default class Statistic extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createStatisticTemplate(this._cards);
  }

  setShowStatClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
