import FilterComponent from "../components/menu";
import {FilterType} from "../utils/common";
import {replace, render, RenderPosition} from "../utils/render";
import {getAlreadyWatchedTotalTime, getCardsByFilter} from "../utils/filter";
import StatisticComponent from "../components/statistic";
import SortComponent from "../components/sort";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
    this._sortComponent = new SortComponent();
    this._statisticComponent = new StatisticComponent();


  }

  render() {
    const container = this._container;
    const allCards = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getCardsByFilter(allCards, filterType).length,
        checked: filterType === this._activeFilterType,
        totalTime: getAlreadyWatchedTotalTime(allCards)
      };
    });

    console.log(filters);


    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }

    // Показывает статистику
    const showStat = (evt) => {
      evt.preventDefault();
      document.querySelector(`.films`).remove();
      document.querySelector(`.sort`).remove();
      render(container, new StatisticComponent(filters), RenderPosition.BEFOREEND);
      this._filterComponent.removeShowStatClickHandler(showStat);
    };
    this._filterComponent.setShowStatClickHandler(showStat);
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }

}
