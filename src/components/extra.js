import {createElement} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createFilmsExtraContainer = (title) => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`;
};

export default class FilmsExtraContainer extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createFilmsExtraContainer(this._title);
  }
}
