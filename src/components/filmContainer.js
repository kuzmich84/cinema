import AbstractComponent from "./abstract-component";

const createFilmsContainer = () => {
  return (
    `<section class="films"></section>`);
};

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsContainer();
  }
}
