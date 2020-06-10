import AbstractComponent from "./abstract-component";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};


const createSortTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" data-sort-type ="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type ="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type ="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }
}
