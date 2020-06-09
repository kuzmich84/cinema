import AbstractComponent from "./abstract-component";

const createFooterStatisticTemplate = (cards) => {

  return (`<section class="footer__statistics">
    <p>${cards.length} movies inside</p>
  </section>`);
};

export default class FooterStatistic extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._cards);
  }
}
