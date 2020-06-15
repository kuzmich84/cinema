import FilterComponent from "../components/menu";
import {FilterType, statisticData} from "../utils/common";
import {replace, render, RenderPosition, remove} from "../utils/render";
import {getCardsByFilter} from "../utils/filter";
import StatisticComponent from "../components/statistic";
import FilmContainerComponent from "../components/filmContainer";
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
    this._filmContainerComponent = new FilmContainerComponent();
    this._sortComponent = new SortComponent();

  }

  render() {
    const container = this._container;
    const allCards = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getCardsByFilter(allCards, filterType).length,
        checked: filterType === this._activeFilterType,
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
      remove(this._filmContainerComponent);
      remove(this._sortComponent);
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
