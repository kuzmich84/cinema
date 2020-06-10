import CardFilmComponent from "../components/card";
import DetailsFilmComponent from "../components/details";
import {remove, render, RenderPosition} from "../utils/render";

const renderCard = (card, container) => {
  const cardComponent = new CardFilmComponent(card);
  const detailsFilmComponent = new DetailsFilmComponent(card);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(detailsFilmComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const showDetails = () => {
    render(document.querySelector(`body`), detailsFilmComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  cardComponent.setShowDetailsClickHandler(() => {
    showDetails();
  }, `.film-card__poster`);

  cardComponent.setShowDetailsClickHandler(() => {
    showDetails();
  }, `.film-card__title`);

  cardComponent.setShowDetailsClickHandler(() => {
    showDetails();
  }, `.film-card__comments`);

  const detailsButton = detailsFilmComponent.getElement().querySelector(`.film-details__close-btn`);
  detailsButton.addEventListener(`click`, () => {
    remove(detailsFilmComponent);
  });

  render(container, cardComponent, RenderPosition.BEFOREEND);

};

export default class BoardController {

}
