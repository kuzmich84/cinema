import AbstractComponent from "./abstract-component";

const filmsListContainerTemplate = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmListContainerComponent extends AbstractComponent {
  getTemplate() {
    return filmsListContainerTemplate();
  }
}

