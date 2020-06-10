import AbstractComponent from "./abstract-component";

const createFilmsListTemplate = () => {
  return (`<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    </section>`);
};

export default class FilmsListComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
