import AbstractComponent from "./abstract-component";

const createButtonShowMoreTemplate = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class LoadMoreButton extends AbstractComponent {

  getTemplate() {
    return createButtonShowMoreTemplate();
  }
}

